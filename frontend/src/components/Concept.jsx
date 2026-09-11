import { Skull, Zap, Layers, Fingerprint } from "lucide-react";

const items = [
  {
    icon: Skull,
    title: "Axial Skeleton",
    stat: "80",
    desc: "Cranium, spine, ribs, sternum. The core lattice that holds the whole system.",
    color: "cyan",
  },
  {
    icon: Zap,
    title: "Appendicular",
    stat: "126",
    desc: "Limbs and girdles. Precision instruments of motion, immortalized on-chain.",
    color: "emerald",
  },
  {
    icon: Layers,
    title: "Rarity by Anatomy",
    stat: "6 Tiers",
    desc: "From Ossicles (mythic) to Long Bones (common). Each NFT trait engineered by skeletal function.",
    color: "cyan",
  },
  {
    icon: Fingerprint,
    title: "Unique DNA",
    stat: "1 of 1",
    desc: "Every bone is generative art with cybernetic overlays, procedurally minted.",
    color: "emerald",
  },
];

export default function Concept() {
  return (
    <section id="concept" className="relative py-24 lg:py-36 border-t border-[#1b2234]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="max-w-3xl">
          <div className="font-mono-cyber text-[11px] uppercase tracking-[0.35em] text-[#00f0ff] mb-4">// 01 — Concept</div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight">
            A collection <span className="text-[#00f0ff]">carved</span> from the human blueprint
          </h2>
          <p className="mt-6 text-slate-400 text-base sm:text-lg leading-relaxed">
            Osteon is not a random 10k drop. It is a 206-piece anatomical archive. Each NFT is a real human bone
            reimagined as a cybernetic relic, minted in the exact ratio nature designed.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((it, i) => (
            <div
              key={it.title}
              data-testid={`concept-card-${i}`}
              className="relative cyber-corners p-8 bg-[#0d1017]/70 border border-[#1b2234] hover:border-[#00f0ff]/40 card-lift clip-terminal"
            >
              <div className="flex items-start justify-between gap-6">
                <div className="flex-1">
                  <it.icon
                    className={`w-8 h-8 ${it.color === "cyan" ? "text-[#00f0ff]" : "text-[#00ff66]"}`}
                    strokeWidth={1.4}
                  />
                  <h3 className="mt-6 font-heading text-2xl font-bold uppercase tracking-wide">{it.title}</h3>
                  <p className="mt-3 text-sm text-slate-400 leading-relaxed">{it.desc}</p>
                </div>
                <div
                  className={`font-heading text-5xl font-black leading-none ${
                    it.color === "cyan" ? "text-[#00f0ff]/80" : "text-[#00ff66]/80"
                  }`}
                >
                  {it.stat}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
