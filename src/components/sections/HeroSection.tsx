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

export default function HeroSection() {
  const [portraitSrc, setPortraitSrc] = useState("/assets/profile.jpg");

  const socialIconMap: Record<string, React.ReactNode> = {
    github: <GithubIcon className="w-4 h-4" />,
    linkedin: <LinkedinIcon className="w-4 h-4" />,
    facebook: <FacebookIcon className="w-4 h-4" />,
    instagram: <InstagramIcon className="w-4 h-4" />,
    discord: <DiscordIcon className="w-4 h-4" />,
  };

  return (
    <section
      id="hero"
      className="min-h-[85vh] flex flex-col justify-center max-w-5xl mx-auto px-4 py-16 sm:py-24"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Telemetry & Identity */}
        <div className="lg:col-span-7 flex flex-col items-start">
          {/* Telemetry badge */}
          <div className="font-mono text-xs text-ink/60 tracking-wider mb-4 flex items-center gap-2">
            <span
              className="inline-block w-1.5 h-1.5 rounded-full bg-accent-text animate-pulse"
              aria-hidden="true"
            />
            <span>[LOC-01] // 13.9319° N, 121.6172° E · LUCENA CITY, PH</span>
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

          {/* Tagline / Philosophy */}
          <p className="font-sans text-sm sm:text-base text-ink/70 mt-4 leading-relaxed max-w-xl">
            Doing things, little by little. Building responsive web systems and clean
            code at the crossroads of full-stack engineering, Wayland environments,
            and anime aesthetics.
          </p>

          {/* OJT Availability Pill */}
          <div className="font-mono text-xs px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 inline-flex items-center gap-2 my-6">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>Seeking OJT / Internship Opportunities</span>
          </div>

          {/* Action Buttons Row */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <a
              href="/cv.pdf"
              download
              className="btn-press px-6 py-3 rounded-xl bg-accent-text text-white font-medium text-sm flex items-center gap-2 shadow-lg shadow-accent-text/20 hover:opacity-95"
            >
              <span>Download CV ↓</span>
            </a>
            <a
              href="#works"
              className="btn-press px-6 py-3 rounded-xl bg-ink/5 hover:bg-ink/10 text-ink border border-ink/15 font-medium text-sm flex items-center gap-2"
            >
              <span>View Works ↘</span>
            </a>
          </div>

          {/* Quick Socials */}
          <div className="flex items-center gap-2 pt-2">
            <span className="font-mono text-xs text-ink/50 mr-1 select-none">
              // links:
            </span>
            {portfolioData.socials.map((social) => (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                title={`${social.label} (${social.username})`}
                className="btn-press p-2 rounded-lg border border-ink/15 bg-ink/5 hover:bg-ink/10 hover:border-accent-text/40 text-ink/70 hover:text-accent-text transition-colors flex items-center justify-center"
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

        {/* Right Column: Swiss-Japanese Portrait Frame */}
        <div className="lg:col-span-5 flex flex-col items-center lg:items-end w-full">
          <SwissFrame
            tag="EVA-SPEC // 01"
            showCrosshairs={true}
            showCalipers={true}
            className="p-3 sm:p-4 rounded-2xl w-full max-w-sm sm:max-w-md relative"
          >
            {/* Image Canvas with Filmic Styling */}
            <div className="relative aspect-[4/5] rounded-xl overflow-hidden border border-ink/10 bg-ink/5 group">
              <Image
                src={portraitSrc}
                alt={portfolioData.personal.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                priority
                className="object-cover object-center grayscale contrast-125 dark:contrast-115 group-hover:grayscale-0 transition-all duration-500"
                onError={() => setPortraitSrc("/assets/profile2.jpg")}
              />

              {/* Filmic duotone vignette overlay */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-transparent pointer-events-none"
                aria-hidden="true"
              />

              {/* Vertical Kanji rail */}
              <div className="absolute top-3 left-3 z-20 pointer-events-none">
                <span
                  className="kanji-rail font-sans text-xs tracking-widest text-ink/50 select-none bg-bg/85 backdrop-blur-sm px-1.5 py-2.5 rounded border border-ink/10 shadow-sm"
                  lang="ja"
                >
                  黄昏 // TWILIGHT
                </span>
              </div>

              {/* Coordinate markers */}
              <div className="absolute bottom-3 left-3 z-20 font-mono text-[10px] text-ink/70 tracking-wider uppercase bg-bg/85 backdrop-blur-sm px-2 py-1 rounded border border-ink/10 select-none pointer-events-none">
                COORD // 13.9319° N, 121.6172° E
              </div>
            </div>

            {/* Interactive Bocchi sticker at bottom-right corner */}
            <div className="absolute -bottom-4 -right-4 z-30 group/bocchi">
              <div
                tabIndex={0}
                role="img"
                aria-label="Bocchi the Rock! sticker"
                className="w-14 h-14 rounded-full border-2 border-accent-pink overflow-hidden shadow-lg hover:scale-110 transition-transform btn-press cursor-pointer relative bg-zinc-900"
              >
                <img
                  src="/assets/bocchifunni.jpg"
                  alt="Bocchi sticker"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Hover Tooltip */}
              <div className="opacity-0 group-hover/bocchi:opacity-100 group-focus-within/bocchi:opacity-100 transition-opacity duration-200 pointer-events-none absolute right-0 bottom-full mb-2 w-56 p-2 rounded-lg bg-bg/95 backdrop-blur border border-accent-pink/30 shadow-xl text-center">
                <p className="font-mono text-[11px] text-ink font-medium leading-tight">
                  &ldquo;Guitarist &amp; anxious developer&rdquo;
                </p>
                <p className="font-mono text-[9px] text-ink/50 mt-1 uppercase tracking-wider">
                  // &copy; CloverWorks
                </p>
              </div>
            </div>
          </SwissFrame>

          {/* Subtle attribution credit line */}
          <div className="text-[10px] font-mono text-ink/40 text-right mt-3 pr-2 select-none">
            Bocchi the Rock! © CloverWorks
          </div>
        </div>
      </div>
    </section>
  );
}
