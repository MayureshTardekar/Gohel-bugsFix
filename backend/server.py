from fastapi import FastAPI, APIRouter, HTTPException, Depends, Header
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import secrets
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional, Dict
import uuid
from datetime import datetime, timezone, timedelta
from bones_data import get_archive, get_regions

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

ADMIN_USERNAME = os.environ.get('ADMIN_USERNAME', 'osteon_admin')
ADMIN_PASSWORD = os.environ.get('ADMIN_PASSWORD', 'BoneMaster206!')
ADMIN_TOKEN = os.environ.get('ADMIN_TOKEN', 'osteon-admin-secret-token-206')

COOLDOWN_HOURS = 24
PASS_SCORE = 70
REFERRAL_QUALIFY_SCORE = 30

app = FastAPI()
api_router = APIRouter(prefix="/api")

# ==================== Models ====================

def now_iso():
    return datetime.now(timezone.utc).isoformat()

def normalize_wallet(addr: str) -> str:
    return addr.strip().lower()

def normalize_twitter(t: str) -> str:
    return t.strip().lstrip('@').lower()

class RegisterInput(BaseModel):
    wallet_address: str
    twitter_username: str
    referred_by: Optional[str] = None  # referral code

class LoginInput(BaseModel):
    wallet_address: str

class TaskInput(BaseModel):
    wallet_address: str
    tasks: Dict[str, bool]  # {follow: true, retweet: true, like: true}

class TestSubmitInput(BaseModel):
    wallet_address: str
    answers: Dict[str, int]  # question_id -> selected option index

class AdminLoginInput(BaseModel):
    username: str
    password: str

class QuestionInput(BaseModel):
    type: str  # "quiz" or "bone"
    question: str
    options: List[str]
    correct_index: int
    image_url: Optional[str] = None
    points: int

# ==================== Seed Questions ====================

SEED_QUESTIONS = [
    # 10 Quiz questions - 5 pts each
    {"type": "quiz", "question": "How many bones are in the adult human skeleton?", "options": ["186", "206", "216", "226"], "correct_index": 1, "points": 5},
    {"type": "quiz", "question": "Which is the longest bone in the human body?", "options": ["Tibia", "Humerus", "Femur", "Fibula"], "correct_index": 2, "points": 5},
    {"type": "quiz", "question": "What is the smallest bone in the human body?", "options": ["Stapes", "Malleus", "Incus", "Pisiform"], "correct_index": 0, "points": 5},
    {"type": "quiz", "question": "Which bone protects the brain?", "options": ["Sternum", "Cranium", "Mandible", "Clavicle"], "correct_index": 1, "points": 5},
    {"type": "quiz", "question": "The axial skeleton contains how many bones?", "options": ["70", "80", "90", "126"], "correct_index": 1, "points": 5},
    {"type": "quiz", "question": "What connects bones to other bones?", "options": ["Tendons", "Muscles", "Ligaments", "Cartilage"], "correct_index": 2, "points": 5},
    {"type": "quiz", "question": "How many vertebrae are in the human spine?", "options": ["24", "26", "33", "36"], "correct_index": 2, "points": 5},
    {"type": "quiz", "question": "Which bone is also called the collarbone?", "options": ["Scapula", "Clavicle", "Sternum", "Rib"], "correct_index": 1, "points": 5},
    {"type": "quiz", "question": "Which type of bone is the skull's parietal bone?", "options": ["Long", "Short", "Flat", "Irregular"], "correct_index": 2, "points": 5},
    {"type": "quiz", "question": "Bone marrow is primarily responsible for producing what?", "options": ["Bile", "Blood cells", "Enzymes", "Cartilage"], "correct_index": 1, "points": 5},
    # 5 Bone guess questions - 10 pts each
    {"type": "bone", "question": "Identify this bone: The heart-shaped bone connecting the arm to the shoulder.", "options": ["Scapula", "Clavicle", "Humerus", "Sternum"], "correct_index": 0, "points": 10},
    {"type": "bone", "question": "Identify this bone: The largest bone in the human leg, running from hip to knee.", "options": ["Tibia", "Fibula", "Femur", "Patella"], "correct_index": 2, "points": 10},
    {"type": "bone", "question": "Identify this bone: Forms the lower jaw and holds the lower teeth.", "options": ["Maxilla", "Zygomatic", "Mandible", "Vomer"], "correct_index": 2, "points": 10},
    {"type": "bone", "question": "Identify this bone: The flat bone at the front center of the chest.", "options": ["Sternum", "Rib", "Clavicle", "Scapula"], "correct_index": 0, "points": 10},
    {"type": "bone", "question": "Identify this bone: The small triangular bone at the base of the spine (tailbone).", "options": ["Sacrum", "Coccyx", "Ilium", "Ischium"], "correct_index": 1, "points": 10},
]

