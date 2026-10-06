"use client";

import React from "react";
import PixelMascotDivider from "@/components/ui/PixelMascotDivider";

interface StackGroup {
  category: string;
  items: string[];
}

export default function TechStackSection() {
  const stackGroups: StackGroup[] = [
    {
      category: "DEVOPS & CLOUD",
      items: ["Docker + Compose", "Linux (Arch/Debian)", "Caddy 2", "GitHub Actions", "Vercel", "Let's Encrypt"]
    },
    {
      category: "SECURITY & IDENTITY",
      items: ["Tailscale", "WireGuard", "JWT / Auth", "SSH & GPG"]
    },
    {
      category: "BACKEND & SYSTEMS",
      items: ["Node.js", "Express", "Supabase", "PostgreSQL", "Python", "Rust", "PipeWire Audio", "Wine Staging"]
    },
    {
      category: "FRONTEND",
      items: ["TypeScript", "Next.js 16 (App Router)", "React 19", "Tailwind CSS", "Vite", "Web Audio API"]
    },
    {
      category: "DESKTOP & RICE",
      items: ["Hyprland (Wayland)", "Waybar", "Bash Scripting", "Rofi", "IPC Socket Daemons"]
    },
    {
      category: "DEVELOPER TOOLS",
      items: ["Git", "GitHub", "Neovim", "VS Code", "Vitest", "Playwright"]
    }
  ];

  // Months for GitHub Contribution Graph
  const months = ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"];

  // Generate deterministic contribution dots matrix (7 days x 48 weeks)
  const days = 7;
  const weeks = 48;

  return (
    <section id="stack">
      <PixelMascotDivider number="04" label="STACK" />

      {/* Categorized Stack Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {stackGroups.map((group) => (
          <div
            key={group.category}
            className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-6 flex flex-col justify-between"
          >
            <div className="font-mono text-xs uppercase tracking-wider text-zinc-500 mb-4">
              {group.category}
            </div>

            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <div
                  key={item}
                  className="font-mono text-xs text-zinc-300 px-3 py-1.5 rounded-lg border border-zinc-850 bg-zinc-950/70 hover:border-zinc-700 transition-colors flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* GitHub Contribution Activity Heatmap */}
      <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-6">
        <div className="flex items-center justify-between mb-4 font-mono text-xs">
          <span className="text-zinc-500 uppercase tracking-wider">GITHUB</span>
          <a
            href="https://github.com/TwilightDust12"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-white transition-colors underline decoration-zinc-800 underline-offset-4"
          >
            @TwilightDust12 ↗
          </a>
        </div>

        {/* Months Bar */}
        <div className="flex justify-between text-[10px] font-mono text-zinc-600 mb-2 px-1 overflow-x-auto">
          {months.map((m, idx) => (
            <span key={idx}>{m}</span>
          ))}
        </div>

        {/* Heatmap Dots Matrix */}
        <div className="overflow-x-auto pb-2">
          <div className="grid grid-flow-col grid-rows-7 gap-1 w-max">
            {Array.from({ length: weeks * days }).map((_, i) => {
              // Create realistic activity density
              const seed = (i * 17 + 23) % 100;
              let dotBg = "bg-zinc-850";
              if (seed > 80) dotBg = "bg-white shadow-[0_0_6px_rgba(255,255,255,0.8)]";
              else if (seed > 65) dotBg = "bg-zinc-300";
              else if (seed > 45) dotBg = "bg-zinc-600";
              else if (seed > 30) dotBg = "bg-zinc-750";

              return (
                <div
                  key={i}
                  className={`w-2.5 h-2.5 rounded-sm ${dotBg} transition-transform hover:scale-125 cursor-pointer`}
                  title={`Activity on day ${i + 1}`}
                />
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-zinc-800/60 font-mono text-[10px] text-zinc-600">
          <span>Less</span>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-sm bg-zinc-850" />
            <span className="w-2.5 h-2.5 rounded-sm bg-zinc-600" />
            <span className="w-2.5 h-2.5 rounded-sm bg-zinc-300" />
            <span className="w-2.5 h-2.5 rounded-sm bg-white" />
          </div>
          <span>More</span>
        </div>
      </div>
    </section>
  );
}
