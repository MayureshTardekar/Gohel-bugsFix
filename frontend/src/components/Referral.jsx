import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import { getUser } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Copy, Share2, Users, Sparkles, Clock } from "lucide-react";

export default function Referral({ onOpenAuth }) {
  const { user } = useUser();
  const [info, setInfo] = useState(null);

  useEffect(() => {
    if (user) getUser(user.wallet_address).then((d) => setInfo(d.user)).catch(() => {});
  }, [user]);

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
      "I just entered the @OsteonNFT archive — 206 human bones, digital. Join me:"
    );
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(link)}`, "_blank");
  };

  return (
    <section id="referral" className="relative py-16 border-t border-[#1b2234]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5">
            <div className="font-mono-cyber text-[11px] uppercase tracking-[0.35em] text-[#00f0ff] mb-4">// Recruit</div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold uppercase tracking-tight">
              Build your <span className="text-[#00ff66]">skeleton</span>.
            </h2>
            <p className="mt-5 text-slate-400 text-base leading-relaxed">
              Every recruit who scores <span className="text-slate-200">30+ points</span> in the anatomy trials
              becomes a valid referral — and unlocks +1 attempt for you.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-3">
              <div className="cyber-corners p-4 bg-[#0d1017]/70 border border-[#1b2234] clip-terminal">
                <Users className="w-5 h-5 text-[#00ff66]" strokeWidth={1.4} />
                <div className="mt-2 font-heading text-3xl font-bold text-[#00ff66]">{info?.valid_referral_count ?? 0}</div>
                <div className="font-mono-cyber text-[9px] uppercase tracking-widest text-slate-400 mt-1">Valid</div>
              </div>
              <div className="cyber-corners p-4 bg-[#0d1017]/70 border border-[#1b2234] clip-terminal">
                <Clock className="w-5 h-5 text-[#00f0ff]" strokeWidth={1.4} />
                <div className="mt-2 font-heading text-3xl font-bold text-[#00f0ff]">{info?.pending_referral_count ?? 0}</div>
                <div className="font-mono-cyber text-[9px] uppercase tracking-widest text-slate-400 mt-1">Pending</div>
              </div>
              <div className="cyber-corners p-4 bg-[#0d1017]/70 border border-[#1b2234] clip-terminal">
                <Sparkles className="w-5 h-5 text-[#ffb703]" strokeWidth={1.4} />
                <div className="mt-2 font-heading text-3xl font-bold text-[#ffb703]">{info?.allowed_attempts ?? 1}</div>
                <div className="font-mono-cyber text-[9px] uppercase tracking-widest text-slate-400 mt-1">Attempts</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="cyber-corners bg-[#0d1017]/70 border border-[#00f0ff]/30 p-8 clip-terminal glow-cyan">
              <div className="font-mono-cyber text-[10px] uppercase tracking-[0.3em] text-[#00f0ff]">Your Referral Code</div>
              <div className="mt-2 font-heading text-3xl font-black tracking-widest text-[#00ff66]">
                {user ? `OSTEON-${user.referral_code}` : "OSTEON-XXXXXX"}
              </div>
              <div className="mt-5 flex items-center gap-3 p-4 bg-[#07080c] border border-[#1b2234]">
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
                  » Connect wallet to activate your code
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
