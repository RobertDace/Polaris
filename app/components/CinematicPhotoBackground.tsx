"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface CinematicPhotoBackgroundProps {
  currentAct: number | "what-if";
}

export default function CinematicPhotoBackground({ currentAct }: CinematicPhotoBackgroundProps) {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let animId: number;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 20;
      targetY = (e.clientY / window.innerHeight - 0.5) * 15;
    };

    const loop = () => {
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;
      setMouseOffset({ x: currentX, y: currentY });
      animId = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    animId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  const actNumber = typeof currentAct === "number" ? currentAct : 5;
  const isWhatIf = currentAct === "what-if";

  // Photo map for each act (with fallback to existing photos and rich atmospheric tints)
  const actPhotos: Record<number, { src: string; alt: string; tint: string }> = {
    1: {
      src: "/MALAM DI DALAM KAMAR.jpg",
      alt: "Suasana Hening Malam di Dalam Kamar",
      tint: "from-[#050B17]/90 via-[#071329]/80 to-[#040914]/95",
    },
    2: {
      src: "/images/act2-spring.jpg",
      alt: "Hangat Dapur & Pasta Aglio Olio",
      tint: "from-[#022C22]/90 via-[#064E3B]/80 to-[#021A15]/95",
    },
    3: {
      src: "/images/act3-summer.jpg",
      alt: "Titik Hadap Ketakutan vs Tekad Robit",
      tint: "from-[#1E112A]/90 via-[#3B1754]/80 to-[#12091A]/95",
    },
    4: {
      src: "/moscow.jpg",
      alt: "Rute Bus 23 Juni & Kubah Salju Katedral Moscow",
      tint: "from-[#1F070B]/90 via-[#3B0E14]/80 to-[#140407]/95",
    },
    5: {
      src: "/images/act5-polaris.jpg",
      alt: "Bintang Polaris & 365 Hari Mengorbit Bersama",
      tint: "from-[#070A18]/90 via-[#0D1535]/80 to-[#050610]/95",
    },
  };

  const currentPhoto = actPhotos[actNumber] || actPhotos[1];

  return (
    <div className="fixed inset-0 pointer-events-none z-[-5] overflow-hidden select-none">
      <AnimatePresence mode="wait">
        <motion.div
          key={`bg-act-${actNumber}-${isWhatIf ? "whatif" : "normal"}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 w-full h-full"
        >
          {/* Animated Photographic Layer with Ken Burns Pan & Zoom */}
          <motion.div
            animate={{
              scale: [1.03, 1.09, 1.04],
              x: [mouseOffset.x - 10, mouseOffset.x + 10, mouseOffset.x - 5],
              y: [mouseOffset.y - 8, mouseOffset.y + 8, mouseOffset.y - 4],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
            className="absolute -inset-10 w-[calc(100%+80px)] h-[calc(100%+80px)]"
          >
            <Image
              src={currentPhoto.src}
              alt={currentPhoto.alt}
              fill
              priority
              className={`object-cover transition-all duration-1000 ${
                isWhatIf
                  ? "grayscale contrast-125 brightness-50"
                  : "contrast-105 brightness-[0.65]"
              }`}
              onError={(e) => {
                // If specific act image is not yet uploaded, gracefully hide image and rely on atmospheric gradient
                (e.target as HTMLElement).style.opacity = "0";
              }}
            />
          </motion.div>

          {/* Cinematic Vignette & Color Grading Overlay */}
          <div
            className={`absolute inset-0 bg-gradient-to-b ${
              isWhatIf
                ? "from-[#020505]/95 via-[#060D0D]/90 to-[#010303]/98"
                : currentPhoto.tint
            } mix-blend-multiply transition-colors duration-1000`}
          />

          {/* Radial Peripheral Vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.85)_100%)] pointer-events-none" />

          {/* Bottom Depth Gradient */}
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