async def seed_questions():
    count = await db.questions.count_documents({})
    if count == 0:
        docs = []
        for q in SEED_QUESTIONS:
            docs.append({
                "id": str(uuid.uuid4()),
                "type": q["type"],
                "question": q["question"],
                "options": q["options"],
                "correct_index": q["correct_index"],
                "image_url": q.get("image_url"),
                "points": q["points"],
                "created_at": now_iso(),
            })
        await db.questions.insert_many(docs)
        logging.info(f"Seeded {len(docs)} questions")

# ==================== Auth Helpers ====================

def check_admin_token(x_admin_token: Optional[str] = Header(None)):
    if x_admin_token != ADMIN_TOKEN:
        raise HTTPException(status_code=401, detail="Unauthorized")
    return True

# ==================== Public Endpoints ====================

@api_router.get("/")
async def root():
    return {"message": "Osteon API online", "bones": 206}

@api_router.post("/register")
async def register(inp: RegisterInput):
    wallet = normalize_wallet(inp.wallet_address)
    twitter = normalize_twitter(inp.twitter_username)
    if not wallet or len(wallet) < 6:
        raise HTTPException(400, "Invalid wallet address")
    if not twitter:
        raise HTTPException(400, "Invalid twitter username")

    existing = await db.users.find_one({"wallet_address": wallet}, {"_id": 0})
    if existing:
        return {"user": existing, "message": "Welcome back"}

    referral_code = secrets.token_urlsafe(6)
    user = {
        "id": str(uuid.uuid4()),
        "wallet_address": wallet,
        "twitter_username": twitter,
        "referral_code": referral_code,
        "referred_by": inp.referred_by,
        "tasks": {"follow": False, "retweet": False, "like": False},
        "best_score": 0,
        "attempts_used": 0,
        "last_attempt_at": None,
        "referral_count": 0,
        "qualified_wl": False,
        "created_at": now_iso(),
    }
    await db.users.insert_one(user)

    user.pop("_id", None)
    return {"user": user, "message": "Registered"}

@api_router.post("/login")
async def login(inp: LoginInput):
    wallet = normalize_wallet(inp.wallet_address)
    user = await db.users.find_one({"wallet_address": wallet}, {"_id": 0})
    if not user:
        raise HTTPException(404, "User not found. Please register first.")
    return {"user": user}

@api_router.get("/user/{wallet_address}")
async def get_user(wallet_address: str):
    wallet = normalize_wallet(wallet_address)
    user = await db.users.find_one({"wallet_address": wallet}, {"_id": 0})
    if not user:
        raise HTTPException(404, "User not found")
    # Compute valid/pending referral counts from referred users
    referred_users = await db.users.find(
        {"referred_by": user.get("referral_code")},
        {"_id": 0, "wallet_address": 1, "twitter_username": 1, "best_score": 1}
    ).to_list(500)
    valid_referrals = [r for r in referred_users if r.get("best_score", 0) >= REFERRAL_QUALIFY_SCORE]
    pending_referrals = [r for r in referred_users if r.get("best_score", 0) < REFERRAL_QUALIFY_SCORE]
    user["valid_referral_count"] = len(valid_referrals)
    user["pending_referral_count"] = len(pending_referrals)
    user["total_referrals"] = len(referred_users)
    allowed = 1 + user["valid_referral_count"]
    user["allowed_attempts"] = allowed
    user["attempts_remaining"] = max(0, allowed - user.get("attempts_used", 0))
    # Cooldown
    cooldown_remaining = 0
    if user.get("last_attempt_at"):
        last = datetime.fromisoformat(user["last_attempt_at"])
        elapsed = datetime.now(timezone.utc) - last
        remaining = timedelta(hours=COOLDOWN_HOURS) - elapsed
        if remaining.total_seconds() > 0:
            cooldown_remaining = int(remaining.total_seconds())
    user["cooldown_seconds"] = cooldown_remaining
    return {"user": user}

