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
  Laptop,
  Smartphone,
  Maximize2,
  Eye,
  ArrowUpLeft,
  Terminal,
} from "lucide-react";
import { GithubIcon as Github } from "@/components/ui/Icons";
import { MotionFadeUp } from "@/components/ui/MotionFadeUp";

function getProjectMeta(id: string) {
  switch (id) {
    case "webc":
      return {
        tag: "FLAGSHIP CAPSTONE THESIS // STI COLLEGE LUCENA",
        accent: "sky" as const,
        kicker: "Institutional Thesis Capstone",
        kickerColor: "bg-accent-sky/15 text-accent-sky border-accent-sky/30",
        headlineHook:
          "WebC: Multi-role clearance portal automating departmental approval pipelines for STI College Lucena.",
        subTag: "THESIS // TEAM PROJECT",
      };
    case "lily-chou-chou":
      return {
        tag: "AUDIO ARCHIVE // WEB AUDIO SYNTHESIS",
        accent: "pink" as const,
        kicker: "Atmospheric Web Experience",
        kickerColor: "bg-accent-pink/15 text-accent-pink border-accent-pink/30",
        headlineHook: "Real-time ambient sound synthesis with Web Audio API",
        subTag: "AUDIO ARCHIVE // WEB AUDIO",
      };
    case "sphere8":
      return {
        tag: "COMMERCIAL CLIENT // CORPORATE PORTAL",
        accent: "peach" as const,
        kicker: "Commercial Corporate Portal",
        kickerColor: "bg-accent-peach/15 text-accent-peach border-accent-peach/30",
        headlineHook: "Commercial client portal with structured project intake",
        subTag: "COMMERCIAL // CLIENT",
      };
    case "wayland-rice":
    default:
      return {
        tag: "SYSTEMS & WORKFLOW // CACHYOS WAYLAND",
        accent: "mauve" as const,
        kicker: "Custom CachyOS & Hyprland Setup",
        kickerColor: "bg-accent-text/15 text-accent-text border-accent-text/30",
        headlineHook: "Sub-5ms PipeWire latency and dynamic Pywal compositor",
        subTag: "SYSTEMS // WAYLAND RICE",
      };
  }
}

