import { useUser } from "@/context/UserContext";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Copy, Share2, Users, Sparkles } from "lucide-react";

export default function Referral({ onOpenAuth }) {
  const { user } = useUser();

  const link = user
    ? `${window.location.origin}/?ref=${user.referral_code}`
    : `${window.location.origin}/?ref=YOURCODE`;

  const copy = () => {
    if (!user) return onOpenAuth();
    navigator.clipboard.writeText(link);
    toast.success("Referral link copied");
  };

  const tweet = () => {
    if (!user) return onOpenAuth();
    const text = encodeURIComponent(
      "I just linked into @OsteonNFT — the 206-piece anatomy NFT drop. Join me on the qualification test:"
    );
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(link)}`, "_blank");
  };

  return (
    <section id="referral" className="relative py-24 border-t border-[#1b2234]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <div className="font-mono-cyber text-[11px] uppercase tracking-[0.35em] text-[#00f0ff] mb-4">// 04 — Referrals</div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold uppercase tracking-tight">
              Each friend = <span className="text-[#00ff66]">extra bone</span>.
            </h2>
            <p className="mt-5 text-slate-400 text-base leading-relaxed">
              Every qualified referral unlocks +1 test attempt. Climb the leaderboard, stack retries, and secure your
              whitelist slot faster.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="cyber-corners p-5 bg-[#0d1017]/70 border border-[#1b2234] clip-terminal">
                <Users className="w-6 h-6 text-[#00f0ff]" strokeWidth={1.4} />
                <div className="mt-3 font-heading text-3xl font-bold">{user?.referral_count ?? 0}</div>
                <div className="font-mono-cyber text-[10px] uppercase tracking-[0.3em] text-slate-400 mt-1">Referrals</div>
              </div>
              <div className="cyber-corners p-5 bg-[#0d1017]/70 border border-[#1b2234] clip-terminal">
                <Sparkles className="w-6 h-6 text-[#00ff66]" strokeWidth={1.4} />
                <div className="mt-3 font-heading text-3xl font-bold">{1 + (user?.referral_count ?? 0)}</div>
                <div className="font-mono-cyber text-[10px] uppercase tracking-[0.3em] text-slate-400 mt-1">Attempts</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="cyber-corners bg-[#0d1017]/70 border border-[#00f0ff]/30 p-8 clip-terminal glow-cyan">
              <div className="font-mono-cyber text-[10px] uppercase tracking-[0.3em] text-[#00f0ff]">Your Link</div>
              <div className="mt-3 flex items-center gap-3 p-4 bg-[#07080c] border border-[#1b2234]">
                <div className="flex-1 font-mono-cyber text-xs sm:text-sm text-slate-300 truncate" data-testid="referral-link">
                  {link}
                </div>
                <button
                  onClick={copy}
                  data-testid="referral-copy-btn"
                  className="p-2 border border-[#00f0ff]/40 hover:bg-[#00f0ff]/10 text-[#00f0ff]"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button
                  onClick={copy}
                  data-testid="referral-copy-main-btn"
                  className="rounded-none clip-notch bg-[#00f0ff] hover:bg-[#00f0ff]/90 text-black font-mono-cyber uppercase tracking-widest text-xs h-12 px-6"
                >
                  <Copy className="w-4 h-4 mr-2" /> Copy link
                </Button>
                <Button
                  onClick={tweet}
                  data-testid="referral-tweet-btn"
                  className="rounded-none clip-notch bg-transparent border border-[#1b2234] hover:bg-[#1b2234] text-slate-100 font-mono-cyber uppercase tracking-widest text-xs h-12 px-6"
                >
                  <Share2 className="w-4 h-4 mr-2" /> Share on X
                </Button>
              </div>
              {!user && (
                <div className="mt-6 text-sm text-slate-400 font-mono-cyber uppercase tracking-widest">
                  » Link wallet to activate your code
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
