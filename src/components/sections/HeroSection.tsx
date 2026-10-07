"use client";

import React, { useState } from "react";
import Image from "next/image";
import { portfolioData } from "@/data/portfolio";
import { SwissFrame } from "@/components/ui/SwissFrame";
import {
  GithubIcon,
  LinkedinIcon,
  FacebookIcon,
  InstagramIcon,
} from "@/components/ui/Icons";
import { MapPin, RefreshCw } from "lucide-react";

function DiscordIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}

const AVATAR_LIST = [
  { src: "/assets/profile.jpg", label: "Jose Raphael Jaro (Primary)" },
  { src: "/assets/profile2.jpg", label: "Jose Raphael Jaro (Alternate)" },
  { src: "/assets/reze.jpg", label: "Reze Avatar (Chainsaw Man)" },
];

export default function HeroSection() {
  const [avatarIndex, setAvatarIndex] = useState(0);
  const [isGlitching, setIsGlitching] = useState(false);

  const socialIconMap: Record<string, React.ReactNode> = {
    github: <GithubIcon className="w-4 h-4" />,
    linkedin: <LinkedinIcon className="w-4 h-4" />,
    facebook: <FacebookIcon className="w-4 h-4" />,
    instagram: <InstagramIcon className="w-4 h-4" />,
    discord: <DiscordIcon className="w-4 h-4" />,
  };

  const handleCycleAvatar = () => {
    if (isGlitching) return;
    setIsGlitching(true);
    setTimeout(() => {
      setAvatarIndex((prev) => (prev + 1) % AVATAR_LIST.length);
    }, 120);
    setTimeout(() => {
      setIsGlitching(false);
    }, 320);
  };

  const currentAvatar = AVATAR_LIST[avatarIndex];

  return (
    <section
      id="hero"
      className="min-h-[80vh] flex flex-col justify-center max-w-5xl mx-auto px-4 py-16 sm:py-24"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Core Identity & Goals */}
        <div className="lg:col-span-7 flex flex-col items-start">
          {/* Location & Status Badge */}
          <div className="font-mono text-xs text-ink/70 flex items-center gap-2 mb-4">
            <MapPin className="w-3.5 h-3.5 text-accent-text" />
            <span>Lucena City, Philippines</span>
          </div>

          {/* Heading */}
          <h1 className="font-mono text-4xl sm:text-6xl font-bold tracking-tight text-ink lowercase">
            {portfolioData.personal.name}
          </h1>

          {/* Subtitle */}
          <p className="font-sans text-lg sm:text-xl text-ink/80 mt-3 font-normal">
            aspiring full-stack developer{" "}
            <span className="font-mono text-xs px-2 py-0.5 rounded bg-accent-text/10 text-accent-text border border-accent-text/20 ml-2">
              systems enthusiast
            </span>
          </p>

          {/* Bio / Tagline */}
          <p className="font-sans text-sm sm:text-base text-ink/70 mt-4 leading-relaxed max-w-xl">
            Doing things, little by little. Building responsive web applications, full-stack systems,
            and clean user interfaces with Next.js, TypeScript, and modern Linux tooling.
          </p>

          {/* OJT Availability Pill */}
          <div className="font-mono text-xs px-4 py-2 rounded-xl bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border border-emerald-500/35 inline-flex items-center gap-2.5 my-6 shadow-xs">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="font-bold tracking-wide">
              Seeking OJT / Internship Placement (2025–2026)
            </span>
          </div>

          {/* Action Buttons Row */}
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <a
              href="/cv.pdf"
              download
              className="btn-press px-6 py-3 rounded-xl bg-accent-text text-white dark:text-[#11111b] font-semibold text-sm flex items-center gap-2.5 shadow-lg shadow-accent-text/20 hover:opacity-95"
            >
              <span>Download CV ↓</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/15 dark:bg-black/25 select-none">
                PDF
              </span>
            </a>
            <a
              href="#works"
              className="btn-press px-6 py-3 rounded-xl bg-black/[0.04] dark:bg-white/[0.05] hover:bg-black/[0.08] dark:hover:bg-white/[0.09] text-ink border border-black/15 dark:border-white/10 font-semibold text-sm flex items-center gap-2 shadow-xs"
            >
              <span>View Works ↘</span>
            </a>
          </div>

          {/* Core Competencies Matrix Strip for Recruiters */}
          <div className="flex flex-wrap items-center gap-2 py-3 border-t border-black/10 dark:border-white/10 w-full mt-2">
            <span className="font-mono text-[11px] uppercase tracking-wider text-ink/60 font-semibold mr-1">
              focus:
            </span>
            <span className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-accent-sky/15 text-accent-sky border border-accent-sky/30 font-semibold">
              Next.js 15 &amp; React 19
            </span>
            <span className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-blue-500/15 text-blue-600 dark:text-blue-300 border border-blue-500/30 font-semibold">
              TypeScript
            </span>
            <span className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-accent-green/15 text-accent-green border border-accent-green/30 font-semibold">
              Supabase &amp; SQL
            </span>
            <span className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-accent-peach/15 text-accent-peach border border-accent-peach/30 font-semibold">
              Azure MSAL
            </span>
            <span className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-accent-pink/15 text-accent-pink border border-accent-pink/30 font-semibold">
              Hyprland Rice
            </span>
          </div>

          {/* Quick Social Links */}
          <div className="flex items-center gap-2 pt-2">
            <span className="font-mono text-xs text-ink/60 mr-1 select-none font-semibold">
              channels:
            </span>
            {portfolioData.socials.map((social) => (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                title={`${social.label} (${social.username})`}
                className="btn-press relative after:absolute after:-inset-1 min-w-[38px] min-h-[38px] sm:min-w-[36px] sm:min-h-[36px] p-2 rounded-lg border border-black/15 dark:border-white/10 bg-black/[0.04] dark:bg-white/[0.05] hover:bg-black/[0.08] dark:hover:bg-white/[0.09] hover:border-accent-text/40 text-ink/80 hover:text-accent-text transition-colors flex items-center justify-center touch-manipulation"
              >
                {socialIconMap[social.platform] ?? (
                  <span className="font-mono text-xs uppercase">
                    {social.platform.slice(0, 2)}
                  </span>
                )}
              </a>
            ))}
          </div>
        </div>

        {/* Right Column: Interactive Click-to-Cycle Profile Card */}
        <div className="lg:col-span-5 flex flex-col items-center lg:items-end w-full">
          <div className="w-full max-w-sm sm:max-w-md">
            <SwissFrame
              tag="PORTRAIT // 01"
              accentBorder="mauve"
              showCrosshairs={true}
              showCalipers={true}
              className="p-3 sm:p-4 rounded-2xl relative shadow-lg hover:shadow-2xl transition-all duration-200"
            >
              {/* Clickable Image Container */}
              <button
                type="button"
                onClick={handleCycleAvatar}
                aria-label={`Cycle avatar (currently ${currentAvatar.label}). Click to switch.`}
                className="relative aspect-square w-full rounded-xl overflow-hidden border border-black/15 dark:border-white/15 bg-black/[0.03] dark:bg-white/[0.04] group cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-accent-text select-none block active:scale-[0.98] transition-transform duration-150 ease-out"
              >
                {/* Main Avatar Image */}
                <Image
                  src={currentAvatar.src}
                  alt={currentAvatar.label}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                  priority
                  className={`object-cover object-center grayscale contrast-125 dark:contrast-115 group-hover:grayscale-0 transition-[filter,transform] duration-200 ease-out ${
                    isGlitching ? "scale-105 filter blur-[1px]" : "scale-100"
                  }`}
                />

                {/* Pixel Mosaic Glitch Transition Overlay (screenshot 2 effect) */}
                {isGlitching && (
                  <div
                    className="absolute inset-0 z-30 grid grid-cols-8 grid-rows-8 pointer-events-none"
                    aria-hidden="true"
                  >
                    {Array.from({ length: 64 }).map((_, i) => (
                      <div
                        key={i}
                        className="bg-black/95 dark:bg-white/95"
                        style={{
                          opacity: ((i * 37 + avatarIndex * 19) % 10) / 10,
                          transition: "opacity 120ms ease-out",
                        }}
                      />
                    ))}
                  </div>
                )}

                {/* Kanji Vertical Rail */}
                <div className="absolute top-3 left-3 z-20 pointer-events-none">
                  <span
                    className="kanji-rail font-sans text-xs tracking-widest text-ink select-none bg-white/90 dark:bg-[#181825]/90 backdrop-blur-md px-2 py-3 rounded-md border border-black/15 dark:border-white/15 shadow-sm font-semibold"
                    lang="ja"
                  >
                    黄昏 // TWILIGHT
                  </span>
                </div>

                {/* Interactive Click-to-Cycle Pill Overlay */}
                <div className="absolute bottom-3 right-3 z-20 pointer-events-none">
                  <span className="font-mono text-[10px] text-ink font-semibold bg-white/95 dark:bg-[#181825]/95 backdrop-blur-md px-3 py-1.5 rounded-lg border border-black/20 dark:border-white/20 shadow-md inline-flex items-center gap-1.5">
                    <RefreshCw className="w-3.5 h-3.5 text-accent-text animate-spin-reverse" />
                    <span>click to cycle ({avatarIndex + 1}/{AVATAR_LIST.length})</span>
                  </span>
                </div>
              </button>
            </SwissFrame>
          </div>
        </div>
      </div>
    </section>
  );
}
