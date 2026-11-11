"use client";

import { ArrowUpRight } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { DISPLAY_NAMES } from "@/data/display-names";
import { pickedUp } from "@/lib/picked-up";
import { useEssentials } from "@/components/providers/PortfolioExperience";

export function ArsenalSection() {
  const essentials = useEssentials();
  return (
    <section id="arsenal" className="portfolio-section content-width">
      <span id="tech" className="anchor-alias" aria-hidden="true" /><span id="stack" className="anchor-alias" aria-hidden="true" />
      <div className="section-heading"><h2 className="section-title">Picked up along the way.</h2><p className="section-note">The tools each chapter put in my hands, plus what I use around them.</p></div>
      {pickedUp(portfolioData.projects, portfolioData.skills).map((group) => (
        <div key={group.projectId ?? "other"} className="skill-row">
          <h3>{group.projectId && !(essentials && group.projectId === "wayland-rice") // the interlude is not rendered in essentials
            ? <a href={group.projectId === "wayland-rice" ? "#workspace" : `#project-${group.projectId}`} className="inline-link">{DISPLAY_NAMES[group.projectId] ?? group.projectId} <ArrowUpRight size={14} aria-hidden="true" /></a>
            : group.projectId ? DISPLAY_NAMES[group.projectId] ?? group.projectId : "Also worked with"}</h3>
          <ul className="skill-list">{group.tools.map((tool) => <li key={tool}>{tool}</li>)}</ul>
        </div>
      ))}
    </section>
  );
}
export default ArsenalSection;
