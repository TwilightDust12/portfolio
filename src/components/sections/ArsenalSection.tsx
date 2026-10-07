"use client";

import React from "react";
import { portfolioData } from "@/data/portfolio";
import { SwissFrame } from "@/components/ui/SwissFrame";
import {
  Terminal,
  Layout,
  Database,
  Smartphone,
  Code2,
  Container,
} from "lucide-react";

interface CategoryMeta {
  icon: React.ComponentType<{ className?: string }>;
  tag: string;
  colSpan: string;
  accent: "sky" | "peach" | "green" | "mauve" | "pink";
  iconBoxClass: string;
  dotClass: string;
  pillHoverClass: string;
}

const CATEGORY_META: Record<string, CategoryMeta> = {
  Frontend: {
    icon: Layout,
    tag: "CLIENT-SIDE // REACT & NEXT.JS",
    colSpan: "lg:col-span-8 md:col-span-2",
    accent: "sky",
    iconBoxClass: "text-accent-sky bg-accent-sky/15 border-accent-sky/30",
    dotClass: "bg-accent-sky",
    pillHoverClass: "hover:border-accent-sky/40 hover:bg-accent-sky/10",
  },
  "Backend & Data": {
    icon: Database,
    tag: "STORAGE & API // SUPABASE & SQL",
    colSpan: "lg:col-span-4 md:col-span-1",
    accent: "peach",
    iconBoxClass: "text-accent-peach bg-accent-peach/15 border-accent-peach/30",
    dotClass: "bg-accent-peach",
    pillHoverClass: "hover:border-accent-peach/40 hover:bg-accent-peach/10",
  },
  "DevOps & QA": {
    icon: Container,
    tag: "TESTING & CI/CD // DOCKER & PLAYWRIGHT",
    colSpan: "lg:col-span-4 md:col-span-1",
    accent: "green",
    iconBoxClass: "text-accent-green bg-accent-green/15 border-accent-green/30",
    dotClass: "bg-accent-green",
    pillHoverClass: "hover:border-accent-green/40 hover:bg-accent-green/10",
  },
  "Mobile & Game Dev": {
    icon: Smartphone,
    tag: "NATIVE & REAL-TIME // JETPACK COMPOSE & C#",
    colSpan: "lg:col-span-4 md:col-span-1",
    accent: "mauve",
    iconBoxClass: "text-accent-text bg-accent-text/15 border-accent-text/30",
    dotClass: "bg-accent-text",
    pillHoverClass: "hover:border-accent-text/40 hover:bg-accent-text/10",
  },
  "Linux & Tools": {
    icon: Terminal,
    tag: "SYSTEMS & WORKSPACE // CACHYOS & HYPRLAND",
    colSpan: "lg:col-span-4 md:col-span-1",
    accent: "pink",
    iconBoxClass: "text-accent-pink bg-accent-pink/15 border-accent-pink/30",
    dotClass: "bg-accent-pink",
    pillHoverClass: "hover:border-accent-pink/40 hover:bg-accent-pink/10",
  },
};

export function ArsenalSection() {
  return (
    <section id="arsenal" className="max-w-5xl mx-auto px-4 py-20 relative">
      {/* Anchor compatibility for #tech and legacy #stack */}
      <span id="tech" className="absolute -top-20 invisible" aria-hidden="true" />
      <span id="stack" className="absolute -top-20 invisible" aria-hidden="true" />

      {/* Section Header */}
      <div className="mb-10">
        <div className="font-mono text-xs font-bold text-accent-text tracking-wider uppercase mb-2">
          [04] // REPERTOIRE &amp; INSTRUMENTS
        </div>

        <h2 className="font-mono text-3xl sm:text-4xl font-bold text-ink lowercase tracking-tight">
          verified stack. zero fluff.
        </h2>

        <p className="font-sans text-sm sm:text-base text-ink/75 mt-3 leading-relaxed max-w-2xl">
          A hands-on index of languages, cloud storage, containerized CI/CD, and operating systems tested in production and thesis workflows.
        </p>
      </div>

      {/* Asymmetric 12-Column Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
        {portfolioData.skills.map((category) => {
          const meta = CATEGORY_META[category.category] ?? {
            icon: Code2,
            tag: "STACK",
            colSpan: "lg:col-span-4 md:col-span-1",
            accent: "mauve" as const,
            iconBoxClass: "text-accent-text bg-accent-text/15 border-accent-text/30",
            dotClass: "bg-accent-text",
            pillHoverClass: "hover:border-accent-text/40 hover:bg-accent-text/10",
          };
          const Icon = meta.icon;

          return (
            <SwissFrame
              key={category.category}
              tag={meta.tag}
              accentBorder={meta.accent}
              showCalipers={true}
              className={`p-6 sm:p-7 rounded-2xl flex flex-col justify-between ${meta.colSpan} hover:border-black/30 dark:hover:border-white/25 transition-all duration-200 ease-out hover:shadow-lg dark:hover:shadow-black/40`}
            >
              <div className="mb-4">
                {/* Header row: Icon colored container */}
                <div className="flex items-start justify-between gap-3 mb-3.5">
                  <div
                    className={`p-2.5 rounded-xl border shrink-0 ${meta.iconBoxClass}`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                {/* Category title */}
                <h3 className="font-mono text-base sm:text-lg font-bold text-ink">
                  {category.category}
                </h3>

                {/* Short description */}
                <p className="font-sans text-xs text-ink/75 mt-1 leading-relaxed">
                  {category.description}
                </p>
              </div>

              {/* Tech Pills List with Distinct Color Accents & High Contrast Borders */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-black/10 dark:border-white/10">
                {category.skills.map((skill) => (
                  <span
                    key={skill.name}
                    className={`btn-press inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/[0.04] dark:bg-white/[0.05] border border-black/15 dark:border-white/10 text-xs font-mono font-medium text-ink transition-all select-none ${meta.pillHoverClass}`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full shrink-0 ${meta.dotClass}`}
                      aria-hidden="true"
                    />
                    <span>{skill.name}</span>
                  </span>
                ))}
              </div>
            </SwissFrame>
          );
        })}
      </div>
    </section>
  );
}

export default ArsenalSection;
