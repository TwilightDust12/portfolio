"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ManilaClock } from "@/components/ui/ManilaClock";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

interface Workspace {
  id: string;
  num: string;
  label: string;
}

const WORKSPACES: Workspace[] = [
  { id: "hero", num: "1", label: "hero" },
  { id: "about", num: "2", label: "about" },
  { id: "works", num: "3", label: "works" },
  { id: "arsenal", num: "4", label: "arsenal" },
  { id: "mood", num: "5", label: "mood" },
  { id: "comms", num: "6", label: "comms" },
];

export function WaybarHeader() {
  const [activeId, setActiveId] = useState<string>("hero");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: 0,
      }
    );

    WORKSPACES.forEach((ws) => {
      const el = document.getElementById(ws.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Desktop Floating Waybar Header */}
      <motion.header
        initial={{ opacity: 0, transform: "translateY(-12px)" }}
        animate={{ opacity: 1, transform: "translateY(0px)" }}
        transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
        className="hidden sm:block sticky top-4 z-40 max-w-5xl mx-auto px-4 w-full"
      >
        <nav
          aria-label="Desktop Waybar Navigation"
          className="flex items-center justify-between px-3.5 py-2 rounded-xl bg-white/85 dark:bg-[#181825]/85 apple-translucent border border-black/15 dark:border-white/12 shadow-lg shadow-black/5 dark:shadow-black/30"
        >
          {/* Left: Identity / Host pill */}
          <div className="flex items-center gap-2">
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                handleScroll("hero");
              }}
              className="btn-press flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/[0.04] dark:bg-white/[0.05] border border-black/15 dark:border-white/10 font-mono text-xs text-ink hover:text-accent-text hover:border-accent-text/40 transition-[color,border-color,background-color] duration-150"
            >
              <span className="text-accent-text font-bold">twilight@cachyos</span>
              <span className="text-ink/40">::</span>
              <span className="text-ink/70">$ hyprland</span>
            </a>
          </div>

          {/* Center: Workspace pills */}
          <div className="flex items-center gap-1 bg-black/[0.03] dark:bg-white/[0.04] p-1 rounded-lg border border-black/10 dark:border-white/10">
            {WORKSPACES.map((ws) => {
              const isActive = activeId === ws.id;
              return (
                <a
                  key={ws.id}
                  href={`#${ws.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleScroll(ws.id);
                  }}
                  className={`btn-press relative font-mono text-xs px-2.5 py-1 rounded-md transition-colors duration-150 ease-out flex items-center gap-1.5 ${
                    isActive
                      ? "text-accent-text font-bold"
                      : "text-ink/70 hover:text-ink hover:bg-black/[0.04] dark:hover:bg-white/[0.05]"
                  }`}
                  aria-current={isActive ? "true" : undefined}
                >
                  {isActive && (
                    <motion.span
                      layoutId="active-waybar-desktop"
                      className="absolute inset-0 rounded-md bg-accent-text/15 border border-accent-text/40 shadow-xs shadow-accent-text/10"
                      transition={{ type: "spring", stiffness: 450, damping: 35 }}
                    />
                  )}
                  <span className={`relative z-10 ${isActive ? "text-accent-text font-bold" : "text-ink/50"}`}>
                    {ws.num}
                  </span>
                  <span className="relative z-10 text-ink/30">:</span>
                  <span className="relative z-10">{ws.label}</span>
                </a>
              );
            })}
          </div>

          {/* Right: Telemetry pill, Clock & Theme Toggle */}
          <div className="flex items-center gap-2">
            <div className="hidden lg:flex items-center font-mono text-[11px] text-ink/70 px-2.5 py-1 rounded-md bg-black/[0.04] dark:bg-white/[0.05] border border-black/15 dark:border-white/10">
              <span>cachyos-x86_64 // hyprland</span>
            </div>
            <ManilaClock />
            <ThemeToggle />
          </div>
        </nav>
      </motion.header>

      {/* Mobile Floating Bottom Dock */}
      <motion.nav
        initial={{ opacity: 0, transform: "translateY(16px)" }}
        animate={{ opacity: 1, transform: "translateY(0px)" }}
        transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
        aria-label="Mobile Bottom Navigation Dock"
        className="flex sm:hidden fixed bottom-4 inset-x-4 z-40 max-w-sm mx-auto px-3 py-2 rounded-2xl bg-white/90 dark:bg-[#181825]/90 apple-translucent border border-black/20 dark:border-white/15 shadow-2xl items-center justify-between"
      >
        <div className="flex items-center gap-1.5 flex-1 justify-around pr-2">
          {WORKSPACES.map((ws) => {
            const isActive = activeId === ws.id;
            return (
              <a
                key={ws.id}
                href={`#${ws.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleScroll(ws.id);
                }}
                className={`btn-press relative after:absolute after:-inset-1.5 font-mono text-xs rounded-xl flex items-center justify-center transition-all duration-200 ease-out touch-manipulation ${
                  isActive
                    ? "px-2.5 h-9 text-accent-text font-bold"
                    : "w-9 h-9 text-ink/80 hover:text-ink bg-black/[0.04] dark:bg-white/[0.05] border border-black/15 dark:border-white/10"
                }`}
                aria-label={`Jump to ${ws.label} section`}
                aria-current={isActive ? "true" : undefined}
              >
                {isActive && (
                  <motion.span
                    layoutId="active-waybar-mobile"
                    className="absolute inset-0 rounded-xl bg-accent-text/15 border border-accent-text/40 shadow-xs"
                    transition={{ type: "spring", stiffness: 450, damping: 35 }}
                  />
                )}
                <span className="flex items-center gap-1.5 relative z-10">
                  <span>{ws.num}</span>
                  {isActive && (
                    <span className="text-[10px] tracking-tight uppercase">
                      {ws.label}
                    </span>
                  )}
                </span>
              </a>
            );
          })}
        </div>

        <div className="border-l border-ink/10 pl-2">
          <ThemeToggle />
        </div>
      </motion.nav>
    </>
  );
}

export default WaybarHeader;
