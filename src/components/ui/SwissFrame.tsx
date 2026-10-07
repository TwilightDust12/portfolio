"use client";

import React from "react";

export interface SwissFrameProps {
  children: React.ReactNode;
  className?: string;
  tag?: string;
  showCrosshairs?: boolean;
  showCalipers?: boolean;
  accentBorder?: "mauve" | "sky" | "peach" | "green" | "pink" | "none";
}

export function SwissFrame({
  children,
  className = "",
  tag,
  showCrosshairs = false,
  showCalipers = false,
  accentBorder = "none",
}: SwissFrameProps) {
  const accentBorderClass = {
    none: "",
    mauve: "border-t-2 border-t-accent-text",
    sky: "border-t-2 border-t-accent-sky",
    peach: "border-t-2 border-t-accent-peach",
    green: "border-t-2 border-t-accent-green",
    pink: "border-t-2 border-t-accent-pink",
  }[accentBorder];

  return (
    <div
      className={`border border-black/15 dark:border-white/12 relative bg-white/85 dark:bg-[#181825]/65 backdrop-blur-md shadow-[0_2px_12px_rgba(0,0,0,0.04)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.3)] transition-[transform,border-color,box-shadow,background-color] duration-200 ease-out ${accentBorderClass} ${className}`}
    >
      {/* Precision Calipers at 4 Corners */}
      {showCalipers && (
        <>
          <span
            className="absolute -top-1 -left-1 text-accent-text font-mono text-xs font-bold select-none pointer-events-none leading-none z-10"
            aria-hidden="true"
          >
            ┌
          </span>
          <span
            className="absolute -top-1 -right-1 text-accent-text font-mono text-xs font-bold select-none pointer-events-none leading-none z-10"
            aria-hidden="true"
          >
            ┐
          </span>
          <span
            className="absolute -bottom-1 -left-1 text-accent-text font-mono text-xs font-bold select-none pointer-events-none leading-none z-10"
            aria-hidden="true"
          >
            └
          </span>
          <span
            className="absolute -bottom-1 -right-1 text-accent-text font-mono text-xs font-bold select-none pointer-events-none leading-none z-10"
            aria-hidden="true"
          >
            ┘
          </span>
        </>
      )}

      {/* Monospace Tag Label */}
      {tag && (
        <span className="absolute -top-2.5 left-4 px-2.5 py-0.5 bg-white dark:bg-[#181825] border border-black/20 dark:border-white/15 text-[10px] font-mono text-ink font-semibold uppercase tracking-wider select-none z-10 shadow-xs">
          {tag}
        </span>
      )}

      {/* Crosshair Registration Marks */}
      {showCrosshairs && (
        <>
          <span
            className="absolute top-2 right-2 text-ink/30 font-mono text-xs select-none pointer-events-none z-10"
            aria-hidden="true"
          >
            +
          </span>
          <span
            className="absolute bottom-2 left-2 text-ink/30 font-mono text-xs select-none pointer-events-none z-10"
            aria-hidden="true"
          >
            +
          </span>
        </>
      )}

      {children}
    </div>
  );
}

export default SwissFrame;
