"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, Sparkles, Award, ArrowUp, HeartHandshake, Compass } from "lucide-react";
import confetti from "canvas-confetti";
import { playChimeSFX, playPopSFX } from "../utils/sfx";
import WhatIfToggle from "./WhatIfToggle";
import { worldBridge } from "../world/WorldBridge";

interface Act5PolarisProps {
  onOpenPromiseModal: () => void;
  onHoldWhatIfStart: () => void;
  onHoldWhatIfEnd: () => void;
}

export default function Act5Polaris({
  onOpenPromiseModal,
  onHoldWhatIfStart,
  onHoldWhatIfEnd,
}: Act5PolarisProps) {
  const [timeDiff, setTimeDiff] = useState({
    days: 365,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const handleUnlockPromise = () => {
    playChimeSFX();
    try {
      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.6 },
        colors: ["#FFD700", "#00C853", "#0047FF", "#FFFFFF"],
      });
    } catch {}
    onOpenPromiseModal();
  };

  useEffect(() => {
    const startDate = new Date("2025-10-13T00:00:00").getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const diff = Math.max(0, now - startDate);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeDiff({ days, hours, minutes, seconds });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section
      id="act-5"
      className="min-h-screen py-24 px-4 sm:px-8 max-w-6xl mx-auto flex flex-col justify-center relative z-10 text-neutral-900 select-none"
    >
      {/* Immersive Polaris Starlight Aura in Background */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[750px] h-[750px] rounded-full bg-gradient-to-tr from-[#0047FF]/15 via-[#00C853]/15 to-[#FFD700]/25 blur-[120px]" />
      </div>

      {/* Chapter Indicator & Editorial Intro */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-12 text-center max-w-3xl mx-auto"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFD700] border-2 border-neutral-950 text-neutral-950 text-xs font-mono font-black tracking-widest uppercase shadow-[4px_4px_0px_#000]">
          <Award size={15} />
          <span>BABAK 05 · POLARIS (365 HARI MENGORBIT BERSAMA)</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-6xl text-neutral-950 font-bold tracking-tight mt-4 leading-tight">
          Bukan Akhir yang Menyerah, <br />
          <span className="bg-gradient-to-r from-[#0047FF] via-[#00C853] to-[#FFD700] bg-clip-text text-transparent italic">
            Melainkan Arah Tujuan Hidupku.
          </span>
        </h2>

        <p className="text-neutral-700 text-sm sm:text-base font-light mt-3 leading-relaxed max-w-2xl mx-auto">
          Kisah-kisah di film sering kali memilih berpisah saat terbentur impian dan keadaan. Namun di kisah nyata kita, aku memilihmu sebagai <strong>Polaris</strong>—bintang penunjuk arah hidupku untuk berjuang, mapan, dan membuktikan janjiku.
        </p>
      </motion.div>

      {/* 1. Orbit Milestone Ribbon & Counter (365 Days) */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.15 }}
        className="p-6 sm:p-10 rounded-3xl bg-white border-2 border-neutral-950 shadow-[8px_8px_0px_#000000] mb-12 flex flex-col lg:flex-row items-center justify-between gap-8"
      >
        <div className="space-y-2 text-center lg:text-left">
          <span className="text-[10px] font-mono tracking-widest uppercase px-3 py-1 rounded bg-emerald-100 text-[#00C853] border border-emerald-400 font-black">
            ORBIT SEJAK 13 OKTOBER 2025
          </span>
          <h3 className="font-serif text-2xl sm:text-4xl font-bold text-neutral-950">
            365 Hari Kita Menetap Bersama
          </h3>
          <p className="text-xs sm:text-sm text-neutral-600 font-light max-w-lg">
            Satu tahun penuh tawa, keraguan yang kita lalui berdua, dan perjalanan nyata yang membuktikan bahwa kita tidak pernah salah saling menemukan.
          </p>
        </div>

        {/* Live Counter Grid with Primary Accents */}
        <div className="grid grid-cols-4 gap-2.5 sm:gap-4 text-center flex-shrink-0">
          <div className="p-3 sm:p-5 rounded-2xl bg-[#FFF9DB] border-2 border-neutral-950 shadow-[4px_4px_0px_#000]">
            <span className="block font-mono text-2xl sm:text-4xl font-black text-amber-500">
              {timeDiff.days}
            </span>
            <span className="text-[9px] font-mono text-neutral-600 uppercase font-black">HARI</span>
          </div>
          <div className="p-3 sm:p-5 rounded-2xl bg-[#E8F5E9] border-2 border-neutral-950 shadow-[4px_4px_0px_#000]">
            <span className="block font-mono text-2xl sm:text-4xl font-black text-[#00C853]">
              {timeDiff.hours}
            </span>
            <span className="text-[9px] font-mono text-neutral-600 uppercase font-black">JAM</span>
          </div>
          <div className="p-3 sm:p-5 rounded-2xl bg-[#E3F2FD] border-2 border-neutral-950 shadow-[4px_4px_0px_#000]">
            <span className="block font-mono text-2xl sm:text-4xl font-black text-[#0047FF]">
              {timeDiff.minutes}
            </span>
            <span className="text-[9px] font-mono text-neutral-600 uppercase font-black">MENIT</span>
          </div>
          <div className="p-3 sm:p-5 rounded-2xl bg-neutral-100 border-2 border-neutral-950 shadow-[4px_4px_0px_#000]">
            <span className="block font-mono text-2xl sm:text-4xl font-black text-neutral-900">
              {timeDiff.seconds}
            </span>
            <span className="text-[9px] font-mono text-neutral-600 uppercase font-black">DETIK</span>
          </div>
        </div>
      </motion.div>

      {/* 2. Dual Spectrum Vow Harmony (Non-Bento Interlocking Layout) */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative p-6 sm:p-10 rounded-3xl bg-gradient-to-r from-[#E8F5E9] via-white to-[#E3F2FD] border-2 border-neutral-950 shadow-[8px_8px_0px_#000] mb-12"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          {/* Naiqo Side */}
          <div className="space-y-3 p-6 rounded-2xl bg-white/80 border border-emerald-400/40 shadow-sm">
            <span className="text-[10px] font-mono font-black text-[#00C853] uppercase tracking-widest block">
              NAIQO · HIJAU MATCHA & CAHAYA MURNI
            </span>
            <h4 className="font-serif text-xl sm:text-2xl font-bold text-neutral-900">
              Polaris yang Menenangkan
            </h4>
            <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-light">
              Aku ingin kamu memandang dirimu seperti caraku melihatmu: wanita tangguh dengan kehangatan matcha yang menyejukkan, yang impian Moscow-nya layak diperjuangkan bersama.
            </p>
          </div>

          {/* Robit Side */}
          <div className="space-y-3 p-6 rounded-2xl bg-white/80 border border-blue-400/40 shadow-sm">
            <span className="text-[10px] font-mono font-black text-[#0047FF] uppercase tracking-widest block">
              ROBIT · BIRU ELEKTRIK & JANJI TUMBUH MAPAN
            </span>
            <h4 className="font-serif text-xl sm:text-2xl font-bold text-neutral-900">
              Arah Langkah & Kompas Juang
            </h4>
            <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-light">
              Kekurangan fisik dan materiku bukan alasan untuk menyerah. Bagiku, kamu adalah arah kompas untuk bekerja lebih keras agar kelak aku layak menjadi pasangan masa depanmu.
            </p>
          </div>

        </div>
      </motion.div>

      {/* 3. The Interactive Real 3D Polaris Star Centerpiece Focus Ring */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center justify-center my-8 relative"
      >
        <div className="relative flex flex-col items-center">
          <button
            onClick={handleUnlockPromise}
            className="group relative px-8 py-6 rounded-3xl bg-neutral-950/85 border-2 border-amber-400 text-white shadow-[0_0_50px_rgba(255,215,0,0.35)] backdrop-blur-xl hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer flex flex-col items-center gap-3 text-center max-w-md"
            title="Klik untuk membuka Surat Rahasia & Kotak Janji Robit"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400 via-emerald-400 to-blue-500 p-0.5 animate-spin" style={{ animationDuration: "14s" }}>
              <div className="w-full h-full rounded-full bg-neutral-950 flex items-center justify-center text-amber-300">
                <Sparkles size={28} className="group-hover:rotate-45 transition-transform" />
              </div>
            </div>

            <div>
              <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-widest block">
                BINTANG POLARIS 3D TERFOKUS DI LATAR DUNIA
              </span>
              <h4 className="font-serif text-xl sm:text-2xl font-bold text-white mt-1">
                Buka Kotak Janji & Surat Rahasia
              </h4>
              <p className="text-xs text-neutral-300 font-light mt-1.5 leading-relaxed">
                Sentuh untuk membuka ikrar masa depan dan surat satu tahun yang kutulis khusus untukmu.
              </p>
            </div>

            <div className="px-5 py-2 rounded-full bg-amber-400 text-neutral-950 text-xs font-mono font-black uppercase flex items-center gap-2 shadow-lg group-hover:bg-amber-300 transition-colors">
              <Star size={14} fill="currentColor" />
              <span>Buka Surat Sekarang →</span>
            </div>
          </button>
        </div>
      </motion.div>

      {/* 4. The Subversive "What If" Hold/Release Experience */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <WhatIfToggle
          onHoldStart={onHoldWhatIfStart}
          onHoldEnd={onHoldWhatIfEnd}
        />
      </motion.div>

      {/* Epilogue Back to Top */}
      <div className="text-center pt-10 pb-6 space-y-3">
        <button
          onClick={scrollToTop}
          className="inline-flex items-center gap-2 text-xs font-mono font-bold text-neutral-700 hover:text-neutral-950 transition-colors cursor-pointer"
        >
          <ArrowUp size={14} />
          <span>Kembali ke Awal Cerita</span>
        </button>
        <p className="text-xs font-mono text-neutral-500 uppercase tracking-widest block">
          POLARIS · ROBIT & NAIQO · HAPPY 1ST ANNIVERSARY
        </p>
      </div>
    </section>
  );
}
