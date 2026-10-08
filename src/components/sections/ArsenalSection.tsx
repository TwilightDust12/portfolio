import { ArrowUpRight } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

const EVIDENCE: Record<string, { label: string; href?: string }> = {
  Frontend: { label: "WebC & Lily Chou-Chou", href: "#works" },
  "Backend & Data": { label: "WebC", href: "#project-webc" },
  "DevOps & QA": { label: "Development & testing tools" },
  "Mobile & Game Dev": { label: "Academic & personal work" },
  "Linux & Tools": { label: "Wayland environment", href: "#project-wayland-rice" },
};

export function ArsenalSection() {
  return (
    <section id="arsenal" className="portfolio-section content-width">
      <span id="tech" className="anchor-alias" aria-hidden="true" /><span id="stack" className="anchor-alias" aria-hidden="true" />
      <div className="section-heading"><h2 className="section-title">Tools I work with.</h2><p className="section-note">Across web projects, coursework, and my everyday environment.</p></div>
      {portfolioData.skills.map((category) => {
        const evidence = EVIDENCE[category.category];
        return (
          <div key={category.category} className="skill-row">
            <h3>{category.category}</h3>
            <ul className="skill-list">{category.skills.map((skill) => <li key={skill.name}>{skill.name}</li>)}</ul>
            <div className="skill-evidence">{evidence?.href ? <a href={evidence.href} className="inline-link">{evidence.label} <ArrowUpRight size={14} aria-hidden="true" /></a> : evidence?.label}</div>
          </div>
        );
      })}
    </section>
  );
}
export default ArsenalSection;
