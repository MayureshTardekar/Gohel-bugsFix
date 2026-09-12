import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Zap, Trophy, Microscope, Palette, Brain, Bone, ChevronDown } from "lucide-react";
import { Reveal, StaggerGroup, StaggerItem, SlideIn, Parallax } from "@/components/Motion";
import AnimatedSkeleton from "@/components/AnimatedSkeleton";

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
  { n: "01", title: "Connect", desc: "Link your wallet and X. Bind your on-chain skeletal signature." },
  { n: "02", title: "Trial", desc: "10 anatomy questions + 5 bone-guess. 100 points. Prove your fluency." },
  { n: "03", title: "Recruit", desc: "Every friend who scores 30+ unlocks +1 attempt. Climb the network." },
];

export default function Home() {
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden min-h-[92vh] flex items-center">
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{ opacity: [0.5, 0.9, 0.5] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="absolute -top-32 -right-32 w-[560px] h-[560px] rounded-full bg-[#00f0ff]/10 blur-[120px]"
          />
          <motion.div
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 8, repeat: Infinity, delay: 1 }}
            className="absolute bottom-0 -left-40 w-[500px] h-[500px] rounded-full bg-[#00ff66]/5 blur-[100px]"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-8 pt-16 lg:pt-24 pb-24 w-full">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.1 }}
                className="inline-flex items-center gap-3 px-4 py-2 mb-8 border border-[#00f0ff]/40 bg-[#00f0ff]/5 clip-notch"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#00ff66] pulse-dot" />
                <span className="font-mono-cyber text-[11px] uppercase tracking-[0.3em] text-[#00f0ff]">
                  Archive · Phase 01 · Open
                </span>
              </motion.div>

              <h1 className="font-heading text-4xl sm:text-5xl lg:text-[5.5rem] font-extrabold tracking-tight uppercase text-white leading-[0.96]">
                {["The Human", "Skeleton,", "Reimagined."].map((line, i) => (
                  <motion.div
                    key={line}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                    className={i === 2 ? "text-glow-cyan text-[#00f0ff]" : ""}
                  >
                    {line}
                  </motion.div>
                ))}
              </h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.9 }}
                className="mt-8 text-base sm:text-lg text-slate-400 max-w-xl leading-relaxed"
              >
                OSTEON is a digital collection of the <span className="text-slate-200">206 bones of the human body</span>,
                transforming anatomy into an interactive collectible experience.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 1.1 }}
                className="mt-10 flex flex-wrap gap-4"
              >
                <Link
                  to="/quests"
                  data-testid="hero-cta-enter"
                  className="group inline-flex items-center rounded-none clip-notch bg-[#00f0ff] hover:bg-[#00f0ff]/90 text-black font-mono-cyber uppercase tracking-widest text-xs px-8 h-14"
                >
                  Enter the Archive
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  to="/archive"
                  data-testid="hero-cta-archive"
                  className="inline-flex items-center gap-2 px-8 h-14 border border-[#1b2234] hover:border-[#00f0ff]/60 clip-notch bg-[#0d1017] font-mono-cyber uppercase tracking-widest text-xs text-slate-200"
                >
                  Explore 206 Bones
                </Link>
              </motion.div>

              <motion.div
                initial="hidden"
                animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.15, delayChildren: 1.3 } } }}
                className="mt-14 grid grid-cols-3 gap-4 max-w-lg"
              >
                {STATS.map((s) => (
                  <motion.div
                    key={s.label}
                    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } }}
                    className="cyber-corners p-4 bg-[#0d1017]/60 border border-[#1b2234] hover:border-[#00f0ff]/40 transition-colors"
                  >
                    <div className="font-heading text-3xl font-bold">{s.value}</div>
                    <div className="font-mono-cyber text-[10px] uppercase tracking-[0.3em] text-[#00f0ff] mt-1">{s.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Animated Skeleton */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-4 rounded-full border border-dashed border-[#00f0ff]/15"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-4 rounded-full border border-[#00ff66]/10"
                />
                <div className="relative">
                  <AnimatedSkeleton className="w-full h-[600px] mx-auto" />
                  {/* Floating specimen labels */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="absolute top-[9%] -left-2 sm:-left-8 px-3 py-1.5 bg-[#0d1017]/90 border border-[#00f0ff]/50 clip-notch font-mono-cyber text-[9px] uppercase tracking-[0.3em] text-[#00f0ff]"
                  >
                    OSTEON-001 · CRANIUM
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.8, duration: 1 }}
                    className="absolute top-[40%] -right-2 sm:-right-8 px-3 py-1.5 bg-[#0d1017]/90 border border-[#00ff66]/50 clip-notch font-mono-cyber text-[9px] uppercase tracking-[0.3em] text-[#00ff66]"
                  >
                    24 · RIBS
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.1, duration: 1 }}
                    className="absolute bottom-[10%] left-4 px-3 py-1.5 bg-[#0d1017]/90 border border-[#ffb703]/50 clip-notch font-mono-cyber text-[9px] uppercase tracking-[0.3em] text-[#ffb703]"
                  >
                    FEMUR · LONGEST
                  </motion.div>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll cue */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500"
          >
            <span className="font-mono-cyber text-[10px] uppercase tracking-[0.3em]">Scroll</span>
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </div>
      </section>

      {/* INTRO */}
      <section className="relative py-24 lg:py-36 border-t border-[#1b2234]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            <SlideIn from="left" className="lg:col-span-5">
              <div className="font-mono-cyber text-[11px] uppercase tracking-[0.35em] text-[#00f0ff] mb-4">// 01 — Concept</div>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight">
                Anatomy is the <span className="text-[#00ff66]">original</span> collection.
              </h2>
            </SlideIn>
            <SlideIn from="right" delay={0.15} className="lg:col-span-7">
              <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
                The human skeleton is composed of 206 bones. OSTEON transforms this biological architecture into a
                digital collection where every bone becomes part of a larger anatomical archive.
              </p>
              <p className="mt-4 text-slate-500 text-base leading-relaxed">
                Not a random 10k drop. A precisely calibrated 206-piece anatomical catalog, minted at the exact ratio
                nature designed.
              </p>
            </SlideIn>
          </div>

          <StaggerGroup className="mt-16 grid md:grid-cols-3 gap-6" delay={0.2}>
            {PILLARS.map((p, i) => (
              <StaggerItem key={p.title}>
                <div
                  data-testid={`pillar-${i}`}
                  className="cyber-corners p-8 bg-[#0d1017]/70 border border-[#1b2234] hover:border-[#00f0ff]/40 clip-terminal card-lift h-full"
                >
                  <p.icon className="w-8 h-8 text-[#00f0ff]" strokeWidth={1.4} />
                  <h3 className="mt-6 font-heading text-2xl font-bold uppercase tracking-wide">{p.title}</h3>
                  <p className="mt-3 text-sm text-slate-400 leading-relaxed">{p.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* ARCHIVE PREVIEW */}
      <section className="relative py-24 border-t border-[#1b2234] overflow-hidden">
        <Parallax strength={40} className="absolute -right-40 top-20 w-[400px] h-[400px] rounded-full bg-[#00f0ff]/5 blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
            <Reveal>
              <div className="font-mono-cyber text-[11px] uppercase tracking-[0.35em] text-[#00f0ff] mb-4">// 02 — The Archive</div>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold uppercase tracking-tight">
                Explore the <span className="text-[#00f0ff]">206</span> bones.
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <Link
                to="/archive"
                data-testid="home-archive-link"
                className="inline-flex items-center rounded-none clip-notch border border-[#1b2234] hover:border-[#00f0ff]/60 bg-[#0d1017] font-mono-cyber uppercase tracking-widest text-xs text-slate-200 px-6 h-12"
              >
                Open Archive <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Reveal>
          </div>
          <StaggerGroup className="grid md:grid-cols-3 gap-4">
            {REGIONS_PREVIEW.map((r) => (
              <StaggerItem key={r.name}>
                <div className="cyber-corners p-6 bg-[#0d1017]/60 border border-[#1b2234] clip-terminal hover:border-[#00f0ff]/50 card-lift h-full">
                  <div className="font-mono-cyber text-[10px] uppercase tracking-[0.3em] text-slate-500">{r.parent} skeleton</div>
                  <div className="mt-2 font-heading text-2xl font-bold uppercase">{r.name}</div>
                  <div className="mt-3 flex items-baseline gap-2">
                    <div className="font-heading text-4xl font-black text-[#00f0ff]">{r.count}</div>
                    <div className="font-mono-cyber text-[10px] uppercase tracking-widest text-slate-500">specimens</div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* COLLECTION */}
      <section className="relative py-24 border-t border-[#1b2234] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <SlideIn from="left" className="lg:col-span-6">
              <div className="font-mono-cyber text-[11px] uppercase tracking-[0.35em] text-[#00f0ff] mb-4">// 03 — Collection</div>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight">
                206 Bones. <br /><span className="text-[#00ff66]">2060</span> Collectibles.
              </h2>
              <p className="mt-6 text-slate-400 text-base leading-relaxed">
                Built around the 206 bones of the human skeleton — 10 unique editions per specimen, each with
                procedurally generated cybernetic overlays.
              </p>
              <Link
                to="/collection"
                data-testid="home-collection-link"
                className="mt-8 inline-flex items-center rounded-none clip-notch bg-[#00f0ff] hover:bg-[#00f0ff]/90 text-black font-mono-cyber uppercase tracking-widest text-xs px-8 h-12"
              >
                View Collection <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </SlideIn>
            <SlideIn from="right" delay={0.15} className="lg:col-span-6">
              <StaggerGroup className="grid grid-cols-3 gap-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <StaggerItem key={i}>
                    <motion.div
                      whileHover={{ y: -4, borderColor: "#00f0ff" }}
                      className="aspect-square cyber-corners bg-[#0d1017] border border-[#1b2234] flex items-center justify-center clip-terminal group cursor-pointer"
                    >
                      <div className="text-center">
                        <Bone className="w-8 h-8 text-[#00f0ff] mx-auto opacity-70 group-hover:opacity-100" strokeWidth={1.2} />
                        <div className="mt-2 font-mono-cyber text-[9px] uppercase tracking-[0.3em] text-slate-500">
                          OSTEON-{i.toString().padStart(3, "0")}
                        </div>
                      </div>
                    </motion.div>
                  </StaggerItem>
                ))}
              </StaggerGroup>
            </SlideIn>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="relative py-24 border-t border-[#1b2234]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <Reveal>
            <div className="max-w-3xl">
              <div className="font-mono-cyber text-[11px] uppercase tracking-[0.35em] text-[#00f0ff] mb-4">// 04 — How It Works</div>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold uppercase tracking-tight">
                Three <span className="text-[#00f0ff]">steps</span> to the archive.
              </h2>
            </div>
          </Reveal>
          <StaggerGroup className="mt-14 grid md:grid-cols-3 gap-6 relative">
            <div className="hidden md:block absolute top-14 left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-[#00f0ff]/40 to-transparent" />
            {STEPS.map((s) => (
              <StaggerItem key={s.n}>
                <div className="relative cyber-corners bg-[#0d1017]/70 border border-[#1b2234] p-8 clip-terminal h-full hover:border-[#00f0ff]/40 card-lift">
                  <div className="w-12 h-12 flex items-center justify-center border border-[#00f0ff]/50 bg-[#07080c] font-mono-cyber text-sm text-[#00f0ff]">
                    {s.n}
                  </div>
                  <h3 className="mt-6 font-heading text-2xl font-bold uppercase tracking-wide">{s.title}</h3>
                  <p className="mt-3 text-sm text-slate-400 leading-relaxed">{s.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
          <Reveal delay={0.4} className="mt-14 flex justify-center">
            <Link
              to="/quests"
              data-testid="home-quests-cta"
              className="group inline-flex items-center rounded-none clip-notch bg-[#00ff66] hover:bg-[#00ff66]/90 text-black font-mono-cyber uppercase tracking-widest text-xs px-8 h-14"
            >
              Enter Quest Center
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
