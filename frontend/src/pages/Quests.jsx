import { useEffect, useState } from "react";
import { useOutletContext, Link } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import { getUser, getReferrals } from "@/lib/api";
import Tasks from "@/components/Tasks";
import QualificationTest from "@/components/QualificationTest";
import Referral from "@/components/Referral";
import { Button } from "@/components/ui/button";
import { Trophy, Target, Users, Zap, Lock } from "lucide-react";

export default function Quests() {
  const { user } = useUser();
  const { openAuth } = useOutletContext();
  const [info, setInfo] = useState(null);

  useEffect(() => {
    if (user) {
      getUser(user.wallet_address).then((d) => setInfo(d.user)).catch(() => {});
    } else {
      setInfo(null);
    }
  }, [user]);

  const truncate = (s) => (s ? `${s.slice(0, 6)}…${s.slice(-4)}` : "");

  return (
    <div>
      <section className="border-b border-[#1b2234]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-14">
          <div className="font-mono-cyber text-[11px] uppercase tracking-[0.35em] text-[#00f0ff] mb-4">// Quest Center</div>
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight leading-[1.05]">
            Welcome to the <br /><span className="text-[#00ff66]">Osteon Quest Center</span>.
          </h1>
          <p className="mt-6 text-slate-400 text-base sm:text-lg max-w-2xl leading-relaxed">
            Complete tasks. Test your anatomy knowledge. Earn attempts. Climb the network leaderboard.
          </p>
        </div>
      </section>

      {!user && (
        <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
          <div className="cyber-corners bg-[#0d1017]/80 border border-[#00f0ff]/30 p-10 clip-terminal glow-cyan text-center">
            <Lock className="w-10 h-10 text-[#00f0ff] mx-auto" strokeWidth={1.4} />
            <h2 className="mt-6 font-heading text-2xl sm:text-3xl font-bold uppercase">Connect to enter</h2>
            <p className="mt-3 text-slate-400 text-base max-w-lg mx-auto">
              Link your wallet + Twitter to unlock the Quest Center, submit answers, and earn your place on the network
              leaderboard.
            </p>
            <Button
              onClick={openAuth}
              data-testid="quests-connect-btn"
              className="mt-8 rounded-none clip-notch bg-[#00f0ff] hover:bg-[#00f0ff]/90 text-black font-mono-cyber uppercase tracking-widest text-xs h-12 px-8"
            >
              Connect Wallet
            </Button>
          </div>
        </section>
      )}

      {user && (
        <>
          {/* PROFILE DASHBOARD */}
          <section className="max-w-7xl mx-auto px-4 sm:px-8 py-12 border-b border-[#1b2234]">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="cyber-corners p-6 bg-[#0d1017]/70 border border-[#1b2234] clip-terminal">
                <div className="font-mono-cyber text-[10px] uppercase tracking-[0.3em] text-[#00f0ff]">Your Wallet</div>
                <div className="mt-2 font-heading text-xl font-bold">{truncate(user.wallet_address)}</div>
                <div className="font-mono-cyber text-[10px] uppercase tracking-widest text-slate-500 mt-1">@{user.twitter_username}</div>
              </div>
              <div className="cyber-corners p-6 bg-[#0d1017]/70 border border-[#1b2234] clip-terminal">
                <Target className="w-5 h-5 text-[#00f0ff]" />
                <div className="mt-3 font-heading text-4xl font-black">{info?.best_score ?? 0}<span className="text-slate-500 text-lg">/100</span></div>
                <div className="font-mono-cyber text-[10px] uppercase tracking-[0.3em] text-slate-400 mt-1">Best Score</div>
              </div>
              <div className="cyber-corners p-6 bg-[#0d1017]/70 border border-[#1b2234] clip-terminal">
                <Users className="w-5 h-5 text-[#00ff66]" />
                <div className="mt-3 font-heading text-4xl font-black">{info?.valid_referral_count ?? 0}</div>
                <div className="font-mono-cyber text-[10px] uppercase tracking-[0.3em] text-slate-400 mt-1">Valid Referrals</div>
              </div>
              <div className="cyber-corners p-6 bg-[#0d1017]/70 border border-[#1b2234] clip-terminal">
                <Zap className="w-5 h-5 text-[#ffb703]" />
                <div className="mt-3 font-heading text-4xl font-black">{info?.attempts_remaining ?? 0}<span className="text-slate-500 text-lg">/{info?.allowed_attempts ?? 1}</span></div>
                <div className="font-mono-cyber text-[10px] uppercase tracking-[0.3em] text-slate-400 mt-1">Attempts Left</div>
              </div>
            </div>
            {info?.qualified_wl && (
              <div className="mt-6 inline-flex items-center gap-3 px-5 py-3 border border-[#00ff66]/50 bg-[#00ff66]/10 clip-notch">
                <Trophy className="w-4 h-4 text-[#00ff66]" />
                <span className="font-mono-cyber text-xs uppercase tracking-widest text-[#00ff66]">
                  Whitelist secured
                </span>
              </div>
            )}
          </section>

          {/* REFERRAL */}
          <Referral onOpenAuth={openAuth} />
          <ReferralList wallet={user.wallet_address} />

          {/* SOCIAL TASKS */}
          <Tasks onOpenAuth={openAuth} />

          {/* QUALIFICATION TEST */}
          <QualificationTest onOpenAuth={openAuth} />

          {/* CTA to leaderboard */}
          <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16 border-t border-[#1b2234]">
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div>
                <div className="font-mono-cyber text-[11px] uppercase tracking-[0.35em] text-[#00f0ff]">Compete</div>
                <h3 className="mt-2 font-heading text-2xl sm:text-3xl font-bold uppercase">See your rank on the network leaderboard.</h3>
              </div>
              <Link
                to="/leaderboard"
                className="rounded-none clip-notch bg-[#00f0ff] hover:bg-[#00f0ff]/90 text-black font-mono-cyber uppercase tracking-widest text-xs h-12 px-8 inline-flex items-center"
              >
                Open Leaderboard
              </Link>
            </div>
          </section>
        </>
      )}
    </div>
  );
}

function ReferralList({ wallet }) {
  const [data, setData] = useState({ referrals: [], qualify_score: 30 });
  useEffect(() => {
    getReferrals(wallet).then(setData).catch(() => {});
  }, [wallet]);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-8 py-14 border-t border-[#1b2234]">
      <div className="flex items-end justify-between mb-6 flex-wrap gap-3">
        <div>
          <div className="font-mono-cyber text-[11px] uppercase tracking-[0.35em] text-[#00f0ff]">// Your Referrals</div>
          <h3 className="mt-2 font-heading text-2xl sm:text-3xl font-bold uppercase">Recruits into the archive</h3>
        </div>
        <div className="font-mono-cyber text-[10px] uppercase tracking-widest text-slate-400">
          Qualify at {data.qualify_score}+ points
        </div>
      </div>
      <div className="cyber-corners overflow-hidden border border-[#1b2234] bg-[#0d1017]/70 clip-terminal">
        {data.referrals.length === 0 && (
          <div className="p-10 text-center text-slate-500 font-mono-cyber text-sm uppercase tracking-widest">
            No recruits yet — share your link.
          </div>
        )}
        {data.referrals.map((r, i) => (
          <div
            key={r.wallet_address}
            data-testid={`referral-row-${i}`}
            className="grid grid-cols-12 gap-4 px-6 py-4 items-center border-b border-[#1b2234]/60 last:border-0"
          >
            <div className="col-span-5 font-mono-cyber text-xs sm:text-sm text-slate-200">
              {r.wallet_address.slice(0, 6)}…{r.wallet_address.slice(-4)}
              <div className="text-slate-500 text-[11px]">@{r.twitter_username}</div>
            </div>
            <div className="col-span-4">
              <div className="h-1.5 bg-[#1b2234]">
                <div
                  className={`h-full ${r.status === "qualified" ? "bg-[#00ff66]" : "bg-[#00f0ff]/70"}`}
                  style={{ width: `${Math.min(100, (r.score / r.required) * 100)}%` }}
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
    </section>
  );
}
