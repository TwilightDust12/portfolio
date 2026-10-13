"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import type { Project } from "@/types/portfolio";
import { ProjectMedia } from "@/components/ui/ProjectMedia";
import { ProjectModal } from "@/components/ui/ProjectModal";

const DISPLAY_NAMES: Record<string, string> = {
  webc: "WebC",
  owlset: "OwlSet",
  "lily-chou-chou": "All About Lily Chou-Chou",
  sphere8: "Sphere8 Construction",
  "wayland-rice": "Wayland rice & dotfiles",
};

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [open, setOpen] = useState(false);
  const [animate, setAnimate] = useState(true);
  const trigger = useRef<HTMLButtonElement | null>(null);
  const featured = portfolioData.projects.filter((project) => project.featured);
  const supporting = portfolioData.projects.filter((project) => !project.featured);
  const [activeProject, setActiveProject] = useState(featured[0]?.id);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) setActiveProject(entry.target.id.replace("project-", ""));
      }
    }, { rootMargin: "-20% 0px -45% 0px" });
    sectionRef.current?.querySelectorAll(".project-feature").forEach((project) => observer.observe(project));
    return () => observer.disconnect();
  }, []);

  function openProject(project: Project, button: HTMLButtonElement) {
    trigger.current = button;
    setSelectedProject(project);
    setOpen(true);
  }

  function actions(project: Project) {
    return (
      <div className="project-actions">
        <button type="button" className="secondary-button" onClick={(event) => { setAnimate(event.detail !== 0); openProject(project, event.currentTarget); }} aria-label={`Read ${DISPLAY_NAMES[project.id] ?? project.title} case study`}>Case study <ArrowUpRight size={16} aria-hidden="true" /></button>
        {project.githubUrl && <a className="inline-link" href={project.githubUrl} target="_blank" rel="noopener noreferrer">{project.id === "wayland-rice" ? "GitHub profile" : "GitHub"} <ArrowUpRight size={14} aria-hidden="true" /></a>}
        {project.demoUrl && <a className="inline-link" href={project.demoUrl} target="_blank" rel="noopener noreferrer">Live demo <ArrowUpRight size={14} aria-hidden="true" /></a>}
      </div>
    );
  }

  return (
    <section ref={sectionRef} id="works" className="portfolio-section projects-gallery content-width">
      <span id="projects" className="anchor-alias" aria-hidden="true" />
      <div className="section-heading">
        <h2 className="section-title">Selected projects.</h2>
        <p className="section-note">Campus workflows, client work, a hackathon app, and creative experiments.</p>
      </div>
      <nav className="project-index" aria-label="Selected project index">
        {featured.map((project, index) => (
          <a key={project.id} href={`#project-${project.id}`} aria-current={activeProject === project.id ? "location" : undefined}>
            <span className="project-index-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            <span>{DISPLAY_NAMES[project.id] ?? project.title}</span>
            <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        ))}
      </nav>
      {featured.map((project, index) => (
        <article key={project.id} className="project-feature" id={`project-${project.id}`}>
          <div className="project-stage">
            <span className="project-ordinal" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            <ProjectMedia project={project} />
          </div>
          <div className="project-copy">
            <p className="project-kind">{project.subtitle}</p>
            <h3 className="project-title">{DISPLAY_NAMES[project.id]}</h3>
            <p className="project-description">{project.description}</p>
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
            <p className="project-status"><span className="status-dot" aria-hidden="true" />{project.subtitle}</p>
            <h3>{DISPLAY_NAMES[project.id] ?? project.title}</h3>
            <p className="project-description">{project.description}</p>
            {actions(project)}
          </article>
        ))}
      </div>
      <ProjectModal
        animate={animate}
        project={selectedProject}
        open={open}
        onOpenChange={setOpen}
        onCloseAutoFocus={(event) => { event.preventDefault(); trigger.current?.focus(); }}
      />
    </section>
  );
}

export default ProjectsSection;
