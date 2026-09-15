import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useMemo } from "react";
import { ArrowRight, ChevronDown, Bone } from "lucide-react";
import { Reveal, StaggerGroup, StaggerItem, SlideIn } from "@/components/Motion";

const POSES = [
  { src: "/skeletons/skeleton_standing.png", label: "SPECIMEN 001 · ANATOMICAL NEUTRAL" },
  { src: "/skeletons/skeleton_contrapposto.png", label: "SPECIMEN 042 · CONTRAPPOSTO" },
  { src: "/skeletons/skeleton_thinker.png", label: "SPECIMEN 108 · CONTEMPLATIO" },
  { src: "/skeletons/skeleton_reaching.png", label: "SPECIMEN 176 · ASCENSIO" },
];

const REGIONS = [
  { name: "Skull", count: 22, parent: "Axial", coord: "22 · CRANIAL VAULT" },
  { name: "Middle Ear + Neck", count: 7, parent: "Axial", coord: "07 · EAR BONES + HYOID" },
  { name: "Vertebral Column", count: 26, parent: "Axial", coord: "26 · SPINAL AXIS" },
  { name: "Thoracic Cage", count: 25, parent: "Axial", coord: "25 · RIBS + STERNUM" },
  { name: "Upper Limbs", count: 60, parent: "Appendicular", coord: "60 · ARMS + HANDS" },
  { name: "Shoulder Girdle", count: 4, parent: "Appendicular", coord: "04 · CLAVICLE + SCAPULA" },
  { name: "Pelvic Girdle", count: 2, parent: "Appendicular", coord: "02 · HIP CRADLE" },
  { name: "Lower Limbs", count: 60, parent: "Appendicular", coord: "60 · LEGS + FEET" },
];

const STEPS = [
  { n: "01", title: "Consultation", desc: "Bind your X handle to the archive. Every specimen is tied to a public identity — no anonymous specimens." },
  { n: "02", title: "Confirmation", desc: "Provide your wallet. Your on-chain signature is sealed. This is your key to the collection." },
  { n: "03", title: "Trial", desc: "10 anatomical questions. 5 bone identification. 100 points. Score 70+ to qualify for the whitelist." },
  { n: "04", title: "Recruitment", desc: "Every friend who scores 30+ becomes a valid referral — and unlocks one extra attempt for you." },
  { n: "05", title: "Ascension", desc: "Climb the network leaderboard. Prove your fluency. Enter the archive." },
];

