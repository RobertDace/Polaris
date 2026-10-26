"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UtensilsCrossed, Sparkles, Check, Flame, ArrowDown, Leaf, RotateCcw, Box } from "lucide-react";
import { playPopSFX, playSizzlingSFX, playChimeSFX } from "../utils/sfx";
import CosmicPortalGateway from "./CosmicPortalGateway";
import ThreeCookingSkillet3D from "./ThreeCookingSkillet3D";
import ModelViewerGLB from "./ModelViewerGLB";
import { worldBridge } from "../world/WorldBridge";

interface Act2SpringProps {
  onNext: () => void;
}

export default function Act2Spring({ onNext }: Act2SpringProps) {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [isCooking, setIsCooking] = useState(false);
  const [isDishReady, setIsDishReady] = useState(false);
  const [modelMode, setModelMode] = useState<"procedural" | "glb">("procedural");

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

  const handleResetCooking = () => {
    playPopSFX();
    setIngredients([]);
    setIsCooking(false);
    setIsDishReady(false);
    worldBridge.setCooking(false, []);
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
          <Leaf size={14} className="text-[#00C853]" />
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
        className="mb-10 p-4 sm:p-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-4 shadow-[0_15px_40px_rgba(0,200,83,0.15)]"
      >
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            <div className="w-8 h-8 rounded-full bg-[#0047FF] border-2 border-white/60 shadow-[0_0_15px_rgba(0,71,255,0.6)]" title="Biru Robit" />
            <div className="w-8 h-8 rounded-full bg-[#00C853] border-2 border-white/60 shadow-[0_0_15px_rgba(0,200,83,0.6)]" title="Hijau Matcha Naiqo" />
            <div className="w-8 h-8 rounded-full bg-[#00F5D4] border-2 border-white/90 shadow-[0_0_20px_rgba(0,245,212,0.8)]" title="Cyan Peleburan Musim Semi" />
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

        <div className="text-[11px] font-mono text-[#00F5D4]">
          Musim Semi · Zona Nyaman Bersama
        </div>
      </motion.div>

      {/* Main Interactive Culinary Experience (Floating Skillet Studio) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.2 }}
        className="relative p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-[#064E3B]/65 via-[#022C22]/75 to-[#042F2E]/85 border-2 border-[#00F5D4]/40 shadow-[0_30px_90px_rgba(0,245,212,0.2)] backdrop-blur-2xl overflow-hidden mb-12"
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

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 p-1 rounded-xl bg-black/40 border border-emerald-500/30">
              <button
                onClick={() => { playPopSFX(); setModelMode("procedural"); }}
                className={`px-3 py-1 rounded-lg text-[11px] font-mono transition-colors cursor-pointer ${
                  modelMode === "procedural"
                    ? "bg-[#00F5D4] text-neutral-950 font-bold"
                    : "text-emerald-200 hover:text-white"
                }`}
              >
                Wajan Interaktif 3D
              </button>
              <button
                onClick={() => { playPopSFX(); setModelMode("glb"); }}
                className={`px-3 py-1 rounded-lg text-[11px] font-mono transition-colors flex items-center gap-1 cursor-pointer ${
                  modelMode === "glb"
                    ? "bg-[#00F5D4] text-neutral-950 font-bold"
                    : "text-emerald-200 hover:text-white"
                }`}
              >
                <Box size={11} />
                <span>Model .GLB</span>
              </button>
            </div>
            <span className="text-xs font-mono text-emerald-300 tabular-nums">
              {ingredients.length}/3 Bahan
            </span>
          </div>
        </div>

        {/* The Interactive Cooking Arena */}
        <div className="py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Floating Interactive Ingredient Cards */}
          <div className="lg:col-span-5 space-y-3">
            <p className="text-xs text-emerald-200/90 font-mono uppercase tracking-wider mb-2">
              Sentuh ketiga bahan untuk memasukkannya ke wajan 3D:
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
                      ? "bg-gradient-to-r from-emerald-500/30 to-teal-500/30 border-[#00F5D4] shadow-[0_0_25px_rgba(0,245,212,0.3)]"
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

            {/* Action Button below Ingredients */}
            <div className="pt-3">
              {isDishReady ? (
                <button
                  onClick={handleResetCooking}
                  className="w-full py-3.5 px-6 rounded-2xl bg-emerald-900/60 hover:bg-emerald-800/70 border border-emerald-400/40 text-emerald-200 font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <RotateCcw size={14} />
                  <span>Racik & Tumis Ulang Aglio Olio</span>
                </button>
              ) : (
                <button
                  onClick={handleCook}
                  disabled={ingredients.length < 3 || isCooking}
                  className={`w-full py-4 px-6 rounded-2xl font-mono text-xs uppercase tracking-widest font-bold transition-all flex items-center justify-center gap-2.5 cursor-pointer ${
                    ingredients.length === 3 && !isCooking
                      ? "bg-gradient-to-r from-[#00F5D4] via-[#00C853] to-amber-300 text-neutral-950 shadow-[0_0_35px_rgba(0,245,212,0.6)] hover:scale-[1.02] active:scale-95"
                      : "bg-emerald-950/80 text-emerald-600 border border-emerald-800/40 cursor-not-allowed"
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
              )}
            </div>
          </div>

          {/* Right: 3D Skillet Studio & Completion Overlay */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center text-center p-5 sm:p-6 rounded-3xl bg-black/45 border border-emerald-500/25 relative">
            <div className="w-full">
              {modelMode === "procedural" ? (
                <ThreeCookingSkillet3D
                  isCooking={isCooking}
                  ingredients={ingredients}
                  onCookClick={handleCook}
                />
              ) : (
                <ModelViewerGLB
                  modelPath="/models/act2-skillet.glb"
                  fallbackTitle="Wajan Cast Iron Aglio Olio (.GLB)"
                  accentColor="#00F5D4"
                  className="w-full h-64 sm:h-72"
                />
              )}
            </div>

            <AnimatePresence mode="wait">
              {isDishReady ? (
                <motion.div
                  key="dish-ready"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="mt-4 p-4 rounded-2xl bg-emerald-950/80 border border-amber-400/40 space-y-2 max-w-lg"
                >
                  <div className="flex items-center justify-center gap-2 text-amber-300 font-mono text-xs font-bold uppercase tracking-widest">
                    <Sparkles size={14} />
                    <span>AGLIO OLIO MATANG SEMPURNA</span>
                  </div>
                  <p className="font-serif text-sm sm:text-base text-white italic leading-relaxed">
                    &ldquo;Momen sesederhana makan bersama dan saling melempar cerita... rasanya sudah lebih dari cukup untuk membuat hariku terasa penuh.&rdquo;
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="dish-status"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-3 text-center space-y-1"
                >
                  <span className="text-xs font-mono text-[#00F5D4] font-semibold block">
                    {isCooking
                      ? "Minyak Zaitun Berpendar & Harum Bawang Putih Menguar..."
                      : "Gerakkan kursor di atas wajan 3D untuk memiringkan sudut pandang"}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* Narrative Footer Ribbon */}
        <div className="pt-6 mt-4 border-t border-emerald-500/20 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs sm:text-sm text-emerald-100 font-serif italic max-w-2xl">
            &ldquo;Kamu adalah satu-satunya orang yang tidak pernah menuntutku untuk tampil sempurna. Di dekatmu, aku menemukan jeda yang tulus dari riuhnya dunia luar.&rdquo;
          </p>
          <span className="text-[10px] font-mono text-[#00F5D4] tracking-widest uppercase shrink-0">
            — ROBIT KEPADA NAIQO
          </span>
        </div>
      </motion.div>

      {/* 3D Portal Jumping Gateway to Next Act */}
      <div className="pt-6 max-w-xl mx-auto w-full">
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
