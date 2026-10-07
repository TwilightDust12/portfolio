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
        <h2 className="font-mono text-3xl sm:text-4xl font-bold text-ink lowercase tracking-tight">
          architected in code.
        </h2>

        <p className="font-sans text-sm sm:text-base text-accent-text mt-2 font-medium">
          Selected works and case studies.
        </p>

        <p className="font-sans text-sm sm:text-base text-ink/70 mt-2 leading-relaxed max-w-3xl">
          A curated index of production systems, academic thesis engineering, and creative experiments.
        </p>
      </div>

      {/* 2-Column Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {portfolioData.projects.map((project) => (
          <SwissFrame
            key={project.id}
            tag={project.isTeamProject ? "THESIS / TEAM PROJECT" : "SOLO PROJECT"}
            className="p-6 rounded-xl flex flex-col justify-between"
          >
            <div className="flex flex-col space-y-4">
              {/* Top row: Project title and badges */}
              <div>
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-mono text-lg font-bold text-ink">
                    {project.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-1.5 shrink-0">
                    {project.isTeamProject && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-accent-text/10 text-accent-text border border-accent-text/20">
                        <Users className="w-3 h-3" />
                        <span>Team Project (Thesis)</span>
                      </span>
                    )}
                    {project.featured && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-ink/10 text-ink/80 border border-ink/15">
                        <Sparkles className="w-3 h-3 text-accent-text" />
                        <span>Featured</span>
                      </span>
                    )}
                  </div>
                </div>
                <p className="font-sans text-xs text-accent-text font-medium mt-1">
                  {project.subtitle}
                </p>
              </div>

              {/* 4-Line Breakdown explicitly visible on the card */}
              <div className="space-y-3 pt-3 border-t border-ink/10">
                {/* Problem */}
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-ink/50 block mb-0.5">
                    Problem
                  </span>
                  <p className="text-xs text-ink/70 line-clamp-2">
                    {project.problem}
                  </p>
                </div>

                {/* Role */}
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-ink/50 block mb-0.5">
                    Role
                  </span>
                  <p className="font-mono text-[11px] text-ink/90">
                    {project.role}
                  </p>
                </div>

                {/* Stack */}
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-ink/50 flex items-center gap-1 mb-1">
                    <Layers className="w-3 h-3 text-ink/40" />
                    <span>Stack</span>
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {project.stack.map((item) => (
                      <span
                        key={item}
                        className="px-2 py-0.5 rounded text-[11px] font-mono bg-ink/5 border border-ink/10 text-ink/80"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Outcome */}
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-ink/50 flex items-center gap-1 mb-0.5">
                    <CheckCircle2 className="w-3 h-3 text-accent-text" />
                    <span>Outcome</span>
                  </span>
                  <p className="text-xs text-ink/80">
                    {project.outcome}
                  </p>
                </div>
              </div>
            </div>

            {/* Footer Action Row */}
            <div className="flex items-center justify-between gap-3 pt-5 border-t border-ink/10 mt-6">
              <button
                type="button"
                onClick={() => setSelectedProject(project)}
                className="btn-press inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent-text/10 hover:bg-accent-text/20 text-accent-text border border-accent-text/20 font-mono text-xs font-semibold transition-colors"
              >
                <span>Case Study Deep-Dive ✦</span>
              </button>

              <div className="flex items-center gap-2">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 text-ink/60 hover:text-ink rounded-lg border border-ink/10 hover:border-ink/30 transition-colors btn-press"
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
                    className="p-1.5 text-ink/60 hover:text-ink rounded-lg border border-ink/10 hover:border-ink/30 transition-colors btn-press"
                    aria-label={`${project.title} live demo`}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </SwissFrame>
        ))}
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
