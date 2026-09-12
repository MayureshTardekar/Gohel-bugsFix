import { useEffect, useState } from "react";
import { getLeaderboard } from "@/lib/api";
import { useUser } from "@/context/UserContext";
import { Trophy, ShieldCheck } from "lucide-react";

export default function LeaderboardPage() {
  const { user } = useUser();
  const [rows, setRows] = useState([]);

  useEffect(() => {
    getLeaderboard().then((d) => setRows(d.leaderboard || [])).catch(() => {});
  }, []);

  const truncate = (s) => (s ? `${s.slice(0, 6)}…${s.slice(-4)}` : "");
  const myIndex = rows.findIndex((r) => user && r.wallet_address === user.wallet_address);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-16 lg:py-24">
      <div className="max-w-3xl">
        <div className="font-mono-cyber text-[11px] uppercase tracking-[0.35em] text-[#00f0ff] mb-4">// Leaderboard</div>
        <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight leading-[1.05]">
          The <span className="text-[#00ff66]">Network</span> Leaderboard.
        </h1>
        <p className="mt-6 text-slate-400 text-base sm:text-lg leading-relaxed">
          The strongest networks build the strongest collections. Ranked by <span className="text-slate-200">valid referrals</span>{" "}
          (recruits scoring 30+). Ties broken by best anatomy score.
        </p>
      </div>

      <div className="mt-10 cyber-corners overflow-hidden border border-[#1b2234] bg-[#0d1017]/70 clip-terminal" data-testid="leaderboard-table">
        <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-[#1b2234] font-mono-cyber text-[10px] uppercase tracking-[0.3em] text-[#00f0ff]">
          <div className="col-span-1">#</div>
          <div className="col-span-3">Wallet</div>
          <div className="col-span-2">Twitter</div>
          <div className="col-span-2 text-right">Valid Refs</div>
          <div className="col-span-2 text-right">Attempts</div>
          <div className="col-span-2 text-right">Best Score</div>
        </div>
        {rows.length === 0 && (
          <div className="p-12 text-center text-slate-500 font-mono-cyber text-sm uppercase tracking-widest">
            No entries yet — be the first specimen.
          </div>
        )}
        {rows.map((r, i) => {
          const isMe = user && r.wallet_address === user.wallet_address;
          return (
            <div
              key={r.wallet_address}
              data-testid={`leaderboard-row-${i}`}
              className={`grid grid-cols-12 gap-4 px-6 py-4 items-center border-b border-[#1b2234]/60 last:border-0 ${
                i < 3 ? "bg-gradient-to-r from-[#00f0ff]/5 to-transparent" : ""
              } ${isMe ? "bg-[#00ff66]/5 border-l-2 border-l-[#00ff66]" : ""}`}
            >
              <div className="col-span-1 flex items-center">
                {i === 0 && <Trophy className="w-4 h-4 text-[#ffb703]" />}
                {i === 1 && <Trophy className="w-4 h-4 text-slate-300" />}
                {i === 2 && <Trophy className="w-4 h-4 text-amber-600" />}
                {i > 2 && <span className="font-mono-cyber text-sm text-slate-400">#{i + 1}</span>}
              </div>
              <div className="col-span-3 font-mono-cyber text-xs sm:text-sm text-slate-200 flex items-center gap-2">
                {truncate(r.wallet_address)}
                {r.qualified_wl && <ShieldCheck className="w-3.5 h-3.5 text-[#00ff66]" />}
                {isMe && <span className="text-[10px] text-[#00ff66] uppercase tracking-widest">· you</span>}
              </div>
              <div className="col-span-2 font-mono-cyber text-xs text-slate-400 truncate">@{r.twitter_username}</div>
              <div className="col-span-2 text-right font-heading text-lg font-bold text-[#00f0ff]">
                {r.valid_referrals}
                <span className="text-slate-600 text-xs ml-1 font-mono-cyber">
                  {r.pending_referrals > 0 && `+${r.pending_referrals}`}
                </span>
              </div>
              <div className="col-span-2 text-right font-mono-cyber text-sm text-slate-300">{r.attempts_used}</div>
              <div className="col-span-2 text-right font-heading text-lg font-bold text-[#00ff66]">{r.best_score}</div>
            </div>
          );
        })}
      </div>

      {user && myIndex === -1 && (
        <div className="mt-6 cyber-corners p-4 border border-[#1b2234] bg-[#0d1017]/70 font-mono-cyber text-xs uppercase tracking-widest text-slate-400">
          Your rank: pending · complete a quest to appear on the leaderboard
        </div>
      )}
    </div>
  );
}
