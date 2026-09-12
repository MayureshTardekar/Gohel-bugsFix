import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Trophy, Microscope, Palette, Brain, Bone } from "lucide-react";

const STATS = [
  { value: "206", label: "Human Bones" },
  { value: "2060", label: "Digital NFTs" },
  { value: "10", label: "Editions / Bone" },
];

const PILLARS = [
  { icon: Microscope, title: "Scientific", desc: "Built around real human anatomy. Every specimen numbered and classified." },
  { icon: Palette, title: "Collectible", desc: "Each bone becomes a unique digital asset with cybernetic overlays." },
  { icon: Brain, title: "Interactive", desc: "Learn, explore, and earn through anatomy-based trials." },
];

const REGIONS_PREVIEW = [
  { name: "Skull", count: 22, parent: "Axial" },
  { name: "Vertebral Column", count: 26, parent: "Axial" },
  { name: "Thoracic Cage", count: 25, parent: "Axial" },
  { name: "Upper Limbs", count: 60, parent: "Appendicular" },
  { name: "Lower Limbs", count: 60, parent: "Appendicular" },
  { name: "Pelvic Girdle", count: 2, parent: "Appendicular" },
];

const STEPS = [
  { n: "01", title: "Explore", desc: "Discover all 206 bones in the archive." },
  { n: "02", title: "Complete Quests", desc: "Social tasks + anatomy trials." },
  { n: "03", title: "Earn & Climb", desc: "Refer friends, unlock attempts, rise on the network leaderboard." },
];

