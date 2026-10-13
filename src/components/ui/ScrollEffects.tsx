"use client";

import { useEffect, useRef } from "react";
import { animate, scroll, type DOMKeyframesDefinition } from "framer-motion";

export function ScrollEffects() {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const progress = progressRef.current;
    const page = progress?.closest(".page-shell");
    if (!progress || !page) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = window.matchMedia("(min-width: 1001px)");
    let cleanups: (() => void)[] = [];

    function reset() {
      cleanups.forEach((cleanup) => cleanup());
      cleanups = [];
    }

    function connect(element: HTMLElement, keyframes: DOMKeyframesDefinition, options: Parameters<typeof scroll>[1] = {}) {
      const animation = animate(element, keyframes, { duration: 1, ease: "linear", autoplay: false });
      const stopScroll = scroll(animation, options);
      cleanups.push(() => { stopScroll(); animation.cancel(); });
    }

    function setup() {
      reset();
      if (reduceMotion.matches || !page || !progress) return;
      connect(progress, { transform: ["scaleX(0)", "scaleX(1)"] });
      const hero = page.querySelector<HTMLElement>(".hero");
      const portrait = page.querySelector<HTMLElement>(".hero-portrait");
      const orbit = page.querySelector<HTMLElement>(".hero-orbit");
      if (hero && portrait) {
        connect(portrait, {
          transform: ["translateY(0px) rotate(0deg)", desktop.matches ? "translateY(110px) rotate(4deg)" : "translateY(24px) rotate(0deg)"],
        }, { target: hero, offset: ["start start", "end start"] });
      }
      if (hero && orbit) {
        connect(orbit, { transform: ["rotate(0deg)", "rotate(90deg)"] }, { target: hero, offset: ["start start", "end start"] });
      }
      const interlude = page.querySelector<HTMLElement>(".creative-interlude");
      const track = page.querySelector<HTMLElement>(".interlude-track");
      if (interlude && track) {
        connect(track, { transform: ["translateX(3%)", "translateX(-9%)"] }, { target: interlude, offset: ["start end", "end start"] });
      }
      page.querySelectorAll<HTMLElement>(".project-feature").forEach((project, index) => {
        const stage = project.querySelector<HTMLElement>(".project-stage");
        if (!stage) return;
        const tilt = desktop.matches ? (index % 2 ? 1 : -1) : 0;
        connect(stage, {
          opacity: [0.7, 1],
          transform: [`translateY(36px) scale(0.97) rotate(${tilt}deg)`, "translateY(0px) scale(1) rotate(0deg)"],
        }, { target: project, offset: ["start end", "start 0.55"] });
      });
    }

    setup();
    reduceMotion.addEventListener("change", setup);
    desktop.addEventListener("change", setup);
    return () => {
      reset();
      reduceMotion.removeEventListener("change", setup);
      desktop.removeEventListener("change", setup);
    };
  }, []);

  return <div ref={progressRef} className="reading-progress" aria-hidden="true" />;
}
