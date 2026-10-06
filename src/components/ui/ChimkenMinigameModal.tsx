"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trophy, Volume2, VolumeX } from "lucide-react";

interface ChimkenMinigameModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChimkenMinigameModal({ isOpen, onClose }: ChimkenMinigameModalProps) {
  const [clicks, setClicks] = useState(0);
  const [bouncing, setBouncing] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [quote, setQuote] = useState("bawk! click me for beats!");

  const quotes = [
    "bawk! +1 beat!",
    "rhythm gaming mode activated!",
    "wine-staging prefix compiled!",
    "osu! circles clicked to the beat!",
    "hyprland workspace switched!",
    "pipewire sub-5ms achieved!",
    "kernel module loaded!",
    "chimken is grooving 🎵"
  ];

  const playBeep = () => {
    if (!soundEnabled || typeof window === "undefined") return;
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(440 + (clicks % 8) * 80, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.12);
    } catch {
      // AudioContext unavailable or blocked
    }
  };

  const handlePet = () => {
    setClicks((c) => c + 1);
    setBouncing(true);
    setTimeout(() => setBouncing(false), 200);
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    playBeep();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === " " && isOpen) {
        e.preventDefault();
        handlePet();
      }
    };
    if (isOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, clicks]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-sm"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", duration: 0.28, bounce: 0.1 }}
            className="relative w-full max-w-sm rounded-xl border border-zinc-800 bg-[#0c0c10] p-6 shadow-2xl z-10 text-center"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-6">
              <span className="font-mono text-xs text-zinc-400 flex items-center gap-2">
                <span>🐥</span>
                <span>PLAY CHIMKEN</span>
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className="p-1 text-zinc-500 hover:text-white transition-colors"
                  aria-label="Toggle sound"
                >
                  {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={onClose}
                  className="p-1 text-zinc-500 hover:text-white transition-colors"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Mascot Button */}
            <button
              onClick={handlePet}
              className={`
                my-6 mx-auto w-32 h-32 rounded-2xl border-2 border-zinc-800 bg-zinc-900/60
                flex flex-col items-center justify-center text-5xl select-none cursor-pointer
                hover:border-zinc-600 hover:bg-zinc-800/80 transition-all active:scale-95
                ${bouncing ? "scale-110 -rotate-6" : ""}
              `}
              aria-label="Pet chimken"
            >
              <span>🐥</span>
            </button>

            {/* Score */}
            <div className="font-mono text-2xl font-bold text-white mb-2 flex items-center justify-center gap-2">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>{clicks} BEATS</span>
            </div>

            {/* Speech bubble */}
            <div className="font-mono text-xs text-zinc-400 bg-zinc-950 border border-zinc-800/80 rounded-lg p-2.5 mb-4">
              &quot;{quote}&quot;
            </div>

            <p className="font-mono text-[11px] text-zinc-600">
              Press [SPACE] or Click to pet chimken
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
