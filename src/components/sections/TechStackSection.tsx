"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { SkillCategory } from "@/types/portfolio";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import {
  Code2,
  Layout,
  Database,
  Terminal,
  Sparkles,
  Cpu,
  Layers,
  ShieldCheck,
} from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

interface CategoryConfig {
  icon: React.ComponentType<{ className?: string }>;
  accentIcon: React.ComponentType<{ className?: string }>;
  badge: string;
}

const categoryConfigMap: Record<string, CategoryConfig> = {
  "Languages & Core": {
    icon: Code2,
    accentIcon: Cpu,
    badge: "CORE // RUNTIME",
  },
  "Frontend & UI": {
    icon: Layout,
    accentIcon: Layers,
    badge: "SURFACE // UX",
  },
  "Backend & Storage": {
    icon: Database,
    accentIcon: ShieldCheck,
    badge: "DATA // PERSISTENCE",
  },
  "Systems & DevOps": {
    icon: Terminal,
    accentIcon: Cpu,
    badge: "INFRA // KERNEL",
  },
};

const defaultConfig: CategoryConfig = {
  icon: Layers,
  accentIcon: Sparkles,
  badge: "SYSTEMS",
};

export function TechStackSection() {
  return (
    <motion.section
      id="tech"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className="py-24 px-4 sm:px-6 max-w-6xl mx-auto"
    >
      {/* Chapter 04 Header */}
      <motion.div variants={itemVariants}>
        <SectionHeader
          chapter="04"
          tag="ARSENAL // REPERTOIRE"
          title="Systems & Instruments"
          subtitle="A structured index of languages, frameworks, environments, and low-level tools."
        />
      </motion.div>

      {/* Bento Grid Layout */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12"
      >
        {portfolioData.skills.map((category: SkillCategory, index: number) => {
          const config = categoryConfigMap[category.category] || defaultConfig;
          const DomainIcon = config.icon;
          const AccentIcon = config.accentIcon;

          return (
            <GlassCard
              key={category.category}
              accentBorder
              className="p-6 sm:p-8 flex flex-col justify-between group transition-all duration-300"
            >
              <div>
                {/* Header: Domain icon, domain title, and description */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-ethereal-lilac group-hover:border-ethereal-violet/40 group-hover:text-white transition-colors shadow-sm">
                      <DomainIcon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-serif text-xl sm:text-2xl font-medium text-slate-100 group-hover:text-white transition-colors">
                        {category.category}
                      </h3>
                      <span className="font-mono text-[10px] tracking-widest text-ethereal-lilac uppercase">
                        {config.badge}
                      </span>
                    </div>
                  </div>

                  <span className="font-mono text-[10px] tracking-widest text-slate-500 uppercase shrink-0 pt-1">
                    CH.04 // 0{index + 1}
                  </span>
                </div>

                <p className="font-sans text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
                  {category.description}
                </p>

                {/* Badges container */}
                <div className="flex flex-wrap gap-2.5 mt-4">
                  {category.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:border-ethereal-violet/40 hover:bg-ethereal-violet/10 transition-all text-xs font-mono text-slate-300 flex items-center justify-between gap-2 group/skill"
                    >
                      <span className="group-hover/skill:text-slate-100 transition-colors">
                        {skill.name}
                      </span>
                      {skill.level && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-white/[0.04] border border-white/10 text-ethereal-lilac flex items-center gap-1 shrink-0">
                          <Sparkles className="w-2.5 h-2.5 text-ethereal-lilac/80" />
                          <span>{skill.level}</span>
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Card footer indicator */}
              <div className="pt-6 mt-6 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-400 font-mono">
                <span className="flex items-center gap-1.5 text-slate-400">
                  <AccentIcon className="w-3.5 h-3.5 text-ethereal-lilac" />
                  <span>{category.skills.length} Instruments Indexed</span>
                </span>
                <span className="text-slate-500 text-[11px]">✦ Operational</span>
              </div>
            </GlassCard>
          );
        })}

        {/* Bento Summary Banner / Architectural Highlights */}
        <GlassCard
          accentBorder
          className="p-6 md:col-span-2 bg-gradient-to-r from-obsidian-900/60 via-purple-950/20 to-obsidian-900/60"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center text-ethereal-lilac shrink-0 mt-0.5">
                <Cpu className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-serif text-sm font-medium text-slate-200">
                  Hardware & Low-Latency
                </h4>
                <p className="font-sans text-xs text-slate-400 mt-0.5 leading-relaxed">
                  Wayland IPC, sub-5ms PipeWire audio buffers & kernel orchestration.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center text-ethereal-cyan shrink-0 mt-0.5">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-serif text-sm font-medium text-slate-200">
                  Composable Interfaces
                </h4>
                <p className="font-sans text-xs text-slate-400 mt-0.5 leading-relaxed">
                  Fluid reactive state, modern component architecture & editorial typography.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-serif text-sm font-medium text-slate-200">
                  Verified Stability
                </h4>
                <p className="font-sans text-xs text-slate-400 mt-0.5 leading-relaxed">
                  Strict TypeScript inference, isolated Wine prefix sandboxing & reproducible setups.
                </p>
              </div>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </motion.section>
  );
}

export default TechStackSection;
