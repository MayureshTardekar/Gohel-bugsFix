import { Bone } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="relative border-t border-[#1b2234] py-12 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 flex items-center justify-center border border-[#00f0ff]/60 clip-terminal bg-[#0d1017]">
              <Bone className="w-5 h-5 text-[#00f0ff]" strokeWidth={1.5} />
            </div>
            <div>
              <div className="font-heading text-lg font-bold tracking-widest">OSTEON</div>
              <div className="font-mono-cyber text-[10px] uppercase tracking-[0.3em] text-slate-500">
                206 human bones · 2060 digital collectibles
              </div>
            </div>
          </div>
          <p className="mt-6 text-sm text-slate-400 max-w-md leading-relaxed">
            A digital collection of the human skeleton. Every bone becomes an on-chain specimen.
          </p>
        </div>
        <div>
          <div className="font-mono-cyber text-[10px] uppercase tracking-[0.35em] text-[#00f0ff] mb-4">Explore</div>
          <div className="space-y-2 text-sm">
            <NavLink to="/collection" className="block text-slate-300 hover:text-[#00f0ff]">Collection</NavLink>
            <NavLink to="/quests" className="block text-slate-300 hover:text-[#00f0ff]">Quests</NavLink>
            <NavLink to="/leaderboard" className="block text-slate-300 hover:text-[#00f0ff]">Leaderboard</NavLink>
          </div>
        </div>
        <div>
          <div className="font-mono-cyber text-[10px] uppercase tracking-[0.35em] text-[#00f0ff] mb-4">Network</div>
          <div className="space-y-2 text-sm">
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="block text-slate-300 hover:text-[#00f0ff]">X / Twitter</a>
            <a href="#" className="block text-slate-300 hover:text-[#00f0ff]">Discord</a>
            <a href="#" className="block text-slate-300 hover:text-[#00f0ff]">Documentation</a>
            <NavLink to="/admin" data-testid="footer-admin-link" className="block text-slate-500 hover:text-[#00f0ff]">Admin</NavLink>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mt-10 pt-6 border-t border-[#1b2234] font-mono-cyber text-[10px] uppercase tracking-widest text-slate-500 flex justify-between">
        <span>© 2026 Osteon Labs</span>
        <span>Specimen catalog v1.0</span>
      </div>
    </footer>
  );
}
