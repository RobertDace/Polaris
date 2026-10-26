"use client";

import React, { useRef, useState } from "react";
import { Compass, ArrowRight, Sparkles, Navigation, Zap } from "lucide-react";
import { playPortalWarpSFX } from "../utils/sfx";
import { worldBridge } from "../world/WorldBridge";

interface CosmicPortalGatewayProps {
  currentAct: number | "what-if";
  onJumpAct: (targetAct: number) => void;
  onWarpChange?: (isWarping: boolean) => void;
  embeddedAct?: number;
}

export default function CosmicPortalGateway({
  currentAct,
  onJumpAct,
  onWarpChange,
  embeddedAct,
}: CosmicPortalGatewayProps) {
  const portalWrapRef = useRef<HTMLDivElement | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [tilt, setTilt] = useState({ rotX: 0, rotY: 0 });

  // Determine active and next act
  const activeActNumber =
    embeddedAct !== undefined
      ? embeddedAct
      : typeof currentAct === "number"
      ? currentAct
      : 5;

  const nextActNumber = activeActNumber < 5 ? activeActNumber + 1 : 1;

  const actMetadata: Record<
    number,
    { title: string; subtitle: string; number: string; color: string; desc: string; coord: string }
  > = {
    1: {
      number: "[01]",
      title: "Musim Dingin",
      subtitle: "Hening 02:14 AM & Pesan Subuh",
      color: "#0047FF",
      desc: "Ponsel 3D dan kristal es di tengah hening subuh.",
      coord: "WORLD COORD: Z = 0.0",
    },
    2: {
      number: "[02]",
      title: "Musim Semi",
      subtitle: "Hangat Dapur & Pasta Aglio Olio",
      color: "#00C853",
      desc: "Wajan 3D mengepulkan aroma hangat tanpa kepalsuan.",
      coord: "WORLD COORD: Z = -20.0",
    },
    3: {
      number: "[03]",
      title: "Musim Panas",
      subtitle: "Titik Hadap Ketakutan vs Tekad Robit",
      color: "#7C3AED",
      desc: "Kristal resonansi 3D dan tabrakan berkas komitmen.",
      coord: "WORLD COORD: Z = -40.0",
    },
    4: {
      number: "[04]",
      title: "Musim Gugur",
      subtitle: "Rute Bus 23 Juni & Salju Kubah Moscow",
      color: "#FF1E40",
      desc: "Kubah katedral 3D di bawah lintasan cahaya malam.",
      coord: "WORLD COORD: Z = -60.0",
    },
    5: {
      number: "[05]",
      title: "Polaris Abadi",
      subtitle: "365 Hari Mengorbit & Janji Masa Depan",
      color: "#FFD700",
      desc: "Bintang emas 3D penunjuk arah hidup abadi.",
      coord: "WORLD COORD: Z = -90.0",
    },
  };

  const nextMeta = actMetadata[nextActNumber];

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const wrap = portalWrapRef.current;
    if (!wrap) return;
    const rect = wrap.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    setTilt({
      rotX: -ny * 8,
      rotY: nx * 10,
    });
  };

  const handlePointerLeave = () => {
    setTilt({ rotX: 0, rotY: 0 });
  };

  const handlePortalClick = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    playPortalWarpSFX();

    // Trigger persistent 3D world hyperspace warp
    worldBridge.setWarp(true, 1.4);
    if (onWarpChange) onWarpChange(true);

    // Warp flight along spline
    setTimeout(() => {
      onJumpAct(nextActNumber);
    }, 450);

    setTimeout(() => {
      worldBridge.setWarp(false);
      if (onWarpChange) onWarpChange(false);
      setIsTransitioning(false);
    }, 1200);
  };

  return (
    <div
      ref={portalWrapRef}
      data-cursor-portal="Lompat Portal"
      onClick={handlePortalClick}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{
        transform: `perspective(850px) rotateX(${tilt.rotX}deg) rotateY(${tilt.rotY}deg)`,
      }}
      className={`relative group cursor-pointer select-none transition-transform duration-200 ease-out rounded-3xl p-6 sm:p-8 border border-white/20 bg-neutral-950/85 backdrop-blur-2xl overflow-hidden shadow-2xl hover:border-amber-400/70 hover:shadow-[0_0_60px_rgba(255,215,0,0.3)] ${
        isTransitioning ? "scale-105" : ""
      }`}
    >
      {/* Background Ambience Bloom */}
      <div
        className="absolute -inset-10 rounded-full blur-3xl opacity-35 pointer-events-none transition-opacity duration-500 group-hover:opacity-70"
        style={{ background: nextMeta.color }}
      />

      {/* Top Header Badge */}
      <div className="relative z-10 flex items-center justify-between mb-4 pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <span
            className="w-2.5 h-2.5 rounded-full animate-ping"
            style={{ background: nextMeta.color }}
          />
          <span className="text-[11px] font-mono tracking-widest text-slate-200 font-bold uppercase">
            GERBANG LOMPAT 3D DUNIA · NEXT DESTINATION
          </span>
        </div>
        <span
          className="text-xs font-mono font-black px-3 py-1 rounded-full shadow-sm"
          style={{
            background: `${nextMeta.color}30`,
            color: nextMeta.color,
            border: `1px solid ${nextMeta.color}60`,
          }}
        >
          {nextMeta.number}
        </span>
      </div>

      {/* Centerpiece Dimensional Viewport */}
      <div className="relative z-10 w-full h-40 sm:h-44 my-2 rounded-2xl overflow-hidden border border-white/10 bg-black/60 flex flex-col items-center justify-center p-6 text-center shadow-inner group-hover:border-amber-400/50 transition-colors backdrop-blur-sm space-y-2">
        {/* Hyperspace Pulsing Rings */}
        <div className="relative flex items-center justify-center">
          <div
            className="w-16 h-16 rounded-full border-2 border-dashed animate-spin transition-all duration-700"
            style={{
              borderColor: nextMeta.color,
              animationDuration: isTransitioning ? "2s" : "16s",
            }}
          />
          <div className="absolute w-10 h-10 rounded-full bg-black/80 flex items-center justify-center text-amber-300 shadow-lg">
            {isTransitioning ? (
              <Zap size={20} className="text-amber-400 animate-bounce" />
            ) : (
              <Compass size={22} className="animate-spin" style={{ animationDuration: "10s" }} />
            )}
          </div>
        </div>

        <div className="space-y-0.5">
          <span className="text-[10px] font-mono tracking-widest uppercase text-amber-300 font-black block">
            {isTransitioning ? "WARP HYPERSPACE SEDANG MELUNCUR..." : "KLIK UNTUK MELUNCUR KE STASIUN 3D INI"}
          </span>
          <span className="text-[10px] font-mono text-zinc-400 block">
            {nextMeta.coord}
          </span>
        </div>
      </div>

      {/* Destination Meta & CTA */}
      <div className="relative z-10 mt-4 flex items-center justify-between gap-4">
        <div>
          <h3 className="font-serif text-xl sm:text-2xl text-white font-bold group-hover:text-amber-300 transition-colors">
            {nextMeta.title}
          </h3>
          <p className="text-xs text-slate-300 font-light mt-0.5">
            {nextMeta.subtitle}
          </p>
        </div>

        <button
          type="button"
          className="shrink-0 px-4 py-2.5 rounded-xl bg-amber-400 text-neutral-950 font-mono text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-[0_0_25px_rgba(251,191,36,0.5)] group-hover:bg-amber-300 group-hover:scale-105 active:scale-95 transition-all"
        >
          <span>Lompat</span>
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
