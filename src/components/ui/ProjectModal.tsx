"use client";

import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ExternalLink, CheckCircle2, Sparkles } from "lucide-react";
import { Project } from "@/types/portfolio";

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

export interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="project-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="backdrop-blur-md bg-black/75 fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            key="project-modal-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="glass-panel max-w-2xl w-full p-6 sm:p-8 rounded-3xl border border-white/15 relative overflow-hidden shadow-2xl max-h-[88vh] overflow-y-auto"
          >
            {/* Top glowing accent line */}
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-ethereal-violet/60 to-transparent absolute top-0 left-0 right-0 pointer-events-none" />

            {/* Header: Chapter index tag and close button */}
            <div className="flex items-center justify-between gap-4 mb-4">
              <span className="font-mono text-xs tracking-widest text-ethereal-lilac uppercase">
                PROJECT // {project.id.toUpperCase()}
              </span>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close modal"
                className="w-8 h-8 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Title & Subtitle */}
            <div className="mb-4">
              <h3
                id="project-modal-title"
                className="font-serif text-2xl sm:text-3xl text-slate-100 font-medium"
              >
                {project.title}
              </h3>
              <p className="font-sans text-sm text-slate-400 mt-1">
                {project.subtitle}
              </p>
            </div>

            {/* Tech badges */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-xs px-2.5 py-1 rounded-md bg-white/[0.05] border border-white/10 text-slate-300"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Detailed longDescription */}
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] mb-6">
              <h4 className="font-mono text-xs tracking-wider uppercase text-slate-400 mb-2">
                Architectural Overview
              </h4>
              <p className="font-sans text-sm sm:text-base text-slate-200 leading-relaxed">
                {project.longDescription || project.description}
              </p>
            </div>

            {/* Core Architectural Highlights */}
            {project.highlights && project.highlights.length > 0 && (
              <div className="mb-8">
                <h4 className="font-mono text-xs tracking-wider uppercase text-slate-300 flex items-center gap-2 mb-3">
                  <Sparkles className="w-3.5 h-3.5 text-ethereal-lilac" />
                  Core Architectural Highlights
                </h4>
                <div className="space-y-2.5">
                  {project.highlights.map((highlight, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="text-sm font-sans text-slate-300 leading-relaxed">
                        {highlight}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Outbound Action links & Close */}
            <div className="pt-6 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-3">
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-ethereal-violet/20 hover:bg-ethereal-violet/30 border border-ethereal-violet/40 text-ethereal-lilac text-sm font-sans font-medium transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Live Transmission</span>
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-slate-200 text-sm font-sans font-medium transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span>Source Code</span>
                  </a>
                )}
              </div>

              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-mono text-slate-400 hover:text-slate-200 hover:bg-white/[0.05] transition-colors"
              >
                Close Window [Esc]
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ProjectModal;
