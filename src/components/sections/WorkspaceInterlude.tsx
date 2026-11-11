"use client";

import { ArrowUpRight } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { DISPLAY_NAMES } from "@/data/display-names";
import { ProjectMedia } from "@/components/ui/ProjectMedia";
import { useEssentials } from "@/components/providers/PortfolioExperience";

export function WorkspaceInterlude() {
  const essentials = useEssentials();
  const rice = portfolioData.projects.find((project) => project.id === "wayland-rice");
  if (essentials || !rice) return null;
  return (
    <section id="workspace" className="portfolio-section workspace-interlude content-width">
      <p className="section-eyebrow">Between the work and the person</p>
      <h2 className="section-title">{DISPLAY_NAMES[rice.id]}.</h2>
      <p className="workspace-note">{rice.description}</p>
      <ProjectMedia project={rice} showVideo />
      {rice.githubUrl && <p className="workspace-github"><a className="inline-link" href={rice.githubUrl} target="_blank" rel="noopener noreferrer">GitHub profile <ArrowUpRight size={14} aria-hidden="true" /></a></p>}
    </section>
  );
}
export default WorkspaceInterlude;