export default function Home() {
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -right-32 w-[560px] h-[560px] rounded-full bg-[#00f0ff]/10 blur-[120px]" />
          <div className="absolute bottom-0 -left-40 w-[500px] h-[500px] rounded-full bg-[#00ff66]/5 blur-[100px]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-8 pt-16 lg:pt-28 pb-24 lg:pb-36">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-3 px-4 py-2 mb-8 border border-[#00f0ff]/40 bg-[#00f0ff]/5 clip-notch">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00ff66] pulse-dot" />
                <span className="font-mono-cyber text-[11px] uppercase tracking-[0.3em] text-[#00f0ff]">
                  Archive · Phase 01 · Open
                </span>
              </div>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight uppercase text-white leading-[1.02]">
                The Human <br />
                Skeleton, <br />
                <span className="text-glow-cyan text-[#00f0ff]">Reimagined.</span>
              </h1>
              <p className="mt-8 text-base sm:text-lg text-slate-400 max-w-xl leading-relaxed">
                OSTEON is a digital collection of the <span className="text-slate-200">206 bones of the human body</span>,
                transforming anatomy into an interactive collectible experience.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  to="/archive"
                  data-testid="hero-cta-archive"
                  className="inline-flex items-center rounded-none clip-notch bg-[#00f0ff] hover:bg-[#00f0ff]/90 text-black font-mono-cyber uppercase tracking-widest text-xs px-8 h-14"
                >
                  Explore the 206 Bones <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
                <Link
                  to="/quests"
                  data-testid="hero-cta-quests"
                  className="inline-flex items-center gap-2 px-8 h-14 border border-[#1b2234] hover:border-[#00f0ff]/60 clip-notch bg-[#0d1017] font-mono-cyber uppercase tracking-widest text-xs text-slate-200"
                >
                  Enter the Archive
                </Link>
              </div>
              <div className="mt-14 grid grid-cols-3 gap-4 max-w-lg">
                {STATS.map((s) => (
                  <div key={s.label} className="cyber-corners p-4 bg-[#0d1017]/60 border border-[#1b2234]">
                    <div className="font-heading text-3xl font-bold">{s.value}</div>
                    <div className="font-mono-cyber text-[10px] uppercase tracking-[0.3em] text-[#00f0ff] mt-1">{s.label}</div>
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
                    <div className="absolute bottom-6 font-mono-cyber text-[9px] uppercase tracking-[0.35em] text-[#00ff66]">Specimens · Archived</div>
                  </div>
                </div>
                <div className="absolute -top-2 left-6 px-3 py-1 bg-[#0d1017] border border-[#00f0ff]/40 font-mono-cyber text-[10px] uppercase tracking-[0.3em] text-[#00f0ff] flex items-center gap-2">
                  <Zap className="w-3 h-3" /> Axial + Appendicular
                </div>
                <div className="absolute -bottom-2 right-6 px-3 py-1 bg-[#0d1017] border border-[#00ff66]/40 font-mono-cyber text-[10px] uppercase tracking-[0.3em] text-[#00ff66] flex items-center gap-2">
                  <Trophy className="w-3 h-3" /> Network Rewards
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="relative py-24 lg:py-32 border-t border-[#1b2234]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="max-w-3xl">
            <div className="font-mono-cyber text-[11px] uppercase tracking-[0.35em] text-[#00f0ff] mb-4">// 01 — Concept</div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight">
              Anatomy is the <span className="text-[#00ff66]">original</span> collection.
            </h2>
            <p className="mt-6 text-slate-400 text-base sm:text-lg leading-relaxed">
              The human skeleton is composed of 206 bones. OSTEON transforms this biological architecture into a digital
              collection where every bone becomes part of a larger anatomical archive.
            </p>
          </div>
          <div className="mt-14 grid md:grid-cols-3 gap-6">
            {PILLARS.map((p, i) => (
              <div
                key={p.title}
                data-testid={`pillar-${i}`}
                className="cyber-corners p-8 bg-[#0d1017]/70 border border-[#1b2234] hover:border-[#00f0ff]/40 clip-terminal card-lift"
              >
                <p.icon className="w-8 h-8 text-[#00f0ff]" strokeWidth={1.4} />
                <h3 className="mt-6 font-heading text-2xl font-bold uppercase tracking-wide">{p.title}</h3>
                <p className="mt-3 text-sm text-slate-400 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ARCHIVE PREVIEW */}
      <section className="relative py-24 border-t border-[#1b2234]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
            <div>
              <div className="font-mono-cyber text-[11px] uppercase tracking-[0.35em] text-[#00f0ff] mb-4">// 02 — The Archive</div>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold uppercase tracking-tight">
                Explore the <span className="text-[#00f0ff]">206</span> bones.
              </h2>
            </div>
            <Link
              to="/archive"
              data-testid="home-archive-link"
              className="inline-flex items-center rounded-none clip-notch border border-[#1b2234] hover:border-[#00f0ff]/60 bg-[#0d1017] font-mono-cyber uppercase tracking-widest text-xs text-slate-200 px-6 h-12"
            >
              Open Archive <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {REGIONS_PREVIEW.map((r) => (
              <div key={r.name} className="cyber-corners p-6 bg-[#0d1017]/60 border border-[#1b2234] clip-terminal">
                <div className="font-mono-cyber text-[10px] uppercase tracking-[0.3em] text-slate-500">{r.parent} skeleton</div>
                <div className="mt-2 font-heading text-2xl font-bold uppercase">{r.name}</div>
                <div className="mt-3 font-heading text-4xl font-black text-[#00f0ff]">{r.count}</div>
                <div className="font-mono-cyber text-[10px] uppercase tracking-widest text-slate-500 mt-1">specimens</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COLLECTION */}
      <section className="relative py-24 border-t border-[#1b2234]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6">
              <div className="font-mono-cyber text-[11px] uppercase tracking-[0.35em] text-[#00f0ff] mb-4">// 03 — Collection</div>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight">
                206 Bones. <br /><span className="text-[#00ff66]">2060</span> Collectibles.
              </h2>
              <p className="mt-6 text-slate-400 text-base leading-relaxed">
                OSTEON is built around the 206 bones of the human skeleton, represented through a 2060-piece digital
                collection — 10 unique editions per specimen.
              </p>
              <Link
                to="/collection"
                data-testid="home-collection-link"
                className="mt-8 inline-flex items-center rounded-none clip-notch bg-[#00f0ff] hover:bg-[#00f0ff]/90 text-black font-mono-cyber uppercase tracking-widest text-xs px-8 h-12"
              >
                View Collection <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
            <div className="lg:col-span-6 grid grid-cols-3 gap-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="aspect-square cyber-corners bg-[#0d1017] border border-[#1b2234] flex items-center justify-center clip-terminal group hover:border-[#00f0ff]/50"
                >
                  <div className="text-center">
                    <Bone className="w-8 h-8 text-[#00f0ff] mx-auto opacity-70 group-hover:opacity-100" strokeWidth={1.2} />
                    <div className="mt-2 font-mono-cyber text-[9px] uppercase tracking-[0.3em] text-slate-500">
                      OSTEON-{i.toString().padStart(3, "0")}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="relative py-24 border-t border-[#1b2234]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="max-w-3xl">
            <div className="font-mono-cyber text-[11px] uppercase tracking-[0.35em] text-[#00f0ff] mb-4">// 04 — How It Works</div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold uppercase tracking-tight">
              Three <span className="text-[#00f0ff]">steps</span> into the archive.
            </h2>
          </div>
          <div className="mt-14 grid md:grid-cols-3 gap-6 relative">
            <div className="hidden md:block absolute top-14 left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-[#00f0ff]/40 to-transparent" />
            {STEPS.map((s) => (
              <div key={s.n} className="relative cyber-corners bg-[#0d1017]/70 border border-[#1b2234] p-8 clip-terminal">
                <div className="w-12 h-12 flex items-center justify-center border border-[#00f0ff]/50 bg-[#07080c] font-mono-cyber text-sm text-[#00f0ff]">
                  {s.n}
                </div>
                <h3 className="mt-6 font-heading text-2xl font-bold uppercase tracking-wide">{s.title}</h3>
                <p className="mt-3 text-sm text-slate-400 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-14 flex justify-center">
            <Link
              to="/quests"
              data-testid="home-quests-cta"
              className="inline-flex items-center rounded-none clip-notch bg-[#00ff66] hover:bg-[#00ff66]/90 text-black font-mono-cyber uppercase tracking-widest text-xs px-8 h-14"
            >
              Enter Quest Center <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
