"use client";

import React from "react";
import { portfolioData } from "@/data/portfolio";
import { SwissFrame } from "@/components/ui/SwissFrame";
import {
  Terminal,
  Layout,
  Database,
  Cpu,
  Smartphone,
  ShieldCheck,
  CheckCircle2,
  Code2,
  Container,
  GitBranch,
} from "lucide-react";

interface CategoryMeta {
  icon: React.ComponentType<{ className?: string }>;
  tag: string;
  colSpan: string;
}

const CATEGORY_META: Record<string, CategoryMeta> = {
  Frontend: {
    icon: Layout,
    tag: "DOM // CLIENT-SIDE",
    colSpan: "md:col-span-2 lg:col-span-2",
  },
  "Backend & Data": {
    icon: Database,
    tag: "SERVER // PERSISTENCE",
    colSpan: "md:col-span-1 lg:col-span-1",
  },
  "DevOps & QA": {
    icon: Container,
    tag: "CI/CD // AUTOMATION",
    colSpan: "md:col-span-1 lg:col-span-1",
  },
  "Mobile & Game Dev": {
    icon: Smartphone,
    tag: "NATIVE // REAL-TIME",
    colSpan: "md:col-span-1 lg:col-span-1",
  },
  "Tools & Linux": {
    icon: Terminal,
    tag: "SYSTEMS // WAYLAND",
    colSpan: "md:col-span-1 lg:col-span-1",
  },
};

export function ArsenalSection() {
  return (
    <section id="arsenal" className="max-w-5xl mx-auto px-4 py-20 relative">
      {/* Anchor compatibility for #tech and legacy #stack */}
      <span id="tech" className="absolute -top-20 invisible" aria-hidden="true" />
      <span id="stack" className="absolute -top-20 invisible" aria-hidden="true" />

      {/* Chapter Header */}
      <div className="mb-10">
        <div className="flex items-center gap-2 font-mono text-xs text-ink/60 tracking-wider mb-2">
          <Code2 className="w-4 h-4 text-accent-text" />
          <span className="text-accent-text font-semibold">
            [04] // TECH ARSENAL & REPERTOIRE
          </span>
          <span className="text-ink/30">―</span>
          <span className="hidden sm:inline-flex items-center gap-1.5 text-ink/50">
            <Cpu className="w-3.5 h-3.5 text-accent-text/70" />
            <span>VERIFIED STACK</span>
          </span>
        </div>

        <h2 className="font-mono text-3xl sm:text-4xl font-bold text-ink lowercase tracking-tight">
          instruments of craft.
        </h2>

        <p className="font-sans text-sm sm:text-base text-ink/70 mt-3 leading-relaxed max-w-3xl">
          A strictly verified index of languages, frameworks, environments, and automated testing tools.
        </p>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {portfolioData.skills.map((category) => {
          const meta = CATEGORY_META[category.category] ?? {
            icon: Cpu,
            tag: "TECH // ARSENAL",
            colSpan: "md:col-span-1 lg:col-span-1",
          };
          const Icon = meta.icon;

          return (
            <SwissFrame
              key={category.category}
              tag={meta.tag}
              showCrosshairs={true}
              showCalipers={true}
              className={`p-6 rounded-xl flex flex-col justify-between ${meta.colSpan}`}
            >
              <div className="mb-4">
                {/* Header row: Icon frosted container & Verified badge */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="p-2.5 rounded-lg bg-ink/5 border border-ink/10 backdrop-blur-sm text-accent-text shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex items-center gap-1 text-[10px] font-mono text-accent-text/80 bg-accent-text/10 px-2 py-0.5 rounded border border-accent-text/20 shrink-0">
                    <CheckCircle2 className="w-3 h-3 text-accent-text" />
                    <span>VERIFIED</span>
                  </div>
                </div>

                {/* Category title & optional git-ops badge */}
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-mono text-base font-semibold text-ink">
                    {category.category}
                  </h3>
                  {category.category === "DevOps & QA" && (
                    <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono text-ink/50">
                      <GitBranch className="w-3 h-3 text-accent-text/70" />
                      <span>GIT-OPS</span>
                    </span>
                  )}
                </div>

                {/* Short description */}
                <p className="font-sans text-xs text-ink/70 mt-1 leading-relaxed">
                  {category.description}
                </p>
              </div>

              {/* Tech Pills List */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-ink/10">
                {category.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="btn-press inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-ink/5 border border-ink/10 text-xs font-mono text-ink/90 hover:border-accent-text/40 hover:bg-accent-text/10 transition-colors select-none"
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-accent-text/70 shrink-0"
                      aria-hidden="true"
                    />
                    <span>{skill.name}</span>
                    {skill.level && (
                      <span className="text-[10px] text-accent-text/80">
                        {skill.level}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </SwissFrame>
          );
        })}
      </div>

      {/* Bottom Verification Note */}
      <div className="mt-8 flex justify-center">
        <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-ink/5 border border-ink/10 font-mono text-xs text-ink/80 text-center sm:text-left">
          <ShieldCheck className="w-4 h-4 text-accent-text shrink-0" />
          <span>
            <span className="text-accent-text font-semibold">[VERIFIED]</span>{" "}
            <span className="text-ink/40">//</span>{" "}
            100% genuine hands-on production, thesis, and systems experience. Zero fluff.
          </span>
        </div>
      </div>
    </section>
  );
}

export default ArsenalSection;
