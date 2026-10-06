"use client";

import React from "react";
import { ArrowUp } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-hairline py-16 px-4 sm:px-6 max-w-5xl mx-auto mt-20">
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-6 pb-8 border-b border-hairline">
        <div>
          <span className="font-mono text-xs tracking-wider text-accent-warm uppercase block mb-1">
            TWILIGHT // ARCHIVE
          </span>
          <p className="font-serif text-lg text-ivory-100 font-normal">
            {portfolioData.personal.name} — {portfolioData.personal.title}
          </p>
          <p className="font-sans text-xs text-zinc-500 mt-1">
            {portfolioData.personal.location}
          </p>
        </div>

        <button
          onClick={scrollToTop}
          className="btn-press inline-flex items-center gap-2 font-mono text-xs text-zinc-400 hover:text-white transition-colors self-start sm:self-auto px-3.5 py-1.5 rounded-full border border-hairline bg-studio-900/40"
        >
          <span>Back to Top</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 font-mono text-xs text-zinc-600">
        <div>
          © {new Date().getFullYear()} Twilight. All rights reserved.
        </div>
        <div>
          Next.js · Tailwind CSS · TypeScript
        </div>
      </div>
    </footer>
  );
}
