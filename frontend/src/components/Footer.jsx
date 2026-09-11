import { Bone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative border-t border-[#1b2234] py-12 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 flex items-center justify-center border border-[#00f0ff]/60 clip-terminal bg-[#0d1017]">
            <Bone className="w-5 h-5 text-[#00f0ff]" strokeWidth={1.5} />
          </div>
          <div>
            <div className="font-heading text-lg font-bold tracking-widest">OSTEON</div>
            <div className="font-mono-cyber text-[10px] uppercase tracking-[0.3em] text-slate-500">
              206 bones · one blueprint
            </div>
          </div>
        </div>
        <div className="font-mono-cyber text-[10px] uppercase tracking-widest text-slate-500">
          © 2026 Osteon Labs · <a href="/admin" className="hover:text-[#00f0ff]" data-testid="footer-admin-link">Admin</a>
        </div>
      </div>
    </footer>
  );
}