export function ProjectsSection() {
  const [spotlightId, setSpotlightId] = useState<string>("webc");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeScreenshotIdx, setActiveScreenshotIdx] = useState<number>(0);
  const [deviceMode, setDeviceMode] = useState<"desktop" | "mobile">("desktop");

  const spotlightProject =
    portfolioData.projects.find((p) => p.id === spotlightId) || portfolioData.projects[0];
  const secondaryProjects = portfolioData.projects.filter((p) => p.id !== spotlightId);

  const spotlightMeta = getProjectMeta(spotlightProject.id);
  const currentScreenshots = spotlightProject.screenshots || [];
  const currentScreen = currentScreenshots[activeScreenshotIdx] || currentScreenshots[0];

  const handleSelectSpotlight = (id: string) => {
    setSpotlightId(id);
    setActiveScreenshotIdx(0);
    setDeviceMode("desktop");
    const container = document.getElementById("projects-spotlight-anchor");
    if (container) {
      container.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="works" className="max-w-5xl mx-auto px-4 py-20 relative">
      {/* Anchor alias to support legacy navigation targeting #projects */}
      <span id="projects" className="absolute -top-20 invisible" aria-hidden="true" />
      <div id="projects-spotlight-anchor" className="absolute -top-24 invisible" aria-hidden="true" />

      {/* Chapter Header */}
      <MotionFadeUp yOffset={14} className="mb-10">
        <div>
          <div className="font-mono text-xs font-bold text-accent-text tracking-wider uppercase mb-2">
            [03] // PRODUCTION WORK &amp; CASE STUDIES
          </div>

          <h2 className="font-mono text-3xl sm:text-5xl font-bold text-ink lowercase tracking-tight">
            architected in code. built for real users.
          </h2>

          <p className="font-sans text-sm sm:text-base text-ink/75 mt-3 leading-relaxed max-w-3xl">
            From campus clearance platforms to low-latency Linux systems, every project solves a concrete technical challenge. Click any project card below to focus its architecture into the spotlight.
          </p>
        </div>
      </MotionFadeUp>

      {/* Projects Showcase Container */}
      <div className="space-y-8 mt-8">
        {/* Tier 1: Active Spotlight Project */}
        <MotionFadeUp key={spotlightProject.id} delay={0.06} yOffset={14} scaleFrom={0.98}>
          <SwissFrame
            tag={spotlightMeta.tag}
            accentBorder={spotlightMeta.accent}
            className="p-6 sm:p-8 rounded-2xl border-black/20 dark:border-white/15 transition-[transform,border-color,box-shadow] duration-200 ease-out shadow-lg"
          >
            <div className="space-y-6">
              {/* Optional Interactive Screenshot Viewport / Console */}
              {currentScreenshots.length > 0 ? (
                <div className="rounded-xl border border-black/15 dark:border-white/15 bg-black/[0.03] dark:bg-black/30 overflow-hidden shadow-xs">
                  {/* Browser Bar / Viewport Header */}
                  <div className="flex flex-wrap items-center justify-between gap-2 px-3 sm:px-4 py-2 border-b border-black/10 dark:border-white/10 bg-black/[0.04] dark:bg-white/[0.04]">
                    {/* Left: Window Dots & Tabs */}
                    <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                      <div className="hidden sm:flex gap-1.5" aria-hidden="true">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                      </div>

                      {/* Screenshot View Tabs */}
                      <div className="flex items-center gap-1 flex-wrap">
                        {currentScreenshots.map((screen, idx) => (
                          <button
                            key={screen.label}
                            type="button"
                            onClick={() => setActiveScreenshotIdx(idx)}
                            className={`px-2.5 py-1 rounded-md font-mono text-[11px] font-semibold transition-all cursor-pointer ${
                              activeScreenshotIdx === idx
                                ? "bg-accent-text text-white shadow-xs"
                                : "text-ink/70 hover:text-ink hover:bg-ink/5"
                            }`}
                          >
                            {screen.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Right: Device Viewport Toggle (Desktop / Mobile) & Zoom Action */}
                    <div className="flex items-center gap-2 ml-auto">
                      {currentScreen?.mobileUrl && (
                        <div className="flex items-center bg-black/10 dark:bg-white/10 p-0.5 rounded-md">
                          <button
                            type="button"
                            onClick={() => setDeviceMode("desktop")}
                            className={`px-2 py-0.5 rounded text-[10px] font-mono font-medium flex items-center gap-1 transition-colors cursor-pointer ${
                              deviceMode === "desktop"
                                ? "bg-white dark:bg-[#181825] text-ink shadow-xs"
                                : "text-ink/60 hover:text-ink"
                            }`}
                            title="Desktop View"
                          >
                            <Laptop className="w-3 h-3" />
                            <span className="hidden sm:inline">Desktop</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeviceMode("mobile")}
                            className={`px-2 py-0.5 rounded text-[10px] font-mono font-medium flex items-center gap-1 transition-colors cursor-pointer ${
                              deviceMode === "mobile"
                                ? "bg-white dark:bg-[#181825] text-ink shadow-xs"
                                : "text-ink/60 hover:text-ink"
                            }`}
                            title="Mobile View"
                          >
                            <Smartphone className="w-3 h-3" />
                            <span className="hidden sm:inline">Mobile</span>
                          </button>
                        </div>
                      )}

                      <button
                        type="button"
                        onClick={() => setSelectedProject(spotlightProject)}
                        className="p-1 text-ink/60 hover:text-ink transition-colors rounded hover:bg-ink/5 cursor-pointer"
                        title="Inspect Fullscreen"
                        aria-label="Inspect Fullscreen"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Viewport Frame with Image */}
                  <div
                    onClick={() => setSelectedProject(spotlightProject)}
                    className="p-3 sm:p-4 cursor-pointer group relative flex items-center justify-center bg-gradient-to-b from-transparent to-black/[0.04] dark:to-white/[0.02]"
                  >
                    {deviceMode === "desktop" ? (
                      <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full max-h-[380px] rounded-lg overflow-hidden border border-black/10 dark:border-white/10 bg-black/5 shadow-md group-hover:border-accent-text/40 transition-all">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={currentScreen?.desktopUrl}
                          alt={currentScreen?.label || spotlightProject.title}
                          className="w-full h-full object-cover object-top group-hover:scale-[1.01] transition-transform duration-300"
                        />
                        {/* Subtle click to zoom hover badge */}
                        <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                          <span className="font-mono text-xs text-white bg-black/80 px-3.5 py-1.5 rounded-full border border-white/20 backdrop-blur-sm flex items-center gap-1.5 shadow-lg">
                            <Eye className="w-3.5 h-3.5" />
                            <span>Click to Inspect Fullscreen</span>
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="relative aspect-[9/18] w-full max-w-[240px] max-h-[380px] rounded-2xl overflow-hidden border-2 border-black/20 dark:border-white/20 bg-black/5 shadow-xl group-hover:border-accent-text/60 transition-all">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={currentScreen?.mobileUrl || currentScreen?.desktopUrl}
                          alt={`${currentScreen?.label} Mobile`}
                          className="w-full h-full object-cover object-top group-hover:scale-[1.01] transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                          <span className="font-mono text-[10px] text-white bg-black/80 px-2.5 py-1 rounded-full border border-white/20 backdrop-blur-sm flex items-center gap-1 shadow-lg">
                            <Eye className="w-3 h-3" />
                            <span>Zoom Mobile</span>
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : spotlightProject.id === "sphere8" ? (
                <div className="p-5 rounded-xl border border-black/15 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] text-center space-y-1.5">
                  <div className="font-mono text-xs font-bold text-accent-peach flex items-center justify-center gap-1.5">
                    <Sparkles className="w-4 h-4" />
                    <span>SCHEMATIC // UNDER ACTIVE COMMERCIAL DEVELOPMENT</span>
                  </div>
                  <p className="font-sans text-xs text-ink/70 max-w-lg mx-auto">
                    Corporate web portal for Sphere8 Construction featuring structured project showcase galleries, client quote funnels, and responsive intake workflows. Live preview release upcoming.
                  </p>
                </div>
              ) : (
                <div className="p-4 sm:p-5 rounded-xl border border-black/15 dark:border-white/10 bg-black/60 text-left font-mono text-xs text-emerald-400 space-y-2">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10 text-white/50 text-[11px]">
                    <span>twilight@cachyos: ~ (hyprland-session)</span>
                    <span className="text-emerald-400">WAYLAND IPC // ACTIVE</span>
                  </div>
                  <div className="text-slate-300">
                    <span className="text-accent-pink">❯</span> hyprctl monitors -j | jq &apos;.[0].name&apos;
                  </div>
                  <div className="text-emerald-400 text-[11px]">
                    &quot;eDP-1&quot; // 1920x1080@144Hz · PipeWire latency: &lt;5ms · Pywal theme extraction synchronized
                  </div>
                </div>
              )}

              {/* 2-Column Architectural Breakdown */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-2">
                {/* Left Side: Overview & Problem / Role / Outcome */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span
                      className={`font-mono text-xs px-2.5 py-1 rounded-md border font-bold uppercase tracking-wider ${spotlightMeta.kickerColor}`}
                    >
                      {spotlightMeta.kicker}
                    </span>
                    <span className="font-mono text-xs px-2.5 py-1 rounded-md bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 font-semibold">
                      {spotlightProject.isTeamProject ? "Full-Stack · Team Project" : "Solo Architecture"}
                    </span>
                    <span className="font-mono text-[10px] text-accent-text/80 px-2 py-0.5 rounded bg-accent-text/10 border border-accent-text/20 ml-auto flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-text animate-pulse" />
                      <span>FOCUS ACTIVE</span>
                    </span>
                  </div>

                  <h3 className="font-mono text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold text-ink tracking-tight leading-tight">
                    {spotlightProject.title}
                  </h3>
                  <p className="font-sans text-sm sm:text-base text-accent-sky font-bold leading-snug">
                    {spotlightMeta.headlineHook}
                  </p>

                  <div className="space-y-3 pt-4 border-t border-black/10 dark:border-white/10">
                    <div>
                      <span className="font-mono text-[11px] uppercase tracking-wider text-ink/60 font-bold block mb-1">
                        Problem Statement
                      </span>
                      <p className="font-sans text-xs sm:text-sm text-ink/80 leading-relaxed">
                        {spotlightProject.problem}
                      </p>
                    </div>

                    <div>
                      <span className="font-mono text-[11px] uppercase tracking-wider text-ink/60 font-bold block mb-1">
                        Architectural Role
                      </span>
                      <p className="font-mono text-xs text-ink font-semibold">
                        {spotlightProject.role}
                      </p>
                    </div>

                    <div>
                      <span className="font-mono text-[11px] uppercase tracking-wider text-ink/60 font-bold block mb-1">
                        System Outcome &amp; Impact
                      </span>
                      <p className="font-sans text-xs sm:text-sm text-ink/85 leading-relaxed font-medium">
                        {spotlightProject.outcome}
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
                      {spotlightProject.stack.map((item) => (
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
                      {(spotlightProject.highlights ?? []).map((highlight, idx) => (
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
                      onClick={() => setSelectedProject(spotlightProject)}
                      className="btn-press flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-accent-sky text-white dark:text-[#11111b] font-mono text-xs font-bold shadow-md hover:opacity-95 transition-opacity cursor-pointer"
                    >
                      <span>Architecture Case Study ✦</span>
                    </button>
                    {spotlightProject.githubUrl && (
                      <a
                        href={spotlightProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-press p-2.5 rounded-xl border border-black/15 dark:border-white/15 bg-black/[0.03] dark:bg-white/[0.05] text-ink hover:text-accent-sky hover:border-accent-sky/40 transition-colors flex items-center justify-center"
                        aria-label={`${spotlightProject.title} GitHub repository`}
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {spotlightProject.demoUrl && (
                      <a
                        href={spotlightProject.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-press p-2.5 rounded-xl border border-black/15 dark:border-white/15 bg-black/[0.03] dark:bg-white/[0.05] text-ink hover:text-accent-sky hover:border-accent-sky/40 transition-colors flex items-center justify-center"
                        aria-label={`${spotlightProject.title} live demo`}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </SwissFrame>
        </MotionFadeUp>

        {/* Tier 2: 3-Column Bento Grid for Remaining Secondary Projects */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {secondaryProjects.map((project, idx) => {
            const meta = getProjectMeta(project.id);

            return (
              <MotionFadeUp
                key={project.id}
                delay={0.08 + idx * 0.06}
                yOffset={14}
                scaleFrom={0.98}
                className="h-full"
              >
                <div
                  onClick={() => handleSelectSpotlight(project.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleSelectSpotlight(project.id);
                    }
                  }}
                  className="cursor-pointer group h-full block focus:outline-none focus:ring-2 focus:ring-accent-text/60 rounded-2xl"
                  aria-label={`Focus ${project.title} into spotlight`}
                >
                  <SwissFrame
                    tag={meta.subTag}
                    accentBorder={meta.accent}
                    className="p-6 rounded-2xl flex flex-col justify-between hover:border-accent-text/50 transition-[transform,border-color,box-shadow] duration-200 ease-out hover:shadow-lg dark:hover:shadow-black/40 group-hover:-translate-y-1 h-full relative"
                  >
                    <div className="flex flex-col space-y-4">
                      {/* Top row: Project title, hook, and focus prompt */}
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="font-mono text-[10px] text-ink/50 uppercase">
                            CLICK TO FOCUS
                          </span>
                          <span className="opacity-0 group-hover:opacity-100 transition-opacity font-mono text-[10px] text-accent-text flex items-center gap-0.5">
                            <ArrowUpLeft className="w-3 h-3" />
                            <span>Focus</span>
                          </span>
                        </div>
                        <h4 className="font-mono text-base font-bold text-ink group-hover:text-accent-text transition-colors">
                          {project.title}
                        </h4>
                        <p className="font-sans text-xs text-accent-text font-bold mt-1">
                          {meta.headlineHook}
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
                          <span className="font-mono text-[10px] uppercase tracking-wider text-ink/60 font-semibold flex items-center gap-1.5 mb-1.5">
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
                            <CheckCircle2 className="w-3.5 h-3.5 text-accent-green" />
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
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProject(project);
                        }}
                        className="btn-press inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/[0.04] dark:bg-white/[0.06] hover:bg-accent-text/15 text-ink hover:text-accent-text border border-black/15 dark:border-white/15 font-mono text-xs font-semibold transition-colors duration-150 cursor-pointer"
                      >
                        <span>Case Study ✦</span>
                      </button>

                      <div className="flex items-center gap-1.5">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
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
                            onClick={(e) => e.stopPropagation()}
                            className="relative after:absolute after:-inset-2 min-w-[34px] min-h-[34px] p-1.5 text-ink/70 hover:text-ink rounded-lg border border-black/15 dark:border-white/10 hover:border-accent-text/40 transition-colors btn-press flex items-center justify-center touch-manipulation"
                            aria-label={`${project.title} live demo`}
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </SwissFrame>
                </div>
              </MotionFadeUp>
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
