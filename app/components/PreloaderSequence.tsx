"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Compass } from "lucide-react";
import { playChimeSFX } from "../utils/sfx";

interface PreloaderSequenceProps {
  onComplete: () => void;
}

export default function PreloaderSequence({ onComplete }: PreloaderSequenceProps) {
  const [progress, setProgress] = useState(0);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    // Check if user already saw the intro in this session
    const seen = sessionStorage.getItem("polaris_intro_seen");
    if (seen) {
      onComplete();
      return;
    }

    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 8) + 4;
      if (current >= 100) {
        current = 100;
        setProgress(100);
        clearInterval(interval);
        playChimeSFX();

        setTimeout(() => {
          setIsLeaving(true);
          sessionStorage.setItem("polaris_intro_seen", "true");
          setTimeout(() => {
            onComplete();
          }, 800);
        }, 400);
      } else {
        setProgress(current);
      }
    }, 70);

    return () => clearInterval(interval);
  }, [onComplete]);

  const handleSkip = () => {
    sessionStorage.setItem("polaris_intro_seen", "true");
    setIsLeaving(true);
    setTimeout(() => {
      onComplete();
    }, 300);
  };

  return (
    <AnimatePresence>
      {!isLeaving && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(12px)", transition: { duration: 0.8 } }}
          className="fixed inset-0 z-[10000] bg-[#070b14] flex flex-col items-center justify-center select-none text-white overflow-hidden"
        >
          {/* Subtle Cosmic Background Aurora */}
          <div className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-blue-900/20 via-emerald-900/15 to-amber-400/20 blur-[100px] pointer-events-none" />

          {/* Central Floating Polaris Emblem */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex flex-col items-center space-y-6"
          >
            <div className="relative w-20 h-20 rounded-full border border-amber-300/40 bg-white/5 backdrop-blur-md flex items-center justify-center shadow-[0_0_50px_rgba(255,215,0,0.3)]">
              <Compass size={38} className="text-amber-300 animate-spin" style={{ animationDuration: "12s" }} />
              <Sparkles size={16} className="text-emerald-400 absolute -top-1 -right-1 animate-pulse" />
            </div>

            <div className="text-center space-y-1.5">
              <p className="text-[11px] font-mono tracking-[0.35em] text-amber-300 font-bold uppercase">
                POLARIS · 365 HARI
              </p>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Mempersiapkan Orbit Kenangan...
              </h2>
            </div>
          </motion.div>

          {/* Lower Numeric Counter */}
          <div className="absolute bottom-12 flex flex-col items-center space-y-2">
            <div className="flex items-baseline gap-1 font-mono">
              <span className="text-5xl sm:text-6xl font-light text-white tracking-tighter">
                {progress}
              </span>
              <span className="text-xl text-amber-300 font-bold">%</span>
            </div>

            <button
              onClick={handleSkip}
              className="text-[11px] font-mono text-slate-400 hover:text-white transition-colors uppercase tracking-widest pt-3 cursor-pointer"
            >
              Lewati Intro ➔
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
