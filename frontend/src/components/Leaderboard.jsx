import { useEffect, useState } from "react";
import { getLeaderboard } from "@/lib/api";
import { Trophy, ShieldCheck } from "lucide-react";

export default function Leaderboard() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    getLeaderboard().then((d) => setRows(d.leaderboard || [])).catch(() => {});
  }, []);

  const truncate = (s) => (s ? `${s.slice(0, 6)}…${s.slice(-4)}` : "");

  return (
    <section id="leaderboard" className="relative py-24 border-t border-[#1b2234]">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="font-mono-cyber text-[11px] uppercase tracking-[0.35em] text-[#00f0ff] mb-4">// 05 — Leaderboard</div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold uppercase tracking-tight">
              Top <span className="text-[#00ff66]">skeletons</span>.
            </h2>
          </div>
          <div className="font-mono-cyber text-[11px] uppercase tracking-widest text-slate-400">
            {rows.length} participants
          </div>
        </div>

        <div className="cyber-corners overflow-hidden border border-[#1b2234] bg-[#0d1017]/70 clip-terminal" data-testid="leaderboard-table">
          <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-[#1b2234] font-mono-cyber text-[10px] uppercase tracking-[0.3em] text-[#00f0ff]">
            <div className="col-span-1">#</div>
            <div className="col-span-4">Wallet</div>
            <div className="col-span-3">Twitter</div>
            <div className="col-span-2 text-right">Refs</div>
            <div className="col-span-2 text-right">Score</div>
          </div>
          {rows.length === 0 && (
            <div className="p-10 text-center text-slate-500 font-mono-cyber text-sm uppercase tracking-widest">
              No entries yet — be the first bone.
            </div>
          )}
          {rows.map((r, i) => (
            <div
              key={r.wallet_address}
              className={`grid grid-cols-12 gap-4 px-6 py-4 items-center border-b border-[#1b2234]/60 ${
                i < 3 ? "bg-gradient-to-r from-[#00f0ff]/5 to-transparent" : ""
              }`}
              data-testid={`leaderboard-row-${i}`}
            >
              <div className="col-span-1 flex items-center">
                {i === 0 && <Trophy className="w-4 h-4 text-[#ffb703]" />}
                {i === 1 && <Trophy className="w-4 h-4 text-slate-300" />}
                {i === 2 && <Trophy className="w-4 h-4 text-amber-600" />}
                {i > 2 && <span className="font-mono-cyber text-sm text-slate-400">#{i + 1}</span>}
              </div>
              <div className="col-span-4 font-mono-cyber text-xs sm:text-sm text-slate-200 flex items-center gap-2">
                {truncate(r.wallet_address)}
                {r.qualified_wl && <ShieldCheck className="w-3.5 h-3.5 text-[#00ff66]" />}
              </div>
              <div className="col-span-3 font-mono-cyber text-xs text-slate-400 truncate">@{r.twitter_username}</div>
              <div className="col-span-2 text-right font-heading text-lg font-bold text-[#00f0ff]">
                {r.referral_count}
              </div>
              <div className="col-span-2 text-right font-heading text-lg font-bold text-[#00ff66]">
                {r.best_score}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