@api_router.get("/referrals/{wallet_address}")
async def get_referrals(wallet_address: str):
    wallet = normalize_wallet(wallet_address)
    user = await db.users.find_one({"wallet_address": wallet}, {"_id": 0})
    if not user:
        raise HTTPException(404, "User not found")
    referred = await db.users.find(
        {"referred_by": user.get("referral_code")},
        {"_id": 0, "wallet_address": 1, "twitter_username": 1, "best_score": 1, "created_at": 1}
    ).to_list(500)
    items = []
    for r in referred:
        status = "qualified" if r.get("best_score", 0) >= REFERRAL_QUALIFY_SCORE else "pending"
        items.append({
            "wallet_address": r["wallet_address"],
            "twitter_username": r.get("twitter_username", ""),
            "score": r.get("best_score", 0),
            "required": REFERRAL_QUALIFY_SCORE,
            "status": status,
            "created_at": r.get("created_at"),
        })
    return {"referrals": items, "qualify_score": REFERRAL_QUALIFY_SCORE}

@api_router.get("/archive")
async def get_archive_endpoint():
    return {"bones": get_archive(), "regions": get_regions(), "total": 206}

@api_router.post("/tasks/complete")
async def complete_tasks(inp: TaskInput):
    wallet = normalize_wallet(inp.wallet_address)
    user = await db.users.find_one({"wallet_address": wallet})
    if not user:
        raise HTTPException(404, "User not found")
    tasks = {
        "follow": bool(inp.tasks.get("follow", False)),
        "retweet": bool(inp.tasks.get("retweet", False)),
        "like": bool(inp.tasks.get("like", False)),
    }
    await db.users.update_one({"wallet_address": wallet}, {"$set": {"tasks": tasks}})
    return {"tasks": tasks, "message": "Tasks updated"}

@api_router.get("/questions")
async def get_questions():
    """Public: returns questions without correct_index"""
    questions = await db.questions.find({}, {"_id": 0, "correct_index": 0}).to_list(1000)
    # Sort: quiz first, then bone
    quiz = [q for q in questions if q["type"] == "quiz"]
    bone = [q for q in questions if q["type"] == "bone"]
    return {"questions": quiz + bone, "pass_score": PASS_SCORE, "total": 100}

@api_router.post("/test/submit")
async def submit_test(inp: TestSubmitInput):
    wallet = normalize_wallet(inp.wallet_address)
    user = await db.users.find_one({"wallet_address": wallet})
    if not user:
        raise HTTPException(404, "User not found")

    # Check attempts (valid referral based)
    referred_users = await db.users.find(
        {"referred_by": user.get("referral_code")},
        {"_id": 0, "best_score": 1}
    ).to_list(500)
    valid_ref_count = sum(1 for r in referred_users if r.get("best_score", 0) >= REFERRAL_QUALIFY_SCORE)
    allowed = 1 + valid_ref_count
    if user.get("attempts_used", 0) >= allowed:
        raise HTTPException(403, "No attempts remaining. Refer friends who score 30+ to unlock attempts.")

    # Check cooldown
    if user.get("last_attempt_at"):
        last = datetime.fromisoformat(user["last_attempt_at"])
        elapsed = datetime.now(timezone.utc) - last
        if elapsed < timedelta(hours=COOLDOWN_HOURS):
            remaining = int((timedelta(hours=COOLDOWN_HOURS) - elapsed).total_seconds())
            raise HTTPException(429, f"Cooldown active. Try again in {remaining} seconds.")

    questions = await db.questions.find({}, {"_id": 0}).to_list(1000)
    total_score = 0
    breakdown = []
    for q in questions:
        picked = inp.answers.get(q["id"])
        correct = picked is not None and int(picked) == q["correct_index"]
        pts = q["points"] if correct else 0
        total_score += pts
        breakdown.append({
            "question_id": q["id"],
            "correct": correct,
            "correct_index": q["correct_index"],
            "picked": picked,
            "points": pts,
        })

    qualified = total_score >= PASS_SCORE
    update = {
        "$inc": {"attempts_used": 1},
        "$set": {
            "last_attempt_at": now_iso(),
            "best_score": max(user.get("best_score", 0), total_score),
            "qualified_wl": user.get("qualified_wl", False) or qualified,
        }
    }
    await db.users.update_one({"wallet_address": wallet}, update)

    # Save attempt log
    await db.attempts.insert_one({
        "id": str(uuid.uuid4()),
        "wallet_address": wallet,
        "score": total_score,
        "qualified": qualified,
        "breakdown": breakdown,
        "created_at": now_iso(),
    })

    return {
        "score": total_score,
        "total": 100,
        "qualified": qualified,
        "pass_score": PASS_SCORE,
        "breakdown": breakdown,
    }

