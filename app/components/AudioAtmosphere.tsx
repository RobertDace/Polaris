"use client";

import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Music, Disc3, Minimize2, Maximize2 } from "lucide-react";

interface Track {
  title: string;
  artist: string;
  src: string;
  tag: string;
}

const PLAYLIST: Track[] = [
  {
    title: "Melodi Bintang Malam",
    artist: "Harmoni Reflektif",
    src: "/audio/cityofstars.mp3",
    tag: "Melodi Berdua",
  },
  {
    title: "Tema Yang Tertinggal",
    artist: "Alunan Piano",
    src: "/audio/lalaland.mp3",
    tag: "Kenangan Kita",
  },
  {
    title: "Hening 02:14 AM",
    artist: "Percakapan Subuh",
    src: "/audio/song-01.mp3",
    tag: "Babak 01",
  },
  {
    title: "Aroma Hangat Dapur",
    artist: "Kenyamanan Bersama",
    src: "/audio/song-02.mp3",
    tag: "Babak 02",
  },
  {
    title: "Rute Bus 23 Juni",
    artist: "Probolinggo → Jogja",
    src: "/audio/song-03.mp3",
    tag: "Babak 03",
  },
  {
    title: "Kubah Salju Moscow",
    artist: "Impian Terindahmu",
    src: "/audio/song-04.mp3",
    tag: "Babak 04",
  },
  {
    title: "Polaris (365 Hari)",
    artist: "Robit & Naiqo",
    src: "/audio/song-05.mp3",
    tag: "Puncak Orbit",
  },
];

