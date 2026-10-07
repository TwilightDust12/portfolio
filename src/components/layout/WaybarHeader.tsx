"use client";

import { useEffect, useState } from "react";
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
  { id: "comms", num: "5", label: "comms" },
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
      <header className="hidden sm:block sticky top-4 z-40 max-w-5xl mx-auto px-4 w-full">
        <nav
          aria-label="Desktop Waybar Navigation"
          className="flex items-center justify-between px-3.5 py-2 rounded-xl bg-bg/80 apple-translucent border border-ink/10 shadow-lg shadow-black/5 dark:shadow-black/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.25)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
        >
          {/* Left: Identity / Host pill */}
          <div className="flex items-center gap-2">
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                handleScroll("hero");
              }}
              className="btn-press flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-ink/5 border border-ink/10 font-mono text-xs text-ink/90 hover:text-accent-text hover:border-accent-text/30 transition-[color,border-color,background-color] duration-150"
            >
              <span className="text-accent-text font-semibold">twilight@cachyos</span>
              <span className="text-ink/40">::</span>
              <span className="text-ink/70">$ hyprland</span>
            </a>
          </div>

          {/* Center: Workspace pills */}
          <div className="flex items-center gap-1 bg-ink/[0.03] p-1 rounded-lg border border-ink/5">
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
                  className={`btn-press font-mono text-xs px-2.5 py-1 rounded-md transition-[color,background-color,border-color,transform] duration-150 ease-out flex items-center gap-1.5 ${
                    isActive
                      ? "text-accent-text bg-accent-text/10 border border-accent-text/30 font-medium shadow-sm shadow-accent-text/5"
                      : "text-ink/70 hover:text-ink hover:bg-ink/5 border border-transparent"
                  }`}
                  aria-current={isActive ? "true" : undefined}
                >
                  <span className={isActive ? "text-accent-text font-bold" : "text-ink/40"}>
                    {ws.num}
                  </span>
                  <span className="text-ink/30">:</span>
                  <span>{ws.label}</span>
                </a>
              );
            })}
          </div>

          {/* Right: Telemetry pill, Clock & Theme Toggle */}
          <div className="flex items-center gap-2">
            <div className="hidden lg:flex items-center font-mono text-[11px] text-ink/60 px-2 py-1 rounded-md bg-ink/5 border border-ink/10">
              <span>cachyos-x86_64 // hyprland</span>
            </div>
            <ManilaClock />
            <ThemeToggle />
          </div>
        </nav>
      </header>

      {/* Mobile Floating Bottom Dock */}
      <nav
        aria-label="Mobile Bottom Navigation Dock"
        className="flex sm:hidden fixed bottom-4 inset-x-4 z-40 max-w-sm mx-auto px-3 py-2 rounded-2xl bg-bg/90 apple-translucent border border-ink/10 shadow-2xl items-center justify-between shadow-[inset_0_1px_0_rgba(255,255,255,0.25)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
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
                    ? "px-2.5 h-9 text-accent-text bg-accent-text/15 border border-accent-text/40 font-bold shadow-sm"
                    : "w-9 h-9 text-ink/70 hover:text-ink bg-ink/5 border border-ink/5"
                }`}
                aria-label={`Jump to ${ws.label} section`}
                aria-current={isActive ? "true" : undefined}
              >
                <span className="flex items-center gap-1.5">
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
      </nav>
    </>
  );
}

export default WaybarHeader;
