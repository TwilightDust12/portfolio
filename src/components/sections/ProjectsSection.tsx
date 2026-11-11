"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import type { Project } from "@/types/portfolio";
import { ProjectMedia } from "@/components/ui/ProjectMedia";
import { ProjectModal } from "@/components/ui/ProjectModal";
import { useEssentials } from "@/components/providers/PortfolioExperience";

const DISPLAY_NAMES: Record<string, string> = {
  webc: "WebC",
  owlset: "OwlSet",
  "lily-chou-chou": "All About Lily Chou-Chou",
  sphere8: "Sphere8 Construction",
  "wayland-rice": "Wayland rice & dotfiles",
};

// Each chapter shares the three beats but gets its own composition (see globals.css).
const CHAPTER_LAYOUTS: Record<string, string> = {
  webc: "media-left",
  owlset: "phone",
  sphere8: "media-right",
  "lily-chou-chou": "full-bleed",
};

export function ProjectsSection() {
  const essentials = useEssentials();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [open, setOpen] = useState(false);
  const [animate, setAnimate] = useState(true);
  const trigger = useRef<HTMLButtonElement | null>(null);
  const featured = portfolioData.projects.filter((project) => project.featured);
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
        {project.githubUrl && <a className="inline-link" href={project.githubUrl} target="_blank" rel="noopener noreferrer">GitHub <ArrowUpRight size={14} aria-hidden="true" /></a>}
        {project.demoUrl && <a className="inline-link" href={project.demoUrl} target="_blank" rel="noopener noreferrer">Live demo <ArrowUpRight size={14} aria-hidden="true" /></a>}
      </div>
    );
  }

  return (
    <section ref={sectionRef} id="works" className="portfolio-section projects-gallery content-width">
      <span id="projects" className="anchor-alias" aria-hidden="true" />
      <div className="section-heading">
        <div><p className="section-eyebrow">01 / Four chapters</p><h2 className="section-title">Selected projects.</h2></div>
        <p className="section-note">What each one asked of me, what I had to figure out, and what shipped.</p>
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
        <article key={project.id} className="project-feature" id={`project-${project.id}`} data-layout={CHAPTER_LAYOUTS[project.id]}>
          <header className="chapter-head" style={{ viewTransitionName: `copy-${project.id}` }}>
            <p className="chapter-mark"><span className="project-ordinal">{String(index + 1).padStart(2, "0")}</span><span className="project-kind">{project.subtitle}</span></p>
            <h3 className="project-title">{DISPLAY_NAMES[project.id]}</h3>
            <p className="chapter-role">{project.role}</p>
          </header>
          {project.chapter && <dl className="chapter-beats">
            <div className="chapter-beat" data-beat="asked"><dt>What it asked of me</dt><dd>{project.chapter.asked}</dd></div>
            <div className="chapter-beat" data-beat="figured-out"><dt>What I had to figure out</dt><dd>{project.chapter.figuredOut}</dd></div>
            <div className="chapter-beat" data-beat="shipped">
              <dt>What shipped</dt>
              <dd className="chapter-shipped">
                <p className="chapter-shipped-text">{project.chapter.shipped}</p>
                {!essentials && <div className="project-stage">
                  <div className="project-reveal">
                    <ProjectMedia project={project} showVideo sizes={CHAPTER_LAYOUTS[project.id] === "full-bleed" ? "100vw" : undefined} />
                  </div>
                </div>}
                <div className="project-stack" aria-label="Project technologies">{project.stack.slice(0, 4).map((tech) => <span key={tech}>{tech}</span>)}</div>
                {actions(project)}
              </dd>
            </div>
          </dl>}
        </article>
      ))}
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
