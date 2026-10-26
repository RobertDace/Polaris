"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomOrbitCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [orbitPos, setOrbitPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [hoverLabel, setHoverLabel] = useState("Lompat Portal");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable custom cursor on non-touch devices
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    let targetX = -100;
    let targetY = -100;
    let currentOrbitX = -100;
    let currentOrbitY = -100;
    let animId: number;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      setPos({ x: targetX, y: targetY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Smooth lerp loop for the orbit ring
    const loop = () => {
      currentOrbitX += (targetX - currentOrbitX) * 0.22;
      currentOrbitY += (targetY - currentOrbitY) * 0.22;
      setOrbitPos({ x: currentOrbitX, y: currentOrbitY });
      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);

    // Global listener for interactive portal elements
    const handlePortalHoverStart = (e: any) => {
      const target = (e.target as HTMLElement)?.closest("[data-cursor-portal]");
      if (target) {
        setIsHovered(true);
        const label = target.getAttribute("data-cursor-portal") || "Lompat Portal";
        setHoverLabel(label);
      }
    };

    const handlePortalHoverEnd = (e: any) => {
      const target = (e.target as HTMLElement)?.closest("[data-cursor-portal]");
      if (target) {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseover", handlePortalHoverStart);
    document.addEventListener("mouseout", handlePortalHoverEnd);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseover", handlePortalHoverStart);
      document.removeEventListener("mouseout", handlePortalHoverEnd);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden select-none">
      {/* Central Sharp Dot */}
      <div
        className="absolute w-2 h-2 rounded-full bg-amber-300 shadow-[0_0_12px_rgba(255,215,0,0.8)] -translate-x-1/2 -translate-y-1/2 transition-transform duration-75"
        style={{ left: `${pos.x}px`, top: `${pos.y}px` }}
      />

      {/* Outer Floating Orbit Ring */}
      <div
        className={`absolute rounded-full border transition-all duration-300 flex items-center justify-center -translate-x-1/2 -translate-y-1/2 ${
          isHovered
            ? "w-14 h-14 border-amber-400 bg-amber-400/15 backdrop-blur-xs scale-110 shadow-[0_0_25px_rgba(255,215,0,0.4)]"
            : "w-9 h-9 border-white/40 bg-white/5"
        }`}
        style={{ left: `${orbitPos.x}px`, top: `${orbitPos.y}px` }}
      >
        {/* Label on Hover */}
        {isHovered && (
          <motion.span
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-14 whitespace-nowrap px-2.5 py-0.5 rounded-full bg-neutral-950/90 border border-amber-400/50 text-[10px] font-mono tracking-wider font-bold text-amber-300 uppercase shadow-lg"
          >
            {hoverLabel}
          </motion.span>
        )}
      </div>
    </div>
  );
}