export default function AudioAtmosphere() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);

  const currentTrack = PLAYLIST[currentTrackIndex];

  // Auto-collapse after 8s of inactivity
  const resetIdle = () => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    if (isExpanded) {
      idleTimerRef.current = setTimeout(() => {
        setIsExpanded(false);
      }, 8000);
    }
  };

  useEffect(() => {
    resetIdle();
    return () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, [isExpanded]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const togglePlay = () => {
    setHasInteracted(true);
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((e) => {
        console.warn("Audio autoplay blocked or file loading error:", e);
      });
    }
    resetIdle();
  };

  const handleNext = () => {
    const next = (currentTrackIndex + 1) % PLAYLIST.length;
    setCurrentTrackIndex(next);
    if (isPlaying && audioRef.current) {
      setTimeout(() => {
        audioRef.current?.play().catch(console.warn);
      }, 100);
    }
    resetIdle();
  };

  const handlePrev = () => {
    const prev = (currentTrackIndex - 1 + PLAYLIST.length) % PLAYLIST.length;
    setCurrentTrackIndex(prev);
    if (isPlaying && audioRef.current) {
      setTimeout(() => {
        audioRef.current?.play().catch(console.warn);
      }, 100);
    }
    resetIdle();
  };

  const formatTime = (secs: number) => {
    if (!Number.isFinite(secs) || secs < 0) return "0:00";
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetTime = Number(e.target.value);
    setCurrentTime(targetTime);
    if (audioRef.current) {
      audioRef.current.currentTime = targetTime;
    }
    resetIdle();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 select-none">
      <audio
        ref={audioRef}
        src={currentTrack.src}
        preload="metadata"
        onTimeUpdate={() => {
          if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
          }
        }}
        onLoadedMetadata={() => {
          if (audioRef.current) {
            setDuration(audioRef.current.duration);
          }
        }}
        onEnded={handleNext}
      />

      {/* Expanded Player Window */}
      {isExpanded ? (
        <div
          onMouseMove={resetIdle}
          onClick={(e) => e.stopPropagation()}
          className="w-80 sm:w-96 p-5 rounded-2xl bg-neutral-900/90 backdrop-blur-2xl border border-white/15 text-white shadow-[0_20px_50px_rgba(0,0,0,0.6),0_0_30px_rgba(255,215,0,0.12)] transition-all animate-in fade-in zoom-in-95 duration-300"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-[10px] font-mono tracking-widest text-amber-300/80 uppercase">
                POLARIS AUDIO SANCTUARY
              </span>
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
              title="Kecilkan Pemutar"
            >
              <Minimize2 size={15} />
            </button>
          </div>

          {/* Track Info & Vinyl Art */}
          <div className="flex items-center gap-4 my-4">
            <div className="relative w-14 h-14 rounded-full bg-gradient-to-tr from-neutral-800 to-neutral-700 border-2 border-white/20 flex items-center justify-center shadow-lg overflow-hidden flex-shrink-0">
              <div
                className={`w-full h-full flex items-center justify-center transition-transform ${
                  isPlaying ? "animate-spin" : ""
                }`}
                style={{ animationDuration: "6s" }}
              >
                <Disc3 className="text-amber-400" size={32} />
              </div>
              <div className="absolute w-3 h-3 rounded-full bg-neutral-900 border border-white/40" />
            </div>

            <div className="overflow-hidden">
              <span className="inline-block text-[9px] font-mono px-2 py-0.5 rounded bg-amber-400/15 text-amber-300 border border-amber-400/25 mb-1">
                {currentTrack.tag}
              </span>
              <h4 className="text-sm font-semibold truncate text-white">{currentTrack.title}</h4>
              <p className="text-xs text-neutral-400 truncate">{currentTrack.artist}</p>
            </div>
          </div>

          {/* Scrubber Progress Bar */}
          <div className="space-y-1 mb-3">
            <input
              type="range"
              min={0}
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-amber-400"
            />
            <div className="flex justify-between text-[10px] font-mono text-neutral-400">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Playback Controls */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-1.5 text-neutral-400 hover:text-white rounded-lg transition-colors"
              >
                {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={isMuted ? 0 : volume}
                onChange={(e) => {
                  setVolume(Number(e.target.value));
                  if (isMuted) setIsMuted(false);
                }}
                className="w-16 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handlePrev}
                className="p-2 text-neutral-300 hover:text-white rounded-full hover:bg-white/10 transition-colors"
                title="Lagu Sebelumnya"
              >
                <SkipBack size={16} />
              </button>
              <button
                onClick={togglePlay}
                className="w-10 h-10 rounded-full bg-amber-400 text-neutral-950 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform shadow-[0_0_20px_rgba(251,191,36,0.5)]"
                title={isPlaying ? "Jeda" : "Putar"}
              >
                {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-0.5" />}
              </button>
              <button
                onClick={handleNext}
                className="p-2 text-neutral-300 hover:text-white rounded-full hover:bg-white/10 transition-colors"
                title="Lagu Selanjutnya"
              >
                <SkipForward size={16} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Collapsed Floating Pill */
        <button
          onClick={() => {
            setIsExpanded(true);
            if (!hasInteracted && !isPlaying) {
              togglePlay();
            }
          }}
          className="group flex items-center gap-3 px-4 py-3 rounded-full bg-neutral-900/85 backdrop-blur-xl border border-white/20 text-white shadow-[0_10px_35px_rgba(0,0,0,0.5),0_0_25px_rgba(255,215,0,0.15)] hover:border-amber-400/50 hover:scale-105 active:scale-95 transition-all"
          title="Buka Pemutar Musik"
        >
          <div
            className={`w-7 h-7 rounded-full bg-gradient-to-tr from-amber-400 to-amber-200 flex items-center justify-center text-neutral-950 shadow-md ${
              isPlaying ? "animate-spin" : ""
            }`}
            style={{ animationDuration: "5s" }}
          >
            <Music size={14} />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-[11px] font-semibold text-white group-hover:text-amber-300 transition-colors max-w-[130px] truncate">
              {currentTrack.title}
            </span>
            <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-wider">
              {isPlaying ? "Memutar" : "Klik untuk Musik"}
            </span>
          </div>
          <Maximize2 size={13} className="text-neutral-400 ml-1 group-hover:text-white transition-colors" />
        </button>
      )}
    </div>
  );
}
