import { useUser } from "@/context/UserContext";
import { Button } from "@/components/ui/button";
import { Menu, Bone, Copy, LogOut } from "lucide-react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const LINKS = [
  { to: "/archive", label: "Archive" },
  { to: "/collection", label: "Collection" },
  { to: "/quests", label: "Quests" },
  { to: "/leaderboard", label: "Leaderboard" },
  { to: "/about", label: "About" },
];

export default function Navbar({ onOpenAuth }) {
  const { user, signOut } = useUser();
  const [mobileOpen, setMobileOpen] = useState(false);
  const nav = useNavigate();

  const truncate = (s) => s ? `${s.slice(0, 6)}…${s.slice(-4)}` : "";

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#07080c]/80 border-b border-[#1b2234]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex items-center justify-between gap-4">
        <NavLink to="/" className="flex items-center gap-3 group" data-testid="nav-logo">
          <div className="relative w-9 h-9 flex items-center justify-center border border-[#00f0ff]/60 clip-terminal bg-[#0d1017]">
            <Bone className="w-5 h-5 text-[#00f0ff]" strokeWidth={1.5} />
          </div>
          <div className="leading-none">
            <div className="font-heading text-xl font-bold tracking-[0.15em] text-white">OSTEON</div>
            <div className="font-mono-cyber text-[10px] uppercase tracking-[0.3em] text-[#00f0ff]">206 BONES · DIGITAL ARCHIVE</div>
          </div>
        </NavLink>
        <nav className="hidden lg:flex items-center gap-1">
          {LINKS.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              data-testid={`nav-${l.label.toLowerCase()}`}
              className={({ isActive }) =>
                `px-4 py-2 text-sm font-mono-cyber uppercase tracking-widest ${
                  isActive ? "text-[#00f0ff]" : "text-slate-400 hover:text-[#00f0ff]"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  data-testid="wallet-badge"
                  className="flex items-center gap-2 px-4 py-2 border border-[#00f0ff]/40 bg-[#00f0ff]/5 hover:bg-[#00f0ff]/10 clip-notch font-mono-cyber text-xs text-[#00f0ff]"
                >
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#00ff66]" />
                  {truncate(user.wallet_address)}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-[#0d1017] border-[#1b2234] text-slate-100">
                <DropdownMenuLabel className="font-mono-cyber text-xs">@{user.twitter_username}</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-[#1b2234]" />
                <DropdownMenuItem
                  onClick={() => {
                    navigator.clipboard.writeText(user.wallet_address);
                    toast.success("Wallet copied");
                  }}
                  className="cursor-pointer"
                  data-testid="menu-copy-wallet"
                >
                  <Copy className="w-4 h-4 mr-2" /> Copy address
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => { signOut(); nav("/"); }} className="cursor-pointer" data-testid="menu-signout">
                  <LogOut className="w-4 h-4 mr-2" /> Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              onClick={onOpenAuth}
              data-testid="nav-link-wallet-btn"
              className="rounded-none clip-notch bg-[#00f0ff] hover:bg-[#00f0ff]/90 text-black font-mono-cyber uppercase tracking-widest text-xs px-5 py-5"
            >
              Connect
            </Button>
          )}
          <button
            className="lg:hidden p-2 border border-[#1b2234]"
            onClick={() => setMobileOpen(!mobileOpen)}
            data-testid="mobile-menu-toggle"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>
      {mobileOpen && (
        <div className="lg:hidden border-t border-[#1b2234] bg-[#0d1017]">
          {LINKS.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `block px-6 py-4 text-sm font-mono-cyber uppercase tracking-widest border-b border-[#1b2234] ${
                  isActive ? "text-[#00f0ff]" : "text-slate-300"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
          {user ? (
            <button
              type="button"
              onClick={() => {
                signOut();
                setMobileOpen(false);
                nav("/");
              }}
              data-testid="mobile-menu-signout"
              className="flex w-full items-center gap-3 px-6 py-4 text-left text-sm font-mono-cyber uppercase tracking-widest text-[#ff6b6b] border-b border-[#1b2234]"
            >
              <LogOut className="w-4 h-4" />
              Sign out
            </button>
          ) : null}
        </div>
      )}
    </header>
  );
}
