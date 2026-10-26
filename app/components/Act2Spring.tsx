"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UtensilsCrossed, Sparkles, Check, Flame, ArrowDown, Leaf } from "lucide-react";
import { playPopSFX, playSizzlingSFX, playChimeSFX } from "../utils/sfx";
import CosmicPortalGateway from "./CosmicPortalGateway";
import { worldBridge } from "../world/WorldBridge";

interface Act2SpringProps {
  onNext: () => void;
}

export default function Act2Spring({ onNext }: Act2SpringProps) {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [isCooking, setIsCooking] = useState(false);
  const [isDishReady, setIsDishReady] = useState(false);

  const availableIngredients = [
    {
      id: "pasta",
      label: "Spaghetti Pasta",
      lore: "Waktu yang Sengaja Kita Luangkan",
      color: "from-amber-400 to-yellow-500",
      icon: "🍝",
    },
    {
      id: "garlic",
      label: "Bawang & Minyak Zaitun",
      lore: "Percakapan Jujur Tanpa Topeng",
      color: "from-emerald-400 to-teal-500",
      icon: "🧄",
    },
    {
      id: "chili",
      label: "Cabai Flakes & Herb Segar",
      lore: "Tawa Lepas yang Menghidupkan Hari",
      color: "from-red-400 to-rose-500",
      icon: "🌶️",
    },
  ];

  const handleToggleIngredient = (id: string) => {
    if (isDishReady || isCooking) return;
    playPopSFX();
    setIngredients((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleCook = () => {
    if (ingredients.length < 3 || isCooking) return;
    setIsCooking(true);
    playSizzlingSFX();
    worldBridge.setCooking(true, ingredients);

    setTimeout(() => {
      setIsCooking(false);
      setIsDishReady(true);
      playChimeSFX();
      worldBridge.setCooking(false, ingredients);
    }, 2400);
  };

  return (
    <section
      id="act-2"
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
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-400/50 text-[#00F5D4] text-xs font-mono tracking-widest uppercase shadow-[0_0_20px_rgba(0,245,212,0.25)] backdrop-blur-md">
          <Leaf size={14} className="text-[#00C853] animate-bounce" />
          <span>BABAK 02 · MUSIM SEMI (PELEBURAN WARNA ANALOG)</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-6xl text-white font-bold tracking-tight mt-4 leading-[1.1]">
          Ketika Biru Bertemu Hijau: <br />
          <span className="bg-gradient-to-r from-[#00F5D4] via-[#4ADE80] to-[#FACC15] bg-clip-text text-transparent italic">
            Lahirnya Sudut Paling Teduh.
          </span>
        </h2>

        <p className="text-emerald-100/80 text-sm sm:text-base font-light mt-3 leading-relaxed max-w-2xl">
          Kekakuan musim dingin perlahan mencair. Tanpa tuntutan dan kepalsuan, frekuensi kita melebur menjadi ruang aman tempat kita bisa saling melepas lelah.
        </p>
      </motion.div>

      {/* Primary Color Theory Bar: Blue + Green = Cyan */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="mb-12 p-4 sm:p-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-4 shadow-[0_15px_40px_rgba(0,200,83,0.15)]"
      >
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            <div className="w-8 h-8 rounded-full bg-[#0047FF] border-2 border-white/60 shadow-[0_0_15px_rgba(0,71,255,0.6)]" title="Biru Robit" />
            <div className="w-8 h-8 rounded-full bg-[#00C853] border-2 border-white/60 shadow-[0_0_15px_rgba(0,200,83,0.6)]" title="Hijau Matcha Naiqo" />
            <div className="w-8 h-8 rounded-full bg-[#00F5D4] border-2 border-white/90 shadow-[0_0_20px_rgba(0,245,212,0.8)] animate-pulse" title="Cyan Peleburan Musim Semi" />
          </div>
          <div>
            <span className="text-xs font-mono font-bold text-white block">
              Alkimia Spektrum: Biru + Hijau = Cyan Kedamaian
            </span>
            <span className="text-[11px] text-emerald-300/80 font-light">
              Dua warna sefrekuensi yang saling melengkapi tanpa saling menuntut
            </span>
          </div>
        </div>

        <div className="px-3.5 py-1 rounded-full bg-emerald-900/50 border border-emerald-400/40 text-[11px] font-mono text-[#00F5D4]">
          Musim Semi · Zona Nyaman Bersama
        </div>
      </motion.div>

      {/* Main Interactive Culinary Experience (Floating Skillet Studio) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.2 }}
        className="relative p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-[#064E3B]/60 via-[#022C22]/70 to-[#042F2E]/80 border-2 border-[#00F5D4]/40 shadow-[0_30px_90px_rgba(0,245,212,0.2)] backdrop-blur-2xl overflow-hidden mb-12"
      >
        {/* Top Header of the Canvas */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-emerald-500/20 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#00C853] to-[#00F5D4] text-neutral-950 flex items-center justify-center shadow-[0_0_20px_rgba(0,245,212,0.5)]">
              <UtensilsCrossed size={22} strokeWidth={2.5} />
            </div>
            <div>
              <h3 className="font-serif text-2xl text-white font-bold">
                Resep Sederhana: Aglio Olio Berdua
              </h3>
              <span className="text-xs font-mono text-[#00F5D4]">
                KEHANGATAN WAKTU YANG KITA CIPTAKAN BERSAMA
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-emerald-300">
              {ingredients.length}/3 Bahan Terpilih
            </span>
          </div>
        </div>

        {/* The Interactive Cooking Arena */}
        <div className="py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Floating Interactive Ingredient Cards */}
          <div className="lg:col-span-5 space-y-3">
            <p className="text-xs text-emerald-200/90 font-mono uppercase tracking-wider mb-2">
              Sentuh bahan untuk memasukkannya ke wajan:
            </p>
            {availableIngredients.map((item) => {
              const isSelected = ingredients.includes(item.id);
              return (
                <button
                  key={item.id}
                  onClick={() => handleToggleIngredient(item.id)}
                  disabled={isCooking || isDishReady}
                  className={`w-full p-4 rounded-2xl border text-left transition-all duration-300 flex items-center justify-between group cursor-pointer ${
                    isSelected
                      ? "bg-gradient-to-r from-emerald-500/30 to-teal-500/30 border-[#00F5D4] shadow-[0_0_25px_rgba(0,245,212,0.3)] scale-102"
                      : "bg-emerald-950/60 border-emerald-600/30 hover:border-emerald-400/60 hover:bg-emerald-900/40"
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <span className="text-2xl p-2 rounded-xl bg-black/30 border border-white/10 group-hover:scale-110 transition-transform">
                      {item.icon}
                    </span>
                    <div>
                      <span className="text-sm font-bold text-white block">
                        {item.label}
                      </span>
                      <span className="text-xs text-emerald-300/80 font-light">
                        {item.lore}
                      </span>
                    </div>
                  </div>

                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                      isSelected
                        ? "bg-[#00F5D4] text-neutral-950 shadow-[0_0_10px_#00F5D4]"
                        : "border border-emerald-500/40 text-transparent"
                    }`}
                  >
                    <Check size={14} strokeWidth={3} />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: The Skillet Studio Panel (Terhubung langsung ke 3D Skillet di Station 2) */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center text-center p-6 sm:p-8 rounded-3xl bg-black/40 border border-emerald-500/20 relative">
            <AnimatePresence mode="wait">
              {isDishReady ? (
                <motion.div
                  key="dish-ready"
                  initial={{ opacity: 0, scale: 0.9, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-4 max-w-md py-4"
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400 to-[#00F5D4] text-neutral-950 mx-auto flex items-center justify-center shadow-[0_0_30px_rgba(251,191,36,0.6)]">
                    <Sparkles size={30} />
                  </div>

                  <span className="text-xs font-mono font-bold tracking-widest uppercase text-amber-300 block">
                    ★ AGLIO OLIO MATANG SEMPURNA ★
                  </span>

                  <p className="font-serif text-lg sm:text-xl text-white italic leading-relaxed">
                    "Momen sesederhana makan bersama dan saling melempar cerita... rasanya sudah lebih dari cukup untuk membuat hariku terasa penuh."
                  </p>

                  <p className="text-xs text-emerald-300 font-light">
                    Tidak perlu restoran mewah. Yang membuat momen ini istimewa adalah kehadiranmu di sampingku.
                  </p>
                </motion.div>
              ) : (
                <div className="w-full flex flex-col items-center space-y-4 py-4">
                  {/* Status Indicator */}
                  <div className="px-4 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-xs font-mono text-[#00F5D4] flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${isCooking ? "bg-amber-400 animate-ping" : "bg-emerald-400 animate-pulse"}`} />
                    <span>{isCooking ? "Wajan 3D Menyala: Menumis Aroma Hangat" : "Wajan 3D Siap di Semesta Musim Semi"}</span>
                  </div>

                  <div className="text-center space-y-1.5 max-w-sm">
                    <h4 className="font-serif text-xl text-white font-bold">
                      {isCooking ? "Minyak Zaitun Berpendar..." : "Racikan Bumbu Bersama"}
                    </h4>
                    <p className="text-xs text-emerald-200/80 font-light leading-relaxed">
                      {isCooking
                        ? "Harum bawang putih, gurih cabai, dan tawa kita yang menyatu di dapur kecil."
                        : "Lengkapi ketiga bahan di sisi kiri, lalu tekan tombol di bawah untuk mulai menumis di wajan 3D."}
                    </p>
                  </div>

                  <button
                    onClick={handleCook}
                    disabled={ingredients.length < 3 || isCooking}
                    className={`mt-3 px-8 py-4 rounded-2xl font-mono text-xs uppercase tracking-widest font-bold transition-all flex items-center gap-2.5 cursor-pointer ${
                      ingredients.length === 3 && !isCooking
                        ? "bg-gradient-to-r from-[#00F5D4] via-[#00C853] to-amber-300 text-neutral-950 shadow-[0_0_35px_rgba(0,245,212,0.6)] hover:scale-105 active:scale-95"
                        : "bg-emerald-950/80 text-emerald-700 border border-emerald-800/40 cursor-not-allowed"
                    }`}
                  >
                    <Flame size={16} className={isCooking ? "animate-bounce text-amber-500" : ""} />
                    <span>
                      {isCooking
                        ? "Sedang Menumis di Wajan 3D..."
                        : ingredients.length < 3
                        ? `Pilih Semua Bahan (${ingredients.length}/3)`
                        : "Mulai Tumis Aglio Olio Berdua →"}
                    </span>
                  </button>
                </div>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* Narrative Footer Ribbon */}
        <div className="pt-6 mt-4 border-t border-emerald-500/20 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs sm:text-sm text-emerald-100 font-serif italic max-w-2xl">
            "Kamu adalah satu-satunya orang yang tidak pernah menuntutku untuk tampil sempurna. Di dekatmu, aku menemukan jeda yang tulus dari riuhnya dunia luar."
          </p>
          <span className="text-[10px] font-mono text-[#00F5D4] tracking-widest uppercase flex-shrink-0">
            — ROBIT KEPADA NAIQO
          </span>
        </div>
      </motion.div>

      {/* 3D Portal Jumping Gateway to Next Act */}
      <div className="pt-8 max-w-xl mx-auto w-full">
        <CosmicPortalGateway
          embeddedAct={2}
          currentAct={2}
          onJumpAct={() => onNext()}
        />
      </div>

      {/* Alternative gentle scroll link */}
      <div className="text-center pt-4">
        <button
          onClick={onNext}
          className="inline-flex items-center gap-2 text-xs font-mono text-[#00F5D4] hover:text-white transition-colors cursor-pointer group"
        >
          <span>Atau scroll langsung ke Babak 03: Titik Beku & Rasa Takut</span>
          <ArrowDown size={14} className="group-hover:translate-y-1 transition-transform" />
        </button>
      </div>
    </section>
  );
}
