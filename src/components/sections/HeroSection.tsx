"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { SocialIcon } from "@/components/layout/NavigationBar";

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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export function HeroSection() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    } else {
      window.location.hash = `#${id}`;
    }
  };

  return (
    <motion.section
      id="hero"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative min-h-[85vh] max-w-6xl mx-auto px-4 sm:px-6 flex flex-col justify-center pt-24 pb-16"
    >
      {/* 1. Monospace Status Pill */}
      <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3">
        <div className="font-mono text-xs px-3.5 py-1.5 rounded-full glass-panel inline-flex items-center gap-2 text-slate-300 border border-white/10">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span>{portfolioData.personal.availability}</span>
        </div>
      </motion.div>

      {/* 2. Editorial Headline */}
      <motion.h1
        variants={itemVariants}
        className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal leading-[1.08] tracking-tight text-slate-100 max-w-4xl my-6"
      >
        Architect of{" "}
        <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-ethereal-lilac via-ethereal-violet to-ethereal-cyan">
          Ethereal
        </span>{" "}
        Systems &amp;{" "}
        <span className="italic font-normal text-slate-200">
          Modern
        </span>{" "}
        Web Spaces.
      </motion.h1>

      {/* 3. Manifesto Subtitle */}
      <motion.p
        variants={itemVariants}
        className="font-sans text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed mb-8"
      >
        {portfolioData.personal.tagline}
      </motion.p>

      {/* 4. Action Button Row */}
      <motion.div
        variants={itemVariants}
        className="flex flex-wrap items-center gap-4 mb-12"
      >
        <a
          href="#projects"
          onClick={(e) => {
            e.preventDefault();
            scrollTo("projects");
          }}
          className="bg-ethereal-violet hover:bg-ethereal-violet/90 text-white px-7 py-3.5 rounded-full font-medium shadow-lg shadow-ethereal-violet/25 transition-all inline-flex items-center justify-center gap-2 group cursor-pointer"
        >
          <span>Explore Works</span>
          <span className="transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5">↘</span>
        </a>
        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            scrollTo("contact");
          }}
          className="glass-panel glass-panel-hover text-slate-200 px-7 py-3.5 rounded-full font-medium border border-white/10 transition-all inline-flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Initiate Transmission</span>
          <span className="text-ethereal-lilac">✦</span>
        </a>
      </motion.div>

      {/* 5. Socials Bar */}
      <motion.div
        variants={itemVariants}
        className="pt-6 border-t border-white/[0.08] flex flex-wrap items-center gap-4"
      >
        <span className="font-mono text-xs text-slate-500 uppercase tracking-widest mr-2">
          CONNECT //
        </span>
        <div className="flex items-center gap-2.5">
          {portfolioData.socials.map((social) => (
            <div key={social.platform} className="relative group">
              <a
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="w-9 h-9 rounded-full glass-panel glass-panel-hover border border-white/10 flex items-center justify-center text-slate-400 hover:text-ethereal-lilac transition-all"
              >
                <SocialIcon platform={social.platform} className="w-4 h-4" />
              </a>
              <div className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-obsidian-850 px-2 py-0.5 text-[10px] font-mono text-slate-300 border border-white/10 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-150 shadow-lg z-20">
                {social.label}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
}

export default HeroSection;
