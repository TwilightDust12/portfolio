"use client";

import React from "react";
import PixelMascotDivider from "@/components/ui/PixelMascotDivider";
import { portfolioData } from "@/data/portfolio";

export default function ProjectsSection() {
  return (
    <section id="projects">
      <PixelMascotDivider number="03" label="PROJECTS" />

      <div className="space-y-8">
        {portfolioData.projects.map((project, index) => (
          <div
            key={project.id}
            className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-6 sm:p-8 flex flex-col lg:flex-row gap-8 items-center justify-between"
          >
            {/* Left Content */}
            <div className="flex-1 space-y-4">
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-mono text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                  <span className="text-zinc-500">&gt;</span>
                  <span>{project.title}</span>
                </h3>

                <span className="font-mono text-[11px] text-zinc-400 px-3 py-1 rounded-full border border-dashed border-zinc-700 uppercase tracking-wider">
                  {index === 0 ? "IN PROGRESS" : index === 1 ? "2026" : "ARCHIVED"}
                </span>
              </div>

              <p className="font-sans text-sm text-zinc-300 leading-relaxed max-w-xl">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-xs text-zinc-300 px-3 py-1 rounded-full bg-zinc-800/80 border border-zinc-700/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Links */}
              <div className="flex items-center gap-4 pt-4 font-mono text-xs">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-400 hover:text-white underline decoration-zinc-700 underline-offset-4 transition-colors"
                  >
                    source ↗
                  </a>
                )}
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-400 hover:text-white underline decoration-zinc-700 underline-offset-4 transition-colors"
                  >
                    live ↗
                  </a>
                )}
              </div>
            </div>

            {/* Right: Device & Browser Window Mockup */}
            <div className="w-full lg:w-[380px] h-[210px] rounded-xl border border-zinc-800 bg-[#0d0d12] p-3 shadow-2xl relative flex-shrink-0 overflow-hidden group">
              {/* Browser Chrome Bar */}
              <div className="flex items-center gap-1.5 pb-2 border-b border-zinc-800/80 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                <span className="ml-2 font-mono text-[9px] text-zinc-600 truncate">
                  localhost:3000/{project.id}
                </span>
              </div>

              {/* Mockup Canvas Screen */}
              <div className="rounded-lg bg-zinc-950 p-3 h-[155px] border border-zinc-900 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <div className="h-3 w-28 bg-zinc-800 rounded" />
                  <div className="h-2 w-44 bg-zinc-900 rounded" />
                  <div className="grid grid-cols-3 gap-1.5 pt-2">
                    <div className="h-10 bg-zinc-900/80 rounded border border-zinc-850" />
                    <div className="h-10 bg-zinc-900/80 rounded border border-zinc-850" />
                    <div className="h-10 bg-zinc-900/80 rounded border border-zinc-850" />
                  </div>
                </div>

                <div className="flex items-center justify-between font-mono text-[9px] text-zinc-600 pt-1">
                  <span>● PIPELINE ACTIVE</span>
                  <span>v2.4.0</span>
                </div>
              </div>

              {/* Floating Mobile Phone Mockup Overlay */}
              <div className="absolute -bottom-2 -right-1 w-28 h-36 rounded-xl border-2 border-zinc-700 bg-black p-1.5 shadow-2xl flex flex-col justify-between transform rotate-3 group-hover:rotate-0 transition-transform duration-300">
                <div className="w-8 h-1 bg-zinc-800 rounded-full mx-auto mb-1" />
                <div className="rounded bg-zinc-900 flex-1 p-1.5 space-y-1">
                  <div className="h-2 w-12 bg-zinc-700 rounded" />
                  <div className="h-1.5 w-16 bg-zinc-800 rounded" />
                  <div className="h-8 bg-zinc-800/60 rounded mt-2" />
                </div>
                <div className="w-4 h-0.5 bg-zinc-800 rounded-full mx-auto mt-1" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
