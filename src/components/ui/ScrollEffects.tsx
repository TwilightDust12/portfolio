"use client";

import { useEffect, useRef } from "react";
import { animateMini, scroll, type DOMKeyframesDefinition } from "framer-motion";

export function ScrollEffects({ essentials = false }: { essentials?: boolean }) {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const progress = progressRef.current;
    const page = progress?.closest(".page-shell");
    if (!progress || !page) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = window.matchMedia("(min-width: 1001px)");
    const compact = window.matchMedia("(max-width: 767px)");
    const entered = new WeakSet<Element>();
    let cleanups: (() => void)[] = [];

    function reset() {
      cleanups.forEach((cleanup) => cleanup());
      cleanups = [];
    }

    function connect(element: HTMLElement, keyframes: DOMKeyframesDefinition, options: Parameters<typeof scroll>[1] = {}) {
      const original = { transform: element.style.transform, opacity: element.style.opacity, clipPath: element.style.clipPath };
      const animation = animateMini(element, keyframes, { duration: 1, ease: "linear" });
      const stopScroll = scroll(animation, options);
      // Cancel before detaching; reduced motion already hides the progress bar.
      cleanups.push(() => { animation.cancel(); stopScroll(); Object.assign(element.style, original); });
    }

    function setup() {
      reset();
      if (essentials || reduceMotion.matches || !page || !progress) return;
      connect(progress, { transform: ["scaleX(0)", "scaleX(1)"] });
      const hero = page.querySelector<HTMLElement>(".hero");
      const portrait = page.querySelector<HTMLElement>(".hero-portrait");
      const orbit = page.querySelector<HTMLElement>(".hero-orbit");
      if (hero && portrait) {
        connect(portrait, {
          transform: ["translateY(0px) rotate(0deg)", desktop.matches ? "translateY(40px) rotate(2deg)" : "translateY(10px) rotate(0deg)"],
        }, { target: hero, offset: ["start start", "end start"] });
        const sheets = portrait.querySelectorAll<HTMLElement>(".portrait-sheet");
        sheets.forEach((sheet) => {
          const near = sheet.classList.contains("portrait-sheet-1");
          const from = "translateY(0px)";
          const to = `translateY(${(near ? -8 : -20) / (compact.matches ? 3 : 1)}px)`;
          connect(sheet, { transform: [from, to] }, { target: hero, offset: ["start start", "end start"] });
        });
      }
      if (hero && orbit) {
        connect(orbit, { transform: ["rotate(0deg)", "rotate(30deg)"] }, { target: hero, offset: ["start start", "end start"] });
      }
      if (hero) {
        for (const [selector, travel] of [[".hero-watermark", -16]] as const) {
          const plane = hero.querySelector<HTMLElement>(selector);
          if (plane) connect(plane, { transform: ["translateY(0px)", `translateY(${compact.matches ? travel / 3 : travel}px)`] }, { target: hero, offset: ["start start", "end start"] });
        }
      }
      if (desktop.matches) {
        page.querySelectorAll<HTMLElement>(".project-scene-label").forEach((label) => {
          const project = label.closest<HTMLElement>(".project-feature");
          if (project) connect(label, { transform: ["translateY(12px)", "translateY(-12px)"] }, { target: project, offset: ["start end", "end start"] });
        });
      }
      const activeEntrances = new Map<Element, Animation>();
      const easing = getComputedStyle(page).getPropertyValue("--ease-out").trim();
      let keyboard = false;
      const entrances = new IntersectionObserver((entries) => {
        let stagger = 0;
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entrances.unobserve(entry.target);
          if (entered.has(entry.target)) return;
          entered.add(entry.target);
          // Keyboard travel and already-scrolled content must be ready to read.
          if (keyboard || entry.target.matches(":focus-within") || entry.boundingClientRect.bottom <= 0) return;
          const animation = entry.target.animate([
            { opacity: 0, transform: "translateY(8px)" },
            { opacity: 1, transform: "translateY(0px)" },
          ], { duration: 300, delay: Math.min(stagger++, 2) * 50, easing, fill: "backwards" });
          activeEntrances.set(entry.target, animation);
          animation.onfinish = () => activeEntrances.delete(entry.target);
        });
      }, { rootMargin: "0px 0px -8% 0px" });
      page.querySelectorAll(".section-heading, .project-stage, .skill-row, .about-grid > *, .personal-panel, .contact-grid").forEach((element) => entrances.observe(element));

      function cancelEntrances() {
        activeEntrances.forEach((animation) => animation.cancel());
        activeEntrances.clear();
      }
      function onKeyDown(event: KeyboardEvent) {
        if (!["Tab", "Enter", " ", "ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End"].includes(event.key)) return;
        keyboard = true;
        cancelEntrances();
      }
      function onPointer() { keyboard = false; }
      document.addEventListener("keydown", onKeyDown);
      document.addEventListener("pointerdown", onPointer);
      document.addEventListener("wheel", onPointer, { passive: true });
      cleanups.push(() => {
        entrances.disconnect();
        cancelEntrances();
        document.removeEventListener("keydown", onKeyDown);
        document.removeEventListener("pointerdown", onPointer);
        document.removeEventListener("wheel", onPointer);
      });
    }

    setup();
    reduceMotion.addEventListener("change", setup);
    desktop.addEventListener("change", setup);
    compact.addEventListener("change", setup);
    return () => {
      reset();
      reduceMotion.removeEventListener("change", setup);
      desktop.removeEventListener("change", setup);
      compact.removeEventListener("change", setup);
    };
  }, [essentials]);

  return <div ref={progressRef} className="reading-progress" aria-hidden="true" />;
}
