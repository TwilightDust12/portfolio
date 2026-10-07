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
}

const CATEGORY_META: Record<string, CategoryMeta> = {
  Frontend: {
    icon: Layout,
    tag: "CLIENT-SIDE",
    colSpan: "md:col-span-2 lg:col-span-2",
  },
  "Backend & Data": {
    icon: Database,
    tag: "SERVER & STORAGE",
    colSpan: "md:col-span-1 lg:col-span-1",
  },
  "DevOps & QA": {
    icon: Container,
    tag: "CI/CD & TESTING",
    colSpan: "md:col-span-1 lg:col-span-1",
  },
  "Mobile & Game Dev": {
    icon: Smartphone,
    tag: "MOBILE & GAME",
    colSpan: "md:col-span-1 lg:col-span-1",
  },
  "Linux & Tools": {
    icon: Terminal,
    tag: "LINUX & WORKSPACE",
    colSpan: "md:col-span-1 lg:col-span-1",
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
        <h2 className="font-mono text-3xl sm:text-4xl font-bold text-ink lowercase tracking-tight">
          technologies &amp; tools.
        </h2>

        <p className="font-sans text-sm sm:text-base text-accent-text mt-2 font-medium">
          Verified stack &amp; developer workflow.
        </p>

        <p className="font-sans text-sm sm:text-base text-ink/70 mt-2 leading-relaxed max-w-2xl">
          The languages, frameworks, developer tools, and environments I use to build
          software.
        </p>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {portfolioData.skills.map((category) => {
          const meta = CATEGORY_META[category.category] ?? {
            icon: Code2,
            tag: "STACK",
            colSpan: "md:col-span-1 lg:col-span-1",
          };
          const Icon = meta.icon;

          return (
            <SwissFrame
              key={category.category}
              tag={meta.tag}
              className={`p-6 rounded-xl flex flex-col justify-between ${meta.colSpan}`}
            >
              <div className="mb-4">
                {/* Header row: Icon frosted container */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="p-2.5 rounded-lg bg-ink/5 border border-ink/10 text-accent-text shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                {/* Category title */}
                <h3 className="font-mono text-base font-semibold text-ink">
                  {category.category}
                </h3>

                {/* Short description */}
                <p className="font-sans text-xs text-ink/70 mt-1 leading-relaxed">
                  {category.description}
                </p>
              </div>

              {/* Tech Pills List (Clean: NO proficiency levels) */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-ink/10">
                {category.skills.map((skill) => (
                  <span
                    key={skill.name}
                    className="btn-press inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-ink/5 border border-ink/10 text-xs font-mono text-ink/90 hover:border-accent-text/40 hover:bg-accent-text/10 transition-colors select-none"
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-accent-text/70 shrink-0"
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
