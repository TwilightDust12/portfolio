"use client";

import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { Project } from "@/types/portfolio";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { ProjectModal } from "@/components/ui/ProjectModal";
import {
  ExternalLink,
  ArrowUpRight,
  Layers,
  Sparkles,
} from "lucide-react";

function Github({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// Generative cosmic visual themes per project
const projectThemes: Record<
  string,
  {
    gradient: string;
    auraColor: string;
    borderGlow: string;
  }
> = {
  "osu-winello": {
    gradient: "from-rose-950/40 via-purple-950/30 to-obsidian-900/90",
    auraColor: "bg-rose-500/25",
    borderGlow: "border-rose-500/20 group-hover:border-rose-500/40",
  },
  hyprnova: {
    gradient: "from-violet-950/50 via-indigo-950/30 to-obsidian-900/90",
    auraColor: "bg-ethereal-violet/25",
    borderGlow: "border-ethereal-violet/20 group-hover:border-ethereal-violet/40",
  },
  "lily-chou-chou-portfolio": {
    gradient: "from-cyan-950/45 via-blue-950/30 to-obsidian-900/90",
    auraColor: "bg-ethereal-cyan/25",
    borderGlow: "border-ethereal-cyan/20 group-hover:border-ethereal-cyan/40",
  },
  "accela-wired-cli": {
    gradient: "from-emerald-950/40 via-slate-900/40 to-obsidian-900/90",
    auraColor: "bg-emerald-500/20",
    borderGlow: "border-emerald-500/20 group-hover:border-emerald-500/40",
  },
};

const defaultTheme = {
  gradient: "from-ethereal-violet/30 via-slate-900/40 to-obsidian-900/90",
  auraColor: "bg-ethereal-violet/20",
  borderGlow: "border-ethereal-violet/20 group-hover:border-ethereal-violet/40",
};

function getInitials(title: string): string {
  const words = title.replace(/[^a-zA-Z0-9\s]/g, " ").trim().split(/\s+/);
  if (words.length === 1) {
    return words[0].slice(0, 3).toUpperCase();
  }
  return words.map((w) => w[0]).join("").toUpperCase().slice(0, 4);
}

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <motion.section
      id="projects"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className="py-24 px-4 sm:px-6 max-w-6xl mx-auto"
    >
      {/* Chapter 03 Header */}
      <motion.div variants={itemVariants}>
        <SectionHeader
          chapter="03"
          tag="SELECTED WORKS"
          title="Architected in the Void"
          subtitle="A curated showcase of low-latency systems, ethereal desktop environments, and web applications."
        />
      </motion.div>

      {/* Asymmetric Responsive Grid */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12"
      >
        {portfolioData.projects.map((project, index) => {
          const initials = getInitials(project.title);
          const theme = projectThemes[project.id] || defaultTheme;

          return (
            <GlassCard
              key={project.id}
              accentBorder={project.featured}
              className={`group flex flex-col justify-between transition-all duration-300 ${
                project.featured ? "p-6 sm:p-8" : "p-6"
              }`}
            >
              <div>
                {/* Visual preview card: Generative cosmic gradient frame with radial aura overlay and stylized project title initials watermark */}
                <div
                  className={`relative w-full rounded-2xl overflow-hidden mb-6 flex items-center justify-center border transition-all duration-500 bg-gradient-to-br ${
                    theme.gradient
                  } ${theme.borderGlow} ${
                    project.featured ? "h-52 sm:h-60" : "h-40 sm:h-44"
                  }`}
                >
                  {/* Generative Radial Aura Overlay */}
                  <div
                    className={`absolute rounded-full blur-3xl pointer-events-none transition-transform duration-700 group-hover:scale-125 ${
                      theme.auraColor
                    } ${
                      project.featured
                        ? "w-48 h-48 opacity-60"
                        : "w-32 h-32 opacity-35"
                    }`}
                  />

                  {/* Subtle Cosmic Noise / Mesh Tint */}
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/[0.04] via-transparent to-transparent pointer-events-none" />

                  {/* Stylized Project Title Initials Watermark */}
                  <span
                    className={`font-serif font-black text-white/[0.06] group-hover:text-white/[0.12] tracking-wider select-none pointer-events-none transition-all duration-500 transform group-hover:scale-110 ${
                      project.featured ? "text-7xl sm:text-8xl" : "text-6xl sm:text-7xl"
                    }`}
                  >
                    {initials}
                  </span>

                  {/* Floating Header Tag & Chapter Index */}
                  <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none">
                    {project.featured ? (
                      <span className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full bg-obsidian-900/80 backdrop-blur-md border border-white/10 text-ethereal-lilac flex items-center gap-1.5 shadow-sm">
                        <Sparkles className="w-3 h-3 text-ethereal-lilac" />
                        FEATURED
                      </span>
                    ) : (
                      <span className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full bg-obsidian-900/80 backdrop-blur-md border border-white/10 text-slate-400">
                        SYSTEM
                      </span>
                    )}

                    <span className="font-mono text-[10px] tracking-widest text-slate-400/80 uppercase">
                      CH.03 // {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Center Icon Badge */}
                  <div className="relative z-10 w-12 h-12 rounded-2xl bg-obsidian-900/80 backdrop-blur-md border border-white/15 flex items-center justify-center shadow-xl group-hover:border-ethereal-lilac/50 transition-colors">
                    <Layers className="w-5 h-5 text-slate-300 group-hover:text-ethereal-lilac transition-colors" />
                  </div>
                </div>

                {/* Title & Subtitle */}
                <div className="mb-3">
                  <h3 className="font-serif text-2xl font-medium text-slate-100 group-hover:text-white transition-colors">
                    {project.title}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-ethereal-lilac font-medium mt-1">
                    {project.subtitle}
                  </p>
                </div>

                {/* Concise Description */}
                <p className="font-sans text-sm text-slate-400 line-clamp-3 leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap items-center gap-1.5 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[11px] px-2.5 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.08] text-slate-300 group-hover:border-white/15 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Interactive Action Footer */}
              <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedProject(project)}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.05] hover:bg-ethereal-violet/20 border border-white/10 hover:border-ethereal-violet/40 text-xs sm:text-sm font-sans font-medium text-slate-200 hover:text-ethereal-lilac transition-all duration-200 group/btn"
                >
                  <Sparkles className="w-3.5 h-3.5 text-ethereal-lilac" />
                  <span>Architecture & Case Study ✦</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover/btn:text-ethereal-lilac transition-colors" />
                </button>

                <div className="flex items-center gap-2">
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Live Demo"
                      aria-label={`View live demo for ${project.title}`}
                      className="w-9 h-9 rounded-xl bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 flex items-center justify-center text-slate-400 hover:text-ethereal-lilac transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Source Repository"
                      aria-label={`View source code for ${project.title}`}
                      className="w-9 h-9 rounded-xl bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </GlassCard>
          );
        })}
      </motion.div>

      {/* Project Case Study Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </motion.section>
  );
}

export default ProjectsSection;
