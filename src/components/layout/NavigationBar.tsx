"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { twMerge } from "tailwind-merge";
import { clsx, ClassValue } from "clsx";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface Chapter {
  id: string;
  label: string;
}

export const CHAPTERS: Chapter[] = [
  { id: "hero", label: "01 // HERO" },
  { id: "about", label: "02 // ABOUT" },
  { id: "projects", label: "03 // WORKS" },
  { id: "tech", label: "04 // TECH" },
  { id: "certifications", label: "05 // CERTS" },
  { id: "contact", label: "06 // TRANSMISSION" },
];

export function SocialIcon({
  platform,
  className = "w-4 h-4",
}: {
  platform: string;
  className?: string;
}) {
  switch (platform.toLowerCase()) {
    case "github":
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
          <path d="M9 18c-4.51 2-5-2-7-2" />
        </svg>
      );
    case "linkedin":
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect width="4" height="12" x="2" y="9" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      );
    case "instagram":
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
      );
    case "facebook":
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      );
    default:
      return <Globe className={className} aria-hidden="true" />;
  }
}

export function NavigationBar() {
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (scrollY < 120) {
        setActiveSection("hero");
        return;
      }

      if (scrollY + windowHeight >= documentHeight - 60) {
        setActiveSection(CHAPTERS[CHAPTERS.length - 1].id);
        return;
      }

      for (let i = CHAPTERS.length - 1; i >= 0; i--) {
        const el = document.getElementById(CHAPTERS[i].id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSection(CHAPTERS[i].id);
            return;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
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
    setMobileMenuOpen(false);
  };

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-4 z-50 max-w-6xl mx-auto px-4 sm:px-6 my-4">
      {/* Floating frosted glass pill bar */}
      <div className="glass-panel rounded-full px-5 py-3 flex items-center justify-between border border-white/10 shadow-2xl backdrop-blur-xl">
        {/* Left: Author branding with pulsing ambient starlight dot */}
        <a
          href="#hero"
          onClick={scrollToTop}
          className="font-mono text-sm tracking-widest text-slate-200 font-semibold flex items-center gap-2.5 group transition-colors hover:text-white"
        >
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ethereal-lilac opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-ethereal-lilac shadow-[0_0_8px_#C084FC]" />
          </span>
          <span className="group-hover:text-ethereal-lilac transition-colors">
            {portfolioData.personal.name.toUpperCase()}
          </span>
        </a>

        {/* Center: Desktop chapter navigation pills */}
        <nav
          className="hidden md:flex items-center gap-0.5 lg:gap-1"
          aria-label="Chapter Navigation"
        >
          {CHAPTERS.map((chapter) => {
            const isActive = activeSection === chapter.id;
            return (
              <a
                key={chapter.id}
                href={`#${chapter.id}`}
                onClick={(e) => scrollToSection(e, chapter.id)}
                className={cn(
                  "font-mono text-[11px] lg:text-xs tracking-wider px-2.5 lg:px-3.5 py-1.5 rounded-full transition-all duration-300 border",
                  isActive
                    ? "text-ethereal-lilac bg-ethereal-violet/15 border-ethereal-violet/30 shadow-[0_0_15px_-3px_rgba(168,85,247,0.3)] font-medium"
                    : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.05] border-transparent"
                )}
              >
                {chapter.label}
              </a>
            );
          })}
        </nav>

        {/* Right: Quick social icon links & mobile hamburger toggle */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1.5 pl-2 border-l border-white/10">
            {portfolioData.socials.map((social) => (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="p-1.5 rounded-full text-slate-400 hover:text-ethereal-lilac hover:bg-white/[0.06] transition-all"
              >
                <SocialIcon platform={social.platform} className="w-4 h-4" />
              </a>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden p-1.5 rounded-full text-slate-300 hover:text-white hover:bg-white/[0.08] transition-colors focus:outline-none"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="md:hidden mt-2 glass-panel rounded-2xl p-4 border border-white/10 shadow-2xl backdrop-blur-xl flex flex-col gap-3"
          >
            <div className="flex flex-col gap-1">
              {CHAPTERS.map((chapter) => {
                const isActive = activeSection === chapter.id;
                return (
                  <a
                    key={chapter.id}
                    href={`#${chapter.id}`}
                    onClick={(e) => scrollToSection(e, chapter.id)}
                    className={cn(
                      "font-mono text-xs tracking-wider px-3.5 py-2.5 rounded-xl transition-all flex items-center justify-between border",
                      isActive
                        ? "text-ethereal-lilac bg-ethereal-violet/15 border-ethereal-violet/30 font-medium"
                        : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.05] border-transparent"
                    )}
                  >
                    <span>{chapter.label}</span>
                    {isActive && (
                      <span className="h-1.5 w-1.5 rounded-full bg-ethereal-lilac shadow-[0_0_8px_#C084FC]" />
                    )}
                  </a>
                );
              })}
            </div>

            <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between px-2">
              <span className="font-mono text-[11px] text-slate-500 uppercase tracking-wider">
                Transmissions
              </span>
              <div className="flex items-center gap-1.5">
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
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default NavigationBar;
