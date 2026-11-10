"use client";

import { createContext, useContext, useRef, useState, type ReactNode } from "react";
import { flushSync } from "react-dom";
import WaybarHeader from "@/components/layout/WaybarHeader";
import { ScrollEffects } from "@/components/ui/ScrollEffects";
import { BackgroundPixelStars } from "@/components/ui/background-pixel-stars";

const EssentialsContext = createContext(false);
export const useEssentials = () => useContext(EssentialsContext);

export function PortfolioExperience({ children, personal, contact, footer }: {
  children: ReactNode;
  personal: ReactNode;
  contact: ReactNode;
  footer: ReactNode;
}) {
  const [essentials, setEssentials] = useState(false);
  const transition = useRef<ViewTransition | null>(null);

  function toggle() {
    transition.current?.skipTransition();
    const readingLine = (document.querySelector(".waybar")?.getBoundingClientRect().bottom ?? 80) + 24;
    const sections = [...document.querySelectorAll<HTMLElement>("main section[id], main article[id]")];
    const current = sections.filter((element) => {
      const rect = element.getBoundingClientRect();
      return rect.top <= Math.max(readingLine, window.innerHeight * .35) && rect.bottom > readingLine;
    }).at(-1) ?? sections.find((element) => element.getBoundingClientRect().top > readingLine);
    const anchorId = current && ["github", "mood"].includes(current.id) ? "about" : current?.id;
    const previousTop = current?.getBoundingClientRect().top ?? 0;

    const update = () => {
      flushSync(() => setEssentials((value) => !value));
      const anchor = anchorId ? document.getElementById(anchorId) : null;
      if (anchor) window.scrollTo({ top: window.scrollY + anchor.getBoundingClientRect().top - Math.max(previousTop, readingLine), behavior: "instant" });
    };
    if (document.startViewTransition && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      transition.current = document.startViewTransition(update);
      void transition.current.finished.catch(() => {});
    } else update();
  }

  return (
    <EssentialsContext value={essentials}>
      <div className="page-shell" data-mode={essentials ? "essentials" : "workspace"}>
        {!essentials && <div className="page-stars" aria-hidden="true"><BackgroundPixelStars /></div>}
        <ScrollEffects essentials={essentials} />
        <WaybarHeader essentials={essentials} onToggleMode={toggle} />
        <p className="sr-only" role="status">{essentials ? "Essentials view. Projects, skills, about, and contact. Decorative media and personal feeds removed." : "Workspace view. Full portfolio with project previews and personal interests."}</p>
        <main id="main-content">
          {children}
          {!essentials && personal}
          {contact}
        </main>
        {footer}
      </div>
    </EssentialsContext>
  );
}
