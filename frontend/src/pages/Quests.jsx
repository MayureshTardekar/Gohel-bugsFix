import { useEffect, useState } from "react";
import { useOutletContext, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "@/context/UserContext";
import { getUser, getReferrals } from "@/lib/api";
import Tasks from "@/components/Tasks";
import QualificationTest from "@/components/QualificationTest";
import Referral from "@/components/Referral";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/Motion";
import { Button } from "@/components/ui/button";
import { Trophy, Target, Users, Zap, Lock, Wallet, ArrowRight, Shield } from "lucide-react";
import { useMemo } from "react";

const POSES = [
  { src: "/skeletons/skeleton_standing.png", label: "SPEC-001 · NEUTRAL" },
  { src: "/skeletons/skeleton_contrapposto.png", label: "SPEC-042 · CONTRAPPOSTO" },
  { src: "/skeletons/skeleton_thinker.png", label: "SPEC-108 · CONTEMPLATIO" },
  { src: "/skeletons/skeleton_reaching.png", label: "SPEC-176 · ASCENSIO" },
];

function ConnectSkeleton() {
  const pose = useMemo(() => POSES[Math.floor(Math.random() * POSES.length)], []);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.4, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="relative max-w-sm mx-auto"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute -inset-6 rounded-full border border-dashed border-[#00f0ff]/15"
      />
      <div className="relative aspect-[2/3] overflow-visible">
        <motion.img
          key={pose.src}
          src={pose.src}
          alt="OSTEON specimen"
          className="relative w-full h-full object-contain z-10"
          style={{ filter: "drop-shadow(0 20px 50px rgba(0,240,255,0.3))" }}
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          initial={{ y: "-10%" }}
          animate={{ y: "110%" }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 right-0 h-20 pointer-events-none z-20"
          style={{
            background: "linear-gradient(to bottom, transparent, rgba(0,240,255,0.3) 50%, transparent)",
            mixBlendMode: "screen",
          }}
        />
      </div>
      <div className="mt-6 flex justify-between items-center">
        <div className="coord-label text-[#00f0ff]">{pose.label}</div>
        <div className="coord-label">206 / 206</div>
      </div>
    </motion.div>
  );
}

export default function Quests() {
  const { user } = useUser();
  const { openAuth } = useOutletContext();
  const [info, setInfo] = useState(null);
  const [refs, setRefs] = useState({ referrals: [], qualify_score: 30 });

  useEffect(() => {
    if (user) {
      getUser(user.wallet_address).then((d) => setInfo(d.user)).catch(() => {});
      getReferrals(user.wallet_address).then(setRefs).catch(() => {});
    } else {
      setInfo(null);
      setRefs({ referrals: [], qualify_score: 30 });
    }
  }, [user]);

  const truncate = (s) => (s ? `${s.slice(0, 6)}…${s.slice(-4)}` : "");

  if (!user) {
    return <ConnectGate onConnect={openAuth} />;
  }

  return (
    <div>
      {/* PROFILE HEADER */}
      <section className="relative border-b border-[#1b2234] overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute -right-24 -top-16 w-[400px] h-[400px] rounded-full bg-[#00f0ff]/10 blur-[100px] pointer-events-none"
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-8 py-16">
          <Reveal>
            <div className="font-mono-cyber text-[11px] uppercase tracking-[0.35em] text-[#00f0ff] mb-4">
              // Quest Center · Access Granted
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight leading-[1.05]">
              Welcome, <br />
              <span className="text-[#00ff66]">@{user.twitter_username}</span>.
            </h1>
            <p className="mt-6 text-slate-400 text-base sm:text-lg max-w-2xl leading-relaxed">
              Complete tasks. Test your anatomy. Recruit qualified allies. Climb the network leaderboard.
            </p>
          </Reveal>

          <StaggerGroup className="mt-10 grid md:grid-cols-4 gap-4">
            <StaggerItem>
              <div className="cyber-corners p-6 bg-[#0d1017]/70 border border-[#1b2234] clip-terminal h-full">
                <Wallet className="w-5 h-5 text-[#00f0ff]" />
                <div className="mt-3 font-heading text-xl font-bold">{truncate(user.wallet_address)}</div>
                <div className="font-mono-cyber text-[10px] uppercase tracking-widest text-slate-500 mt-1">@{user.twitter_username}</div>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="cyber-corners p-6 bg-[#0d1017]/70 border border-[#1b2234] clip-terminal h-full">
                <Target className="w-5 h-5 text-[#00f0ff]" />
                <div className="mt-3 font-heading text-4xl font-black">
                  {info?.best_score ?? 0}
                  <span className="text-slate-500 text-lg">/100</span>
                </div>
                <div className="font-mono-cyber text-[10px] uppercase tracking-[0.3em] text-slate-400 mt-1">Best Score</div>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="cyber-corners p-6 bg-[#0d1017]/70 border border-[#1b2234] clip-terminal h-full">
                <Users className="w-5 h-5 text-[#00ff66]" />
                <div className="mt-3 font-heading text-4xl font-black text-[#00ff66]">{info?.valid_referral_count ?? 0}</div>
                <div className="font-mono-cyber text-[10px] uppercase tracking-[0.3em] text-slate-400 mt-1">Valid Referrals</div>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="cyber-corners p-6 bg-[#0d1017]/70 border border-[#1b2234] clip-terminal h-full">
                <Zap className="w-5 h-5 text-[#ffb703]" />
                <div className="mt-3 font-heading text-4xl font-black text-[#ffb703]">
                  {info?.attempts_remaining ?? 0}
                  <span className="text-slate-500 text-lg">/{info?.allowed_attempts ?? 3}</span>
                </div>
                <div className="font-mono-cyber text-[10px] uppercase tracking-[0.3em] text-slate-400 mt-1">Attempts Left</div>
              </div>
            </StaggerItem>
          </StaggerGroup>

          {info?.qualified_wl && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-6 inline-flex items-center gap-3 px-5 py-3 border border-[#00ff66]/50 bg-[#00ff66]/10 clip-notch glow-emerald"
            >
              <Shield className="w-4 h-4 text-[#00ff66]" />
              <span className="font-mono-cyber text-xs uppercase tracking-widest text-[#00ff66]">
                Whitelist secured · Access to archive granted
              </span>
            </motion.div>
          )}
        </div>
      </section>

      {/* REFERRAL */}
      <Referral onOpenAuth={openAuth} />

      {/* REFERRAL LIST */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-14 border-t border-[#1b2234]">
        <Reveal>
          <div className="flex items-end justify-between mb-6 flex-wrap gap-3">
            <div>
              <div className="font-mono-cyber text-[11px] uppercase tracking-[0.35em] text-[#00f0ff]">// Your Recruits</div>
              <h3 className="mt-2 font-heading text-2xl sm:text-3xl font-bold uppercase">Recruits into the archive</h3>
            </div>
            <div className="font-mono-cyber text-[10px] uppercase tracking-widest text-slate-400">
              Qualify at {refs.qualify_score}+ points
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="cyber-corners overflow-hidden border border-[#1b2234] bg-[#0d1017]/70 clip-terminal">
            {refs.referrals.length === 0 && (
              <div className="p-10 text-center text-slate-500 font-mono-cyber text-sm uppercase tracking-widest">
                No recruits yet — share your link.
              </div>
            )}
            {refs.referrals.map((r, i) => (
              <div
                key={r.wallet_address}
                data-testid={`referral-row-${i}`}
                className="grid grid-cols-12 gap-4 px-6 py-4 items-center border-b border-[#1b2234]/60 last:border-0"
              >
                <div className="col-span-5 font-mono-cyber text-xs sm:text-sm text-slate-200">
                  {truncate(r.wallet_address)}
                  <div className="text-slate-500 text-[11px]">@{r.twitter_username}</div>
                </div>
                <div className="col-span-4">
                  <div className="h-1.5 bg-[#1b2234] overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(100, (r.score / r.required) * 100)}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className={`h-full ${r.status === "qualified" ? "bg-[#00ff66]" : "bg-[#00f0ff]/70"}`}
                    />
                  </div>
                  <div className="mt-1 font-mono-cyber text-[10px] uppercase tracking-widest text-slate-500">
                    {r.score} / {r.required} pts
                  </div>
                </div>
                <div className="col-span-3 text-right">
                  {r.status === "qualified" ? (
                    <span className="inline-block px-3 py-1 border border-[#00ff66]/50 bg-[#00ff66]/10 font-mono-cyber text-[10px] uppercase tracking-widest text-[#00ff66]">
                      Qualified
                    </span>
                  ) : (
                    <span className="inline-block px-3 py-1 border border-[#1b2234] font-mono-cyber text-[10px] uppercase tracking-widest text-slate-400">
                      Pending
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* SOCIAL TASKS */}
      <Tasks onOpenAuth={openAuth} />

      {/* QUALIFICATION TEST */}
      <QualificationTest onOpenAuth={openAuth} />

      {/* CTA to leaderboard */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16 border-t border-[#1b2234]">
        <Reveal>
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div>
              <div className="font-mono-cyber text-[11px] uppercase tracking-[0.35em] text-[#00f0ff]">Compete</div>
              <h3 className="mt-2 font-heading text-2xl sm:text-3xl font-bold uppercase">
                See your rank on the network leaderboard.
              </h3>
            </div>
            <Link
              to="/leaderboard"
              className="rounded-none clip-notch bg-[#00f0ff] hover:bg-[#00f0ff]/90 text-black font-mono-cyber uppercase tracking-widest text-xs h-12 px-8 inline-flex items-center"
            >
              Open Leaderboard <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}

/* ------------ CONNECT GATE ------------ */
function ConnectGate({ onConnect }) {
  return (
    <section className="relative min-h-[85vh] overflow-hidden flex items-center">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute -left-40 top-20 w-[500px] h-[500px] rounded-full bg-[#00f0ff]/10 blur-[120px]"
        />
        <motion.div
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 7, repeat: Infinity, delay: 1.5 }}
          className="absolute -right-40 bottom-0 w-[420px] h-[420px] rounded-full bg-[#00ff66]/10 blur-[100px]"
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-8 py-16 w-full grid lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="inline-flex items-center gap-3 px-4 py-2 mb-8 border border-[#00f0ff]/40 bg-[#00f0ff]/5 clip-notch"
          >
            <Lock className="w-3 h-3 text-[#00f0ff]" />
            <span className="font-mono-cyber text-[11px] uppercase tracking-[0.3em] text-[#00f0ff]">
              Access Locked · Identity Required
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15 }}
            className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight leading-[1.02]"
          >
            Bind your <br />
            <span className="text-glow-cyan text-[#00f0ff]">skeletal signature</span>.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.45 }}
            className="mt-8 text-base sm:text-lg text-slate-400 max-w-xl leading-relaxed"
          >
            The Quest Center is sealed. Link your wallet and X handle to unlock the anatomy trials, referral network,
            and the 206-bone archive.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Button
              onClick={onConnect}
              data-testid="quests-connect-btn"
              className="group rounded-none clip-notch bg-[#00f0ff] hover:bg-[#00f0ff]/90 text-black font-mono-cyber uppercase tracking-widest text-xs h-14 px-8"
            >
              <Wallet className="w-4 h-4 mr-2" />
              Connect Wallet & X
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>

          <StaggerGroup className="mt-14 grid grid-cols-3 gap-4 max-w-xl" delay={0.8}>
            {[
              { n: "01", t: "Connect", d: "Wallet + X handle" },
              { n: "02", t: "Trial", d: "10 quiz + 5 bone-guess" },
              { n: "03", t: "Rank", d: "Refer & climb" },
            ].map((s) => (
              <StaggerItem key={s.n}>
                <div className="cyber-corners p-4 bg-[#0d1017]/70 border border-[#1b2234] clip-terminal">
                  <div className="font-mono-cyber text-[10px] uppercase tracking-[0.3em] text-[#00f0ff]">{s.n}</div>
                  <div className="mt-2 font-heading text-lg font-bold uppercase">{s.t}</div>
                  <div className="font-mono-cyber text-[10px] uppercase tracking-widest text-slate-500 mt-1">{s.d}</div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>

        <div className="lg:col-span-5 relative">
          <ConnectSkeleton />
        </div>
      </div>
    </section>
  );
}
