"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Compass,
  ArrowRight,
  Sparkles,
  Heart,
  Calendar,
  Clock,
  MapPin,
  Flame,
  HeartCrack,
  ShieldCheck,
  Ticket,
  Eye,
  EyeOff,
  Check,
  X,
  Volume2,
  VolumeX,
  Radio,
  Send,
  Star,
  Bus,
  UtensilsCrossed,
} from "lucide-react";
import confetti from "canvas-confetti";
import {
  playPopSFX,
  playChimeSFX,
  playPortalWarpSFX,
  playSizzlingSFX,
  playStampSFX,
  playBusHornSFX,
} from "../utils/sfx";
import { worldBridge, ActId } from "../world/WorldBridge";

interface SpaceVoyageHUDProps {
  currentAct: ActId;
  onSelectAct: (targetAct: ActId) => void;
  onOpenPromiseModal: () => void;
  onHoldWhatIfStart: () => void;
  onHoldWhatIfEnd: () => void;
}

interface WorldSpec {
  id: ActId;
  index: number;
  roman: string;
  seasonTitle: string;
  subtitle: string;
  quote: string;
  accentColor: string;
  glowColor: string;
  nextAct: ActId;
  nextActName: string;
  imageSrc: string;
  telemetry: {
    k1: string;
    v1: string;
    k2: string;
    v2: string;
    k3: string;
    v3: string;
  };
}

const WORLDS: Record<number, WorldSpec> = {
  1: {
    id: 1,
    index: 1,
    roman: "01",
    seasonTitle: "MUSIM DINGIN",
    subtitle: "BABAK 01 · 02:14 AM (ISOLASI & TITIK TEMU)",
    quote:
      "Kita tidak bertemu lewat peristiwa dramatis. Kita bertemu karena tanpa sadar membawa frekuensi kelelahan yang sama di hening malam.",
    accentColor: "#0047FF",
    glowColor: "rgba(0, 71, 255, 0.4)",
    nextAct: 2,
    nextActName: "Musim Semi (Aglio Olio)",
    imageSrc: "/images/act2-spring.jpg",
    telemetry: {
      k1: "WAKTU",
      v1: "02:14 AM SUBUT",
      k2: "MEDIA",
      v2: "TELEGRAM CHAT",
      k3: "STATUS",
      v3: "FREKUENSI TERHUBUNG",
    },
  },
  2: {
    id: 2,
    index: 2,
    roman: "02",
    seasonTitle: "MUSIM SEMI",
    subtitle: "BABAK 02 · HANGAT DAPUR (ZONA AMAN AGLIO OLIO)",
    quote:
      "Dapur kontrakan sempit, aroma bawang dan minyak zaitun. Tempat di mana kita pertama kali merasa nyaman menjadi diri sendiri tanpa kepalsuan.",
    accentColor: "#00C853",
    glowColor: "rgba(0, 200, 83, 0.4)",
    nextAct: 3,
    nextActName: "Musim Panas (Titik Hadap)",
    imageSrc: "/images/act3-summer.jpg",
    telemetry: {
      k1: "MENU",
      v1: "PASTA AGLIO OLIO",
      k2: "AROMA",
      v2: "BAWANG & CABAI KERING",
      k3: "RASA",
      v3: "RUMAH YANG NYATA",
    },
  },
  3: {
    id: 3,
    index: 3,
    roman: "03",
    seasonTitle: "MUSIM PANAS",
    subtitle: "BABAK 03 · TITIK HADAP (RASA RAGU VS JAWABAN TEKAD)",
    quote:
      "Kekurangan fisik dan materiku hari ini bukan vonis akhir dari takdir kita, Naiqo. Kamu adalah alasanku untuk berjuang menjadi pria mapan.",
    accentColor: "#7C3AED",
    glowColor: "rgba(124, 58, 237, 0.4)",
    nextAct: 4,
    nextActName: "Musim Gugur (Rute 23 Juni)",
    imageSrc: "/moscow.jpg",
    telemetry: {
      k1: "FOKUS",
      v1: "RESONANSI DUA HATI",
      k2: "POLARITAS",
      v2: "KECEMASAN ⇄ TEKAD",
      k3: "KOMITMEN",
      v3: "TAK KAN MENYERAH",
    },
  },
  4: {
    id: 4,
    index: 4,
    roman: "04",
    seasonTitle: "MUSIM GUGUR",
    subtitle: "BABAK 04 · KATALIS MERAH (PERJALANAN 23 JUNI & MOSCOW DREAM)",
    quote:
      "Ratusan kilometer di atas bus malam menatap jendela basah. Orang bilang perjalanan itu melelahkan, tapi bagiku, di ujung peron itu selalu adalah kamu.",
    accentColor: "#FF1E40",
    glowColor: "rgba(255, 30, 64, 0.4)",
    nextAct: 5,
    nextActName: "Polaris Abadi",
    imageSrc: "/images/act5-polaris.jpg",
    telemetry: {
      k1: "TANGGAL",
      v1: "23 JUNI 2026",
      k2: "RUTE",
      v2: "PROBOLINGGO ➔ JOGJA",
      k3: "IMPIAN",
      v3: "SALJU KATEDRAL MOSCOW",
    },
  },
  5: {
    id: 5,
    index: 5,
    roman: "05",
    seasonTitle: "BINTANG POLARIS",
    subtitle: "BABAK 05 · POLARIS (365 HARI MENGORBIT BERSAMA)",
    quote:
      "Di film-film, mereka sering memilih berpisah demi impian masing-masing. Tapi di kisah nyata kita, aku memilihmu sebagai Polaris—arah tujuan hidupku.",
    accentColor: "#FFD700",
    glowColor: "rgba(255, 215, 0, 0.45)",
    nextAct: 1,
    nextActName: "Musim Dingin (Orbit Baru)",
    imageSrc: "/MALAM DI DALAM KAMAR.jpg",
    telemetry: {
      k1: "ORBIT",
      v1: "365 HARI (2025–2026)",
      k2: "BINTANG",
      v2: "POLARIS (NAIQO)",
      k3: "TUJUAN",
      v3: "MASA DEPAN BERSAMA",
    },
  },
};

