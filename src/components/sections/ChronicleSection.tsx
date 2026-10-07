"use client";

import React from "react";
import { portfolioData } from "@/data/portfolio";
import { SwissFrame } from "@/components/ui/SwissFrame";
import { RiceSpecSheet } from "@/components/ui/RiceSpecSheet";
import {
  GraduationCap,
  Award,
  Gamepad2,
  Tv,
  Terminal,
  BookOpen,
} from "lucide-react";

export function ChronicleSection() {
  const { education, animeInterests, gamingInterests } = portfolioData;

  const collegeEdu = education.find((e) => e.id === "college");
  const shsEdu = education.find((e) => e.id === "shs");
  const jhsEdu = education.find((e) => e.id === "jhs");

  return (
    <section id="about" className="max-w-5xl mx-auto px-4 py-20">
      {/* Chapter Header */}
      <div className="mb-10">
        <div className="font-mono text-xs font-bold text-accent-text tracking-wider uppercase mb-2">
          [02] // ACADEMIC CHRONICLE &amp; FOUNDATIONS
        </div>

        <h2 className="font-mono text-3xl sm:text-4xl font-bold text-ink lowercase tracking-tight">
          proven academic rigor &amp; full-stack foundations.
        </h2>

        <div className="flex items-center gap-3 mt-3 flex-wrap">
          <span className="font-serif italic text-xs sm:text-sm text-accent-text bg-accent-text/10 border border-accent-text/25 px-2.5 py-1 rounded-md font-medium">
            &ldquo;Doing things, little by little.&rdquo;
          </span>
          <p className="font-sans text-sm sm:text-base text-ink/80 leading-relaxed max-w-2xl">
            High Honors graduate with leadership in CodeArts Online, developing real-world web clearance systems at STI College Lucena.
          </p>
        </div>
      </div>

      {/* Asymmetrical Bento Grid: Academia & Culture */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        {/* Column 1: Academic Milestones & OJT Dossier (7 Cols) */}
        <div className="lg:col-span-7">
          <SwissFrame
            tag="ACADEMIC DOSSIER // STI COLLEGE"
            accentBorder="green"
            showCalipers={true}
            className="p-6 sm:p-8 rounded-2xl h-full flex flex-col justify-between"
          >
            <div>
              {/* Header with OJT Readiness Banner */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-black/10 dark:border-white/10">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-accent-green/15 text-accent-green border border-accent-green/30 shrink-0">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-mono text-base sm:text-lg font-bold text-ink">
                      Education &amp; Qualifications
                    </h3>
                    <span className="font-mono text-[11px] text-ink/60 uppercase tracking-wider block">
                      STI College Lucena · Lucena City, PH
                    </span>
                  </div>
                </div>

                {/* Prominent High-Contrast OJT Beacon */}
                <div className="font-mono text-xs px-3.5 py-1.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/35 inline-flex items-center gap-2 self-start sm:self-auto shadow-xs">
                  <span className="relative flex h-2 w-2" aria-hidden="true">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <span className="font-bold tracking-wide">
                    OJT Candidate Available (2027)
                  </span>
                </div>
              </div>

              {/* Education Timeline with Connected Visual Flow */}
              <div className="space-y-6">
                {/* College (Current Anchor) */}
                <div className="relative pl-6 border-l-2 border-accent-green/50 pb-1">
                  <div className="absolute -left-[7px] top-1 w-3 h-3 rounded-full bg-accent-green border-2 border-white dark:border-[#181825] shadow-xs" />
                  
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h4 className="font-mono text-sm sm:text-base font-bold text-ink">
                      {collegeEdu?.institution || "STI College Lucena"}
                    </h4>
                    <span className="font-mono text-xs px-2 py-0.5 rounded bg-accent-green/15 text-accent-green border border-accent-green/30 font-semibold">
                      2023 - 2027 · ACTIVE THESIS ENGINEERING
                    </span>
                  </div>

                  <p className="font-mono text-xs sm:text-sm text-ink font-bold mt-1">
                    {collegeEdu?.degree || "Bachelor of Science in Computer Science"}
                  </p>

                  <p className="font-sans text-xs text-ink/75 mt-2 leading-relaxed">
                    Focusing on full-stack web applications, database architectures, and software engineering.
                    Currently leading development on the <strong className="text-ink font-semibold">WebC Student Clearance System</strong> capstone thesis.
                  </p>
                </div>

                {/* Senior High School (MAWD Strand) */}
                <div className="relative pl-6 border-l-2 border-accent-peach/50 pb-1">
                  <div className="absolute -left-[7px] top-1 w-3 h-3 rounded-full bg-accent-peach border-2 border-white dark:border-[#181825] shadow-xs" />
                  
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h4 className="font-mono text-sm sm:text-base font-bold text-ink">
                      {shsEdu?.institution || "STI College Lucena"}
                    </h4>
                    <span className="font-mono text-xs text-ink/60 font-medium">
                      2021 - 2023
                    </span>
                  </div>

                  <p className="font-mono text-xs sm:text-sm text-ink font-bold mt-1">
                    Senior High School · Mobile App and Web Development (MAWD)
                  </p>

                  <p className="font-sans text-xs text-accent-peach font-semibold mt-0.5">
                    Graduated with High Honors (95 Average) &amp; Club Vice Presidency
                  </p>

                  {/* High-Contrast Standout Achievement Badges */}
                  <div className="flex flex-wrap items-center gap-2 mt-3">
                    <span className="font-mono text-xs inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/35 font-bold shadow-xs">
                      <Award className="w-3.5 h-3.5 text-amber-500" />
                      <span>High Honors (95 Average)</span>
                    </span>

                    <span className="font-mono text-xs inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-accent-text/15 text-accent-text border border-accent-text/30 font-semibold shadow-xs">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Vice President, CodeArts Online</span>
                    </span>
                  </div>
                </div>

                {/* Junior High & Elementary */}
                <div className="relative pl-6 border-l-2 border-black/10 dark:border-white/10">
                  <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-ink/40" />
                  
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h4 className="font-mono text-xs font-semibold text-ink/80">
                      {jhsEdu?.institution || "Saint Philomena School"}
                    </h4>
                    <span className="font-mono text-xs text-ink/50">
                      2012 - 2021
                    </span>
                  </div>

                  <p className="font-mono text-xs text-ink/60 mt-0.5">
                    Elementary &amp; Junior High School Foundations
                  </p>
                </div>
              </div>
            </div>
          </SwissFrame>
        </div>

        {/* Column 2: Interests & Culture Matrix (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col">
          <SwissFrame
            tag="CULTURE &amp; IDENTITY"
            accentBorder="pink"
            showCalipers={true}
            className="p-6 sm:p-7 rounded-2xl h-full flex flex-col justify-between"
          >
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-center gap-3 pb-5 border-b border-black/10 dark:border-white/10">
                <div className="p-2.5 rounded-xl bg-accent-pink/15 text-accent-pink border border-accent-pink/30 shrink-0">
                  <Tv className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-mono text-base font-bold text-ink">
                    Personal Interests
                  </h3>
                  <span className="font-mono text-[11px] text-ink/60 uppercase tracking-wider">
                    Anime · Gaming · Systems Ricing
                  </span>
                </div>
              </div>

              {/* Anime Interests */}
              <div>
                <div className="flex items-center gap-2 font-mono text-xs font-bold text-ink mb-2">
                  <Tv className="w-3.5 h-3.5 text-accent-pink" />
                  <span>Anime &amp; Narrative Media</span>
                </div>
                <p className="font-sans text-xs text-ink/75 leading-relaxed">
                  {animeInterests.description}
                </p>

                {/* Genre Badges */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {animeInterests.genres.map((genre) => (
                    <span
                      key={genre}
                      className="font-mono text-[11px] px-2.5 py-0.5 rounded-md bg-black/[0.04] dark:bg-white/[0.05] border border-black/15 dark:border-white/10 text-ink/80"
                    >
                      {genre}
                    </span>
                  ))}
                </div>

                {/* High-Contrast Anime Favorites */}
                <div className="flex flex-wrap gap-1.5 mt-2.5">
                  {animeInterests.favorites.map((fav) => (
                    <span
                      key={fav}
                      className="font-mono text-[11px] px-2.5 py-0.5 rounded-md bg-accent-pink/15 border border-accent-pink/30 text-ink dark:text-accent-pink font-semibold"
                    >
                      {fav}
                    </span>
                  ))}
                </div>
              </div>

              {/* Gaming Interests */}
              <div className="pt-5 border-t border-black/10 dark:border-white/10">
                <div className="flex items-center gap-2 font-mono text-xs font-bold text-ink mb-2">
                  <Gamepad2 className="w-3.5 h-3.5 text-accent-sky" />
                  <span>Interactive Gaming</span>
                </div>
                <p className="font-sans text-xs text-ink/75 leading-relaxed">
                  {gamingInterests.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mt-3">
                  {gamingInterests.genres.map((genre) => (
                    <span
                      key={genre}
                      className="font-mono text-[11px] px-2.5 py-0.5 rounded-md bg-accent-sky/15 border border-accent-sky/30 text-ink dark:text-accent-sky font-medium"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </SwissFrame>
        </div>
      </div>

      {/* Section 3: Mounts RiceSpecSheet as a full-width technical foundation card */}
      <div className="w-full">
        <div className="flex items-center gap-2 mb-3 px-1">
          <Terminal className="w-4 h-4 text-accent-text" />
          <span className="font-mono text-xs uppercase tracking-wider text-ink/70 font-semibold">
            Linux Environment &amp; Dotfiles Rice
          </span>
        </div>
        <RiceSpecSheet />
      </div>
    </section>
  );
}

export default ChronicleSection;
