"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import { portfolioData } from "@/data/portfolio";
import { Project } from "@/types/portfolio";
import SectionHeader from "@/components/ui/SectionHeader";
import ProjectModal from "@/components/ui/ProjectModal";

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 max-w-5xl mx-auto">
      <SectionHeader
        chapter="01"
        tag="SELECTED WORKS"
        title="Featured Systems & Projects"
        subtitle="A catalog of low-latency desktop runners, Wayland window environments, and responsive web archives."
      />

      {/* Editorial Catalog List / Grid */}
      <div className="space-y-6">
        {portfolioData.projects.map((project, index) => (
          <motion.article
            key={project.id}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.28, delay: index * 0.05, ease: [0.23, 1, 0.32, 1] }}
            className="group relative rounded-xl border border-hairline bg-studio-900/40 p-6 sm:p-8 hover:border-zinc-700/80 transition-colors duration-200"
          >
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
              {/* Left Column: Number, Title, Description */}
              <div className="flex-1 max-w-2xl">
                <div className="flex items-center gap-3 font-mono text-xs text-zinc-500 mb-2">
                  <span className="text-accent-warm font-semibold">0{index + 1}</span>
                  <span>/</span>
                  <span className="uppercase tracking-wider">{project.subtitle}</span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-normal text-ivory-100 group-hover:text-white transition-colors mb-3">
                  {project.title}
                </h3>

                <p className="font-sans text-sm sm:text-base text-zinc-400 leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-xs text-zinc-400 px-2.5 py-1 rounded-md border border-hairline bg-studio-950/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Column: Actions */}
              <div className="flex items-center md:flex-col md:items-end gap-3 flex-shrink-0 pt-2 md:pt-0">
                <button
                  onClick={() => setSelectedProject(project)}
                  className="btn-press inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-700/80 bg-studio-900 text-xs font-mono text-zinc-200 hover:text-white hover:border-zinc-500 transition-colors"
                >
                  <span>Case Study</span>
                  <span className="text-zinc-500">→</span>
                </button>

                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-zinc-400 hover:text-white rounded-full border border-hairline hover:border-zinc-600 transition-colors btn-press"
                    aria-label={`Visit ${project.title}`}
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                )}

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-zinc-400 hover:text-white rounded-full border border-hairline hover:border-zinc-600 transition-colors btn-press"
                    aria-label={`Source code for ${project.title}`}
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Case Study Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
