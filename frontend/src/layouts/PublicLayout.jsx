import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthModal from "@/components/AuthModal";

export default function PublicLayout() {
  const [authOpen, setAuthOpen] = useState(false);
  return (
    <div className="relative min-h-screen bg-[#07080c] text-slate-100 overflow-x-hidden">
      <div className="pointer-events-none fixed inset-0 grid-bg opacity-60" />
      <Navbar onOpenAuth={() => setAuthOpen(true)} />
      <main className="relative">
        <Outlet context={{ openAuth: () => setAuthOpen(true) }} />
      </main>
      <Footer />
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} initialRef={new URLSearchParams(window.location.search).get("ref")} />
    </div>
  );
}