/* Mist gradient section separator */
function Mist({ direction = "down" }) {
  return (
    <div className="relative h-24">
      <div
        className={`absolute inset-0 pointer-events-none ${direction === "down" ? "mist-fade-top" : "mist-fade-bottom"}`}
      />
    </div>
  );
}

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(heroScroll, [0, 1], [0, 120]);
  const heroOpacity = useTransform(heroScroll, [0, 0.7], [1, 0]);
  const pose = useMemo(() => POSES[Math.floor(Math.random() * POSES.length)], []);

  return (
    <div>
      {/* ==================== HERO ==================== */}
      <section ref={heroRef} className="relative min-h-[100vh] flex items-center overflow-hidden">
        {/* Ambient background */}
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full bg-[#00f0ff]/8 blur-[140px]" />
          <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-[#00ff66]/5 blur-[130px]" />
        </motion.div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-8 w-full grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 relative z-10">

            <h1 className="font-editorial text-[3.2rem] sm:text-[5rem] lg:text-[6.5rem] font-light text-white leading-[0.95] tracking-[-0.02em]">
              {[
                { t: "The human", i: false },
                { t: "skeleton,", i: false },
                { t: "reimagined.", i: true },
              ].map((line, i) => (
                <motion.div
                  key={line.t}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.1, delay: 0.3 + i * 0.18, ease: [0.22, 1, 0.36, 1] }}
                  className={line.i ? "italic text-[#00f0ff] text-glow-cyan" : ""}
                >
                  {line.t}
                </motion.div>
              ))}
            </h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 1 }}
              className="mt-10 flex items-start gap-6 max-w-xl"
            >
              <div className="w-px h-24 bg-gradient-to-b from-[#00f0ff]/60 to-transparent flex-shrink-0" />
              <p className="text-base sm:text-lg text-slate-300 leading-[1.8] font-editorial italic font-light">
                A digital collection of the 206 bones of the human body — transforming anatomy into an interactive
                collectible experience.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1.4 }}
              className="mt-12 flex flex-wrap gap-4"
            >
              <Link
                to="/quests"
                data-testid="hero-cta-enter"
                className="group inline-flex items-center rounded-none clip-notch bg-[#00f0ff] hover:bg-[#00f0ff]/90 text-black font-mono-cyber uppercase tracking-widest text-xs px-8 h-14"
              >
                Enter the Quest
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/collection"
                data-testid="hero-cta-collection"
                className="inline-flex items-center gap-2 px-8 h-14 border border-white/20 hover:border-white/60 clip-notch bg-transparent font-mono-cyber uppercase tracking-widest text-xs text-white"
              >
                View the Collection
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8, duration: 1 }}
              className="mt-16 flex items-center gap-8 flex-wrap"
            >
              {[
                { v: "206", l: "Bones" },
                { v: "2,060", l: "Editions" },
                { v: "8", l: "Worlds" },
              ].map((s, i) => (
                <div key={s.l} className="flex items-baseline gap-3">
                  <div className="font-editorial text-3xl sm:text-4xl font-light text-white">{s.v}</div>
                  <div className="coord-label">{s.l}</div>
                  {i < 2 && <div className="hidden sm:block w-8 h-px bg-white/20 ml-4" />}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Skeleton visual */}
          <div id="skeleton-visual" className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative mx-auto max-w-md lg:max-w-lg"
            >
              {/* Ambient rings */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-6 rounded-full border border-dashed border-white/10"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-2 rounded-full border border-white/5"
              />

              {/* Skeleton photograph — museum lit */}
              <div className="relative aspect-[2/3] overflow-visible">
                <motion.img
                  key={pose.src}
                  src={pose.src}
                  alt="OSTEON specimen — articulated human skeleton"
                  className="relative z-10 w-full h-full object-contain object-center"
                  style={{
                    filter: "drop-shadow(0 20px 50px rgba(0,240,255,0.35)) drop-shadow(0 0 30px rgba(0,255,102,0.15))",
                  }}
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Scanning line */}
                <motion.div
                  initial={{ y: "-10%" }}
                  animate={{ y: "110%" }}
                  transition={{ duration: 6, repeat: Infinity, ease: "linear", delay: 2 }}
                  className="absolute left-0 right-0 h-24 pointer-events-none z-20"
                  style={{
                    background:
                      "linear-gradient(to bottom, transparent, rgba(0,240,255,0.15) 40%, rgba(0,240,255,0.45) 50%, rgba(0,240,255,0.15) 60%, transparent)",
                    mixBlendMode: "screen",
                  }}
                />
              </div>

              {/* Specimen tag (commented out) */}
              {/* <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.6, duration: 1 }}
                className="mt-6 flex items-center justify-between"
              >
                <div className="coord-label text-[#00f0ff]">{pose.label}</div>
                <div className="coord-label">206 / 206</div>
              </motion.div> */}

              {/* Floating specimen labels (commented out) */}
              {/* <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.8, duration: 1 }}
                className="absolute top-[6%] -left-4 sm:-left-10 flex items-center gap-2 z-30"
              >
                <div className="w-10 sm:w-14 h-px bg-[#00f0ff]" />
                <div className="px-3 py-1.5 bg-[#0d1017]/90 border border-[#00f0ff]/50 clip-notch backdrop-blur">
                  <div className="coord-label text-[#00f0ff]">OSTEON-001 · CRANIUM</div>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 2.1, duration: 1 }}
                className="absolute top-[36%] -right-4 sm:-right-10 flex items-center gap-2 z-30"
              >
                <div className="px-3 py-1.5 bg-[#0d1017]/90 border border-[#00ff66]/50 clip-notch backdrop-blur">
                  <div className="coord-label text-[#00ff66]">24 · RIBS · BILATERAL</div>
                </div>
                <div className="w-10 sm:w-14 h-px bg-[#00ff66]" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.4, duration: 1 }}
                className="absolute bottom-[12%] left-4 flex items-center gap-2 z-30"
              >
                <div className="w-10 sm:w-14 h-px bg-[#ffb703]" />
                <div className="px-3 py-1.5 bg-[#0d1017]/90 border border-[#ffb703]/50 clip-notch backdrop-blur">
                  <div className="coord-label text-[#ffb703]">FEMUR · L4 · 45CM AVG</div>
                </div>
              </motion.div> */}
            </motion.div>
          </div>
        </div>

        {/* Scroll cue */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 z-10"
        >
          <span className="coord-label">Scroll · Descend</span>
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </section>

      {/* ==================== EDITORIAL PROLOGUE ==================== */}
      <Mist direction="down" />
      <section className="relative py-32 lg:py-48">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center">
          <Reveal>
            <div className="coord-label text-[#00f0ff] mb-8">— Prologue —</div>
          </Reveal>
          <Reveal delay={0.15}>
            <h2 className="font-editorial text-3xl sm:text-5xl lg:text-6xl font-light text-white leading-[1.1] tracking-[-0.01em]">
              Vast, majestic and unimaginably <br className="hidden sm:block" />
              <span className="italic text-[#00f0ff]">precise</span> — the human body is the original archive.
            </h2>
          </Reveal>
          <Reveal delay={0.35}>
            <div className="mt-16 flex justify-center">
              <div className="editorial-rule h-24" />
            </div>
          </Reveal>
          <Reveal delay={0.5}>
            <p className="mt-16 text-base sm:text-lg text-slate-400 leading-[1.9] font-editorial italic font-light max-w-2xl mx-auto">
              For millennia, the 206 bones of the human skeleton have been mapped, named, and studied. OSTEON transforms
              that biological architecture into a digital collection where every bone becomes a numbered specimen —
              archived, illustrated, and bound to its collector on-chain.
            </p>
          </Reveal>
          <Reveal delay={0.7}>
            <p className="mt-8 coord-label">— A collection carved from anatomy —</p>
          </Reveal>
        </div>
      </section>

      {/* ==================== ARCHIVE PANEL ==================== */}
      <Mist direction="up" />
      <section className="relative py-24 lg:py-36 border-t border-[#1b2234]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid lg:grid-cols-12 gap-10 items-start mb-16">
            <SlideIn from="left" className="lg:col-span-5">
              <div className="coord-label text-[#00f0ff] mb-6">— Chapter I · The Beginning —</div>
              <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-light text-white leading-[1.05] tracking-[-0.01em]">
                Two hundred <br />
                and <span className="italic text-[#00ff66]">six</span> specimens.
              </h2>
            </SlideIn>
            <SlideIn from="right" delay={0.15} className="lg:col-span-6 lg:col-start-7">
              <p className="text-slate-400 text-base sm:text-lg leading-[1.9] font-editorial italic font-light">
                Each bone is documented, illustrated, and classified — organized across eight anatomical worlds of the
                axial and appendicular skeleton. This is not decoration; it is the exact blueprint of the human body.
              </p>
            </SlideIn>
          </div>

          <StaggerGroup className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {REGIONS.map((r) => (
              <StaggerItem key={r.name}>
                <div className="cyber-corners p-8 bg-[#0d1017]/60 border border-[#1b2234] clip-terminal hover:border-[#00f0ff]/50 card-lift h-full">
                  <div className="coord-label mb-6">{r.parent} · Skeleton</div>
                  <div className="font-editorial text-3xl font-light text-white">{r.name}</div>
                  <div className="mt-8 flex items-baseline justify-between border-t border-[#1b2234] pt-6">
                    <div className="font-editorial text-5xl font-light text-[#00f0ff]">{r.count}</div>
                    <div className="coord-label text-right">{r.coord}</div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* ==================== COLLECTION PANEL ==================== */}
      <Mist direction="up" />
      <section className="relative py-24 lg:py-40 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none mist-overlay" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <SlideIn from="left" className="lg:col-span-6">
              <div className="coord-label text-[#00f0ff] mb-6">— Chapter II · The Collection —</div>
              <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-light text-white leading-[1.05] tracking-[-0.01em]">
                206 bones. <br />
                <span className="italic text-[#00ff66]">2,060</span> collectibles.
              </h2>
              <p className="mt-8 text-slate-400 text-base sm:text-lg leading-[1.9] font-editorial italic font-light max-w-lg">
                Ten unique editions per specimen. Each edition features procedurally generated cybernetic overlays,
                trait rarity, and a permanent bond to a single collector.
              </p>
              <div className="mt-10 flex items-center gap-8">
                <div>
                  <div className="font-editorial text-4xl font-light text-white">10</div>
                  <div className="coord-label mt-1">editions</div>
                </div>
                <div className="w-8 h-px bg-white/20" />
                <div>
                  <div className="font-editorial text-4xl font-light text-white">5</div>
                  <div className="coord-label mt-1">rarity tiers</div>
                </div>
                <div className="w-8 h-px bg-white/20" />
                <div>
                  <div className="font-editorial text-4xl font-light text-white">∞</div>
                  <div className="coord-label mt-1">on-chain</div>
                </div>
              </div>
              <Link
                to="/collection"
                className="mt-10 inline-flex items-center rounded-none clip-notch bg-[#00f0ff] hover:bg-[#00f0ff]/90 text-black font-mono-cyber uppercase tracking-widest text-xs px-8 h-14"
              >
                View the Collection
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </SlideIn>

            <SlideIn from="right" delay={0.2} className="lg:col-span-6">
              <StaggerGroup className="grid grid-cols-3 gap-3">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                  <StaggerItem key={i}>
                    <motion.div
                      whileHover={{ y: -6 }}
                      className="aspect-square cyber-corners bg-[#0d1017] border border-[#1b2234] flex flex-col items-center justify-center clip-terminal group cursor-pointer hover:border-[#00f0ff]/60 relative overflow-hidden"
                    >
                      <div className="absolute inset-0 grid-bg opacity-30" />
                      <Bone className="w-8 h-8 text-[#00f0ff] opacity-70 group-hover:opacity-100 relative" strokeWidth={1.2} />
                      <div className="mt-3 coord-label text-[#00ff66] relative">
                        OSTEON-{i.toString().padStart(3, "0")}
                      </div>
                    </motion.div>
                  </StaggerItem>
                ))}
              </StaggerGroup>
            </SlideIn>
          </div>
        </div>
      </section>

      {/* ==================== JOURNEY / HOW IT WORKS ==================== */}
      <Mist direction="up" />
      <section className="relative py-24 lg:py-40 border-t border-[#1b2234]">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <Reveal>
            <div className="text-center mb-20">
              <div className="coord-label text-[#00f0ff] mb-6">— Chapter III · The Journey —</div>
              <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-light text-white leading-[1.05] tracking-[-0.01em]">
                Start planning your <br />
                <span className="italic text-[#00f0ff]">expedition</span>.
              </h2>
            </div>
          </Reveal>

          <div className="space-y-16 lg:space-y-24">
            {STEPS.map((step, i) => (
              <Reveal key={step.n} delay={i * 0.05}>
                <div className={`grid lg:grid-cols-12 gap-8 items-start ${i % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
                  <div className="lg:col-span-3">
                    <div className="font-editorial text-7xl lg:text-8xl font-light text-[#00f0ff]/30 leading-none">{step.n}</div>
                    <div className="coord-label mt-4">Step {step.n}</div>
                  </div>
                  <div className="lg:col-span-9 border-l border-[#1b2234] pl-8">
                    <h3 className="font-editorial text-3xl sm:text-4xl font-light text-white leading-tight">
                      {step.title}
                    </h3>
                    <p className="mt-6 text-slate-400 text-base sm:text-lg leading-[1.85] font-editorial italic font-light max-w-2xl">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.3}>
            <div className="mt-24 text-center">
              <Link
                to="/quests"
                data-testid="home-quests-cta"
                className="group inline-flex items-center rounded-none clip-notch bg-[#00ff66] hover:bg-[#00ff66]/90 text-black font-mono-cyber uppercase tracking-widest text-xs px-10 h-14"
              >
                Begin the Trial
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ==================== EDITORIAL QUOTE ==================== */}
      <Mist direction="up" />
      <section className="relative py-32 lg:py-48 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 mist-overlay" />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 sm:px-8 text-center">
          <Reveal>
            <div className="font-editorial text-6xl text-[#00f0ff]/40 leading-none">"</div>
          </Reveal>
          <Reveal delay={0.15}>
            <blockquote className="mt-6 font-editorial italic text-2xl sm:text-3xl lg:text-4xl font-light text-white leading-[1.4]">
              The coldest, driest, highest, windiest space on the planet — and yet the human skeleton holds it all
              upright. Its architecture is what will <span className="text-[#00ff66]">break your heart</span>.
            </blockquote>
          </Reveal>
          <Reveal delay={0.35}>
            <div className="mt-12 flex items-center justify-center gap-4">
              <div className="w-12 h-px bg-white/30" />
              <div className="coord-label">Osteon Field Notes · 2026</div>
              <div className="w-12 h-px bg-white/30" />
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
