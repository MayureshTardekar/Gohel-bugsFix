import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import { getQuestions, submitTest, getUser } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Timer, Trophy, XCircle, CheckCircle2, ChevronRight, ChevronLeft, Bone } from "lucide-react";

const formatCooldown = (s) => {
  if (s <= 0) return "";
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  return `${h}h ${m}m`;
};

export default function QualificationTest({ onOpenAuth }) {
  const { user, refresh } = useUser();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [current, setCurrent] = useState(0);
  const [status, setStatus] = useState("idle"); // idle | active | result
  const [result, setResult] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { questions } = await getQuestions();
        setQuestions(questions);
      } catch {}
    })();
  }, []);

  useEffect(() => {
    if (user) {
      getUser(user.wallet_address).then((d) => setUserInfo(d.user)).catch(() => {});
    } else {
      setUserInfo(null);
    }
  }, [user, status]);

  const start = () => {
    if (!user) {
      onOpenAuth();
      return;
    }
    if (userInfo?.cooldown_seconds > 0) {
      toast.error(`Cooldown active. Wait ${formatCooldown(userInfo.cooldown_seconds)}.`);
      return;
    }
    if (userInfo?.attempts_remaining <= 0 && userInfo?.cooldown_seconds > 0) {
      toast.error("No attempts remaining. Refer friends to unlock more.");
      return;
    }
    setAnswers({});
    setCurrent(0);
    setStatus("active");
  };

  const pick = (qid, idx) => setAnswers((a) => ({ ...a, [qid]: idx }));

  const submit = async () => {
    if (Object.keys(answers).length < questions.length) {
      toast.error(`Answer all ${questions.length} questions.`);
      return;
    }
    try {
      const r = await submitTest(user.wallet_address, answers);
      setResult(r);
      setStatus("result");
      await refresh();
      const d = await getUser(user.wallet_address);
      setUserInfo(d.user);
      if (r.qualified) toast.success(`🏆 Qualified! ${r.score}/100`);
      else toast.error(`Score: ${r.score}/100. Try again after cooldown.`);
    } catch (e) {
      toast.error(e.response?.data?.detail || "Submission failed");
    }
  };

  const q = questions[current];
  const answeredCount = Object.keys(answers).length;

  return (
    <section id="test" className="relative py-24 border-t border-[#1b2234]">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="mb-12 max-w-2xl">
          <div className="font-mono-cyber text-[11px] uppercase tracking-[0.35em] text-[#00f0ff] mb-4">// 03 — Qualification Test</div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight">
            Prove your <span className="text-[#00ff66]">bone IQ</span>.
          </h2>
          <p className="mt-5 text-slate-400 text-base leading-relaxed">
            10 anatomy questions (5pts) + 5 guess-the-bone questions (10pts). Score 70+ to secure your whitelist slot.
          </p>
        </div>

        {status === "idle" && (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 cyber-corners bg-[#0d1017]/70 border border-[#1b2234] p-8 clip-terminal">
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <div className="font-mono-cyber text-[10px] uppercase tracking-[0.3em] text-[#00f0ff]">Attempts Used</div>
                  <div className="mt-2 font-heading text-4xl font-bold">
                    {userInfo?.attempts_used ?? 0}/<span className="text-slate-500">{userInfo?.allowed_attempts ?? 3}</span>
                  </div>
                </div>
                <div>
                  <div className="font-mono-cyber text-[10px] uppercase tracking-[0.3em] text-[#00ff66]">Best Score</div>
                  <div className="mt-2 font-heading text-4xl font-bold">{userInfo?.best_score ?? 0}<span className="text-slate-500 text-xl">/100</span></div>
                </div>
                <div>
                  <div className="font-mono-cyber text-[10px] uppercase tracking-[0.3em] text-[#ff2a5f]">Status</div>
                  <div className="mt-2 font-heading text-xl font-bold uppercase">
                    {userInfo?.qualified_wl ? <span className="text-[#00ff66]">WL Locked</span> : <span className="text-slate-400">Unqualified</span>}
                  </div>
                </div>
              </div>
              {userInfo?.cooldown_seconds > 0 && (
                <div className="mt-6 flex items-center gap-3 px-4 py-3 border border-[#ff2a5f]/40 bg-[#ff2a5f]/5 clip-notch">
                  <Timer className="w-4 h-4 text-[#ff2a5f]" />
                  <span className="font-mono-cyber text-xs uppercase tracking-widest text-[#ff2a5f]">
                    Cooldown: {formatCooldown(userInfo.cooldown_seconds)}
                  </span>
                </div>
              )}
              <Button
                onClick={start}
                data-testid="test-start-btn"
                className="mt-8 rounded-none clip-notch bg-[#00ff66] hover:bg-[#00ff66]/90 text-black font-mono-cyber uppercase tracking-widest text-xs h-14 px-8"
              >
                {user ? "Begin Qualification" : "Link Wallet to Start"}
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
            <div className="cyber-corners bg-[#0d1017]/70 border border-[#1b2234] p-8 clip-terminal">
              <Bone className="w-8 h-8 text-[#00f0ff]" strokeWidth={1.4} />
              <h3 className="mt-4 font-heading text-xl font-bold uppercase">Rules</h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-400 font-mono-cyber">
                <li>» 15 questions total</li>
                <li>» 100 points max</li>
                <li>» 70+ = WL slot</li>
                <li>» 3 initial attempts</li>
                <li>» 1 daily attempt after that</li>
                <li>» +1 attempt per referral</li>
              </ul>
            </div>
          </div>
        )}

        {status === "active" && q && (
          <div className="cyber-corners bg-[#0d1017]/80 border border-[#00f0ff]/30 p-6 sm:p-10 clip-terminal glow-cyan">
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="font-mono-cyber text-[10px] uppercase tracking-[0.3em] text-[#00f0ff]">
                  Question {current + 1} of {questions.length}
                </div>
                <div className="mt-1 font-mono-cyber text-xs text-slate-500 uppercase tracking-widest">
                  {q.type === "quiz" ? "Quiz · 5 pts" : "Bone Identification · 10 pts"}
                </div>
              </div>
              <div className="font-mono-cyber text-xs text-slate-400 uppercase tracking-widest">
                {answeredCount}/{questions.length} answered
              </div>
            </div>
            <div className="h-1 bg-[#1b2234] mb-8">
              <div className="progress-fill h-full" style={{ width: `${((current + 1) / questions.length) * 100}%` }} />
            </div>

            {q.image_url && (
              <div className="mb-6 aspect-video max-w-xl mx-auto border border-[#1b2234] overflow-hidden clip-terminal bg-[#07080c]">
                <img src={q.image_url} alt="bone" className="w-full h-full object-cover opacity-80 mix-blend-luminosity" />
              </div>
            )}
            <h3 className="font-heading text-xl sm:text-2xl font-bold uppercase tracking-tight leading-snug">
              {q.question}
            </h3>
            <RadioGroup
              value={answers[q.id]?.toString() ?? ""}
              onValueChange={(v) => pick(q.id, parseInt(v))}
              className="mt-8 grid gap-3"
            >
              {q.options.map((opt, i) => (
                <Label
                  key={i}
                  data-testid={`quiz-option-${i}`}
                  htmlFor={`${q.id}-${i}`}
                  className={`cursor-pointer p-4 border ${
                    answers[q.id] === i ? "border-[#00f0ff] bg-[#00f0ff]/10" : "border-[#1b2234] hover:border-[#00f0ff]/40 bg-[#07080c]"
                  } flex items-center gap-4 clip-notch`}
                >
                  <RadioGroupItem value={i.toString()} id={`${q.id}-${i}`} className="border-[#00f0ff]/60 text-[#00f0ff]" />
                  <span className="font-mono-cyber text-sm sm:text-base text-slate-100">{opt}</span>
                </Label>
              ))}
            </RadioGroup>

            <div className="mt-10 flex items-center justify-between gap-4">
              <Button
                onClick={() => setCurrent((c) => Math.max(0, c - 1))}
                disabled={current === 0}
                data-testid="quiz-prev-btn"
                variant="outline"
                className="rounded-none clip-notch bg-transparent border-[#1b2234] hover:bg-[#1b2234] text-slate-200 font-mono-cyber uppercase tracking-widest text-xs h-12 px-6"
              >
                <ChevronLeft className="w-4 h-4 mr-2" /> Prev
              </Button>
              {current < questions.length - 1 ? (
                <Button
                  onClick={() => setCurrent((c) => Math.min(questions.length - 1, c + 1))}
                  data-testid="quiz-next-btn"
                  className="rounded-none clip-notch bg-[#00f0ff] hover:bg-[#00f0ff]/90 text-black font-mono-cyber uppercase tracking-widest text-xs h-12 px-8"
                >
                  Next <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={submit}
                  data-testid="quiz-submit-btn"
                  className="rounded-none clip-notch bg-[#00ff66] hover:bg-[#00ff66]/90 text-black font-mono-cyber uppercase tracking-widest text-xs h-12 px-8"
                >
                  Submit <CheckCircle2 className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </div>
        )}

        {status === "result" && result && (
          <div
            data-testid="result-panel"
            className={`cyber-corners bg-[#0d1017]/80 border ${
              result.qualified ? "border-[#00ff66]/50 glow-emerald" : "border-[#ff2a5f]/40 glow-pink"
            } p-8 sm:p-12 clip-terminal text-center`}
          >
            {result.qualified ? (
              <Trophy className="w-16 h-16 mx-auto text-[#00ff66]" strokeWidth={1.4} />
            ) : (
              <XCircle className="w-16 h-16 mx-auto text-[#ff2a5f]" strokeWidth={1.4} />
            )}
            <div className="mt-6 font-mono-cyber text-[11px] uppercase tracking-[0.35em] text-slate-400">Result</div>
            <h3 className="mt-2 font-heading text-4xl sm:text-5xl font-black uppercase">
              {result.qualified ? (
                <span className="text-[#00ff66] text-glow-emerald">WL Secured</span>
              ) : (
                <span className="text-[#ff2a5f]">Not Qualified</span>
              )}
            </h3>
            <div className="mt-6 font-heading text-6xl font-black">
              {result.score}<span className="text-slate-500 text-3xl">/100</span>
            </div>
            <p className="mt-6 text-slate-400 max-w-lg mx-auto">
              {result.qualified
                ? "You've earned a whitelist slot. Stay locked to @OsteonNFT for mint details."
                : `You need ${result.pass_score}+ to qualify. Refer friends to earn extra attempts.`}
            </p>
            <div className="mt-8 flex gap-3 justify-center">
              <Button
                onClick={() => setStatus("idle")}
                data-testid="result-close-btn"
                className="rounded-none clip-notch bg-[#00f0ff] hover:bg-[#00f0ff]/90 text-black font-mono-cyber uppercase tracking-widest text-xs h-12 px-8"
              >
                Back
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
