"use client";

import React, { useState } from "react";
import { Eye, EyeOff, Sparkles, RefreshCcw, HeartHandshake } from "lucide-react";

interface WhatIfToggleProps {
  onHoldStart: () => void;
  onHoldEnd: () => void;
}

export default function WhatIfToggle({ onHoldStart, onHoldEnd }: WhatIfToggleProps) {
  const [isHolding, setIsHolding] = useState(false);
  const [releasedOnce, setReleasedOnce] = useState(false);

  const startHold = () => {
    setIsHolding(true);
    onHoldStart();
  };

  const endHold = () => {
    if (isHolding) {
      setIsHolding(false);
      setReleasedOnce(true);
      onHoldEnd();
    }
  };

  return (
    <div className="w-full my-12 p-8 sm:p-12 rounded-xl bg-white border-2 border-neutral-900 shadow-[8px_8px_0px_#111827] text-neutral-900 flex flex-col items-center justify-center text-center select-none">
      <div className="max-w-xl space-y-4 mb-6">
        <span className="text-[10px] font-mono tracking-widest uppercase px-3 py-1 bg-neutral-900 text-amber-300 font-bold inline-block">
          KILAS SEMU KETAKUTAN KITA
        </span>
        <h3 className="font-serif text-2xl sm:text-4xl font-bold">
          "Andai Dulu Kita Memilih Menyerah..."
        </h3>
        <p className="text-sm text-neutral-600 leading-relaxed font-light">
          Cerita di layar perak sering kali mengajarkan bahwa cinta yang mendalam harus mengalah pada mimpi dan keadaan. Tekan dan <strong>TAHAN</strong> tombol di bawah ini untuk merasakan dunia seperti apa yang tercipta jika kita menuruti ketakutan itu:
        </p>
      </div>

      {/* The Hold Button */}
      <button
        onMouseDown={startHold}
        onMouseUp={endHold}
        onMouseLeave={endHold}
        onTouchStart={startHold}
        onTouchEnd={endHold}
        className={`px-8 py-5 rounded-lg font-mono text-xs sm:text-sm font-black uppercase tracking-wider transition-all duration-300 flex items-center gap-3 cursor-pointer ${
          isHolding
            ? "bg-teal-950 text-teal-300 border-2 border-teal-500 scale-95 shadow-inner"
            : "bg-neutral-900 text-amber-300 hover:bg-neutral-800 active:scale-95 border-2 border-neutral-900 shadow-[6px_6px_0px_#111827]"
        }`}
      >
        {isHolding ? (
          <>
            <EyeOff size={18} className="animate-pulse text-teal-400" />
            <span>Lepaskan untuk Kembali ke Cahaya...</span>
          </>
        ) : (
          <>
            <Eye size={18} />
            <span>TAHAN: MERASAKAN JIKA KITA MENYERAH</span>
          </>
        )}
      </button>

      {/* Epiphany message displayed after release */}
      {releasedOnce && !isHolding && (
        <div className="mt-8 p-6 rounded-lg bg-amber-400/15 border-2 border-amber-500/40 text-neutral-900 max-w-xl animate-in zoom-in-95 duration-500">
          <div className="flex items-center justify-center gap-2 mb-2 text-amber-700 font-bold font-mono text-xs uppercase">
            <HeartHandshake size={16} />
            <span>IKRAR MASA DEPAN KITA</span>
          </div>
          <p className="font-serif text-base sm:text-lg italic leading-relaxed font-medium">
            "Lihat? Berpisah hanya membuat dunia kita sempit, beku, dan kehilangan warnanya. Kita tidak harus berakhir seperti di film-film, Naiqo. Aku memilihmu untuk masa depanku."
          </p>
        </div>
      )}
    </div>
  );
}
