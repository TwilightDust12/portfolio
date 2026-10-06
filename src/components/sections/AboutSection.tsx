"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import {
  Briefcase,
  GraduationCap,
  MapPin,
  Sparkles,
  Terminal,
  Cpu,
  Layers,
  Calendar,
} from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";

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

const highlightPills = [
  { label: "Fullstack Systems", icon: Layers, color: "text-ethereal-lilac" },
  { label: "Wayland & Linux Rice", icon: Terminal, color: "text-ethereal-cyan" },
  { label: "Low-Latency Audio", icon: Cpu, color: "text-emerald-400" },
];

export function AboutSection() {
  const { personal, experience, education } = portfolioData;

  // Extract initials from name, default to "TL"
  const initials = personal.name
    ? personal.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "TL";

  return (
    <motion.section
      id="about"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className="py-24 px-4 sm:px-6 max-w-6xl mx-auto flex flex-col gap-20"
    >
      {/* Chapter Header */}
      <motion.div variants={itemVariants}>
        <SectionHeader
          chapter="02"
          tag="BIO & CHRONICLE"
          title="Behind the Transmissions"
          subtitle="Engineering philosophy, professional trajectory, and continuous explorations."
        />
      </motion.div>

      {/* 02.1 Profile & Philosophy */}
      <motion.div variants={itemVariants} className="flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs tracking-widest text-ethereal-lilac uppercase">
            [02.1] // IDENTITY & PHILOSOPHY
          </span>
          <div className="h-[1px] flex-1 bg-white/[0.08]" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Stylized Profile Card */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <GlassCard
              accentBorder
              className="p-6 sm:p-8 flex flex-col items-center text-center relative overflow-hidden"
            >
              {/* Avatar Glow Ring */}
              <div className="relative mb-5 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-ethereal-violet via-ethereal-lilac to-ethereal-cyan blur-md opacity-40 animate-pulse" />
                <div className="relative w-24 h-24 rounded-full border-2 border-ethereal-lilac/40 bg-obsidian-900/90 flex items-center justify-center shadow-xl">
                  <span className="font-serif text-2xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-br from-white via-slate-200 to-ethereal-lilac">
                    {initials}
                  </span>
                </div>
              </div>

              {/* Name & Title */}
              <h3 className="font-serif text-2xl font-medium text-slate-100 mb-1">
                {personal.name}
              </h3>
              <p className="font-sans text-sm text-slate-400 mb-4">
                {personal.title}
              </p>

              {/* Location */}
              <div className="flex items-center gap-1.5 text-xs text-slate-400 font-sans mb-4">
                <MapPin className="w-3.5 h-3.5 text-ethereal-lilac" />
                <span>{personal.location}</span>
              </div>

              {/* Availability Badge */}
              <div className="font-mono text-xs px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 inline-flex items-center gap-2 mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span>{personal.availability}</span>
              </div>

              {/* Highlight Metric Pills */}
              <div className="w-full pt-5 border-t border-white/[0.08] flex flex-col gap-2.5">
                {highlightPills.map((pill, idx) => {
                  const Icon = pill.icon;
                  return (
                    <div
                      key={idx}
                      className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs font-mono text-slate-300"
                    >
                      <span className="flex items-center gap-2">
                        <Icon className={`w-3.5 h-3.5 ${pill.color}`} />
                        <span>{pill.label}</span>
                      </span>
                      <span className="text-slate-500 text-[10px]">VERIFIED</span>
                    </div>
                  );
                })}
              </div>
            </GlassCard>
          </div>

          {/* Right Column: Editorial Spread & Bio */}
          <div className="lg:col-span-7 flex flex-col gap-6 justify-center">
            {/* Pull Quote */}
            <GlassCard
              accentBorder
              className="p-6 sm:p-8 relative bg-gradient-to-br from-ethereal-violet/[0.08] to-transparent"
            >
              <div className="flex items-start gap-4">
                <Sparkles className="w-6 h-6 text-ethereal-lilac shrink-0 mt-1" />
                <blockquote className="font-serif italic text-xl sm:text-2xl text-slate-100 leading-snug">
                  &ldquo;Building software at the crossroads of ethereal aesthetics and systems precision.&rdquo;
                </blockquote>
              </div>
            </GlassCard>

            {/* Bio Paragraphs */}
            <div className="space-y-4 text-slate-300 font-sans text-base leading-relaxed">
              {personal.bioParagraphs.map((paragraph, index) => (
                <GlassCard key={index} glowOnHover={false} className="p-6 border-white/[0.06]">
                  <p className="text-slate-300 leading-relaxed font-sans text-sm sm:text-base">
                    {paragraph}
                  </p>
                </GlassCard>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* 02.2 Experience Ledger */}
      <motion.div variants={itemVariants} className="flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs tracking-widest text-ethereal-lilac uppercase">
            [02.2] // EXPERIENCE LEDGER
          </span>
          <div className="h-[1px] flex-1 bg-white/[0.08]" />
        </div>

        <div className="relative pl-0 sm:pl-4 space-y-6">
          {/* Subtle connecting vertical line on desktop */}
          <div className="hidden sm:block absolute left-[27px] top-6 bottom-6 w-[1px] bg-gradient-to-b from-ethereal-violet/40 via-white/10 to-transparent pointer-events-none" />

          {experience.map((item) => (
            <div key={item.id} className="relative sm:pl-10">
              {/* Node Icon on desktop */}
              <div className="hidden sm:flex absolute left-0 top-6 -translate-x-1/2 w-7 h-7 rounded-full bg-obsidian-900 border border-ethereal-violet/50 items-center justify-center text-ethereal-lilac shadow-md shadow-ethereal-violet/20 z-10">
                <Briefcase className="w-3.5 h-3.5" />
              </div>

              <GlassCard accentBorder className="p-6 sm:p-7">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                  <div>
                    <h4 className="font-serif text-xl sm:text-2xl font-medium text-slate-100">
                      {item.role}
                    </h4>
                    <div className="flex flex-wrap items-center gap-2 text-sm text-slate-400 mt-1">
                      <span className="text-ethereal-lilac font-medium">{item.company}</span>
                      <span>&bull;</span>
                      <span className="flex items-center gap-1 font-mono text-xs text-slate-400">
                        <MapPin className="w-3 h-3 text-slate-500" />
                        {item.location}
                      </span>
                    </div>
                  </div>

                  {/* Period badge */}
                  <span className="font-mono text-xs text-ethereal-lilac bg-ethereal-violet/15 px-3 py-1 rounded-full border border-ethereal-violet/30 inline-flex items-center gap-1.5 self-start">
                    <Calendar className="w-3 h-3" />
                    {item.period}
                  </span>
                </div>

                {/* Description bullet points */}
                <ul className="space-y-2 mb-6">
                  {item.description.map((desc, dIdx) => (
                    <li key={dIdx} className="text-sm text-slate-300 font-sans flex items-start gap-2.5">
                      <span className="text-ethereal-lilac shrink-0 mt-1">▹</span>
                      <span className="leading-relaxed">{desc}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech pill tags */}
                <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-white/[0.06]">
                  {item.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-xs px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-slate-300 hover:border-ethereal-violet/40 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </GlassCard>
            </div>
          ))}
        </div>
      </motion.div>

      {/* 02.3 Education & Academia */}
      <motion.div variants={itemVariants} className="flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs tracking-widest text-ethereal-lilac uppercase">
            [02.3] // ACADEMIC FOUNDATIONS
          </span>
          <div className="h-[1px] flex-1 bg-white/[0.08]" />
        </div>

        <div className="grid grid-cols-1 gap-6">
          {education.map((item) => (
            <GlassCard key={item.id} accentBorder className="p-6 sm:p-7">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-ethereal-violet/10 border border-ethereal-violet/25 flex items-center justify-center text-ethereal-lilac shrink-0 mt-0.5">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif text-xl sm:text-2xl font-medium text-slate-100">
                      {item.degree}
                    </h4>
                    <div className="flex flex-wrap items-center gap-2 text-sm text-slate-400 mt-1">
                      <span className="text-slate-200">{item.institution}</span>
                      <span>&bull;</span>
                      <span className="flex items-center gap-1 font-mono text-xs text-slate-400">
                        <MapPin className="w-3 h-3 text-slate-500" />
                        {item.location}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 self-start">
                  {/* Period Badge */}
                  <span className="font-mono text-xs text-slate-300 bg-white/[0.04] px-3 py-1 rounded-full border border-white/10 inline-flex items-center gap-1.5">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    {item.period}
                  </span>

                  {/* Honors Badge */}
                  {item.honors && (
                    <span className="font-mono text-xs text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 inline-flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      {item.honors}
                    </span>
                  )}
                </div>
              </div>

              {/* Details bullet points */}
              {item.details && item.details.length > 0 && (
                <ul className="space-y-2 mt-4 pt-4 border-t border-white/[0.06]">
                  {item.details.map((detail, dIdx) => (
                    <li key={dIdx} className="text-sm text-slate-300 font-sans flex items-start gap-2.5">
                      <span className="text-emerald-400 shrink-0 mt-1">▹</span>
                      <span className="leading-relaxed">{detail}</span>
                    </li>
                  ))}
                </ul>
              )}
            </GlassCard>
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
}

export default AboutSection;
