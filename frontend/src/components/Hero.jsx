import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Trophy } from "lucide-react";

export default function Hero({ onCta }) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -right-32 w-[560px] h-[560px] rounded-full bg-[#00f0ff]/10 blur-[120px]" />
        <div className="absolute bottom-0 -left-40 w-[500px] h-[500px] rounded-full bg-[#00ff66]/5 blur-[100px]" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-8 pt-16 lg:pt-28 pb-20 lg:pb-32">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-3 px-4 py-2 mb-8 border border-[#00f0ff]/40 bg-[#00f0ff]/5 clip-notch">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00ff66] pulse-dot" />
              <span className="font-mono-cyber text-[11px] uppercase tracking-[0.3em] text-[#00f0ff]">
                Whitelist Phase // Open
              </span>
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight uppercase text-white leading-[1.02]">
              Two Hundred <span className="text-glow-cyan text-[#00f0ff]">Six</span>
              <br />
              Bones. One <br className="hidden sm:block" />
              <span className="text-glow-emerald text-[#00ff66]">Anatomy Cult.</span>
            </h1>
            <p className="mt-8 text-base sm:text-lg text-slate-400 max-w-xl leading-relaxed">
              Osteon is a <span className="text-slate-200">206-piece cybernetic NFT collection</span> forged from the exact
              blueprint of the human skeleton. Every bone is a unique on-chain artifact. Prove your worth in the
              Qualification Test to earn a whitelist slot.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button
                onClick={onCta}
                data-testid="hero-cta-start"
                className="rounded-none clip-notch bg-[#00f0ff] hover:bg-[#00f0ff]/90 text-black font-mono-cyber uppercase tracking-widest text-xs px-8 h-14"
              >
                Start Qualification <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <a
                href="#concept"
                data-testid="hero-cta-lore"
                className="inline-flex items-center gap-2 px-8 h-14 border border-[#1b2234] hover:border-[#00f0ff]/60 clip-notch bg-[#0d1017] font-mono-cyber uppercase tracking-widest text-xs text-slate-200"
              >
                Read the Lore
              </a>
            </div>
            <div className="mt-14 grid grid-cols-3 gap-4 max-w-lg">
              {[
                { label: "Supply", value: "206" },
                { label: "Pass Score", value: "70+" },
                { label: "Points", value: "100" },
              ].map((s) => (
                <div key={s.label} className="cyber-corners p-4 bg-[#0d1017]/60 border border-[#1b2234]">
                  <div className="font-mono-cyber text-[10px] uppercase tracking-[0.3em] text-[#00f0ff]">{s.label}</div>
                  <div className="mt-1 font-heading text-3xl font-bold">{s.value}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 rounded-full border border-[#00f0ff]/20 drift" />
              <div className="absolute inset-8 rounded-full border border-[#00f0ff]/10 drift" style={{ animationDelay: "-3s" }} />
              <div className="absolute inset-16 rounded-full border border-[#00ff66]/15 drift" style={{ animationDelay: "-6s" }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-64 h-64 rounded-full bg-[#0d1017] border border-[#00f0ff]/50 flex items-center justify-center glow-cyan overflow-hidden">
                  <div className="absolute inset-0 opacity-40" style={{ backgroundImage: "radial-gradient(circle at 50% 40%, rgba(0,240,255,0.35), transparent 55%)" }} />
                  <div className="absolute inset-0 grid-bg opacity-30" />
                  <div className="relative font-heading text-7xl font-black text-[#00f0ff] text-glow-cyan tracking-tight">206</div>
                  <div className="absolute bottom-6 font-mono-cyber text-[9px] uppercase tracking-[0.35em] text-[#00ff66]">Cybernetic · Bone</div>
                </div>
              </div>
              <div className="absolute -top-2 left-6 px-3 py-1 bg-[#0d1017] border border-[#00f0ff]/40 font-mono-cyber text-[10px] uppercase tracking-[0.3em] text-[#00f0ff] flex items-center gap-2">
                <Zap className="w-3 h-3" /> Axial + Appendicular
              </div>
              <div className="absolute -bottom-2 right-6 px-3 py-1 bg-[#0d1017] border border-[#00ff66]/40 font-mono-cyber text-[10px] uppercase tracking-[0.3em] text-[#00ff66] flex items-center gap-2">
                <Trophy className="w-3 h-3" /> WL Reward
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
