"use client";

import React from "react";
import { ArrowUp } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { CHAPTERS, SocialIcon } from "./NavigationBar";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    e.preventDefault();
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
    <footer className="w-full border-t border-white/[0.08] mt-24 bg-[#090A0F]/60 backdrop-blur-md">
      <div className="py-12 px-6 max-w-6xl mx-auto">
        {/* 3-Column Editorial Magazine Colophon Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-white/[0.08]">
          {/* Column 1: Issue tag, signature, tagline */}
          <div className="md:col-span-5 flex flex-col gap-3">
            <span className="font-mono text-xs tracking-widest text-ethereal-lilac uppercase">
              ISSUE N° 2026 // TRANSMISSION ARCHIVE
            </span>
            <h3 className="font-serif text-3xl font-medium tracking-tight text-slate-100">
              {portfolioData.personal.name}
            </h3>
            <p className="font-sans text-sm text-slate-400 max-w-sm leading-relaxed">
              {portfolioData.personal.tagline}
            </p>
            <div className="pt-2 flex items-center gap-2">
              {portfolioData.socials.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="p-2 rounded-lg text-slate-400 hover:text-ethereal-lilac hover:bg-white/[0.06] transition-colors"
                >
                  <SocialIcon platform={social.platform} className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Directory links back to chapters */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <h4 className="font-mono text-xs uppercase tracking-widest text-slate-300 font-semibold">
              Directory // Chapters
            </h4>
            <ul className="space-y-2.5 font-mono text-xs">
              {CHAPTERS.map((chapter) => (
                <li key={chapter.id}>
                  <a
                    href={`#${chapter.id}`}
                    onClick={(e) => scrollToSection(e, chapter.id)}
                    className="text-slate-400 hover:text-ethereal-lilac transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="text-slate-600 group-hover:text-ethereal-violet transition-colors">
                      →
                    </span>
                    <span>{chapter.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Stack colophon & availability */}
          <div className="md:col-span-4 flex flex-col gap-3">
            <h4 className="font-mono text-xs uppercase tracking-widest text-slate-300 font-semibold">
              Colophon // Engineering
            </h4>
            <p className="font-sans text-sm text-slate-300 leading-relaxed">
              Engineered with Next.js 15, React 19, Tailwind CSS, & Framer Motion.
            </p>
            <p className="font-mono text-xs text-slate-500 leading-relaxed">
              Typeset in Playfair Display, Plus Jakarta Sans, and JetBrains Mono.
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono text-ethereal-cyan bg-ethereal-cyan/10 border border-ethereal-cyan/20">
                <span className="w-1.5 h-1.5 rounded-full bg-ethereal-cyan animate-pulse" />
                {portfolioData.personal.availability}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom bar: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-slate-500">
          <p>© 2026 Twilight. All transmissions logged.</p>
          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 text-slate-400 hover:text-slate-200 hover:border-ethereal-violet/40 hover:bg-white/[0.04] transition-all group"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5 text-ethereal-lilac" />
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
