"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Mail } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import { portfolioData } from "@/data/portfolio";

export default function HeroSection() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="min-h-[82vh] flex flex-col justify-center py-16 sm:py-24 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* Editorial Metadata Bar */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
        className="flex flex-wrap items-center justify-between gap-3 font-mono text-[11px] tracking-wider text-zinc-500 uppercase border-b border-hairline pb-4 mb-10"
      >
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span className="text-zinc-300">{portfolioData.personal.name}</span>
          <span>/</span>
          <span>{portfolioData.personal.title}</span>
        </div>
        <div className="flex items-center gap-4 text-zinc-400">
          <span>{portfolioData.personal.location}</span>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:inline text-accent-warm">ISSUE N° 2026</span>
        </div>
      </motion.div>

      {/* Main Headline */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.05, ease: [0.23, 1, 0.32, 1] }}
        className="max-w-4xl"
      >
        <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-ivory-100 leading-[1.08] text-balance">
          Crafting responsive <i className="font-serif text-accent-warm">systems</i>, tailored <i className="font-serif text-ivory-50">Linux</i> suites, and low-latency audio tools.
        </h1>

        <p className="mt-8 font-sans text-base sm:text-lg text-zinc-400 max-w-2xl leading-relaxed">
          {portfolioData.personal.tagline}
        </p>
      </motion.div>

      {/* Action Row */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
        className="mt-12 flex flex-wrap items-center gap-4"
      >
        <button
          onClick={() => scrollTo("projects")}
          className="btn-press inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-ivory-100 text-studio-950 font-sans font-medium text-sm hover:bg-white transition-colors"
        >
          <span>Selected Works</span>
          <ArrowDown className="w-4 h-4 text-studio-950" />
        </button>

        <button
          onClick={() => scrollTo("contact")}
          className="btn-press inline-flex items-center gap-2.5 px-6 py-3 rounded-full border border-zinc-700/80 bg-studio-900/60 text-zinc-300 font-sans text-sm hover:text-white hover:border-zinc-500 transition-colors"
        >
          <span>Contact</span>
          <ArrowUpRight className="w-4 h-4 text-zinc-400" />
        </button>

        {/* Quick Links */}
        <div className="flex items-center gap-3 ml-auto sm:ml-4 pt-2 sm:pt-0">
          <a
            href={portfolioData.socials[0].url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 text-zinc-400 hover:text-white rounded-full border border-hairline hover:border-zinc-700 transition-colors btn-press"
            aria-label="GitHub Profile"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <a
            href={`mailto:${portfolioData.personal.email}`}
            className="p-2.5 text-zinc-400 hover:text-white rounded-full border border-hairline hover:border-zinc-700 transition-colors btn-press"
            aria-label="Send Email"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>
      </motion.div>
    </section>
  );
}
