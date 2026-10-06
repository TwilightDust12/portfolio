"use client";

import React from "react";

export function AmbientBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
      {/* Radial aura 1: top-left violet orb */}
      <div
        className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full blur-[128px] animate-aura-slow"
        style={{
          background: "radial-gradient(circle, rgba(168, 85, 247, 0.16) 0%, rgba(168, 85, 247, 0) 70%)",
        }}
      />

      {/* Radial aura 2: bottom-right cyan orb */}
      <div
        className="absolute -bottom-32 -right-32 w-[600px] h-[600px] rounded-full blur-[140px] animate-aura-reverse"
        style={{
          background: "radial-gradient(circle, rgba(56, 189, 248, 0.14) 0%, rgba(56, 189, 248, 0) 70%)",
        }}
      />

      {/* Radial aura 3: center-right soft lilac/rose orb */}
      <div
        className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[160px]"
        style={{
          background: "radial-gradient(circle, rgba(192, 132, 252, 0.10) 0%, rgba(192, 132, 252, 0) 70%)",
        }}
      />

      {/* Noise texture overlay */}
      <div className="absolute inset-0 noise-overlay pointer-events-none opacity-40" />
    </div>
  );
}

export default AmbientBackground;
