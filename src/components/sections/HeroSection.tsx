"use client";

import React from "react";
import { portfolioData } from "@/data/portfolio";
import { MapPin } from "lucide-react";

export default function HeroSection() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="pt-12 sm:pt-20 pb-12 flex flex-col md:flex-row items-center md:items-start gap-8 lg:gap-12">
      {/* Left Portrait Frame */}
      <div className="w-64 h-64 sm:w-72 sm:h-72 rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900/90 shadow-2xl relative flex-shrink-0 group">
        {/* Stylized Monochrome Silhouette / Portrait Canvas */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-zinc-900 to-zinc-800 flex items-center justify-center">
          <svg
            className="w-40 h-40 text-zinc-600 group-hover:text-zinc-400 transition-colors duration-300"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
          </svg>
        </div>

        {/* Filmic lens vignette border */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />
        <div className="absolute bottom-3 left-3 font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
          // TWILIGHT.RAW
        </div>
      </div>

      {/* Right Content */}
      <div className="flex-1 text-center md:text-left">
        <div className="font-mono text-xs tracking-[0.25em] text-zinc-500 uppercase mb-3">
          BUILDING. LEARNING. SHIPPING.
        </div>

        {/* Chunky Pixel Display Name */}
        <h1 className="font-pixel text-3xl sm:text-4xl lg:text-5xl text-white tracking-wide leading-tight mb-3">
          {portfolioData.personal.name}
        </h1>

        <div className="font-mono text-xs sm:text-sm text-zinc-400 tracking-wider uppercase mb-3">
          {portfolioData.personal.title}
        </div>

        <div className="flex items-center justify-center md:justify-start gap-1.5 font-mono text-xs text-zinc-500 mb-6">
          <MapPin className="w-3.5 h-3.5 text-zinc-400" />
          <span>{portfolioData.personal.location}</span>
        </div>

        {/* Buttons Row */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-6">
          <a
            href={`mailto:${portfolioData.personal.email}`}
            className="btn-press px-6 py-2.5 rounded bg-white text-black font-mono text-xs font-bold tracking-wider uppercase hover:bg-zinc-200 transition-colors shadow-sm"
          >
            EMAIL ME
          </a>

          <button
            onClick={() => scrollTo("projects")}
            className="btn-press px-6 py-2.5 rounded border border-zinc-700 bg-transparent text-white font-mono text-xs tracking-wider uppercase hover:border-zinc-400 hover:bg-zinc-900/60 transition-colors"
          >
            RESUME
          </button>
        </div>

        {/* Lower Links */}
        <div className="flex items-center justify-center md:justify-start gap-4 font-mono text-xs text-zinc-500">
          <a
            href="https://github.com/TwilightDust12"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors underline decoration-zinc-800 underline-offset-4"
          >
            github
          </a>
          <span>/</span>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors underline decoration-zinc-800 underline-offset-4"
          >
            linkedin
          </a>
          <span>/</span>
          <a
            href="https://discord.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors underline decoration-zinc-800 underline-offset-4"
          >
            discord
          </a>
        </div>
      </div>
    </section>
  );
}
