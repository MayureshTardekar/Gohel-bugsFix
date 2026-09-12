import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

/**
 * Cinematic ambient drone using Web Audio API.
 * No external file — synthesized in-browser.
 * Auto-starts on first user gesture, fades in over 6s.
 */
export default function AmbientAudio() {
  const [ready, setReady] = useState(false);
  const [muted, setMuted] = useState(false);
  const [started, setStarted] = useState(false);
  const ctxRef = useRef(null);
  const masterGainRef = useRef(null);
  const nodesRef = useRef([]);

  useEffect(() => {
    const startAudio = () => {
      if (started) return;
      setStarted(true);
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        const ctx = new AudioCtx();
        ctxRef.current = ctx;

        // Master gain with fade-in
        const master = ctx.createGain();
        master.gain.value = 0;
        master.connect(ctx.destination);
        masterGainRef.current = master;

        // Simple reverb-ish delay for depth
        const delay = ctx.createDelay();
        delay.delayTime.value = 0.4;
        const feedback = ctx.createGain();
        feedback.gain.value = 0.35;
        delay.connect(feedback);
        feedback.connect(delay);
        delay.connect(master);

        // Lowpass filter for warmth
        const filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.value = 900;
        filter.Q.value = 0.7;
        filter.connect(master);
        filter.connect(delay);

        // Layered detuned drone: root, fifth, octave
        const freqs = [
          { f: 55, g: 0.28, det: -6 },   // low A
          { f: 82.5, g: 0.14, det: 5 },  // E (fifth)
          { f: 110, g: 0.09, det: -3 },  // A octave
          { f: 165, g: 0.05, det: 8 },   // E higher
        ];

        freqs.forEach(({ f, g, det }) => {
          const osc = ctx.createOscillator();
          osc.type = "sine";
          osc.frequency.value = f;
          osc.detune.value = det;

          const oscGain = ctx.createGain();
          oscGain.gain.value = g;

          // Slow LFO on amplitude
          const lfo = ctx.createOscillator();
          lfo.frequency.value = 0.08 + Math.random() * 0.1;
          const lfoGain = ctx.createGain();
          lfoGain.gain.value = g * 0.4;
          lfo.connect(lfoGain);
          lfoGain.connect(oscGain.gain);

          osc.connect(oscGain);
          oscGain.connect(filter);

          osc.start();
          lfo.start();

          nodesRef.current.push(osc, lfo);
        });

        // Subtle high shimmer — filtered noise pulse
        const noiseBufferSize = ctx.sampleRate * 4;
        const noiseBuffer = ctx.createBuffer(1, noiseBufferSize, ctx.sampleRate);
        const noiseData = noiseBuffer.getChannelData(0);
        for (let i = 0; i < noiseBufferSize; i++) noiseData[i] = (Math.random() * 2 - 1) * 0.15;
        const noise = ctx.createBufferSource();
        noise.buffer = noiseBuffer;
        noise.loop = true;
        const noiseFilter = ctx.createBiquadFilter();
        noiseFilter.type = "bandpass";
        noiseFilter.frequency.value = 2000;
        noiseFilter.Q.value = 4;
        const noiseGain = ctx.createGain();
        noiseGain.gain.value = 0.04;
        noise.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        noiseGain.connect(master);
        noise.start();
        nodesRef.current.push(noise);

        // Fade in over 6s
        master.gain.linearRampToValueAtTime(0.28, ctx.currentTime + 6);
        setReady(true);
      } catch (e) {
        // Web Audio not supported — silent fail
      }
    };

    const handleGesture = () => {
      startAudio();
      window.removeEventListener("pointerdown", handleGesture);
      window.removeEventListener("keydown", handleGesture);
      window.removeEventListener("scroll", handleGesture);
    };

    window.addEventListener("pointerdown", handleGesture, { once: true });
    window.addEventListener("keydown", handleGesture, { once: true });
    window.addEventListener("scroll", handleGesture, { once: true });

    return () => {
      window.removeEventListener("pointerdown", handleGesture);
      window.removeEventListener("keydown", handleGesture);
      window.removeEventListener("scroll", handleGesture);
      nodesRef.current.forEach((n) => {
        try { n.stop && n.stop(); } catch {}
      });
      if (ctxRef.current) {
        try { ctxRef.current.close(); } catch {}
      }
    };
  }, [started]);

  const toggle = () => {
    if (!ctxRef.current || !masterGainRef.current) return;
    const ctx = ctxRef.current;
    const master = masterGainRef.current;
    if (muted) {
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.linearRampToValueAtTime(0.28, ctx.currentTime + 1);
      setMuted(false);
    } else {
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.8);
      setMuted(true);
    }
  };

  return (
    <AnimatePresence>
      {ready && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          onClick={toggle}
          data-testid="ambient-audio-toggle"
          className="fixed bottom-6 right-6 z-40 group flex items-center gap-3 px-4 py-3 backdrop-blur-xl bg-[#0d1017]/80 border border-[#1b2234] hover:border-[#00f0ff]/60 clip-notch text-xs font-mono-cyber uppercase tracking-widest"
          aria-label={muted ? "Enable ambient sound" : "Mute ambient sound"}
        >
          <div className="relative">
            {muted ? (
              <VolumeX className="w-4 h-4 text-slate-400 group-hover:text-[#00f0ff]" />
            ) : (
              <Volume2 className="w-4 h-4 text-[#00f0ff]" />
            )}
            {!muted && (
              <motion.span
                animate={{ scale: [1, 1.6, 1], opacity: [0.6, 0, 0.6] }}
                transition={{ duration: 2.4, repeat: Infinity }}
                className="absolute -inset-1 rounded-full border border-[#00f0ff]/40"
              />
            )}
          </div>
          <span className="text-slate-300 group-hover:text-white">
            {muted ? "Sound off" : "Ambient"}
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
