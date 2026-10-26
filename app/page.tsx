"use client";

import React, { useState, useEffect } from "react";
import ThreeWorldCanvas from "./components/ThreeWorldCanvas";
import SpaceVoyageHUD from "./components/SpaceVoyageHUD";
import AudioAtmosphere from "./components/AudioAtmosphere";
import PromiseModal from "./components/PromiseModal";
import CustomOrbitCursor from "./components/CustomOrbitCursor";
import PreloaderSequence from "./components/PreloaderSequence";
import { worldBridge, ActId } from "./world/WorldBridge";

export default function Home() {
  const [currentAct, setCurrentAct] = useState<ActId>(1);
  const [showPromiseModal, setShowPromiseModal] = useState(false);
  const [isPreloaderDone, setIsPreloaderDone] = useState(false);

  // Sync data-act attribute on HTML body
  useEffect(() => {
    document.body.setAttribute("data-act", String(currentAct));
  }, [currentAct]);

  const handleSelectAct = (targetAct: ActId) => {
    setCurrentAct(targetAct);
    worldBridge.setAct(targetAct);
  };

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden bg-[#030712] text-white select-none">
      {/* Startup Cinematic Preloader */}
      {!isPreloaderDone && (
        <PreloaderSequence onComplete={() => setIsPreloaderDone(true)} />
      )}

      {/* Custom Interactive Orbit Cursor */}
      <CustomOrbitCursor />

      {/* Unified 3D WebGL World Journey (Single Canvas, Single Perspective Camera, Curved Flight to Polaris) */}
      <ThreeWorldCanvas currentAct={currentAct} />

      {/* Space Voyage HUD (Top Nav, Left Chapter Rail, Center Portal Aperture, Bottom Typo & Interactive Telemetry) */}
      <SpaceVoyageHUD
        currentAct={currentAct}
        onSelectAct={handleSelectAct}
        onOpenPromiseModal={() => setShowPromiseModal(true)}
        onHoldWhatIfStart={() => {
          setCurrentAct("what-if");
          worldBridge.setWhatIf(true);
        }}
        onHoldWhatIfEnd={() => {
          setCurrentAct(5);
          worldBridge.setWhatIf(false);
        }}
      />

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
