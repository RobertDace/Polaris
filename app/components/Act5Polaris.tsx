"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, Sparkles, Award, ArrowUp, Box } from "lucide-react";
import confetti from "canvas-confetti";
import { playChimeSFX, playPopSFX } from "../utils/sfx";
import WhatIfToggle from "./WhatIfToggle";
import ThreePolarisStar3D from "./ThreePolarisStar3D";
import ModelViewerGLB from "./ModelViewerGLB";

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
  const [starMode, setStarMode] = useState<"procedural" | "glb">("procedural");

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
          <span className="bg-gradient-to-r from-[#0047FF] via-[#00C853] to-[#D97706] bg-clip-text text-transparent italic">
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
        <div className="grid grid-cols-4 gap-2.5 sm:gap-4 text-center shrink-0 tabular-nums">
          <div className="p-3 sm:p-5 rounded-2xl bg-[#FFF9DB] border-2 border-neutral-950 shadow-[4px_4px_0px_#000]">
            <span className="block font-mono text-2xl sm:text-4xl font-black text-amber-600">
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

      {/* 2. Dual Spectrum Vow Harmony */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative p-6 sm:p-10 rounded-3xl bg-gradient-to-r from-[#E8F5E9] via-white to-[#E3F2FD] border-2 border-neutral-950 shadow-[8px_8px_0px_#000] mb-12"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          {/* Naiqo Side */}
          <div className="space-y-3 p-6 rounded-2xl bg-white/90 border border-emerald-400/50 shadow-sm">
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
          <div className="space-y-3 p-6 rounded-2xl bg-white/90 border border-blue-400/50 shadow-sm">
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

      {/* 3. The Interactive Real 3D Polaris Star Centerpiece & Secret Letter Trigger */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center justify-center my-6 relative"
      >
        {/* Mode Switcher for Polaris 3D Centerpiece */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-neutral-900 text-white border-2 border-neutral-950 shadow-[4px_4px_0px_#000] mb-2">
          <button
            onClick={() => { playPopSFX(); setStarMode("procedural"); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
              starMode === "procedural"
                ? "bg-amber-400 text-neutral-950 font-black"
                : "text-neutral-300 hover:text-white"
            }`}
          >
            Bintang Giroskop 3D
          </button>
          <button
            onClick={() => { playPopSFX(); setStarMode("glb"); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer ${
              starMode === "glb"
                ? "bg-amber-400 text-neutral-950 font-black"
                : "text-neutral-300 hover:text-white"
            }`}
          >
            <Box size={12} />
            <span>Kompas Bintang (.GLB)</span>
          </button>
        </div>

        {starMode === "procedural" ? (
          <ThreePolarisStar3D onUnlockPromise={handleUnlockPromise} />
        ) : (
          <div className="w-full max-w-md my-6">
            <ModelViewerGLB
              modelPath="/models/act5-polaris.glb"
              fallbackTitle="Kompas Bintang Polaris (.GLB)"
              accentColor="#FFD700"
              className="w-full h-80"
            />
          </div>
        )}

        {/* Prominent Button to Unlock Promise Modal */}
        <button
          onClick={handleUnlockPromise}
          className="group relative px-8 py-5 rounded-2xl bg-neutral-950 border-2 border-neutral-950 text-white shadow-[6px_6px_0px_#D97706] hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-200 cursor-pointer flex items-center gap-3"
          title="Klik untuk membuka Surat Rahasia & Kotak Janji Robit"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-400 text-neutral-950 flex items-center justify-center">
            <Sparkles size={20} />
          </div>
          <div className="text-left">
            <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-widest block">
              SANCTUARY 365 HARI TERBUKA
            </span>
            <span className="font-serif text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <span>Buka Kotak Janji & Surat Rahasia</span>
              <Star size={16} className="text-amber-400" fill="currentColor" />
            </span>
          </div>
        </button>
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
