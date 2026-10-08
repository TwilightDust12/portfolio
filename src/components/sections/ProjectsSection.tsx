"use client";

import { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import type { Project } from "@/types/portfolio";
import { ProjectMedia } from "@/components/ui/ProjectMedia";
import { ProjectModal } from "@/components/ui/ProjectModal";

const FEATURED_IDS = ["webc", "lily-chou-chou"];
const DISPLAY_NAMES: Record<string, string> = {
  webc: "WebC",
  "lily-chou-chou": "All About Lily Chou-Chou",
  sphere8: "Sphere8 Construction",
  "wayland-rice": "Wayland rice & dotfiles",
};

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  const featured = FEATURED_IDS.flatMap((id) => portfolioData.projects.filter((project) => project.id === id));
  const supporting = portfolioData.projects.filter((project) => !FEATURED_IDS.includes(project.id));

  function openProject(project: Project, button: HTMLButtonElement) {
    trigger.current = button;
    setSelectedProject(project);
  }

  function actions(project: Project) {
    return (
      <div className="project-actions">
        <button type="button" className="secondary-button" onClick={(event) => openProject(project, event.currentTarget)} aria-label={`Read ${DISPLAY_NAMES[project.id] ?? project.title} case study`}>Case study <ArrowUpRight size={16} aria-hidden="true" /></button>
        {project.githubUrl && <a className="inline-link" href={project.githubUrl} target="_blank" rel="noopener noreferrer">{project.id === "wayland-rice" ? "GitHub profile" : "GitHub"} <ArrowUpRight size={14} aria-hidden="true" /></a>}
        {project.demoUrl && <a className="inline-link" href={project.demoUrl} target="_blank" rel="noopener noreferrer">Live demo <ArrowUpRight size={14} aria-hidden="true" /></a>}
      </div>
    );
  }

  return (
    <section id="works" className="portfolio-section content-width">
      <span id="projects" className="anchor-alias" aria-hidden="true" />
      <div className="section-heading">
        <h2 className="section-title">Selected projects.</h2>
        <p className="section-note">Campus workflows, client work, and experiments with the web.</p>
      </div>
      {featured.map((project) => (
        <article key={project.id} className="project-feature" id={`project-${project.id}`}>
          <ProjectMedia project={project} />
          <div className="project-copy">
            <p className="project-kind">{project.id === "webc" ? "Full-stack / Team capstone" : "Design & development / Personal project"}</p>
            <h3 className="project-title">{DISPLAY_NAMES[project.id]}</h3>
            <p className="project-description">{project.id === "webc" ? "Moving student clearance from paper sign-offs to a shared, role-based workflow." : "An atmospheric web archive built around film, ambient sound, and digital connection."}</p>
            <dl className="project-facts">
              <dt>My role</dt><dd>{project.role}</dd>
              <dt>What it does</dt><dd>{project.outcome}</dd>
            </dl>
            <div className="project-stack" aria-label="Project technologies">{project.stack.slice(0, 4).map((tech) => <span key={tech}>{tech}</span>)}</div>
            {actions(project)}
          </div>
        </article>
      ))}
      <div className="supporting-projects">
        {supporting.map((project) => (
          <article key={project.id} className="supporting-project" id={`project-${project.id}`}>
            <p className="project-status"><span className="status-dot" aria-hidden="true" />{project.id === "sphere8" ? "Client project · In development" : "Personal environment · Linux / Wayland"}</p>
            <h3>{DISPLAY_NAMES[project.id] ?? project.title}</h3>
            <p className="project-description">{project.description}</p>
            {actions(project)}
          </article>
        ))}
      </div>
      <ProjectModal
        key={selectedProject?.id ?? "closed"}
        project={selectedProject}
        open={selectedProject !== null}
        onOpenChange={(open) => { if (!open) setSelectedProject(null); }}
        onCloseAutoFocus={(event) => { event.preventDefault(); trigger.current?.focus(); }}
      />
    </section>
  );
}

export default ProjectsSection;
