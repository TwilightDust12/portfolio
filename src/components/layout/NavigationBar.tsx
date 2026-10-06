"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import { portfolioData } from "@/data/portfolio";

const chapters = [
  { id: "hero", label: "Overview" },
  { id: "projects", label: "01 Works" },
  { id: "about", label: "02 Bio" },
  { id: "tech", label: "03 Arsenal" },
  { id: "certifications", label: "04 Credentials" },
  { id: "contact", label: "05 Contact" },
];

export default function NavigationBar() {
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const chapter of chapters) {
        const el = document.getElementById(chapter.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(chapter.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-4 z-50 max-w-5xl mx-auto px-4 sm:px-6">
      <nav className="rounded-full border border-hairline bg-studio-950/85 backdrop-blur-md px-5 py-2.5 flex items-center justify-between shadow-lg shadow-black/40">
        {/* Brand */}
        <button
          onClick={() => scrollToSection("hero")}
          className="font-mono text-xs tracking-wider text-zinc-300 font-semibold flex items-center gap-2 hover:text-white transition-colors"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent-amber" />
          <span>TWILIGHT</span>
          <span className="text-zinc-600 hidden sm:inline">/ 2026</span>
        </button>

        {/* Desktop Chapter Links */}
        <div className="hidden md:flex items-center gap-1">
          {chapters.map((chapter) => {
            const isActive = activeSection === chapter.id;
            return (
              <button
                key={chapter.id}
                onClick={() => scrollToSection(chapter.id)}
                className={`
                  relative px-3 py-1.5 rounded-full font-mono text-xs tracking-wide transition-colors duration-150 btn-press
                  ${isActive ? "text-ivory-100 font-medium" : "text-zinc-400 hover:text-zinc-200"}
                `}
              >
                {isActive && (
                  <motion.span
                    layoutId="active-nav-pill"
                    className="absolute inset-0 rounded-full bg-studio-800 border border-zinc-700/60"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{chapter.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right side: GitHub & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <a
            href={portfolioData.socials[0].url}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 font-mono text-xs text-zinc-400 hover:text-zinc-100 transition-colors btn-press px-2.5 py-1 rounded-md border border-hairline bg-studio-900/60"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span>GitHub</span>
            <ArrowUpRight className="w-3 h-3 text-zinc-500" />
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-zinc-400 hover:text-zinc-100 btn-press"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.16, ease: [0.23, 1, 0.32, 1] }}
            className="md:hidden mt-2 rounded-2xl border border-hairline bg-studio-950/95 backdrop-blur-xl p-4 shadow-xl"
          >
            <div className="flex flex-col gap-1.5">
              {chapters.map((chapter) => (
                <button
                  key={chapter.id}
                  onClick={() => scrollToSection(chapter.id)}
                  className={`
                    w-full text-left px-3.5 py-2.5 rounded-lg font-mono text-xs tracking-wide transition-colors
                    ${activeSection === chapter.id ? "bg-studio-850 text-white font-medium" : "text-zinc-400 hover:text-white"}
                  `}
                >
                  {chapter.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
