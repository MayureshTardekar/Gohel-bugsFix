import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Concept from "@/components/Concept";
import Tasks from "@/components/Tasks";
import QualificationTest from "@/components/QualificationTest";
import Referral from "@/components/Referral";
import Leaderboard from "@/components/Leaderboard";
import Footer from "@/components/Footer";
import AuthModal from "@/components/AuthModal";
import { useSearchParams } from "react-router-dom";

export default function Landing() {
  const { user } = useUser();
  const [authOpen, setAuthOpen] = useState(false);
  const [initialRef, setInitialRef] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref");
    if (ref) setInitialRef(ref);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#07080c] text-slate-100 overflow-x-hidden">
      <div className="pointer-events-none fixed inset-0 grid-bg opacity-60" />
      <Navbar onOpenAuth={() => setAuthOpen(true)} />
      <main className="relative">
        <Hero onCta={() => setAuthOpen(true)} />
        <Concept />
        <Tasks onOpenAuth={() => setAuthOpen(true)} />
        <QualificationTest onOpenAuth={() => setAuthOpen(true)} />
        <Referral onOpenAuth={() => setAuthOpen(true)} />
        <Leaderboard />
      </main>
      <Footer />
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} initialRef={initialRef} />
    </div>
  );
}
