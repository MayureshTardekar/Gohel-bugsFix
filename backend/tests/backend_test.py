"""
Backend tests for Osteon iteration 2 - multi-page restructure + valid referral logic.
Focus: /api/archive, /api/user (new fields), /api/referrals/{wallet}, referral qualification,
/api/test/submit attempt gating, /api/leaderboard sort.
"""
import os
import secrets
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://osteon-qualify.preview.emergentagent.com").rstrip("/")
API = f"{BASE_URL}/api"


def rand_wallet():
    return "0x" + secrets.token_hex(20)


@pytest.fixture(scope="module")
def s():
    sess = requests.Session()
    sess.headers.update({"Content-Type": "application/json"})
    return sess


# ---------- Archive ----------
def test_archive(s):
    r = s.get(f"{API}/archive")
    assert r.status_code == 200
    data = r.json()
    assert data["total"] == 206
    assert len(data["bones"]) == 206
    assert len(data["regions"]) == 9
    # region ids present
    region_ids = {reg["id"] for reg in data["regions"]}
    for exp in ["skull", "ossicles", "hyoid", "spine", "thoracic", "pectoral", "upper_limbs", "pelvic", "lower_limbs"]:
        assert exp in region_ids, f"missing region {exp}"


# ---------- User new fields ----------
def test_user_new_fields(s):
    w = rand_wallet()
    r = s.post(f"{API}/register", json={"wallet_address": w, "twitter_username": "TEST_" + secrets.token_hex(4)})
    assert r.status_code == 200
    r = s.get(f"{API}/user/{w}")
    assert r.status_code == 200
    u = r.json()["user"]
    for f in ["valid_referral_count", "pending_referral_count", "total_referrals", "allowed_attempts", "attempts_remaining", "cooldown_seconds"]:
        assert f in u, f"missing {f}"
    assert u["valid_referral_count"] == 0
    assert u["pending_referral_count"] == 0
    assert u["allowed_attempts"] == 1
    assert u["attempts_remaining"] == 1


# ---------- Referral scenario ----------
@pytest.fixture(scope="module")
def referral_ctx(s):
    """User A + User B referred by A (no test taken yet)."""
    wa, wb = rand_wallet(), rand_wallet()
    ra = s.post(f"{API}/register", json={"wallet_address": wa, "twitter_username": "TEST_A_" + secrets.token_hex(3)}).json()["user"]
    code_a = ra["referral_code"]
    rb = s.post(f"{API}/register", json={"wallet_address": wb, "twitter_username": "TEST_B_" + secrets.token_hex(3), "referred_by": code_a}).json()["user"]
    return {"wa": wa, "wb": wb, "code_a": code_a, "user_b_id": rb["id"]}


def test_referral_pending(s, referral_ctx):
    r = s.get(f"{API}/user/{referral_ctx['wa']}")
    u = r.json()["user"]
    assert u["valid_referral_count"] == 0
    assert u["pending_referral_count"] == 1
    assert u["total_referrals"] == 1
    assert u["allowed_attempts"] == 1


def test_referrals_endpoint_pending(s, referral_ctx):
    r = s.get(f"{API}/referrals/{referral_ctx['wa']}")
    assert r.status_code == 200
    data = r.json()
    assert data["qualify_score"] == 30
    assert len(data["referrals"]) == 1
    item = data["referrals"][0]
    assert item["status"] == "pending"
    assert item["required"] == 30
    assert item["score"] == 0


def test_referral_qualifies_after_score(s, referral_ctx):
    """User B submits a test hitting >=30 (6 quiz questions correct: 6*5=30)."""
    wb = referral_ctx["wb"]
    q = s.get(f"{API}/questions").json()["questions"]
    # Answer first 6 quiz questions with their KNOWN correct indices from seed order (may not match order returned)
    # Since /questions strips correct_index, we can't know. Fallback: try answers by matching question text.
    known_correct = {
        "How many bones are in the adult human skeleton?": 1,
        "Which is the longest bone in the human body?": 2,
        "What is the smallest bone in the human body?": 0,
        "Which bone protects the brain?": 1,
        "The axial skeleton contains how many bones?": 1,
        "What connects bones to other bones?": 2,
        "How many vertebrae are in the human spine?": 2,
        "Which bone is also called the collarbone?": 1,
    }
    answers = {}
    correct_taken = 0
    for question in q:
        if correct_taken < 6 and question["question"] in known_correct:
            answers[question["id"]] = known_correct[question["question"]]
            correct_taken += 1
        else:
            answers[question["id"]] = 0  # arbitrary
    assert correct_taken >= 6
    r = s.post(f"{API}/test/submit", json={"wallet_address": wb, "answers": answers})
    assert r.status_code == 200, r.text
    data = r.json()
    assert data["score"] >= 30

    # Now User A should have valid_referral_count=1, allowed_attempts=2
    ra = s.get(f"{API}/user/{referral_ctx['wa']}").json()["user"]
    assert ra["valid_referral_count"] == 1
    assert ra["pending_referral_count"] == 0
    assert ra["allowed_attempts"] == 2

    # /referrals shows qualified
    ref = s.get(f"{API}/referrals/{referral_ctx['wa']}").json()["referrals"][0]
    assert ref["status"] == "qualified"
    assert ref["score"] >= 30


# ---------- Attempts gating ----------
def test_submit_403_when_no_attempts(s):
    """Fresh user: 1 attempt, use it, second submit blocked by cooldown 429 OR 403 based on order."""
    w = rand_wallet()
    s.post(f"{API}/register", json={"wallet_address": w, "twitter_username": "TEST_att_" + secrets.token_hex(3)})
    q = s.get(f"{API}/questions").json()["questions"]
    answers = {qq["id"]: 0 for qq in q}
    r1 = s.post(f"{API}/test/submit", json={"wallet_address": w, "answers": answers})
    assert r1.status_code == 200
    r2 = s.post(f"{API}/test/submit", json={"wallet_address": w, "answers": answers})
    # Cooldown 429 fires first before attempts check (implementation-dependent). Accept 403 or 429.
    assert r2.status_code in (403, 429), r2.text


# ---------- Leaderboard sort ----------
def test_leaderboard_sort(s):
    r = s.get(f"{API}/leaderboard")
    assert r.status_code == 200
    board = r.json()["leaderboard"]
    for i in range(len(board) - 1):
        a, b = board[i], board[i + 1]
        assert (a["valid_referrals"], a["best_score"]) >= (b["valid_referrals"], b["best_score"])


# ---------- Not found ----------
def test_referrals_404(s):
    r = s.get(f"{API}/referrals/0xdeadbeef" + "0" * 32)
    assert r.status_code == 404
