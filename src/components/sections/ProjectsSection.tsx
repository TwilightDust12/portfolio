"use client";

import React, { useState } from "react";
import { portfolioData } from "@/data/portfolio";
import { SwissFrame } from "@/components/ui/SwissFrame";
import { ProjectModal } from "@/components/ui/ProjectModal";
import { Project } from "@/types/portfolio";
import {
  FolderGit2,
  ExternalLink,
  Layers,
  Sparkles,
  Users,
  CheckCircle2,
} from "lucide-react";
import { GithubIcon as Github } from "@/components/ui/Icons";

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="works" className="max-w-5xl mx-auto px-4 py-20 relative">
      {/* Anchor alias to support legacy navigation targeting #projects */}
      <span id="projects" className="absolute -top-20 invisible" aria-hidden="true" />

      {/* Chapter Header */}
      <div className="mb-10">
        <div className="font-mono text-xs font-bold text-accent-text tracking-wider uppercase mb-2">
          [03] // PRODUCTION WORK &amp; CASE STUDIES
        </div>

        <h2 className="font-mono text-3xl sm:text-4xl font-bold text-ink lowercase tracking-tight">
          architected in code. built for real users.
        </h2>

        <p className="font-sans text-sm sm:text-base text-ink/75 mt-3 leading-relaxed max-w-3xl">
          From campus clearance platforms to low-latency Linux audio engines, every project solves a concrete technical challenge.
        </p>
      </div>

      {/* Projects Bento Showcase */}
      <div className="space-y-8 mt-8">
        {/* Tier 1: Flagship Thesis Capstone Spotlight (WebC) */}
        {(() => {
          const flagship = portfolioData.projects.find((p) => p.id === "webc");
          if (!flagship) return null;
          return (
            <SwissFrame
              key={flagship.id}
              tag="FLAGSHIP CAPSTONE THESIS // STI COLLEGE LUCENA"
              accentBorder="sky"
              showCalipers={true}
              className="p-6 sm:p-8 rounded-2xl border-black/20 dark:border-white/15 hover:border-accent-sky/50 transition-all duration-200 shadow-md hover:shadow-xl"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Side: Overview & Problem / Role / Outcome */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="font-mono text-xs px-2.5 py-1 rounded-md bg-accent-sky/15 text-accent-sky border border-accent-sky/30 font-bold uppercase tracking-wider">
                      Institutional Thesis Capstone
                    </span>
                    <span className="font-mono text-xs px-2.5 py-1 rounded-md bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 font-semibold">
                      Full-Stack · Team Project
                    </span>
                  </div>

                  <h3 className="font-mono text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
                    {flagship.title}
                  </h3>
                  <p className="font-sans text-sm sm:text-base text-accent-sky font-bold leading-snug">
                    WebC: Multi-role clearance portal automating departmental approval pipelines for STI College Lucena.
                  </p>

                  <div className="space-y-3 pt-4 border-t border-black/10 dark:border-white/10">
                    <div>
                      <span className="font-mono text-[11px] uppercase tracking-wider text-ink/60 font-bold block mb-1">
                        Problem Statement
                      </span>
                      <p className="font-sans text-xs sm:text-sm text-ink/80 leading-relaxed">
                        {flagship.problem}
                      </p>
                    </div>

                    <div>
                      <span className="font-mono text-[11px] uppercase tracking-wider text-ink/60 font-bold block mb-1">
                        Architectural Role
                      </span>
                      <p className="font-mono text-xs text-ink font-semibold">
                        {flagship.role}
                      </p>
                    </div>

                    <div>
                      <span className="font-mono text-[11px] uppercase tracking-wider text-ink/60 font-bold block mb-1">
                        System Outcome &amp; Impact
                      </span>
                      <p className="font-sans text-xs sm:text-sm text-ink/85 leading-relaxed font-medium">
                        {flagship.outcome}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Side: Stack Matrix, Highlights, and CTAs */}
                <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6 lg:border-l lg:border-black/10 lg:dark:border-white/10 lg:pl-8">
                  <div>
                    <span className="font-mono text-xs uppercase tracking-wider text-ink/70 font-bold flex items-center gap-1.5 mb-3">
                      <Layers className="w-4 h-4 text-accent-sky" />
                      <span>Verified Stack</span>
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {flagship.stack.map((item) => (
                        <span
                          key={item}
                          className="px-2.5 py-1 rounded-lg text-xs font-mono font-semibold bg-black/[0.04] dark:bg-white/[0.06] border border-black/15 dark:border-white/15 text-ink hover:border-accent-sky/40 transition-colors"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Highlights Checklist */}
                  <div className="space-y-2 pt-4 border-t border-black/10 dark:border-white/10">
                    <span className="font-mono text-xs uppercase tracking-wider text-ink/70 font-bold block">
                      Core Engineering Highlights
                    </span>
                    <div className="space-y-1.5">
                      {(flagship.highlights ?? []).map((highlight, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-ink/80">
                          <CheckCircle2 className="w-3.5 h-3.5 text-accent-green shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Primary Action Buttons */}
                  <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-black/10 dark:border-white/10">
                    <button
                      type="button"
                      onClick={() => setSelectedProject(flagship)}
                      className="btn-press flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-accent-sky text-white dark:text-[#11111b] font-mono text-xs font-bold shadow-md hover:opacity-95 transition-opacity"
                    >
                      <span>Architecture Case Study ✦</span>
                    </button>
                    {flagship.githubUrl && (
                      <a
                        href={flagship.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-press p-2.5 rounded-xl border border-black/15 dark:border-white/15 bg-black/[0.03] dark:bg-white/[0.05] text-ink hover:text-accent-sky hover:border-accent-sky/40 transition-colors flex items-center justify-center"
                        aria-label="WebC GitHub repository"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </SwissFrame>
          );
        })()}

        {/* Tier 2: 3-Column Bento Grid for Specialized Domains */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {portfolioData.projects
            .filter((p) => p.id !== "webc")
            .map((project, idx) => {
              const borderAccent =
                project.id === "sphere8"
                  ? "peach"
                  : project.id === "lily-chou-chou"
                  ? "pink"
                  : "mauve";

              const domainTag =
                project.id === "sphere8"
                  ? "COMMERCIAL // CLIENT"
                  : project.id === "lily-chou-chou"
                  ? "AUDIO ARCHIVE // WEB AUDIO"
                  : "SYSTEMS // WAYLAND RICE";

              const headlineHook =
                project.id === "sphere8"
                  ? "Commercial client portal with structured project intake"
                  : project.id === "lily-chou-chou"
                  ? "Real-time ambient sound synthesis with Web Audio API"
                  : "Sub-5ms PipeWire latency and dynamic Pywal compositor";

              return (
                <SwissFrame
                  key={project.id}
                  tag={domainTag}
                  accentBorder={borderAccent}
                  showCalipers={true}
                  className="p-6 rounded-2xl flex flex-col justify-between hover:border-accent-text/40 transition-all duration-200 ease-out hover:shadow-lg dark:hover:shadow-black/40 hover:-translate-y-1"
                >
                  <div className="flex flex-col space-y-4">
                    {/* Top row: Project title and headline hook */}
                    <div>
                      <h4 className="font-mono text-base font-bold text-ink">
                        {project.title}
                      </h4>
                      <p className="font-sans text-xs text-accent-text font-bold mt-1">
                        {headlineHook}
                      </p>
                      <p className="font-sans text-[11px] text-ink/65 mt-0.5">
                        {project.subtitle}
                      </p>
                    </div>

                    {/* 4-Line Breakdown */}
                    <div className="space-y-3 pt-3 border-t border-black/10 dark:border-white/10">
                      <div>
                        <span className="font-mono text-[10px] uppercase tracking-wider text-ink/60 font-semibold block mb-0.5">
                          Problem
                        </span>
                        <p className="text-xs text-ink/75 line-clamp-2 leading-relaxed">
                          {project.problem}
                        </p>
                      </div>

                      <div>
                        <span className="font-mono text-[10px] uppercase tracking-wider text-ink/60 font-semibold block mb-0.5">
                          Role
                        </span>
                        <p className="font-mono text-[11px] text-ink font-semibold">
                          {project.role}
                        </p>
                      </div>

                      <div>
                        <span className="font-mono text-[10px] uppercase tracking-wider text-ink/60 font-semibold flex items-center gap-1 mb-1.5">
                          <Layers className="w-3 h-3 text-ink/50" />
                          <span>Stack</span>
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {project.stack.map((item) => (
                            <span
                              key={item}
                              className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-black/[0.04] dark:bg-white/[0.05] border border-black/15 dark:border-white/10 text-ink/90"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <span className="font-mono text-[10px] uppercase tracking-wider text-ink/60 font-semibold flex items-center gap-1 mb-0.5">
                          <CheckCircle2 className="w-3 h-3 text-accent-green" />
                          <span>Outcome</span>
                        </span>
                        <p className="text-xs text-ink/80 leading-relaxed">
                          {project.outcome}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Footer Action Row */}
                  <div className="flex items-center justify-between gap-3 pt-5 border-t border-black/10 dark:border-white/10 mt-6">
                    <button
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      className="btn-press inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/[0.04] dark:bg-white/[0.06] hover:bg-accent-text/15 text-ink hover:text-accent-text border border-black/15 dark:border-white/15 font-mono text-xs font-semibold transition-colors duration-150"
                    >
                      <span>Case Study ✦</span>
                    </button>

                    <div className="flex items-center gap-1.5">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="relative after:absolute after:-inset-2 min-w-[34px] min-h-[34px] p-1.5 text-ink/70 hover:text-ink rounded-lg border border-black/15 dark:border-white/10 hover:border-accent-text/40 transition-colors btn-press flex items-center justify-center touch-manipulation"
                          aria-label={`${project.title} GitHub repository`}
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="relative after:absolute after:-inset-2 min-w-[34px] min-h-[34px] p-1.5 text-ink/70 hover:text-ink rounded-lg border border-black/15 dark:border-white/10 hover:border-accent-text/40 transition-colors btn-press flex items-center justify-center touch-manipulation"
                          aria-label={`${project.title} live demo`}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </SwissFrame>
              );
            })}
        </div>
      </div>

      {/* Project Modal Case Study Deep-Dive */}
      <ProjectModal
        project={selectedProject}
        open={!!selectedProject}
        onOpenChange={(open) => !open && setSelectedProject(null)}
      />
    </section>
  );
}

export default ProjectsSection;
