"use client";

import React from "react";

export interface SwissFrameProps {
  children: React.ReactNode;
  className?: string;
  tag?: string;
  showCrosshairs?: boolean;
  showCalipers?: boolean;
}

export function SwissFrame({
  children,
  className = "",
  tag,
  showCrosshairs = false,
  showCalipers = true,
}: SwissFrameProps) {
  return (
    <div className={`border border-ink/15 relative bg-bg/40 backdrop-blur-sm ${className}`}>
      {/* Precision Calipers at 4 Corners */}
      {showCalipers && (
        <>
          <span
            className="absolute -top-1 -left-1 text-accent-text/60 font-mono text-xs select-none pointer-events-none leading-none z-10"
            aria-hidden="true"
          >
            ┌
          </span>
          <span
            className="absolute -top-1 -right-1 text-accent-text/60 font-mono text-xs select-none pointer-events-none leading-none z-10"
            aria-hidden="true"
          >
            ┐
          </span>
          <span
            className="absolute -bottom-1 -left-1 text-accent-text/60 font-mono text-xs select-none pointer-events-none leading-none z-10"
            aria-hidden="true"
          >
            └
          </span>
          <span
            className="absolute -bottom-1 -right-1 text-accent-text/60 font-mono text-xs select-none pointer-events-none leading-none z-10"
            aria-hidden="true"
          >
            ┘
          </span>
        </>
      )}

      {/* Monospace Tag Label */}
      {tag && (
        <span className="absolute -top-2.5 left-4 px-2 py-0.2 bg-bg border border-ink/15 text-[10px] font-mono text-ink/70 uppercase tracking-wider select-none z-10">
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
