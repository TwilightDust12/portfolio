"use client";

import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Project } from "@/types/portfolio";
import { portfolioData } from "@/data/portfolio";
import { X, ExternalLink, CheckCircle2 } from "lucide-react";
import { GithubIcon as Github } from "@/components/ui/Icons";

export interface ProjectModalProps {
  project: Project | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProjectModal({
  project,
  open,
  onOpenChange,
}: ProjectModalProps) {
  const projectIndex = project
    ? portfolioData.projects.findIndex((p) => p.id === project.id) + 1
    : 1;

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" />
        <Dialog.Content className="dialog-content fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-2xl max-h-[85vh] overflow-y-auto p-6 sm:p-8 rounded-2xl bg-bg border border-ink/20 shadow-2xl focus:outline-none">
          {project && (
            <>
              {/* Top Bar: Project Tag Pill, Team Badge, Close Button */}
              <div className="flex items-center justify-between gap-3 border-b border-ink/10 pb-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-ink/5 border border-ink/15 text-accent-text font-semibold uppercase tracking-wider">
                    {`Case Study ${projectIndex}`}
                  </span>
                  {project.isTeamProject && (
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold bg-accent-text/10 text-accent-text border border-accent-text/20 uppercase tracking-wider">
                      Team Thesis Project
                    </span>
                  )}
                </div>
                <Dialog.Close asChild>
                  <button
                    className="relative after:absolute after:-inset-2 min-w-[36px] min-h-[36px] p-2 text-ink/60 hover:text-ink rounded-lg border border-ink/15 hover:border-ink/40 transition-colors btn-press ml-auto flex items-center justify-center touch-manipulation"
                    aria-label="Close dialog"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </Dialog.Close>
              </div>

              {/* Title & Subtitle */}
              <Dialog.Title className="font-mono text-2xl font-bold text-ink mt-3">
                {project.title}
              </Dialog.Title>
              <Dialog.Description className="font-sans text-sm text-ink/70 mt-1">
                {project.subtitle}
              </Dialog.Description>

              {/* 4-Line Case Study Breakdown */}
              <div className="mt-6 space-y-4">
                {/* Problem */}
                <div className="p-4 rounded-xl bg-ink/5 border border-ink/10">
                  <div className="font-mono text-[10px] uppercase tracking-wider text-accent-text font-semibold mb-1">
                    Problem Space
                  </div>
                  <p className="font-sans text-xs sm:text-sm text-ink/80 leading-relaxed">
                    {project.problem}
                  </p>
                </div>

                {/* Role */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs text-ink/50 uppercase tracking-wider">
                    Role:
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-accent-text/10 text-accent-text border border-accent-text/20 font-mono text-xs font-medium">
                    {project.role}
                  </span>
                </div>

                {/* Stack */}
                <div>
                  <span className="block font-mono text-xs text-ink/50 uppercase tracking-wider mb-2">
                    Stack & Technologies:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-md text-xs font-mono bg-ink/5 border border-ink/10 text-ink/80"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Outcome */}
                <div className="p-4 rounded-xl bg-accent-text/5 border border-accent-text/20">
                  <div className="font-mono text-[10px] uppercase tracking-wider text-accent-text font-semibold mb-1">
                    Outcome & Impact
                  </div>
                  <p className="font-sans text-xs sm:text-sm text-ink/90 leading-relaxed">
                    {project.outcome}
                  </p>
                </div>
              </div>

              {/* Long Description / Architectural Highlights */}
              {project.longDescription && (
                <div className="mt-6 space-y-2">
                  <h4 className="font-mono text-xs uppercase tracking-wider text-ink/60">
                    System Architecture & Overview
                  </h4>
                  <p className="font-sans text-xs sm:text-sm text-ink/75 leading-relaxed">
                    {project.longDescription}
                  </p>
                </div>
              )}

              {project.highlights && project.highlights.length > 0 && (
                <div className="mt-6 space-y-3">
                  <h4 className="font-mono text-xs uppercase tracking-wider text-ink/60">
                    Architectural Highlights
                  </h4>
                  <ul className="space-y-2">
                    {project.highlights.map((highlight, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-ink/80"
                      >
                        <CheckCircle2 className="w-4 h-4 text-accent-text shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}


              {/* Footer Action Links */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-6 border-t border-ink/10 mt-6">
                <div className="flex flex-wrap items-center gap-3">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-press inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-ink/15 bg-ink/5 text-ink hover:border-ink/30 hover:bg-ink/10 transition-colors font-mono text-xs"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>Source Repository ↗</span>
                    </a>
                  )}
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-press inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent-text text-white dark:text-[#11111b] hover:bg-accent-text/90 transition-colors font-mono text-xs font-semibold shadow-sm"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Live Demo ↗</span>
                    </a>
                  )}
                </div>
                <Dialog.Close asChild>
                  <button
                    type="button"
                    className="btn-press px-4 py-2 rounded-lg border border-ink/15 text-ink/70 hover:text-ink font-mono text-xs transition-colors"
                  >
                    Close
                  </button>
                </Dialog.Close>
              </div>
            </>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default ProjectModal;
