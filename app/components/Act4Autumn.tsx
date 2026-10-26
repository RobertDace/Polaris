"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Bus, Snowflake, ArrowDown, Ticket, Check, Calendar, Box, RotateCcw } from "lucide-react";
import { playStampSFX, playBusHornSFX, playPopSFX } from "../utils/sfx";
import CosmicPortalGateway from "./CosmicPortalGateway";
import ThreeMoscowDome3D from "./ThreeMoscowDome3D";
import ModelViewerGLB from "./ModelViewerGLB";
import { worldBridge } from "../world/WorldBridge";

interface Act4AutumnProps {
  onNext: () => void;
}

export default function Act4Autumn({ onNext }: Act4AutumnProps) {
  const [ticketStamped, setTicketStamped] = useState(false);
  const [domeMode, setDomeMode] = useState<"procedural" | "glb">("procedural");

  const handleStampTicket = () => {
    if (ticketStamped) return;
    playStampSFX();
    playBusHornSFX();
    setTicketStamped(true);
    // Trigger momentary hyperspace / highway acceleration in 3D world
    worldBridge.setWarp(true, 1.25);
    setTimeout(() => {
      worldBridge.setWarp(false);
    }, 1600);
  };

  const routeCheckpoints = [
    { city: "Probolinggo", time: "20:30 WIB", status: "Titik Keberangkatan" },
    { city: "Pasuruan", time: "22:15 WIB", status: "Menatap Hujan di Kaca Bus" },
    { city: "Surakarta", time: "02:40 WIB", status: "Antara Lelah & Rindu" },
    { city: "Yogyakarta", time: "05:10 WIB", status: "Peron Pertemuan Nyata" },
  ];

  return (
    <section
      id="act-4"
      className="min-h-screen py-24 px-4 sm:px-8 max-w-6xl mx-auto flex flex-col justify-center relative z-10 text-white select-none"
    >
      {/* Immersive Autumn Atmospheric Background Layer */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-1/3 -left-32 w-96 h-96 rounded-full bg-[#FF1E40]/15 blur-3xl" />
        <div className="absolute bottom-1/3 -right-32 w-[450px] h-[450px] rounded-full bg-[#FFB703]/15 blur-3xl" />
      </div>

      {/* Chapter Indicator & Editorial Intro */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-10 max-w-3xl"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#FF1E40] text-neutral-950 text-xs font-mono font-black tracking-widest uppercase shadow-[0_0_20px_rgba(255,30,64,0.4)]">
          <Bus size={14} fill="currentColor" />
          <span>BABAK 04 · MUSIM GUGUR (KATALIS MERAH & PERJALANAN 23 JUNI)</span>
        </div>

        <h2 className="font-mono text-3xl sm:text-6xl text-white font-black tracking-tight uppercase mt-4 leading-[1.08]">
          RUTE MENEMBUS <br />
          <span className="text-[#FF1E40] drop-shadow-[0_0_25px_rgba(255,30,64,0.5)]">
            KERAGUAN JARAK.
          </span>
        </h2>

        <p className="text-zinc-300 text-sm sm:text-base font-light mt-3 leading-relaxed max-w-2xl">
          Keraguan tidak bisa dijawab hanya dengan jutaan teks di layar. Ia hanya bisa dijawab dengan satu hal: keberanian untuk melangkah ratusan kilometer dan hadir di depan matamu.
        </p>
      </motion.div>

      {/* 1. Full-Width Tactile Boarding Pass & Route Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.15 }}
        className="relative bg-zinc-950/90 border-2 border-[#FF1E40] shadow-[10px_10px_0px_#FF1E40] p-6 sm:p-10 mb-12 overflow-hidden backdrop-blur-md"
      >
        {/* Ticket Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b-2 border-dashed border-[#FF1E40]/50 gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-[#FF1E40] text-black">
              <Ticket size={24} strokeWidth={2.5} />
            </div>
            <div>
              <span className="text-[10px] font-mono text-[#FF1E40] font-black uppercase tracking-widest block">
                OFFICIAL MEMORY BOARDING PASS · BUS MALAM
              </span>
              <h3 className="font-mono text-xl sm:text-2xl font-black text-white">
                PROBOLINGGO → YOGYAKARTA
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="flex items-center gap-1.5 text-amber-400 tabular-nums">
              <Calendar size={14} />
              <span>23 JUNI 2026</span>
            </span>
            <span className="px-2 py-0.5 bg-[#FF1E40] text-black font-black">
              TERLAKSANA
            </span>
          </div>
        </div>

        {/* Route Checkpoints Timeline */}
        <div className="py-8 grid grid-cols-2 md:grid-cols-4 gap-6 border-b-2 border-zinc-800">
          {routeCheckpoints.map((cp, idx) => (
            <div key={idx} className="relative p-4 bg-zinc-900/70 border border-zinc-800">
              <span className="text-[10px] font-mono text-[#FF1E40] uppercase block font-bold tabular-nums">
                {cp.time}
              </span>
              <h4 className="font-mono text-base font-black text-white mt-0.5">
                {cp.city}
              </h4>
              <p className="text-xs text-zinc-400 font-light mt-1">
                {cp.status}
              </p>
            </div>
          ))}
        </div>

        {/* Narrative & Stamp Action */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed font-light max-w-xl">
            Malam itu di atas bus, menatap jendela yang basah oleh angin malam. Ratusan kilometer terbentang. Orang bilang perjalanan bus malam itu melelahkan, tapi bagiku, itu adalah perjalanan paling membahagiakan: karena di ujung peron itu, ada kamu.
          </p>

          <div className="shrink-0 w-full md:w-auto">
            {ticketStamped ? (
              <div className="flex items-center gap-2">
                <div className="p-4 bg-red-950/70 border-2 border-[#FF1E40] text-[#FF1E40] font-mono text-xs font-bold text-center flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,30,64,0.4)]">
                  <Check size={18} strokeWidth={3} />
                  <span>TIKET TERVALIDASI: &ldquo;Aku akan selalu menempuh rute mana pun untukmu.&rdquo;</span>
                </div>
                <button
                  onClick={() => { playPopSFX(); setTicketStamped(false); }}
                  className="p-4 bg-zinc-900 border-2 border-zinc-700 text-zinc-300 hover:text-white cursor-pointer"
                  title="Cap Ulang Tiket"
                >
                  <RotateCcw size={16} />
                </button>
              </div>
            ) : (
              <button
                onClick={handleStampTicket}
                className="w-full md:w-auto px-8 py-4 bg-[#FF1E40] text-black font-mono text-xs font-black uppercase tracking-widest hover:bg-red-500 transition-all active:translate-x-1 active:translate-y-1 flex items-center justify-center gap-3 cursor-pointer shadow-[6px_6px_0px_#ffffff]"
              >
                <Ticket size={16} />
                <span>Cap Tiket Perjalanan Jogja Ini →</span>
              </button>
            )}
          </div>
        </div>
      </motion.div>

      {/* 2. Expansive Scenic Window: Moscow Cathedral Snow Dream */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.25 }}
        className="relative bg-zinc-950/90 border-2 border-amber-400 shadow-[10px_10px_0px_#F59E0B] p-6 sm:p-10 overflow-hidden backdrop-blur-md"
      >
        <div className="flex flex-col lg:flex-row items-center gap-8">
          
          {/* Left: Interactive 3D Moscow Dome & .GLB Model Switcher */}
          <div className="relative w-full lg:w-1/2 flex flex-col items-center space-y-3">
            <div className="w-full flex items-center justify-between px-1">
              <span className="flex items-center gap-1.5 text-[11px] font-mono text-amber-300 uppercase font-bold">
                <Snowflake size={14} className="text-cyan-300 animate-spin" style={{ animationDuration: "12s" }} />
                <span>Katedral St. Basil Moscow 3D</span>
              </span>

              <div className="flex items-center gap-1 p-1 bg-zinc-900 border border-amber-400/40">
                <button
                  onClick={() => { playPopSFX(); setDomeMode("procedural"); }}
                  className={`px-2.5 py-1 text-[10px] font-mono cursor-pointer transition-colors ${
                    domeMode === "procedural"
                      ? "bg-amber-400 text-black font-black"
                      : "text-amber-200 hover:text-white"
                  }`}
                >
                  Kubah & Salju 3D
                </button>
                <button
                  onClick={() => { playPopSFX(); setDomeMode("glb"); }}
                  className={`px-2.5 py-1 text-[10px] font-mono flex items-center gap-1 cursor-pointer transition-colors ${
                    domeMode === "glb"
                      ? "bg-amber-400 text-black font-black"
                      : "text-amber-200 hover:text-white"
                  }`}
                >
                  <Box size={11} />
                  <span>Model .GLB</span>
                </button>
              </div>
            </div>

            <div className="w-full border-2 border-amber-400/50 bg-black/60 overflow-hidden">
              {domeMode === "procedural" ? (
                <ThreeMoscowDome3D />
              ) : (
                <ModelViewerGLB
                  modelPath="/models/act4-moscow.glb"
                  fallbackTitle="Katedral St. Basil Moscow (.GLB)"
                  accentColor="#F59E0B"
                  className="w-full h-64 sm:h-72 rounded-none border-0"
                />
              )}
            </div>
          </div>

          {/* Right: Moscow Narrative */}
          <div className="w-full lg:w-1/2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono px-2.5 py-1 bg-amber-400 text-black font-black uppercase">
                OUR FUTURE WISH
              </span>
              <span className="text-xs font-mono text-amber-400 font-bold">
                IMPIAN TERINDAH NAIQO
              </span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight">
              Kubah Salju yang Tak Pernah Terbang Sendirian
            </h3>

            <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
              Suatu malam kamu bercerita tentang impianmu melihat salju di Moscow dan kubah katedralnya yang berpendar di udara dingin. Aku menyimpannya erat-erat di dalam hatiku.
            </p>

            <div className="p-4 bg-amber-400/10 border border-amber-400/40 text-xs sm:text-sm text-amber-200/95 font-serif italic leading-relaxed">
              &ldquo;Aku berjanji pada diriku sendiri: suatu hari nanti, saat aku sudah mapan, aku ingin kita berdiri bersama di sana—membuktikan bahwa impianmu tidak pernah terbang sendirian.&rdquo;
            </div>
          </div>

        </div>
      </motion.div>

      {/* 3D Portal Jumping Gateway to Next Act */}
      <div className="pt-8 max-w-xl mx-auto w-full">
        <CosmicPortalGateway
          embeddedAct={4}
          currentAct={4}
          onJumpAct={() => onNext()}
        />
      </div>

      {/* Alternative gentle scroll link */}
      <div className="text-center pt-4">
        <button
          onClick={onNext}
          className="inline-flex items-center gap-2 text-xs font-mono text-amber-400 hover:text-white transition-colors cursor-pointer group"
        >
          <span>Atau scroll langsung ke Puncak Babak 05: Bintang Polaris</span>
          <ArrowDown size={14} className="group-hover:translate-y-1 transition-transform" />
        </button>
      </div>
    </section>
  );
}
