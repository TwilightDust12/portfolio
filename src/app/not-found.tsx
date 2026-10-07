"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <main
      id="main-content"
      className="min-h-screen flex items-center justify-center p-6 dot-matrix-bg relative overflow-hidden"
    >
      {/* Background ambient accents */}
      <div
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#8839ef]/10 dark:bg-[#cba6f7]/10 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-[#04a5e5]/10 dark:bg-[#89dceb]/10 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      {/* Swiss-Japanese telemetry container */}
      <div className="relative max-w-lg w-full border border-black/10 dark:border-white/10 bg-[var(--bg)]/80 backdrop-blur-md p-8 sm:p-10 shadow-2xl rounded-sm">
        {/* Calipers / Corner brackets */}
        <span
          className="absolute -top-1 -left-1 font-mono text-xs text-[var(--accent-text)] select-none"
          aria-hidden="true"
        >
          ┌
        </span>
        <span
          className="absolute -top-1 -right-1 font-mono text-xs text-[var(--accent-text)] select-none"
          aria-hidden="true"
        >
          ┐
        </span>
        <span
          className="absolute -bottom-1 -left-1 font-mono text-xs text-[var(--accent-text)] select-none"
          aria-hidden="true"
        >
          └
        </span>
        <span
          className="absolute -bottom-1 -right-1 font-mono text-xs text-[var(--accent-text)] select-none"
          aria-hidden="true"
        >
          ┘
        </span>

        {/* Japanese error tag & telemetry */}
        <div className="flex items-center justify-between font-mono text-xs tracking-wider text-[var(--accent-text)] border-b border-black/10 dark:border-white/10 pb-3 mb-6">
          <span className="font-semibold">[ERROR-404] // 虚無 (VOID)</span>
          <span className="opacity-60 text-[10px]">SYS-SIG // 0x00000194</span>
        </div>

        {/* Main message */}
        <div className="space-y-3 mb-8">
          <h1 className="font-mono text-3xl sm:text-4xl font-bold tracking-tight text-[var(--ink)] lowercase">
            transmission lost.
          </h1>
          <p className="font-sans text-sm sm:text-base text-[var(--ink)]/80 leading-relaxed">
            The requested coordinate does not exist in this sector.
          </p>
        </div>

        {/* Telemetry stamp */}
        <div className="bg-black/[0.03] dark:bg-white/[0.03] border border-black/5 dark:border-white/5 rounded px-3 py-2 font-mono text-xs text-[var(--ink)]/60 mb-8 flex items-center justify-between">
          <span>SECTOR // 13.9319° N, 121.6172° E</span>
          <span className="text-[10px] uppercase tracking-wider text-[var(--accent-text)]">OFFLINE</span>
        </div>

        {/* Return home button */}
        <div>
          <Link
            href="/"
            className="btn-press inline-flex items-center justify-center px-5 py-2.5 rounded border border-[var(--accent-text)]/40 bg-[var(--accent-text)]/10 hover:bg-[var(--accent-text)]/20 text-[var(--accent-text)] font-mono text-xs font-medium tracking-wide transition-colors"
          >
            Return to Base Terminal ↖
          </Link>
        </div>
      </div>
    </main>
  );
}