@api_router.get("/leaderboard")
async def leaderboard():
    # Get all users and compute valid referral count for each
    all_users = await db.users.find({}, {"_id": 0}).to_list(2000)
    by_code = {}
    for u in all_users:
        code = u.get("referred_by")
        if code:
            by_code.setdefault(code, []).append(u.get("best_score", 0))
    result = []
    for u in all_users:
        scores = by_code.get(u.get("referral_code"), [])
        valid = sum(1 for s in scores if s >= REFERRAL_QUALIFY_SCORE)
        pending = sum(1 for s in scores if s < REFERRAL_QUALIFY_SCORE)
        result.append({
            "wallet_address": u["wallet_address"],
            "twitter_username": u.get("twitter_username", ""),
            "valid_referrals": valid,
            "pending_referrals": pending,
            "best_score": u.get("best_score", 0),
            "attempts_used": u.get("attempts_used", 0),
            "qualified_wl": u.get("qualified_wl", False),
        })
    result.sort(key=lambda x: (-x["valid_referrals"], -x["best_score"]))
    return {"leaderboard": result[:100]}

# ==================== Admin Endpoints ====================

@api_router.post("/admin/login")
async def admin_login(inp: AdminLoginInput):
    if inp.username == ADMIN_USERNAME and inp.password == ADMIN_PASSWORD:
        return {"token": ADMIN_TOKEN}
    raise HTTPException(401, "Invalid credentials")

@api_router.get("/admin/users")
async def admin_users(_: bool = Depends(check_admin_token)):
    users = await db.users.find({}, {"_id": 0}).sort("created_at", -1).to_list(2000)
    return {"users": users}

@api_router.get("/admin/questions")
async def admin_questions(_: bool = Depends(check_admin_token)):
    questions = await db.questions.find({}, {"_id": 0}).to_list(1000)
    return {"questions": questions}

@api_router.post("/admin/questions")
async def admin_add_question(q: QuestionInput, _: bool = Depends(check_admin_token)):
    doc = {
        "id": str(uuid.uuid4()),
        "type": q.type,
        "question": q.question,
        "options": q.options,
        "correct_index": q.correct_index,
        "image_url": q.image_url,
        "points": q.points,
        "created_at": now_iso(),
    }
    await db.questions.insert_one(doc)
    doc.pop("_id", None)
    return {"question": doc}

@api_router.delete("/admin/questions/{qid}")
async def admin_delete_question(qid: str, _: bool = Depends(check_admin_token)):
    r = await db.questions.delete_one({"id": qid})
    return {"deleted": r.deleted_count}

@api_router.put("/admin/questions/{qid}")
async def admin_update_question(qid: str, q: QuestionInput, _: bool = Depends(check_admin_token)):
    await db.questions.update_one(
        {"id": qid},
        {"$set": {
            "type": q.type,
            "question": q.question,
            "options": q.options,
            "correct_index": q.correct_index,
            "image_url": q.image_url,
            "points": q.points,
        }}
    )
    return {"updated": True}

# ==================== Startup ====================

@app.on_event("startup")
async def startup():
    await seed_questions()

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
