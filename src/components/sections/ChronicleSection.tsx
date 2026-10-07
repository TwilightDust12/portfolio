"use client";

import React from "react";
import Image from "next/image";
import { portfolioData } from "@/data/portfolio";
import { SwissFrame } from "@/components/ui/SwissFrame";
import { RiceSpecSheet } from "@/components/ui/RiceSpecSheet";
import {
  GraduationCap,
  Award,
  Gamepad2,
  Tv,
  Terminal,
  Sparkles,
  BookOpen,
  Heart,
} from "lucide-react";

export function ChronicleSection() {
  const { education, animeInterests, gamingInterests } = portfolioData;

  const collegeEdu = education.find((e) => e.id === "edu-cs");
  const shsEdu = education.find((e) => e.id === "edu-shs");
  const spsEdu = education.find((e) => e.id === "edu-sps");

  return (
    <section id="about" className="max-w-5xl mx-auto px-4 py-20">
      {/* Chapter Header */}
      <div className="mb-12">
        <div className="flex items-center gap-2 font-mono text-xs text-ink/60 tracking-wider mb-2">
          <span className="text-accent-text font-semibold">
            [02] // CHRONICLE & FOUNDATIONS
          </span>
          <span className="text-ink/30">―</span>
          <span className="hidden sm:inline text-ink/50">ORIGINS & RUNTIME</span>
        </div>

        <h2 className="font-mono text-3xl sm:text-4xl font-bold text-ink lowercase tracking-tight">
          behind the transmissions.
        </h2>

        <p className="font-serif italic text-lg sm:text-xl text-accent-text mt-2">
          Doing things, little by little.
        </p>

        <p className="font-sans text-sm sm:text-base text-ink/70 mt-4 leading-relaxed max-w-3xl">
          A trajectory shaped by structured academic inquiry, early leadership in digital
          arts, and a dedicated appreciation for Japanese narrative animation and
          precision Linux desktop computing.
        </p>
      </div>

      {/* Two-Column Grid: Academia & Culture */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Card 1: Academic Milestones & Trajectory */}
        <SwissFrame
          tag="ACADEMIA // STI"
          showCrosshairs={true}
          showCalipers={true}
          className="p-6 sm:p-7 rounded-xl flex flex-col justify-between"
        >
          <div>
            {/* Header with OJT Badge */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 mb-5 border-b border-ink/10">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-accent-text/10 text-accent-text border border-accent-text/20">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-mono text-base font-bold text-ink">
                    Academic Milestones
                  </h3>
                  <span className="font-mono text-[11px] text-ink/50 uppercase tracking-wider">
                    Lucena City, Philippines
                  </span>
                </div>
              </div>

              {/* Clear OJT objective badge */}
              <div className="font-mono text-xs px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25 inline-flex items-center gap-2 self-start sm:self-auto">
                <span className="relative flex h-2 w-2" aria-hidden="true">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="font-semibold tracking-wide">
                  Ready for On-the-Job Training (OJT)
                </span>
              </div>
            </div>

            {/* Education Timeline */}
            <div className="space-y-6">
              {/* College */}
              <div className="relative pl-5 border-l-2 border-accent-text/40">
                <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-accent-text" />
                <div className="flex flex-wrap items-baseline justify-between gap-1">
                  <h4 className="font-mono text-sm font-bold text-ink">
                    {collegeEdu?.institution || "STI College Lucena"}
                  </h4>
                  <span className="font-mono text-xs text-accent-text font-medium">
                    2023 – 2027
                  </span>
                </div>
                <p className="font-mono text-xs text-ink/80 mt-0.5 font-semibold">
                  {collegeEdu?.degree || "Bachelor of Science in Computer Science"}
                </p>
                <p className="font-sans text-xs text-ink/70 mt-2 leading-relaxed">
                  Focusing on modern full-stack web architectures, systems design,
                  algorithms, and database engineering. Leading development on the
                  WebC Student Clearance Portal as thesis capstone.
                </p>
              </div>

              {/* Senior High School */}
              <div className="relative pl-5 border-l-2 border-ink/20">
                <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-ink/40" />
                <div className="flex flex-wrap items-baseline justify-between gap-1">
                  <h4 className="font-mono text-sm font-semibold text-ink">
                    {shsEdu?.institution || "STI College Lucena"}
                  </h4>
                  <span className="font-mono text-xs text-ink/50">2021 – 2023</span>
                </div>
                <p className="font-mono text-xs text-ink/80 mt-0.5">
                  Senior High School (STEM)
                </p>

                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <span className="font-mono text-[11px] inline-flex items-center gap-1 px-2 py-0.5 rounded bg-accent-text/10 text-accent-text border border-accent-text/20">
                    <Award className="w-3 h-3" />
                    Graduated with High Honors (95 average)
                  </span>
                  <span className="font-mono text-[11px] inline-flex items-center gap-1 px-2 py-0.5 rounded bg-ink/5 text-ink/80 border border-ink/15">
                    <BookOpen className="w-3 h-3 text-ink/60" />
                    Vice President, CodeArts Online
                  </span>
                </div>
              </div>

              {/* Junior High & Elementary */}
              <div className="relative pl-5 border-l-2 border-ink/10">
                <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-ink/20" />
                <div className="flex flex-wrap items-baseline justify-between gap-1">
                  <h4 className="font-mono text-sm font-semibold text-ink">
                    {spsEdu?.institution || "Saint Philomena School"}
                  </h4>
                  <span className="font-mono text-xs text-ink/50">2012 – 2021</span>
                </div>
                <p className="font-mono text-xs text-ink/70 mt-0.5">
                  Junior High & Elementary
                </p>
                <p className="font-sans text-xs text-ink/60 mt-1 leading-relaxed">
                  Foundational education with early immersion in computing, mathematics,
                  and logic.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-ink/10 flex items-center justify-between font-mono text-[11px] text-ink/50">
            <span>TRAJECTORY: BSCS CANDIDATE</span>
            <span>STATUS: ACTIVE ENROLLMENT</span>
          </div>
        </SwissFrame>

        {/* Card 2: Personal Passions & Anime Culture */}
        <SwissFrame
          tag="CULTURE // ANIME & GAMING"
          showCrosshairs={true}
          showCalipers={true}
          className="p-6 sm:p-7 rounded-xl flex flex-col justify-between"
        >
          <div>
            {/* Header */}
            <div className="flex items-center justify-between pb-5 mb-5 border-b border-ink/10">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-accent-pink/15 text-accent-text border border-accent-pink/30">
                  <Tv className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-mono text-base font-bold text-ink">
                    Culture & Aesthetics
                  </h3>
                  <span className="font-mono text-[11px] text-ink/50 uppercase tracking-wider">
                    Narratives · Visual Arts · Precision Play
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-accent-text">
                <Heart className="w-4 h-4 fill-accent-text/20 text-accent-text" />
                <Sparkles className="w-4 h-4 text-accent-sky" />
              </div>
            </div>

            {/* Anime Narrative & Favorites */}
            <div className="space-y-3 mb-5">
              <div className="flex items-center gap-2 font-mono text-xs font-semibold text-ink">
                <span>Anime Culture & Influences</span>
              </div>
              <p className="font-sans text-xs text-ink/75 leading-relaxed">
                {animeInterests.description}
              </p>

              {/* Genre badges */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                <span className="font-mono text-[10px] text-ink/50 uppercase tracking-wider mr-1 self-center">
                  GENRES:
                </span>
                {animeInterests.genres.map((genre) => (
                  <span
                    key={genre}
                    className="font-mono text-[11px] px-2 py-0.5 rounded bg-ink/5 border border-ink/10 text-ink/80"
                  >
                    {genre}
                  </span>
                ))}
              </div>

              {/* Favorites badges */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                <span className="font-mono text-[10px] text-ink/50 uppercase tracking-wider mr-1 self-center">
                  FAVORITES:
                </span>
                {animeInterests.favorites.map((fav) => (
                  <span
                    key={fav}
                    className="font-mono text-[11px] px-2 py-0.5 rounded bg-accent-text/10 border border-accent-text/25 text-accent-text font-medium"
                  >
                    {fav}
                  </span>
                ))}
              </div>
            </div>

            {/* Artwork Showcase with studio attribution badges */}
            <div className="pt-2 mb-5">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-[11px] uppercase tracking-wider text-ink/60 font-medium">
                  Artwork Showcase // Studio Attributions
                </span>
                <span className="font-mono text-[10px] text-ink/40">MAPPA ARCHIVE</span>
              </div>

              <div className="grid grid-cols-2 gap-3.5">
                {/* Reze preview frame */}
                <div className="rounded-lg border border-ink/15 overflow-hidden bg-ink/5 group flex flex-col transition-all hover:border-accent-text/40">
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-ink/10">
                    <Image
                      src="/assets/reze.jpg"
                      alt="Reze (Bomb Girl) — Chainsaw Man"
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 50vw, 250px"
                    />
                  </div>
                  <div className="p-2 sm:p-2.5 bg-bg/95 border-t border-ink/10 flex flex-col gap-0.5">
                    <span className="font-mono text-[11px] font-semibold text-ink line-clamp-1">
                      Reze (Bomb Girl)
                    </span>
                    <span className="font-mono text-[9px] sm:text-[10px] text-accent-text font-medium tracking-tight line-clamp-1">
                      Chainsaw Man © MAPPA
                    </span>
                  </div>
                </div>

                {/* Rika preview frame */}
                <div className="rounded-lg border border-ink/15 overflow-hidden bg-ink/5 group flex flex-col transition-all hover:border-accent-text/40">
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-ink/10">
                    <Image
                      src="/assets/rika.png"
                      alt="Rika Orimoto — Jujutsu Kaisen 0"
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 50vw, 250px"
                    />
                  </div>
                  <div className="p-2 sm:p-2.5 bg-bg/95 border-t border-ink/10 flex flex-col gap-0.5">
                    <span className="font-mono text-[11px] font-semibold text-ink line-clamp-1">
                      Rika Orimoto
                    </span>
                    <span className="font-mono text-[9px] sm:text-[10px] text-accent-text font-medium tracking-tight line-clamp-1">
                      Jujutsu Kaisen 0 © MAPPA
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Gaming & Precision Play */}
            <div className="pt-2 border-t border-ink/10">
              <div className="flex items-center gap-2 mb-1.5">
                <Gamepad2 className="w-4 h-4 text-accent-sky" />
                <span className="font-mono text-xs font-semibold text-ink">
                  Gaming Disciplines
                </span>
              </div>
              <p className="font-sans text-xs text-ink/75 leading-relaxed">
                {gamingInterests.description}
              </p>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {gamingInterests.genres.map((genre) => (
                  <span
                    key={genre}
                    className="font-mono text-[10px] px-2 py-0.5 rounded bg-ink/5 text-ink/70 border border-ink/10"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-ink/10 flex items-center justify-between font-mono text-[11px] text-ink/50">
            <span>MEDIA: MAPPA / GAINAX / CLOVERWORKS</span>
            <span>AUDIO: PIPEWIRE LOW-LATENCY</span>
          </div>
        </SwissFrame>
      </div>

      {/* Section 3: Mounts RiceSpecSheet as a full-width technical foundation card */}
      <div className="w-full">
        <div className="flex items-center gap-2 mb-3 px-1">
          <Terminal className="w-4 h-4 text-accent-text" />
          <span className="font-mono text-xs uppercase tracking-wider text-ink/70 font-semibold">
            Technical Foundation // Wayland Rice & Shell Environment
          </span>
        </div>
        <RiceSpecSheet />
      </div>
    </section>
  );
}

export default ChronicleSection;
