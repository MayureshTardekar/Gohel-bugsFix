import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { registerUser } from "@/lib/api";
import { useUser } from "@/context/UserContext";
import { toast } from "sonner";
import { Wallet, Loader2, ArrowRight, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AuthModal({ open, onClose, initialRef }) {
  const { signIn } = useUser();
  const [step, setStep] = useState(0); // 0 = X, 1 = Wallet
  const [twitter, setTwitter] = useState("");
  const [wallet, setWallet] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTwitterNext = (e) => {
    e.preventDefault();
    if (!twitter.trim()) {
      toast.error("X username required");
      return;
    }
    setStep(1);
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!/^0x[a-fA-F0-9]{40}$/.test(wallet.trim())) {
      toast.error("Invalid EVM wallet (0x + 40 hex chars)");
      return;
    }
    setLoading(true);
    try {
      const data = await registerUser({
        wallet_address: wallet.trim(),
        twitter_username: twitter.trim(),
        referred_by: initialRef || null,
      });
      signIn(data.user);
      toast.success(data.message || "Linked");
      // reset
      setStep(0);
      setTwitter("");
      setWallet("");
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.detail || "Failed");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setStep(0);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && handleClose()}>
      <DialogContent
        data-testid="auth-modal"
        className="bg-[#0d1017] border border-[#1b2234] text-slate-100 sm:max-w-md p-0 clip-terminal overflow-hidden"
      >
        <div className="relative overflow-hidden">
          {/* Progress indicator */}
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#1b2234]">
            <motion.div
              initial={false}
              animate={{ width: step === 0 ? "50%" : "100%" }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="h-full bg-gradient-to-r from-[#00f0ff] to-[#00ff66]"
            />
          </div>

          <div className="p-8 pt-10">
            <DialogHeader>
              <div className="font-mono-cyber text-[10px] uppercase tracking-[0.35em] text-[#00f0ff] mb-2">
                // Step {step + 1} of 2 · Identity Link
              </div>
              <DialogTitle className="font-editorial text-3xl font-normal text-white">
                {step === 0 ? (
                  <>Your <span className="italic text-[#00f0ff]">handle</span> first.</>
                ) : (
                  <>Now your <span className="italic text-[#00ff66]">wallet</span>.</>
                )}
              </DialogTitle>
              <p className="text-sm text-slate-400 mt-3 font-editorial italic leading-relaxed">
                {step === 0
                  ? "Every specimen in the archive is bound to an X identity."
                  : "The wallet becomes your on-chain skeletal signature."}
              </p>
            </DialogHeader>

            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.form
                  key="step-x"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.4 }}
                  onSubmit={handleTwitterNext}
                  className="mt-8 space-y-5"
                >
                  <div>
                    <Label className="font-mono-cyber text-[10px] uppercase tracking-[0.3em] text-[#00f0ff]">
                      X (Twitter) Username
                    </Label>
                    <div className="relative mt-2">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono-cyber text-slate-500 text-sm">@</span>
                      <Input
                        data-testid="auth-twitter-input"
                        value={twitter}
                        onChange={(e) => setTwitter(e.target.value.replace(/^@/, ""))}
                        placeholder="yourhandle"
                        autoFocus
                        className="pl-8 bg-[#07080c] border-[#1b2234] rounded-none h-12 font-mono-cyber text-sm"
                      />
                    </div>
                  </div>
                  {initialRef && (
                    <div className="px-3 py-2 bg-[#00ff66]/10 border border-[#00ff66]/30 font-mono-cyber text-[11px] uppercase tracking-widest text-[#00ff66]">
                      Referred by: {initialRef}
                    </div>
                  )}
                  <Button
                    type="submit"
                    data-testid="auth-step1-next"
                    className="w-full rounded-none clip-notch h-12 bg-[#00f0ff] hover:bg-[#00f0ff]/90 text-black font-mono-cyber uppercase tracking-widest text-xs"
                  >
                    Continue <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </motion.form>
              )}

              {step === 1 && (
                <motion.form
                  key="step-wallet"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.4 }}
                  onSubmit={submit}
                  className="mt-8 space-y-5"
                >
                  <div className="px-3 py-2 border border-[#1b2234] font-mono-cyber text-[11px] uppercase tracking-widest text-slate-400 flex items-center justify-between">
                    <span>@{twitter}</span>
                    <button type="button" onClick={() => setStep(0)} className="text-[#00f0ff] hover:underline flex items-center gap-1">
                      <ArrowLeft className="w-3 h-3" /> edit
                    </button>
                  </div>
                  <div>
                    <Label className="font-mono-cyber text-[10px] uppercase tracking-[0.3em] text-[#00f0ff]">
                      Wallet Address
                    </Label>
                    <div className="relative mt-2">
                      <Wallet className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <Input
                        data-testid="auth-wallet-input"
                        value={wallet}
                        onChange={(e) => setWallet(e.target.value)}
                        placeholder="0x…"
                        autoFocus
                        className="pl-10 bg-[#07080c] border-[#1b2234] rounded-none h-12 font-mono-cyber text-sm"
                      />
                    </div>
                  </div>
                  <Button
                    type="submit"
                    disabled={loading}
                    data-testid="auth-submit-btn"
                    className="w-full rounded-none clip-notch h-12 bg-[#00ff66] hover:bg-[#00ff66]/90 text-black font-mono-cyber uppercase tracking-widest text-xs"
                  >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Bind Signature"}
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
