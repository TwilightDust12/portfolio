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
        <h2 className="font-mono text-3xl sm:text-4xl font-bold text-ink lowercase tracking-tight">
          background &amp; foundations.
        </h2>

        <p className="font-sans text-sm sm:text-base text-accent-text mt-2 font-medium">
          Doing things, little by little.
        </p>

        <p className="font-sans text-sm sm:text-base text-ink/70 mt-2 leading-relaxed max-w-2xl">
          Computer Science student focusing on full-stack web engineering, native mobile
          applications, and custom Linux desktop environments.
        </p>
      </div>

      {/* Two-Column Grid: Academia & Culture */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Card 1: Academic Milestones */}
        <SwissFrame
          tag="ACADEMIC BACKGROUND"
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
                    Education
                  </h3>
                  <span className="font-mono text-[11px] text-ink/50 uppercase tracking-wider">
                    Lucena City, Philippines
                  </span>
                </div>
              </div>

              {/* OJT Badge */}
              <div className="font-mono text-xs px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25 inline-flex items-center gap-2 self-start sm:self-auto">
                <span className="relative flex h-2 w-2" aria-hidden="true">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="font-semibold tracking-wide">
                  Seeking OJT / Internship
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
                    2023 - 2027
                  </span>
                </div>
                <p className="font-mono text-xs text-ink/80 mt-0.5 font-semibold">
                  {collegeEdu?.degree || "Bachelor of Science in Computer Science"}
                </p>
                <p className="font-sans text-xs text-ink/70 mt-2 leading-relaxed">
                  Focusing on full-stack web applications, database systems, and software engineering.
                  Currently developing the WebC Student Clearance System capstone thesis project.
                </p>
              </div>

              {/* Senior High School - MAWD Strand */}
              <div className="relative pl-5 border-l-2 border-ink/20">
                <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-ink/40" />
                <div className="flex flex-wrap items-baseline justify-between gap-1">
                  <h4 className="font-mono text-sm font-semibold text-ink">
                    {shsEdu?.institution || "STI College Lucena"}
                  </h4>
                  <span className="font-mono text-xs text-ink/50">2021 - 2023</span>
                </div>
                <p className="font-mono text-xs text-ink/80 mt-0.5 font-semibold">
                  Senior High School - Mobile App and Web Development (MAWD)
                </p>

                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <span className="font-mono text-[11px] inline-flex items-center gap-1 px-2 py-0.5 rounded bg-accent-text/10 text-accent-text border border-accent-text/20">
                    <Award className="w-3 h-3" />
                    High Honors (95 Average)
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
                    {jhsEdu?.institution || "Saint Philomena School"}
                  </h4>
                  <span className="font-mono text-xs text-ink/50">2012 - 2021</span>
                </div>
                <p className="font-mono text-xs text-ink/70 mt-0.5">
                  Elementary &amp; Junior High School
                </p>
              </div>
            </div>
          </div>
        </SwissFrame>

        {/* Card 2: Personal Interests (Clean, NO artwork showcase) */}
        <SwissFrame
          tag="INTERESTS &amp; CULTURE"
          className="p-6 sm:p-7 rounded-xl flex flex-col justify-between"
        >
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-2.5 pb-5 border-b border-ink/10">
              <div className="p-2 rounded-lg bg-accent-pink/15 text-accent-text border border-accent-pink/30">
                <Tv className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-mono text-base font-bold text-ink">
                  Personal Interests
                </h3>
                <span className="font-mono text-[11px] text-ink/50 uppercase tracking-wider">
                  Anime · Gaming · Ricing
                </span>
              </div>
            </div>

            {/* Anime Interests */}
            <div>
              <div className="flex items-center gap-2 font-mono text-xs font-semibold text-ink mb-1.5">
                <Tv className="w-3.5 h-3.5 text-accent-text" />
                <span>Anime</span>
              </div>
              <p className="font-sans text-xs text-ink/75 leading-relaxed">
                {animeInterests.description}
              </p>

              <div className="flex flex-wrap gap-1.5 mt-2.5">
                {animeInterests.genres.map((genre) => (
                  <span
                    key={genre}
                    className="font-mono text-[11px] px-2 py-0.5 rounded bg-ink/5 border border-ink/10 text-ink/80"
                  >
                    {genre}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-1.5 mt-2">
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

            {/* Gaming Interests */}
            <div className="pt-4 border-t border-ink/10">
              <div className="flex items-center gap-2 font-mono text-xs font-semibold text-ink mb-1.5">
                <Gamepad2 className="w-3.5 h-3.5 text-accent-sky" />
                <span>Gaming</span>
              </div>
              <p className="font-sans text-xs text-ink/75 leading-relaxed">
                {gamingInterests.description}
              </p>

              <div className="flex flex-wrap gap-1.5 mt-2.5">
                {gamingInterests.genres.map((genre) => (
                  <span
                    key={genre}
                    className="font-mono text-[11px] px-2 py-0.5 rounded bg-ink/5 border border-ink/10 text-ink/70"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </SwissFrame>
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
