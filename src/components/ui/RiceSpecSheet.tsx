"use client";

import React from "react";
import { portfolioData } from "@/data/portfolio";
import { SwissFrame } from "@/components/ui/SwissFrame";

interface SpecItem {
  label: string;
  value: string;
  tag: string;
}

export function RiceSpecSheet({ className = "" }: { className?: string }) {
  const rice = portfolioData.riceSpec;

  const specItems: SpecItem[] = [
    {
      label: "OS / Kernel",
      value: `${rice.os} (Arch Linux optimized kernel)`,
      tag: "SYS",
    },
    {
      label: "Window Manager",
      value: "Hyprland (Dynamic tiling Wayland compositor)",
      tag: "WM",
    },
    {
      label: "Status Bar",
      value: "Waybar (Custom CSS + Pywal color integration)",
      tag: "BAR",
    },
    {
      label: "Terminal Emulators",
      value: "Alacritty & Kitty (GPU-accelerated)",
      tag: "TERM",
    },
    {
      label: "Shell",
      value: `${rice.shell.join(" & ")} with custom dotfiles`,
      tag: "SH",
    },
    {
      label: "App Launchers",
      value: "Rofi (Wayland fork) & Wofi",
      tag: "RUN",
    },
    {
      label: "Color Scheme",
      value: "Pywal (Dynamic palette extraction from wallpapers across Discord, Dolphin, Mako, Waybar)",
      tag: "THEME",
    },
    {
      label: "Audio Tuning",
      value: "PipeWire low-latency routing",
      tag: "AUDIO",
    },
    {
      label: "Audio Visualizer",
      value: "Cava",
      tag: "DSP",
    },
    {
      label: "Spotify Theming",
      value: "Spicetify",
      tag: "MEDIA",
    },
  ];

  return (
    <SwissFrame
      tag="DOTFILES &amp; ENVIRONMENT"
      accentBorder="mauve"
      showCalipers={true}
      className={`p-6 sm:p-8 rounded-2xl ${className}`}
    >
      {/* Header with Fastfetch-style terminal prompt */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 mb-6 border-b border-black/10 dark:border-white/10">
        <div className="flex items-center gap-2 font-mono text-xs sm:text-sm text-ink/90 flex-wrap">
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
          </div>
          <span className="text-accent-text font-bold ml-1">twilight@cachyos</span>
          <span className="text-ink/40">:</span>
          <span className="text-accent-sky font-semibold">~</span>
          <span className="text-ink/50">$</span>
          <span className="text-ink font-bold tracking-tight">fastfetch --format json</span>
        </div>
        <div className="flex items-center gap-2 font-mono text-[10px] text-ink/60 uppercase tracking-wider font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-sky animate-pulse" aria-hidden="true" />
          <span>CACHYOS // HYPRLAND RICE</span>
        </div>
      </div>

      {/* Spec items grid: 2-column on tablet, 3-column on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
        {specItems.map((item) => (
          <div
            key={item.label}
            className="p-3.5 rounded-xl border border-black/15 dark:border-white/10 bg-black/[0.03] dark:bg-white/[0.04] hover:bg-black/[0.06] dark:hover:bg-white/[0.08] hover:border-accent-text/40 transition-colors flex flex-col justify-between group"
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="font-mono text-[11px] uppercase tracking-wider text-ink/60 group-hover:text-ink/90 font-semibold transition-colors">
                {item.label}
              </span>
              <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-accent-text/15 text-accent-text border border-accent-text/25 uppercase tracking-wider font-bold">
                {item.tag}
              </span>
            </div>
            <p className="font-mono text-xs sm:text-[13px] text-ink font-semibold leading-relaxed">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {/* Bottom status line */}
      <div className="mt-6 pt-5 border-t border-black/10 dark:border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 font-mono text-xs text-ink/80">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="font-mono text-xs text-ink font-semibold">
            status: nominal // Wayland IPC daemons active
          </span>
        </div>
        <div className="flex items-center gap-3 text-[10px] text-ink/50 tracking-wider font-medium">
          <span>IPC-SOCKET: /run/user/1000/hypr/</span>
          <span className="hidden sm:inline">·</span>
          <span className="hidden sm:inline">PIPEWIRE LOW-LATENCY</span>
        </div>
      </div>
    </SwissFrame>
  );
}

export default RiceSpecSheet;
