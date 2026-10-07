"use client";

import React from "react";
import { portfolioData } from "@/data/portfolio";
import { ArrowUp, Terminal, Cpu, GitCommit, Compass } from "lucide-react";

export function ColophonFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const commitSha = process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) || "master.c217cd4";

  // Catppuccin Latte palette dots (Light Mode)
  const lattePalette = [
    { name: "Base", hex: "#eff1f5" },
    { name: "Text", hex: "#4c4f69" },
    { name: "Mauve", hex: "#8839ef" },
    { name: "Pink", hex: "#ea76cb" },
    { name: "Sky", hex: "#04a5e5" },
  ];

  // Catppuccin Mocha palette dots (Dark Mode)
  const mochaPalette = [
    { name: "Base", hex: "#11111b" },
    { name: "Text", hex: "#cdd6f4" },
    { name: "Mauve", hex: "#cba6f7" },
    { name: "Pink", hex: "#f5c2e7" },
    { name: "Sky", hex: "#89dceb" },
  ];

  return (
    <footer className="border-t border-ink/10 mt-20 pt-12 pb-28 sm:pb-16 px-4 max-w-5xl mx-auto">
      {/* Colophon Grid (3 columns on desktop) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-10 border-b border-ink/10">
        {/* Column 1: System Telemetry & Signature */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 font-mono text-xs font-bold text-ink tracking-wider uppercase">
            <Terminal className="w-3.5 h-3.5 text-accent-text shrink-0" />
            <span>JOSE RAPHAEL JARO // TWILIGHT</span>
          </div>

          <div className="space-y-1.5 font-mono text-xs text-ink/70">
            <div className="flex items-center gap-1.5">
              <Compass className="w-3 h-3 text-ink/40 shrink-0" />
              <span>13.9319° N, 121.6172° E · Lucena City, PH</span>
            </div>
            <div className="flex items-center gap-1.5 text-ink/60 text-[11px]">
              <Cpu className="w-3 h-3 text-accent-text shrink-0" />
              <span>KERNEL: CachyOS x86_64 // HYPRLAND WAYLAND</span>
            </div>
          </div>
        </div>

        {/* Column 2: Build & Release Telemetry */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 font-mono text-xs font-bold text-ink tracking-wider uppercase">
            <GitCommit className="w-3.5 h-3.5 text-accent-text shrink-0" />
            <span>BUILD TELEMETRY</span>
          </div>

          <div className="space-y-1.5 font-mono text-xs text-ink/70">
            <div className="text-[11px] text-ink/80">
              commit: <span className="text-accent-text font-semibold">{commitSha}</span>
            </div>
            <div className="text-[11px] text-ink/60 leading-relaxed">
              Stack: Next.js 15 · React 19 · Tailwind CSS · Radix UI · next-themes
            </div>
          </div>
        </div>

        {/* Column 3: Palette Spec & Back to Top */}
        <div className="space-y-3 flex flex-col justify-between">
          <div>
            <div className="font-mono text-xs font-bold text-ink tracking-wider uppercase mb-2">
              PALETTE SPEC // CATPPUCCIN
            </div>

            {/* Catppuccin palette indicator dots */}
            <div className="space-y-1.5">
              {/* Latte row */}
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] text-ink/50 w-12">Latte:</span>
                <div className="flex items-center gap-1.5">
                  {lattePalette.map((color) => (
                    <span
                      key={color.name}
                      style={{ backgroundColor: color.hex }}
                      className="w-3.5 h-3.5 rounded-full border border-ink/20 shadow-xs inline-block"
                      title={`Latte ${color.name} (${color.hex})`}
                    />
                  ))}
                </div>
              </div>

              {/* Mocha row */}
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] text-ink/50 w-12">Mocha:</span>
                <div className="flex items-center gap-1.5">
                  {mochaPalette.map((color) => (
                    <span
                      key={color.name}
                      style={{ backgroundColor: color.hex }}
                      className="w-3.5 h-3.5 rounded-full border border-ink/20 shadow-xs inline-block"
                      title={`Mocha ${color.name} (${color.hex})`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Back to top button */}
          <div>
            <button
              type="button"
              onClick={scrollToTop}
              className="btn-press font-mono text-xs text-accent-text hover:underline flex items-center gap-1.5 mt-3 group"
              aria-label="Back to top of page"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform duration-150 ease-out" />
            </button>
          </div>
        </div>
      </div>

      {/* Copyright line */}
      <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-[11px] text-ink/50 border-t border-ink/10 mt-6">
        <p>
          © 2026 Jose Raphael Jaro. Built with Next.js &amp; Tailwind CSS.
        </p>
        <div className="flex items-center gap-2 text-[11px] text-ink/50">
          <span>Lucena City, Philippines</span>
        </div>
      </div>
    </footer>
  );
}

export default ColophonFooter;
