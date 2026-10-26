"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { Star, Sparkles, Compass, Heart } from "lucide-react";

interface PolarisStarProps {
  onUnlockPromise: () => void;
}

export default function PolarisStar({ onUnlockPromise }: PolarisStarProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    // Starlight golden and matcha confetti burst
    try {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#FFD700", "#4ADE80", "#1D4ED8", "#FAF9F6"],
      });
    } catch {
      // Ignore if canvas-confetti has issues in test
    }
    onUnlockPromise();
  };

  return (
    <div className="relative flex flex-col items-center justify-center my-12 select-none">
      {/* Concentric Glow Rings */}
      <div
        className={`absolute w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-gradient-to-tr from-amber-400/20 via-emerald-400/15 to-blue-500/10 blur-3xl transition-transform duration-700 pointer-events-none ${
          isHovered ? "scale-125 opacity-100" : "scale-100 opacity-70"
        }`}
      />

      <div
        className="absolute w-36 h-36 sm:w-44 sm:h-44 rounded-full border border-amber-300/30 animate-spin pointer-events-none"
        style={{ animationDuration: "25s" }}
      />
      <div
        className="absolute w-28 h-28 sm:w-36 sm:h-36 rounded-full border border-emerald-400/20 animate-spin pointer-events-none"
        style={{ animationDuration: "18s", animationDirection: "reverse" }}
      />

      {/* Main Interactive Polaris Centerpiece */}
      <button
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative z-10 w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-amber-300 via-amber-200 to-white flex items-center justify-center text-neutral-950 shadow-[0_0_50px_rgba(251,191,36,0.65),0_0_80px_rgba(74,222,128,0.35)] hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer group"
        title="Sentuh Bintang Polaris"
      >
        <Star
          size={42}
          fill="currentColor"
          className="text-neutral-950 group-hover:rotate-45 transition-transform duration-500"
        />
        <div className="absolute inset-0 rounded-full border-2 border-white/80 animate-ping opacity-25" />
      </button>

      {/* Star Caption & Helper */}
      <div className="mt-6 text-center space-y-1 relative z-10">
        <span className="text-xs font-mono font-bold tracking-widest text-neutral-900 uppercase flex items-center justify-center gap-1.5">
          <Sparkles size={13} className="text-amber-500" />
          <span>BINTANG POLARIS · THE GUIDING LIGHT</span>
          <Sparkles size={13} className="text-emerald-600" />
        </span>
        <p className="text-[11px] font-mono text-neutral-600">
          Klik bintang di atas untuk membuka Surat Rahasia & Janji Robit
        </p>
      </div>
    </div>
  );
}
