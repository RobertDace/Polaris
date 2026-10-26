"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowDown, Heart } from "lucide-react";
import { playChimeSFX, playPopSFX } from "../utils/sfx";

interface HeroCinematicProps {
  onStart: () => void;
}

export default function HeroCinematic({ onStart }: HeroCinematicProps) {
  const handleStart = () => {
    playChimeSFX();
    onStart();
  };

  return (
    <section className="relative min-h-[95vh] flex flex-col justify-center items-center text-center px-4 sm:px-8 py-20 overflow-hidden select-none">
      {/* Radiant Cosmic Aurora */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] sm:w-[700px] h-[380px] sm:h-[700px] rounded-full bg-gradient-to-tr from-blue-950/40 via-emerald-900/25 to-amber-400/15 blur-[100px] pointer-events-none" />

      {/* Narrative Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-amber-300/30 text-amber-300 text-xs font-mono tracking-widest uppercase mb-8 shadow-sm backdrop-blur-md"
      >
        <Sparkles size={14} className="text-amber-400 animate-spin" style={{ animationDuration: "12s" }} />
        <span>UNTUK NAIQO · 365 HARI KITA MENETAP (13 OKTOBER 2025 – 2026)</span>
      </motion.div>

      {/* Cinematic Title */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-4xl space-y-5"
      >
        <h1 className="font-serif text-4xl sm:text-7xl md:text-8xl text-white font-bold tracking-tight leading-[1.08]">
          Kamu Adalah <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-emerald-300 bg-clip-text text-transparent italic">
            Polaris Hidupku.
          </span>
        </h1>

        <p className="font-sans text-sm sm:text-lg md:text-xl text-slate-300/90 font-light max-w-2xl mx-auto leading-relaxed pt-2">
          Bukan tentang menceritakan diriku, tapi tentang bagaimana kehadiranmu menjadi arah tujuanku. Bintang yang tak pernah bergeser, membimbing langkahku untuk berjuang, tumbuh, dan layak mendampingimu di masa depan.
        </p>
      </motion.div>

      {/* Memory Chips */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 my-8"
      >
        <div className="px-4 py-1.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-xs font-mono text-emerald-300 flex items-center gap-2 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Warna Matcha Favoritmu</span>
        </div>
        <div className="px-4 py-1.5 rounded-xl bg-blue-950/40 border border-blue-500/30 text-xs font-mono text-blue-300 flex items-center gap-2 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-blue-400" />
          <span>Rute Probolinggo → Jogja</span>
        </div>
        <div className="px-4 py-1.5 rounded-xl bg-amber-950/40 border border-amber-500/30 text-xs font-mono text-amber-300 flex items-center gap-2 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-amber-400" />
          <span>365 Hari Mengorbit</span>
        </div>
      </motion.div>

      {/* CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="pt-2"
      >
        <button
          onClick={handleStart}
          onMouseEnter={playPopSFX}
          className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-amber-400 to-amber-300 text-neutral-950 font-mono text-xs sm:text-sm font-bold tracking-wider uppercase shadow-[0_0_35px_rgba(251,191,36,0.4)] hover:shadow-[0_0_55px_rgba(251,191,36,0.65)] hover:scale-105 active:scale-95 transition-all flex items-center gap-3 cursor-pointer"
        >
          <span>Jelajahi Cerita Perjalanan Kita</span>
          <ArrowDown size={16} className="group-hover:translate-y-1 transition-transform" />
        </button>
      </motion.div>
    </section>
  );
}
