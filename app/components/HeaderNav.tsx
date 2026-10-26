"use client";

import React from "react";
import { Sparkles, Compass, Star, Layers, Orbit } from "lucide-react";
import { ActId } from "../world/WorldBridge";
import { playPopSFX, playChimeSFX } from "../utils/sfx";

interface HeaderNavProps {
  currentAct: ActId;
  onSelectAct: (act: number) => void;
  viewMode?: "scroll" | "voyage";
  onToggleViewMode?: () => void;
  onOpenPromiseModal?: () => void;
}

export default function HeaderNav({
  currentAct,
  onSelectAct,
  viewMode = "scroll",
  onToggleViewMode,
  onOpenPromiseModal,
}: HeaderNavProps) {
  const isLightMode = currentAct === 5 && viewMode === "scroll";
  const isWhatIf = currentAct === "what-if";

  const getActTitle = () => {
    if (isWhatIf) return "MODE KILAS SEMU: ANDAI KITA MENYERAH";
    switch (currentAct) {
      case 1:
        return "BABAK 01 · MUSIM DINGIN (02:14 AM)";
      case 2:
        return "BABAK 02 · MUSIM SEMI (AGLIO OLIO)";
      case 3:
        return "BABAK 03 · MUSIM PANAS (RASA RAGU VS TEKAD)";
      case 4:
        return "BABAK 04 · MUSIM GUGUR (RUTE 23 JUNI & MOSCOW)";
      case 5:
      default:
        return "BABAK 05 · POLARIS (365 HARI BERSAMA)";
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 px-4 sm:px-8 py-3 flex items-center justify-between gap-4 transition-colors duration-700 backdrop-blur-md ${
        isWhatIf
          ? "bg-[#070F0F]/90 border-b border-teal-900/40 text-teal-300"
          : isLightMode
          ? "bg-[#FAF9F6]/90 border-b border-neutral-300 text-neutral-900 shadow-sm"
          : "bg-neutral-950/75 border-b border-white/10 text-white"
      }`}
    >
      {/* Brand & Symbol */}
      <div className="flex items-center gap-3 shrink-0">
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
      <div
        className={`hidden xl:flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-[11px] font-mono tracking-widest uppercase transition-all duration-500 ${
          isLightMode
            ? "border-neutral-300 bg-white/80 text-neutral-800"
            : "border-white/15 bg-white/5 text-slate-200"
        }`}
      >
        <Compass size={13} className="animate-spin" style={{ animationDuration: "12s" }} />
        <span>{getActTitle()}</span>
      </div>

      {/* Right Navigation Controls */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Act Nav Numbers */}
        <nav className="flex items-center gap-1 sm:gap-1.5" aria-label="Navigasi Babak">
          {[1, 2, 3, 4, 5].map((num) => {
            const isActive = currentAct === num;
            return (
              <button
                key={num}
                onClick={() => {
                  playPopSFX();
                  onSelectAct(num);
                }}
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full text-xs font-mono tabular-nums font-medium transition-all flex items-center justify-center cursor-pointer ${
                  isActive
                    ? isLightMode
                      ? "bg-neutral-900 text-amber-300 shadow-md scale-110 font-bold"
                      : "bg-amber-400 text-neutral-950 font-bold shadow-[0_0_15px_rgba(251,191,36,0.6)] scale-110"
                    : isLightMode
                    ? "hover:bg-neutral-200 text-neutral-600"
                    : "hover:bg-white/10 text-neutral-400"
                }`}
                title={`Lompat ke Babak 0${num}`}
              >
                0{num}
              </button>
            );
          })}
        </nav>

        {/* View Mode Switcher: Scroll Cerita vs Portal 3D */}
        {onToggleViewMode && (
          <button
            onClick={() => {
              playPopSFX();
              onToggleViewMode();
            }}
            className={`px-3 py-1.5 rounded-full border text-[11px] font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              viewMode === "voyage"
                ? "bg-cyan-400 text-neutral-950 border-cyan-300 shadow-[0_0_20px_rgba(0,245,212,0.5)]"
                : isLightMode
                ? "bg-neutral-900 text-white border-neutral-900 hover:bg-neutral-800"
                : "bg-white/10 text-cyan-300 border-cyan-400/40 hover:bg-white/20"
            }`}
            title={
              viewMode === "scroll"
                ? "Beralih ke Mode Jelajah Portal 3D Layar Penuh"
                : "Kembali ke Mode Cerita Lengkap (Scroll 5 Babak)"
            }
          >
            {viewMode === "scroll" ? (
              <>
                <Orbit size={13} />
                <span className="hidden sm:inline">Mode Portal 3D</span>
              </>
            ) : (
              <>
                <Layers size={13} />
                <span>Mode Cerita Lengkap</span>
              </>
            )}
          </button>
        )}

        {/* Quick Promise Box Button */}
        {onOpenPromiseModal && (
          <button
            onClick={() => {
              playChimeSFX();
              onOpenPromiseModal();
            }}
            className={`px-3 py-1.5 rounded-full border text-[11px] font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              isLightMode
                ? "bg-amber-400 text-neutral-950 border-neutral-900 shadow-[2px_2px_0px_#111827] hover:bg-amber-300"
                : "bg-amber-400/15 text-amber-300 border-amber-400/40 hover:bg-amber-400 hover:text-neutral-950"
            }`}
            title="Buka Surat Rahasia & Kotak Janji Robit"
          >
            <Star size={12} fill="currentColor" />
            <span className="hidden md:inline">Kotak Janji</span>
          </button>
        )}
      </div>
    </header>
  );
}
