export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-16 lg:py-24">
      <div className="font-mono-cyber text-[11px] uppercase tracking-[0.35em] text-[#00f0ff] mb-4">// About</div>
      <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight leading-[1.05]">
        Why <span className="text-[#00f0ff]">Osteon</span>?
      </h1>
      <div className="mt-10 space-y-8 text-slate-300 text-base sm:text-lg leading-relaxed">
        <p>
          OSTEON explores the intersection of anatomy, digital art, education, and collectibles. By assigning a digital
          identity to every bone, the project turns the human skeleton into an interactive system that can be explored,
          studied, and collected.
        </p>
        <p>
          Every specimen is numbered, classified, and archived — a 206-piece catalog of the exact biological
          architecture that supports every human. Around this scientific foundation we've built a Quest Center: an
          interactive layer where participants test their anatomy fluency, invite friends into the archive, and compete
          for access to the collection.
        </p>
        <p>
          The project is not just an NFT drop. It is a digital anatomy museum where knowledge, curiosity, and community
          become the entry keys.
        </p>
      </div>

      <div className="mt-16 grid md:grid-cols-2 gap-6">
        <div className="cyber-corners p-8 bg-[#0d1017]/70 border border-[#1b2234] clip-terminal">
          <div className="font-mono-cyber text-[10px] uppercase tracking-[0.35em] text-[#00f0ff]">Foundation</div>
          <div className="mt-3 font-heading text-2xl font-bold uppercase">Real anatomy</div>
          <p className="mt-3 text-slate-400 text-sm leading-relaxed">
            Every specimen mirrors an actual bone in the human skeleton, classified into axial and appendicular systems.
          </p>
        </div>
        <div className="cyber-corners p-8 bg-[#0d1017]/70 border border-[#1b2234] clip-terminal">
          <div className="font-mono-cyber text-[10px] uppercase tracking-[0.35em] text-[#00ff66]">Community</div>
          <div className="mt-3 font-heading text-2xl font-bold uppercase">Knowledge is access</div>
          <p className="mt-3 text-slate-400 text-sm leading-relaxed">
            Anatomy trials + referrals decide who joins the archive. Skill and network — not just wallets.
          </p>
        </div>
      </div>
    </div>
  );
}
