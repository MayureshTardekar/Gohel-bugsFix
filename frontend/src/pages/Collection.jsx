import { Bone } from "lucide-react";
import { Link } from "react-router-dom";

const STATS = [
  { value: "206", label: "Unique bone subjects" },
  { value: "2060", label: "Total collection supply" },
  { value: "10", label: "Editions per bone" },
];

export default function Collection() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 lg:py-24">
      <div className="max-w-3xl">
        <div className="font-mono-cyber text-[11px] uppercase tracking-[0.35em] text-[#00f0ff] mb-4">// Collection</div>
        <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight leading-[1.05]">
          <span className="text-[#00f0ff]">2060</span> digital <br />collectibles.
        </h1>
        <p className="mt-6 text-slate-400 text-base sm:text-lg leading-relaxed">
          OSTEON is built around the 206 bones of the human skeleton, represented through a 2060-piece digital
          collection. Each bone has 10 unique editions with cybernetic overlays and rarity traits.
        </p>
      </div>

      <div className="mt-12 grid md:grid-cols-3 gap-6">
        {STATS.map((s) => (
          <div key={s.label} className="cyber-corners p-8 bg-[#0d1017]/70 border border-[#1b2234] clip-terminal">
            <div className="font-heading text-5xl font-black text-[#00f0ff]">{s.value}</div>
            <div className="font-mono-cyber text-[10px] uppercase tracking-[0.3em] text-slate-400 mt-2">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-16">
        <div className="font-mono-cyber text-[11px] uppercase tracking-[0.35em] text-[#00f0ff] mb-4">Gallery preview</div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="aspect-square cyber-corners bg-[#0d1017] border border-[#1b2234] clip-terminal flex flex-col items-center justify-center relative overflow-hidden hover:border-[#00f0ff]/60"
            >
              <div className="absolute inset-0 grid-bg opacity-30" />
              <Bone className="w-10 h-10 text-[#00f0ff] opacity-70 relative" strokeWidth={1.2} />
              <div className="mt-3 font-mono-cyber text-[9px] uppercase tracking-[0.3em] text-[#00ff66] relative">
                OSTEON-{(i + 1).toString().padStart(3, "0")}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16 cyber-corners p-8 bg-[#0d1017]/70 border border-[#00f0ff]/30 clip-terminal glow-cyan">
        <div className="font-mono-cyber text-[10px] uppercase tracking-[0.35em] text-[#00f0ff]">Access model</div>
        <h2 className="mt-3 font-heading text-2xl sm:text-3xl font-bold uppercase">Knowledge becomes access.</h2>
        <p className="mt-4 text-slate-400 text-base leading-relaxed max-w-2xl">
          Participation, points, and referral performance may contribute to future community rewards and access
          opportunities. Complete quests to prove your anatomy fluency and secure your place in the archive.
        </p>
        <Link
          to="/quests"
          data-testid="collection-quest-cta"
          className="mt-6 inline-flex items-center rounded-none clip-notch bg-[#00ff66] hover:bg-[#00ff66]/90 text-black font-mono-cyber uppercase tracking-widest text-xs px-8 h-12"
        >
          Enter Quest Center
        </Link>
      </div>
    </div>
  );
}
