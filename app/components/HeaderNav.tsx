"use client";

import React from "react";
import { Sparkles, Compass } from "lucide-react";

interface HeaderNavProps {
  currentAct: number | "what-if";
  onSelectAct: (act: number) => void;
}

export default function HeaderNav({ currentAct, onSelectAct }: HeaderNavProps) {
  const isLightMode = currentAct === 5;
  const isWhatIf = currentAct === "what-if";

  const getActTitle = () => {
    if (isWhatIf) return "MODE KILAS SEMU: ANDAI KITA BERPISAH";
    switch (currentAct) {
      case 1:
        return "BABAK 01 · MUSIM DINGIN (ISOLASI & TITIK TEMU)";
      case 2:
        return "BABAK 02 · MUSIM SEMI (HARMONI & RESEP SEDERHANA)";
      case 3:
        return "BABAK 03 · MUSIM PANAS (ILUSI & RASA RAGU)";
      case 4:
        return "BABAK 04 · MUSIM GUGUR (KATALIS & PERJALANAN 23 JUNI)";
      case 5:
      default:
        return "BABAK 05 · POLARIS (365 HARI & MASA DEPAN KITA)";
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 px-4 sm:px-8 py-3.5 flex items-center justify-between transition-colors duration-700 backdrop-blur-md ${
        isWhatIf
          ? "bg-[#070F0F]/85 border-b border-teal-900/40 text-teal-300"
          : isLightMode
          ? "bg-[#FAF9F6]/85 border-b border-neutral-300 text-neutral-900 shadow-sm"
          : "bg-neutral-950/70 border-b border-white/10 text-white"
      }`}
    >
      {/* Brand & Symbol */}
      <div className="flex items-center gap-3">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
            isWhatIf
              ? "bg-teal-900/60 text-teal-400"
              : isLightMode
              ? "bg-amber-400 text-neutral-950 shadow-[0_0_15px_rgba(251,191,36,0.5)]"
              : "bg-blue-600/30 border border-blue-400/40 text-blue-300"
          }`}
        >
          <Sparkles size={15} />
        </div>
        <div>
          <span className="font-serif text-sm sm:text-base tracking-wider font-bold block leading-none">
            POLARIS
          </span>
          <span className="text-[10px] font-mono opacity-70 tracking-widest uppercase">
            ROBIT & NAIQO · 365 DAYS
          </span>
        </div>
      </div>

      {/* Center Act Status */}
      <div className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-mono tracking-widest uppercase transition-all duration-500">
        <Compass size={13} className="animate-spin" style={{ animationDuration: "12s" }} />
        <span>{getActTitle()}</span>
      </div>

      {/* Act Nav Numbers */}
      <nav className="flex items-center gap-1.5 sm:gap-2" aria-label="Navigasi Babak">
        {[1, 2, 3, 4, 5].map((num) => {
          const isActive = currentAct === num;
          return (
            <button
              key={num}
              onClick={() => onSelectAct(num)}
              className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full text-xs font-mono font-medium transition-all flex items-center justify-center ${
                isActive
                  ? isLightMode
                    ? "bg-neutral-900 text-amber-300 shadow-md scale-110 font-bold"
                    : "bg-amber-400 text-neutral-950 font-bold shadow-[0_0_15px_rgba(251,191,36,0.6)] scale-110"
                  : isLightMode
                  ? "hover:bg-neutral-200 text-neutral-600"
                  : "hover:bg-white/10 text-neutral-400"
              }`}
              title={`Lompat ke Babak ${num}`}
            >
              0{num}
            </button>
          );
        })}
      </nav>
    </header>
  );
}
