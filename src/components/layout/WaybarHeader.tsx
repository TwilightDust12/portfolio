"use client";

import { useEffect, useState } from "react";
import { Terminal } from "lucide-react";
import { ManilaClock } from "@/components/ui/ManilaClock";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const WORKSPACES = [
  { id: "works", label: "Projects" },
  { id: "arsenal", label: "Skills" },
  { id: "about", label: "About" },
  { id: "mood", label: "Interests" },
  { id: "comms", label: "Contact" },
];

export function WaybarHeader() {
  const [activeId, setActiveId] = useState("hero");

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) setActiveId(entry.target.id);
      }
    }, { rootMargin: "-15% 0px -65% 0px" });
    ["hero", ...WORKSPACES.map((item) => item.id)].forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <header className="waybar content-width">
        <div className="waybar-inner">
          <a href="#hero" className="waybar-identity min-h-11" aria-label="Twilight, back to introduction">
            <Terminal size={16} aria-hidden="true" />
            <span>twilight<span className="text-muted">@cachyos</span></span>
          </a>
          <nav className="waybar-links" aria-label="Main navigation">
            {WORKSPACES.map((item, index) => (
              <a key={item.id} href={`#${item.id}`} className="workspace-link" aria-current={activeId === item.id ? "location" : undefined}>
                <span className="workspace-number" aria-hidden="true">{index + 1}</span>{item.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <div className="waybar-clock"><ManilaClock /></div>
            <ThemeToggle />
          </div>
        </div>
      </header>
      <nav className="mobile-dock" aria-label="Mobile navigation">
        {WORKSPACES.filter((item) => item.id !== "mood").map((item) => (
          <a key={item.id} href={`#${item.id}`} className="workspace-link" aria-current={activeId === item.id ? "location" : undefined}>{item.label}</a>
        ))}
      </nav>
    </>
  );
}

export default WaybarHeader;
