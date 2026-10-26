"use client";

import React, { useState, useEffect, useCallback } from "react";
import ThreeWorldCanvas from "./components/ThreeWorldCanvas";
import CinematicPhotoBackground from "./components/CinematicPhotoBackground";
import HeaderNav from "./components/HeaderNav";
import HeroCinematic from "./components/HeroCinematic";
import Act1Winter from "./components/Act1Winter";
import Act2Spring from "./components/Act2Spring";
import Act3Summer from "./components/Act3Summer";
import Act4Autumn from "./components/Act4Autumn";
import Act5Polaris from "./components/Act5Polaris";
import SpaceVoyageHUD from "./components/SpaceVoyageHUD";
import SmoothScroll from "./components/SmoothScroll";
import AudioAtmosphere from "./components/AudioAtmosphere";
import PromiseModal from "./components/PromiseModal";
import CustomOrbitCursor from "./components/CustomOrbitCursor";
import PreloaderSequence from "./components/PreloaderSequence";
import { worldBridge, ActId } from "./world/WorldBridge";
import { playPortalWarpSFX } from "./utils/sfx";

export default function Home() {
  const [currentAct, setCurrentAct] = useState<ActId>(1);
  const [viewMode, setViewMode] = useState<"scroll" | "voyage">("scroll");
  const [showPromiseModal, setShowPromiseModal] = useState(false);
  const [isPreloaderDone, setIsPreloaderDone] = useState(false);

  // Sync data-act attribute on HTML body for Chromatic Distillation & UI Mutation
  useEffect(() => {
    document.body.setAttribute("data-act", String(currentAct));
  }, [currentAct]);

  // Scroll-spy & continuous 3D camera spline synchronization in "scroll" mode
  useEffect(() => {
    if (viewMode !== "scroll") return;

    const handleScroll = () => {
      if (currentAct === "what-if") return;

      const scrollY = window.scrollY;
      const docHeight = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1
      );
      const rawProgress = Math.min(Math.max(scrollY / docHeight, 0), 1);

      // Drive 3D camera along the Catmull-Rom spline continuously
      worldBridge.setScrollProgress(rawProgress);

      // Determine active Act by section position in viewport
      const viewportCenter = scrollY + window.innerHeight * 0.45;
      let detectedAct: ActId = 1;

      for (let i = 5; i >= 1; i--) {
        const el = document.getElementById(`act-${i}`);
        if (el && viewportCenter >= el.offsetTop) {
          detectedAct = i as ActId;
          break;
        }
      }

      setCurrentAct((prev) => {
        if (prev === "what-if" || prev === detectedAct) return prev;
        worldBridge.setAct(detectedAct);
        return detectedAct;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [viewMode, currentAct]);

  // Smooth jump to a specific Act section
  const scrollToAct = useCallback(
    (targetAct: ActId) => {
      setCurrentAct(targetAct);
      worldBridge.setAct(targetAct);

      if (viewMode === "scroll" && typeof targetAct === "number") {
        const el = document.getElementById(`act-${targetAct}`);
        if (el) {
          playPortalWarpSFX();
          worldBridge.setWarp(true, 1.3);
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          setTimeout(() => {
            worldBridge.setWarp(false);
          }, 1000);
        }
      }
    },
    [viewMode]
  );

  const handleHoldWhatIfStart = useCallback(() => {
    setCurrentAct("what-if");
    worldBridge.setWhatIf(true);
    worldBridge.setAct("what-if");
  }, []);

  const handleHoldWhatIfEnd = useCallback(() => {
    setCurrentAct(5);
    worldBridge.setWhatIf(false);
    worldBridge.setAct(5);
  }, []);

  return (
    <div
      className={`relative min-h-screen w-full transition-colors duration-700 ${
        viewMode === "voyage" ? "fixed inset-0 h-screen overflow-hidden" : ""
      } ${currentAct === "what-if" ? "what-if-vignette" : ""}`}
    >
      {/* Startup Cinematic Preloader */}
      {!isPreloaderDone && (
        <PreloaderSequence onComplete={() => setIsPreloaderDone(true)} />
      )}

      {/* Custom Interactive Orbit Cursor */}
      <CustomOrbitCursor />

      {/* Atmospheric Photographic Ken Burns & Mouse Parallax Layer */}
      <CinematicPhotoBackground currentAct={currentAct} />

      {/* Unified 3D WebGL World Journey (Single Canvas, Curved Flight to Polaris) */}
      <ThreeWorldCanvas currentAct={currentAct} />

      {/* Top Navigation Bar with Act Selector & View Mode Toggle */}
      <HeaderNav
        currentAct={currentAct}
        onSelectAct={(actNum) => scrollToAct(actNum as ActId)}
        viewMode={viewMode}
        onToggleViewMode={() =>
          setViewMode((prev) => (prev === "scroll" ? "voyage" : "scroll"))
        }
        onOpenPromiseModal={() => setShowPromiseModal(true)}
      />

      {/* VIEW MODE 1: Full 5-Act Scrollytelling + Interactive 3D Models */}
      {viewMode === "scroll" ? (
        <SmoothScroll>
          <main className="relative z-10 pt-14">
            {/* Hero Opening */}
            <HeroCinematic onStart={() => scrollToAct(1)} />

            {/* Babak 1: Musim Dingin (02:14 AM Chat & 3D Smartphone) */}
            <Act1Winter onNext={() => scrollToAct(2)} />

            {/* Babak 2: Musim Semi (Aglio Olio & 3D Cast Iron Skillet) */}
            <Act2Spring onNext={() => scrollToAct(3)} />

            {/* Babak 3: Musim Panas (Rasa Cemas vs Tekad & 3D Dual-Resonance Crystal) */}
            <Act3Summer onNext={() => scrollToAct(4)} />

            {/* Babak 4: Musim Gugur (Tiket Bus 23 Juni & 3D Katedral Moscow) */}
            <Act4Autumn onNext={() => scrollToAct(5)} />

            {/* Babak 5: Bintang Polaris (365 Hari Orbit, 3D Polaris Star, What-If & Kotak Janji) */}
            <Act5Polaris
              onOpenPromiseModal={() => setShowPromiseModal(true)}
              onHoldWhatIfStart={handleHoldWhatIfStart}
              onHoldWhatIfEnd={handleHoldWhatIfEnd}
            />
          </main>
        </SmoothScroll>
      ) : (
        /* VIEW MODE 2: Full-Screen 3D Space Voyage Portal HUD */
        <SpaceVoyageHUD
          currentAct={currentAct}
          onSelectAct={scrollToAct}
          onOpenPromiseModal={() => setShowPromiseModal(true)}
          onHoldWhatIfStart={handleHoldWhatIfStart}
          onHoldWhatIfEnd={handleHoldWhatIfEnd}
        />
      )}

      {/* Audio Sanctuary Controller */}
      <AudioAtmosphere />

      {/* Unlocked Sanctuary: Surat Rahasia & Janji Robit */}
      <PromiseModal
        isOpen={showPromiseModal}
        onClose={() => setShowPromiseModal(false)}
      />
    </div>
  );
}