export default function SpaceVoyageHUD({
  currentAct,
  onSelectAct,
  onOpenPromiseModal,
  onHoldWhatIfStart,
  onHoldWhatIfEnd,
}: SpaceVoyageHUDProps) {
  const activeActNum = typeof currentAct === "number" ? currentAct : 5;
  const currentWorld = WORLDS[activeActNum] || WORLDS[1];
  const nextWorld = WORLDS[Number(currentWorld.nextAct)] || WORLDS[1];

  // Interactivity States
  const [isWarping, setIsWarping] = useState(false);
  const [showChatDrawer, setShowChatDrawer] = useState(false);
  const [isCooking, setIsCooking] = useState(false);
  const [conflictPerspective, setConflictPerspective] = useState<"fear" | "grit">("grit");
  const [ticketStamped, setTicketStamped] = useState(false);
  const [isHoldingWhatIf, setIsHoldingWhatIf] = useState(false);

  // Time navigation debounce
  const lastNavTime = useRef<number>(0);

  const navigateTo = (targetAct: ActId) => {
    const now = Date.now();
    if (now - lastNavTime.current < 850) return;
    lastNavTime.current = now;

    playPortalWarpSFX();
    setIsWarping(true);
    worldBridge.setWarp(true, 1.5);

    onSelectAct(targetAct);

    setTimeout(() => {
      worldBridge.setWarp(false);
      setIsWarping(false);
    }, 1200);
  };

  const handleNextWorld = () => {
    navigateTo(currentWorld.nextAct);
  };

  const handlePrevWorld = () => {
    const prev = activeActNum > 1 ? ((activeActNum - 1) as ActId) : 5;
    navigateTo(prev);
  };

  // Keyboard Navigation: ArrowDown/Right to next, ArrowUp/Left to prev, Space to next
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showChatDrawer) return;
      if (e.key === "ArrowDown" || e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        handleNextWorld();
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrevWorld();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentWorld, showChatDrawer]);

  // Touch Swipe Navigation
  useEffect(() => {
    let startY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY;
    };
    const handleTouchEnd = (e: TouchEvent) => {
      if (showChatDrawer) return;
      const endY = e.changedTouches[0].clientY;
      const diffY = startY - endY;
      if (Math.abs(diffY) > 60) {
        if (diffY > 0) {
          handleNextWorld();
        } else {
          handlePrevWorld();
        }
      }
    };
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [currentWorld, showChatDrawer]);

  // Wheel Gesture Navigation (Debounced)
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (showChatDrawer) return;
      if (Math.abs(e.deltaY) > 40) {
        if (e.deltaY > 0) {
          handleNextWorld();
        } else {
          handlePrevWorld();
        }
      }
    };
    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [currentWorld, showChatDrawer]);

  // Act 2: Cooking trigger
  const handleTriggerCooking = () => {
    playSizzlingSFX();
    setIsCooking(true);
    worldBridge.setCooking(true, ["garlic", "chili", "olive-oil"]);
    setTimeout(() => {
      setIsCooking(false);
      worldBridge.setCooking(false, []);
    }, 4500);
  };

  // Act 3: Conflict toggle
  const handleTogglePerspective = (mode: "fear" | "grit") => {
    playPopSFX();
    setConflictPerspective(mode);
    worldBridge.setConflictPerspective(mode);
  };

  // Act 4: Stamp ticket
  const handleStampTicket = () => {
    if (ticketStamped) return;
    playStampSFX();
    playBusHornSFX();
    setTicketStamped(true);
    worldBridge.setWarp(true, 1.3);
    setTimeout(() => {
      worldBridge.setWarp(false);
    }, 1500);
  };

  // Act 5: What-If Hold
  const startWhatIfHold = () => {
    setIsHoldingWhatIf(true);
    onHoldWhatIfStart();
  };

  const endWhatIfHold = () => {
    if (isHoldingWhatIf) {
      setIsHoldingWhatIf(false);
      onHoldWhatIfEnd();
    }
  };

  // Act 5: Open Promise Modal
  const handleOpenPromise = () => {
    playChimeSFX();
    try {
      confetti({
        particleCount: 90,
        spread: 85,
        origin: { y: 0.6 },
        colors: ["#FFD700", "#00C853", "#0047FF", "#FFFFFF"],
      });
    } catch {}
    onOpenPromiseModal();
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-10 flex flex-col justify-between pt-20 pb-6 px-4 sm:px-8 select-none overflow-hidden">
      {/* Top spacer for global HeaderNav */}
      <div className="w-full" />

      {/* 2. MAIN CENTER STAGE: LEFT RAIL + CENTER SQUIRCLE PORTAL */}
      <div className="relative flex-1 flex items-center justify-between w-full my-auto pointer-events-none">
        
        {/* Left Chapter Rail (Pure text list matching Space Voyage) */}
        <nav className="pointer-events-auto flex flex-col gap-3 z-20">
          {[1, 2, 3, 4, 5].map((num) => {
            const w = WORLDS[num];
            const isActive = activeActNum === num;
            return (
              <button
                key={num}
                onClick={() => navigateTo(num as ActId)}
                className={`group flex items-center gap-3 text-left transition-all duration-300 cursor-pointer ${
                  isActive ? "opacity-100 translate-x-1" : "opacity-40 hover:opacity-80"
                }`}
              >
                <div
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    isActive ? "scale-150 shadow-[0_0_8px_white]" : "bg-white/60"
                  }`}
                  style={{
                    backgroundColor: isActive ? w.accentColor : undefined,
                  }}
                />
                <div className="font-mono text-xs flex items-center gap-1.5">
                  <span className="text-white/40">[{w.roman}]</span>
                  <span
                    className={`transition-colors ${
                      isActive ? "text-white font-bold text-sm drop-shadow" : "text-white/80 font-normal"
                    }`}
                  >
                    {w.seasonTitle}
                  </span>
                </div>
              </button>
            );
          })}
        </nav>

        {/* Center Portal Aperture (Exact Space-Voyage Squircle Window & Magnetic Button) */}
        <div className="pointer-events-auto mx-auto relative flex flex-col items-center">
          
          {/* Naked 'Next: [02] Season' directly above squircle */}
          <div className="flex items-center justify-between w-full max-w-[260px] sm:max-w-[320px] px-1 mb-2 text-xs font-mono text-white/80">
            <span className="text-white/50 tracking-wider">Next:</span>
            <span className="font-bold tracking-wider" style={{ color: nextWorld.accentColor }}>
              [{nextWorld.roman}] {nextWorld.seasonTitle}
            </span>
          </div>

          {/* Clean Squircle Portal Window */}
          <div
            onClick={handleNextWorld}
            className={`relative group w-64 sm:w-80 h-52 sm:h-64 rounded-[36px] sm:rounded-[44px] border transition-all duration-500 cursor-pointer overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.8)] flex items-center justify-center ${
              isWarping ? "scale-110 border-white shadow-[0_0_80px_rgba(255,255,255,0.8)]" : "border-white/40 hover:border-white/80 hover:scale-105 active:scale-95"
            }`}
            style={{
              borderColor: `${nextWorld.accentColor}90`,
              boxShadow: `0 20px 60px rgba(0,0,0,0.8), 0 0 35px ${nextWorld.glowColor}`,
            }}
          >
            {/* The Actual Next World Inside the Squircle Portal */}
            <div className="absolute inset-0 overflow-hidden rounded-[36px] sm:rounded-[44px] select-none pointer-events-none">
              <img
                src={nextWorld.imageSrc}
                alt={nextWorld.seasonTitle}
                className={`w-full h-full object-cover transition-all duration-700 ease-out ${
                  isWarping
                    ? "scale-150 blur-sm opacity-40"
                    : "scale-105 group-hover:scale-115 opacity-85 group-hover:opacity-100"
                }`}
              />

              {/* Portal Depth Vignette & Cosmic Horizon Lighting */}
              <div
                className="absolute inset-0 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at center, rgba(0,0,0,0.2) 25%, rgba(3,7,18,0.75) 100%)`,
                  boxShadow: `inset 0 0 35px rgba(0,0,0,0.9), inset 0 0 20px ${nextWorld.glowColor}`,
                }}
              />
            </div>

            {/* Subtle animated aura rings */}
            <div
              className="absolute inset-0 rounded-[36px] sm:rounded-[44px] opacity-30 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none"
              style={{
                boxShadow: `inset 0 0 40px ${nextWorld.accentColor}`,
              }}
            />

            {/* Iconic Magnetic Circular Button in the exact center */}
            <div className="relative z-10 flex flex-col items-center justify-center gap-2 pointer-events-auto">
              <div
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-white/90 bg-black/50 backdrop-blur-md flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.4)] group-hover:scale-110 group-hover:border-white transition-all duration-300"
                style={{ boxShadow: `0 0 25px ${nextWorld.glowColor}` }}
              >
                <div className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
              </div>
              <span className="font-sans text-xs font-bold tracking-widest text-white uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                {isWarping ? "Meluncur..." : "Enter"}
              </span>
            </div>
          </div>
        </div>

        {/* Right side spacer to keep aperture balanced */}
        <div className="hidden lg:block w-36" />
      </div>

      {/* 3. BOTTOM BAR: GRAND TYPOGRAPHY LEFT + NAKED TELEMETRY RIGHT */}
      <footer className="w-full flex flex-col md:flex-row items-end justify-between gap-6 pointer-events-none pb-2">
        
        {/* Bottom Left: Huge Bold World Typography & Authentic Quote (Zero Background Container) */}
        <motion.div
          key={`title-${currentWorld.id}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.5 }}
          className="pointer-events-auto max-w-xl"
        >
          <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest uppercase mb-1.5" style={{ color: currentWorld.accentColor }}>
            <Radio size={12} className="animate-pulse" />
            <span>{currentWorld.subtitle}</span>
          </div>

          <h1
            className="font-sans text-5xl sm:text-7xl lg:text-8xl font-black text-white tracking-tighter uppercase leading-none drop-shadow-[0_15px_35px_rgba(0,0,0,0.9)]"
          >
            {currentWorld.seasonTitle}
          </h1>

          <p className="font-sans text-xs sm:text-sm text-white/80 italic leading-relaxed mt-3 max-w-lg drop-shadow-md">
            "{currentWorld.quote}"
          </p>
        </motion.div>

        {/* Bottom Right: Naked Telemetry & Clean Minimalist Action (Zero Card/Boxes) */}
        <motion.div
          key={`telemetry-${currentWorld.id}`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -15 }}
          transition={{ duration: 0.5 }}
          className="pointer-events-auto flex flex-col items-end gap-3 text-right"
        >
          {/* Naked Telemetry Rows matching Space Voyage video */}
          <div className="space-y-1 font-mono text-xs drop-shadow-md">
            <div className="flex items-center justify-end gap-3 text-white/60">
              <span className="uppercase">{currentWorld.telemetry.k1}:</span>
              <span className="text-white font-medium">{currentWorld.telemetry.v1}</span>
            </div>
            <div className="flex items-center justify-end gap-3 text-white/60">
              <span className="uppercase">{currentWorld.telemetry.k2}:</span>
              <span className="text-white font-medium">{currentWorld.telemetry.v2}</span>
            </div>
            <div className="flex items-center justify-end gap-3 text-white/60">
              <span className="uppercase">{currentWorld.telemetry.k3}:</span>
              <span className="font-bold" style={{ color: currentWorld.accentColor }}>
                {currentWorld.telemetry.v3}
              </span>
            </div>
          </div>

          {/* Clean Minimalist Text Action (No bulky card button) */}
          <div className="mt-1">
            {/* WORLD 1: Open 02:14 AM Conversation Drawer */}
            {activeActNum === 1 && (
              <button
                onClick={() => { playPopSFX(); setShowChatDrawer(true); }}
                className="text-xs font-mono text-blue-400 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer group drop-shadow-md"
              >
                <span className="group-hover:translate-x-0.5 transition-transform">↗</span>
                <span className="underline underline-offset-4">Buka Percakapan Subuh 02:14 AM</span>
              </button>
            )}

            {/* WORLD 2: Sizzle Aglio Olio Cooking */}
            {activeActNum === 2 && (
              <button
                onClick={handleTriggerCooking}
                disabled={isCooking}
                className="text-xs font-mono text-emerald-400 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer group drop-shadow-md"
              >
                <Flame size={13} className={isCooking ? "animate-bounce text-amber-400" : ""} />
                <span className="underline underline-offset-4">
                  {isCooking ? "Sedang Menumis Aglio Olio 3D..." : "Nyalakan Api Wajan (Interaktif)"}
                </span>
              </button>
            )}

            {/* WORLD 3: Dual Conflict Perspective Switcher */}
            {activeActNum === 3 && (
              <div className="flex items-center gap-2 text-xs font-mono drop-shadow-md">
                <button
                  onClick={() => handleTogglePerspective("fear")}
                  className={`transition-colors cursor-pointer ${
                    conflictPerspective === "fear" ? "text-purple-300 font-bold underline underline-offset-4" : "text-white/50 hover:text-white"
                  }`}
                >
                  Cemas Naiqo
                </button>
                <span className="text-white/30">|</span>
                <button
                  onClick={() => handleTogglePerspective("grit")}
                  className={`transition-colors cursor-pointer ${
                    conflictPerspective === "grit" ? "text-blue-400 font-bold underline underline-offset-4" : "text-white/50 hover:text-white"
                  }`}
                >
                  Tekad Robit
                </button>
              </div>
            )}

            {/* WORLD 4: Boarding Pass Stamp Button */}
            {activeActNum === 4 && (
              <div className="drop-shadow-md">
                {ticketStamped ? (
                  <span className="text-xs font-mono text-red-300 flex items-center gap-1.5">
                    <Check size={13} /> Tiket Bus 23 Juni Tervalidasi
                  </span>
                ) : (
                  <button
                    onClick={handleStampTicket}
                    className="text-xs font-mono text-red-400 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Bus size={13} />
                    <span className="underline underline-offset-4">Cap Tiket Bus Jogja →</span>
                  </button>
                )}
              </div>
            )}

            {/* WORLD 5: What-If Hold Toggle & Promise Modal Unlock */}
            {activeActNum === 5 && (
              <div className="flex items-center gap-4 text-xs font-mono drop-shadow-md">
                <button
                  onMouseDown={startWhatIfHold}
                  onMouseUp={endWhatIfHold}
                  onMouseLeave={endWhatIfHold}
                  onTouchStart={startWhatIfHold}
                  onTouchEnd={endWhatIfHold}
                  className={`transition-colors cursor-pointer ${
                    isHoldingWhatIf ? "text-amber-400 font-bold" : "text-white/60 hover:text-white"
                  }`}
                >
                  {isHoldingWhatIf ? "[ Menahan Kepedihan... ]" : "[ Tahan: Jika Menyerah ]"}
                </button>
                <button
                  onClick={handleOpenPromise}
                  className="text-amber-300 hover:text-white font-bold underline underline-offset-4 flex items-center gap-1.5 cursor-pointer"
                >
                  <Star size={12} fill="currentColor" />
                  Buka Kotak Janji
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </footer>

      {/* 4. WORLD 1 CHAT DRAWER: Tenderness of 02:14 AM (Non-Intrusive Slide Panel) */}
      <AnimatePresence>
        {showChatDrawer && (
          <motion.div
            initial={{ opacity: 0, x: 380 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 380 }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="fixed top-0 right-0 bottom-0 w-full sm:w-[420px] bg-neutral-950/95 border-l border-white/20 shadow-2xl p-6 sm:p-8 z-50 flex flex-col justify-between backdrop-blur-2xl pointer-events-auto"
          >
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-600/30 border border-blue-400 flex items-center justify-center text-blue-300">
                    <Clock size={16} />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-white">Percakapan Subuh 02:14 AM</h3>
                    <p className="text-[10px] font-mono text-blue-400">ISOLASI & FREKUENSI YANG SAMA</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowChatDrawer(false)}
                  className="p-1.5 rounded-full bg-white/10 text-slate-300 hover:text-white"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Chat Thread */}
              <div className="py-6 space-y-4 max-h-[60vh] overflow-y-auto pr-1">
                <div className="p-3.5 rounded-2xl bg-neutral-900 border border-white/10 text-xs text-slate-200">
                  <span className="text-[10px] font-mono text-emerald-400 font-bold block mb-1">Naiqo · 02:14 AM</span>
                  "Kadang aku mikir, kita ini ketemu di waktu yang aneh ya..."
                </div>
                <div className="p-3.5 rounded-2xl bg-blue-950/80 border border-blue-500/40 text-xs text-blue-100 ml-4">
                  <span className="text-[10px] font-mono text-amber-300 font-bold block mb-1">Robit · 02:16 AM</span>
                  "Bukan aneh. Mungkin kita emang sama-sama lagi capek, dan tanpa sadar nemu tempat istirahat yang sama."
                </div>
                <div className="p-3.5 rounded-2xl bg-neutral-900 border border-white/10 text-xs text-slate-200">
                  <span className="text-[10px] font-mono text-emerald-400 font-bold block mb-1">Naiqo · 02:18 AM</span>
                  "Tapi kamu ga takut? Banyak hal yang belum pasti tentang masa depan..."
                </div>
                <div className="p-3.5 rounded-2xl bg-blue-950/80 border border-blue-500/40 text-xs text-blue-100 ml-4">
                  <span className="text-[10px] font-mono text-amber-300 font-bold block mb-1">Robit · 02:21 AM</span>
                  "Ketidakpastian itu pasti ada. Tapi yang pasti, aku ga mau pura-pura di depan kamu."
                </div>
                <div className="p-3.5 rounded-2xl bg-neutral-900 border border-white/10 text-xs text-slate-200">
                  <span className="text-[10px] font-mono text-emerald-400 font-bold block mb-1">Naiqo · 02:25 AM</span>
                  "Makasih ya, udah mau dengerin malam-malam gini."
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 text-center">
              <button
                onClick={() => { playChimeSFX(); setShowChatDrawer(false); }}
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold uppercase tracking-wider"
              >
                Tutup & Lanjutkan Perjalanan
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
