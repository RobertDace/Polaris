"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, Sparkles, HeartCrack, HelpCircle, HeartHandshake, Radio } from "lucide-react";
import { playPopSFX } from "../utils/sfx";
import CosmicPortalGateway from "./CosmicPortalGateway";
import ThreeHeartConflict3D from "./ThreeHeartConflict3D";
import { worldBridge } from "../world/WorldBridge";

interface Act3SummerProps {
  onNext: () => void;
}

export default function Act3Summer({ onNext }: Act3SummerProps) {
  const [activeTab, setActiveTab] = useState<"keraguan" | "tekad">("keraguan");

  const switchTab = (tab: "keraguan" | "tekad") => {
    playPopSFX();
    setActiveTab(tab);
    worldBridge.setConflictPerspective(tab === "tekad" ? "grit" : "fear");
  };

  return (
    <section
      id="act-3"
      className="min-h-screen py-24 px-4 sm:px-8 max-w-6xl mx-auto flex flex-col justify-center relative z-10 text-neutral-800 select-none"
    >
      {/* Immersive Summer Atmospheric Background Layer */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-b from-purple-200/20 via-slate-300/15 to-transparent blur-3xl" />
      </div>

      {/* Chapter Indicator & Editorial Intro */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-10 text-center max-w-3xl mx-auto"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-300 border border-neutral-400 text-neutral-800 text-xs font-mono tracking-widest uppercase shadow-sm">
          <HelpCircle size={14} className="text-purple-900" />
          <span>BABAK 03 · MUSIM PANAS (TITIK BEKU & RASA RAGU)</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-6xl text-neutral-900 font-bold tracking-tight mt-4 leading-tight">
          Ketika Cinta Begitu Dalam, <br />
          <span className="italic text-purple-900">
            Namun Langkahmu Menahan Diri.
          </span>
        </h2>

        <p className="text-neutral-700 text-sm sm:text-base font-light mt-3 leading-relaxed max-w-xl mx-auto">
          Ada saat di mana perasaan ini terasa sangat nyata, namun bayang-bayang ketidakpastian membuatmu terdiam di tempat.
        </p>
      </motion.div>

      {/* Centerpiece: Interactive Dual Resonance 3D Stage */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.15 }}
        className="p-6 sm:p-10 rounded-3xl bg-[#D1D5DB]/90 border-2 border-white/80 shadow-[10px_10px_25px_#B8BCC2,-10px_-10px_25px_#EAEEF4] backdrop-blur-xl mb-12 space-y-8"
      >
        {/* Top Control Bar: Tab Switcher & Perspective Synchronizer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-neutral-400/50 pb-6">
          {/* Dual Resonance Tab Switcher */}
          <div className="grid grid-cols-2 gap-2 p-1.5 rounded-2xl bg-neutral-300/90 border border-neutral-400/50 max-w-md w-full shadow-inner">
            <button
              onClick={() => switchTab("keraguan")}
              className={`py-2.5 px-4 rounded-xl text-xs sm:text-sm font-mono font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === "keraguan"
                  ? "bg-white text-purple-950 shadow-md"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              <HeartCrack size={15} />
              <span>Rasa Cemas Naiqo</span>
            </button>
            <button
              onClick={() => switchTab("tekad")}
              className={`py-2.5 px-4 rounded-xl text-xs sm:text-sm font-mono font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === "tekad"
                  ? "bg-purple-900 text-white shadow-md"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              <Sparkles size={15} />
              <span>Jawaban & Tekad Robit</span>
            </button>
          </div>

          {/* Perspective Live Status */}
          <div className="flex items-center gap-2 text-xs font-mono px-3.5 py-1.5 rounded-xl bg-white/75 border border-neutral-400/50 text-neutral-800">
            <Radio size={13} className="text-purple-700" />
            <span>
              Resonansi 3D: <strong>{activeTab === "tekad" ? "Tekad & Api Emas" : "Kristal Keraguan"}</strong>
            </span>
          </div>
        </div>

        {/* 2-Column Responsive Layout: Interactive 3D Sculpture Left + Narrative Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Interactive 3D Dual-Resonance Sculpture */}
          <div className="lg:col-span-5 flex flex-col justify-center w-full">
            <ThreeHeartConflict3D
              state={activeTab}
              className="w-full h-72 sm:h-80"
            />
          </div>

          {/* Right: Narrative Cards that Morph with State */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {activeTab === "keraguan" ? (
                <motion.div
                  key="view-keraguan"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6 text-center sm:text-left"
                >
                  <div className="p-6 rounded-2xl bg-purple-100/90 border border-purple-300 shadow-sm space-y-3">
                    <span className="text-[10px] font-mono text-purple-900 font-bold uppercase tracking-widest block">
                      BISIKAN KERAGUAN BATIN · KRISTAL AMETHIS TERKUNCI
                    </span>
                    <p className="font-serif text-lg sm:text-xl italic text-purple-950 leading-relaxed">
                      &ldquo;Bagaimana jika suatu saat keadaan menuntut kita berpisah? Bagaimana jika kekurangan hari ini menjadi alasan penyesalan di kemudian hari?&rdquo;
                    </p>
                  </div>

                  <div className="space-y-3 text-neutral-800 text-sm sm:text-base font-light leading-relaxed">
                    <p>
                      Aku mengerti alasanmu menahan perasaanmu, Naiqo. Kamu melihatku yang saat ini masih memiliki banyak kekurangan: baik dari segi fisik maupun kemapanan materi.
                    </p>
                    <p>
                      Kamu terbiasa berpikir bahwa hubungan yang indah pada akhirnya harus mengalah pada keadaan dan berakhir dengan saling melepaskan. Itu bukan karena kamu tidak peduli, melainkan karena kamu takut merasa kecewa.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="view-tekad"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6 text-center sm:text-left"
                >
                  <div className="p-6 rounded-2xl bg-purple-950 text-white shadow-xl space-y-3 border border-purple-700">
                    <span className="text-[10px] font-mono text-amber-300 font-bold uppercase tracking-widest flex items-center justify-center sm:justify-start gap-1.5">
                      <HeartHandshake size={14} />
                      <span>IKRAR KETULUSAN ROBIT · CAHAYA EMAS KEABADIAN</span>
                    </span>
                    <p className="font-serif text-lg sm:text-xl italic text-amber-200 leading-relaxed">
                      &ldquo;Kekurangan fisik dan materiku hari ini bukan vonis akhir dari takdir kita, Naiqo.&rdquo;
                    </p>
                  </div>

                  <div className="space-y-3 text-neutral-800 text-sm sm:text-base font-light leading-relaxed">
                    <p>
                      Aku tidak ingin kisah kita berakhir hanya sebagai memori manis yang layu. Justru rasa takutmu menyadarkanku: aku harus berjuang lebih keras, keluar dari zona nyaman, dan membuktikan bahwa aku bisa menjadi pria yang layak kamu banggakan.
                    </p>
                    <p className="font-semibold text-purple-950">
                      Kamu adalah alasanku untuk tidak menyerah. Arah tujuanku untuk menjadi pria mapan di masa depan.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </motion.div>

      {/* 3D Portal Jumping Gateway to Next Act */}
      <div className="pt-6 max-w-xl mx-auto w-full">
        <CosmicPortalGateway
          embeddedAct={3}
          currentAct={3}
          onJumpAct={() => onNext()}
        />
      </div>

      {/* Alternative gentle scroll link */}
      <div className="text-center pt-4">
        <button
          onClick={onNext}
          className="inline-flex items-center gap-2 text-xs font-mono text-neutral-700 hover:text-neutral-950 transition-colors cursor-pointer group"
        >
          <span>Atau scroll langsung ke Babak 04: Perjalanan Nyata 23 Juni</span>
          <ArrowDown size={14} className="group-hover:translate-y-1 transition-transform" />
        </button>
      </div>
    </section>
  );
}
