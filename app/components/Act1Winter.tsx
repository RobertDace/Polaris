"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, ArrowDown, Send, CheckCheck, RotateCcw, Smartphone } from "lucide-react";
import { playPopSFX, playChimeSFX } from "../utils/sfx";
import CosmicPortalGateway from "./CosmicPortalGateway";
import ThreeSmartphone3D from "./ThreeSmartphone3D";

interface Act1WinterProps {
  onNext: () => void;
}

export default function Act1Winter({ onNext }: Act1WinterProps) {
  const [chatIndex, setChatIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  const scriptChats = [
    { sender: "naiqo", text: "belum tidur kah kamu?", time: "02:14 AM" },
    { sender: "robit", text: "blm kenapa?", time: "02:15 AM" },
    { sender: "naiqo", text: "gapapaa, kalo kamu gabisa tidur aku siap nemenin kokkk", time: "02:16 AM" },
    { sender: "robit", text: "preeett wkwkwk", time: "02:16 AM" },
    { sender: "naiqo", text: "wkwkwkwkwkwk beneran tauuu", time: "02:17 AM" },
  ];

  const handleNextMessage = () => {
    if (chatIndex >= scriptChats.length - 1 || isTyping) return;
    setIsTyping(true);
    playPopSFX();

    setTimeout(() => {
      setChatIndex((prev) => prev + 1);
      setIsTyping(false);
      playPopSFX();
    }, 550);
  };

  const handleResetChat = () => {
    playChimeSFX();
    setChatIndex(0);
    setIsTyping(false);
  };

  return (
    <section
      id="act-1"
      className="min-h-screen py-24 px-4 sm:px-8 max-w-6xl mx-auto flex flex-col justify-center relative z-10 text-white select-none"
    >
      {/* Chapter Indicator & Editorial Intro */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-12 max-w-3xl"
      >
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-950/80 border border-blue-400/50 text-blue-300 text-xs font-mono tracking-widest uppercase shadow-[0_0_20px_rgba(0,71,255,0.25)] backdrop-blur-md">
          <Moon size={14} className="text-blue-400" />
          <span>BABAK 01 · MUSIM DINGIN (PERTEMUAN AWAL 02:14 AM)</span>
        </span>

        <h2 className="font-serif text-3xl sm:text-6xl text-white font-bold tracking-tight mt-4 leading-[1.1]">
          Di Antara Hening Malam & <br />
          <span className="bg-gradient-to-r from-blue-300 via-sky-200 to-[#00C853] bg-clip-text text-transparent italic">
            Dua Frekuensi yang Sama.
          </span>
        </h2>

        <p className="text-slate-300 text-sm sm:text-base font-light mt-3 leading-relaxed max-w-2xl">
          Sebelum ada rute yang kita tempuh berdua, malam hanyalah kumpulan waktu yang berjalan lambat. Dua jiwa yang sama-sama lelah, bersembunyi dari bisingnya dunia luar.
        </p>
      </motion.div>

      {/* Linear Bento Grid Layout: Story Left + 3D Smartphone & Interactive Chat Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
        
        {/* Left Column: Narrative Bento & 3D Smartphone Preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-6 flex flex-col justify-between gap-6"
        >
          {/* Story Card */}
          <div className="story-card-surface p-6 sm:p-8 bg-[#070e1e]/80 border border-[#0047FF]/35 shadow-[0_20px_60px_rgba(0,71,255,0.15)] space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed font-light">
            <div className="flex items-center justify-between border-b border-blue-900/50 pb-3">
              <span className="text-[10px] font-mono text-[#0047FF] font-black uppercase tracking-widest">
                SPEKTRUM ROBIT: BIRU INDIGO & ELEKTRIK
              </span>
              <span className="text-[10px] font-mono text-[#00C853] font-bold">
                HIJAU MATCHA NAIQO
              </span>
            </div>

            <p>
              Dulu, duniaku begitu dingin dan tertutup. Aku terbiasa mengunci diri di balik karya, enggan membiarkan siapa pun masuk karena takut merasa kecewa.
            </p>
            <p>
              Lalu aku melihatmu: sosok yang membumi, lembut, namun selalu menelan lelahnya sendiri demi menjaga perasaan orang di sekitarmu. Di balik warna matcha yang menenangkan, ada keraguan yang kamu simpan dalam-dalam.
            </p>
            <p className="italic text-slate-200 bg-white/5 p-3.5 rounded-lg border border-white/10 text-xs sm:text-sm font-serif leading-relaxed">
              &ldquo;Kita tidak bertemu lewat peristiwa dramatis. Kita bertemu karena tanpa sadar, kita membawa frekuensi kelelahan yang sama.&rdquo;
            </p>
          </div>

          {/* Interactive 3D Smartphone WebGL Showcase */}
          <div className="space-y-2">
            <div className="flex items-center justify-between px-1 text-xs font-mono text-blue-300/80">
              <span className="flex items-center gap-1.5">
                <Smartphone size={13} />
                <span>ARTEFAK MEMORI 3D: LAYAR SUBUH 02:14 AM</span>
              </span>
              <span className="text-[10px] text-slate-400">Drag untuk memutar 360°</span>
            </div>
            <ThreeSmartphone3D
              chatText={scriptChats[chatIndex].text}
              className="w-full h-64 sm:h-72"
            />
          </div>
        </motion.div>

        {/* Right Column: Interactive 02:14 AM Chat Console */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-6 flex flex-col justify-center"
        >
          <div className="w-full h-full flex flex-col justify-between rounded-3xl bg-[#030712]/85 border-2 border-slate-700/60 p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.85),0_0_50px_rgba(0,71,255,0.2)] backdrop-blur-2xl relative overflow-hidden">
            
            {/* Phone Top Notch & Starlight status */}
            <div>
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/10 text-xs font-mono text-slate-400">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00C853]" />
                  <div>
                    <span className="font-bold text-white block leading-none">Naiqo 🍵</span>
                    <span className="text-[10px] text-emerald-400 font-mono">online · 02:14 AM</span>
                  </div>
                </div>
                <span className="text-[10px] text-amber-300 font-mono tracking-wider px-2.5 py-1 rounded-md bg-amber-400/10 border border-amber-400/20">
                  MEMORI PERTAMA
                </span>
              </div>

              {/* Chat Bubble Area */}
              <div className="space-y-3.5 min-h-[280px] flex flex-col justify-end">
                <AnimatePresence>
                  {scriptChats.slice(0, chatIndex + 1).map((chat, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className={`flex flex-col ${
                        chat.sender === "robit" ? "items-end" : "items-start"
                      }`}
                    >
                      <div
                        className={`px-4 py-3 rounded-2xl text-xs sm:text-sm max-w-[85%] shadow-sm ${
                          chat.sender === "robit"
                            ? "bg-[#0047FF] text-white rounded-br-none font-medium"
                            : "bg-[#022c22] text-emerald-100 border border-[#00C853]/40 rounded-bl-none"
                        }`}
                      >
                        <p>{chat.text}</p>
                      </div>
                      <span className="text-[9px] font-mono text-slate-500 mt-1 flex items-center gap-1 tabular-nums">
                        <span>{chat.time}</span>
                        {chat.sender === "robit" && <CheckCheck size={12} className="text-blue-300" />}
                      </span>
                    </motion.div>
                  ))}

                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center gap-1.5 p-2.5 rounded-xl bg-slate-800/60 w-16 text-slate-400"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" />
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce delay-100" />
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce delay-200" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Interactive Chat Action */}
            <div className="pt-5 mt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleNextMessage}
                  disabled={chatIndex >= scriptChats.length - 1 || isTyping}
                  className={`text-xs font-mono font-bold px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 cursor-pointer ${
                    chatIndex >= scriptChats.length - 1
                      ? "bg-[#00C853]/20 text-[#00C853] border border-[#00C853]/40 cursor-default"
                      : "bg-amber-400 text-neutral-950 hover:bg-amber-300 shadow-[0_0_20px_rgba(251,191,36,0.5)] active:scale-95"
                  }`}
                >
                  {chatIndex >= scriptChats.length - 1 ? (
                    <span>✓ Memori Subuh Lengkap</span>
                  ) : (
                    <>
                      <Send size={13} />
                      <span>Balas Pesan ({chatIndex + 1}/{scriptChats.length})</span>
                    </>
                  )}
                </button>

                {chatIndex >= scriptChats.length - 1 && (
                  <button
                    onClick={handleResetChat}
                    className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
                    title="Ulangi Percakapan 02:14 AM"
                  >
                    <RotateCcw size={14} />
                  </button>
                )}
              </div>

              <span className="text-[10px] font-mono text-slate-400">
                {chatIndex >= scriptChats.length - 1
                  ? "Malam pertama yang menghangatkan"
                  : "Sentuh untuk membalas & lihat layar 3D"}
              </span>
            </div>

          </div>
        </motion.div>

      </div>

      {/* 3D Portal Jumping Gateway to Next Act */}
      <div className="pt-6 max-w-xl mx-auto w-full">
        <CosmicPortalGateway
          embeddedAct={1}
          currentAct={1}
          onJumpAct={() => onNext()}
        />
      </div>

      {/* Alternative gentle scroll link */}
      <div className="text-center pt-4">
        <button
          onClick={onNext}
          className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-colors cursor-pointer group"
        >
          <span>Atau scroll langsung ke Babak 02: Musim Semi</span>
          <ArrowDown size={14} className="group-hover:translate-y-1 transition-transform" />
        </button>
      </div>
    </section>
  );
}
