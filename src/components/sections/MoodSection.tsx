"use client";

import React, { useEffect, useState } from "react";
import { SwissFrame } from "@/components/ui/SwissFrame";
import { MotionFadeUp } from "@/components/ui/MotionFadeUp";
import { MusicData, CinemaData } from "@/types/telemetry";
import {
  Radio,
  Film,
  Disc3,
  ExternalLink,
  Sparkles,
  Music2,
  Calendar,
  Layers,
} from "lucide-react";

export function MoodSection() {
  const [music, setMusic] = useState<MusicData | null>(null);
  const [cinema, setCinema] = useState<CinemaData | null>(null);
  const [loadingMusic, setLoadingMusic] = useState(true);
  const [loadingCinema, setLoadingCinema] = useState(true);

  useEffect(() => {
    // Fetch Last.fm telemetry
    fetch("/api/music")
      .then((res) => res.json())
      .then((data: MusicData) => {
        setMusic(data);
        setLoadingMusic(false);
      })
      .catch((err) => {
        console.error("Music fetch error:", err);
        setLoadingMusic(false);
      });

    // Fetch Letterboxd telemetry
    fetch("/api/cinema")
      .then((res) => res.json())
      .then((data: CinemaData) => {
        setCinema(data);
        setLoadingCinema(false);
      })
      .catch((err) => {
        console.error("Cinema fetch error:", err);
        setLoadingCinema(false);
      });
  }, []);

  return (
    <section id="mood" className="max-w-5xl mx-auto px-4 py-20 relative">
      {/* Anchor alias to support legacy or alternative links */}
      <span id="sensory" className="absolute -top-20 invisible" aria-hidden="true" />

      {/* Header */}
      <MotionFadeUp yOffset={14} className="mb-10">
        <div>
          <div className="font-mono text-xs font-bold text-accent-peach tracking-wider uppercase mb-2">
            [05] // SENSORY ARCHIVE &amp; MOOD BOARD
          </div>

          <h2 className="font-mono text-3xl sm:text-4xl font-bold text-ink lowercase tracking-tight">
            sound &amp; vision.
          </h2>

          <p className="font-sans text-sm sm:text-base text-ink/75 mt-3 leading-relaxed max-w-2xl">
            Live sonic frequencies scrobbled via Last.fm and cinematic diaries logged on Letterboxd. An authentic window into current creative rotations.
          </p>
        </div>
      </MotionFadeUp>

      {/* Bento Grid: 2-Column Desktop Spread */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Wing: Last.fm Sonic Deck (lg:col-span-5) */}
        <MotionFadeUp delay={0.08} yOffset={16} scaleFrom={0.98} className="lg:col-span-5 h-full">
          <SwissFrame
            tag="SYS-AUDIO // LAST.FM BROADCAST"
            accentBorder="mauve"
            className="p-6 sm:p-7 rounded-2xl flex flex-col justify-between h-full shadow-md"
          >
            <div>
              {/* Status Header */}
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-black/10 dark:border-white/10">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-accent-text/10 text-accent-text">
                    <Radio className="w-4 h-4" />
                  </span>
                  <span className="font-mono text-xs font-bold text-ink uppercase tracking-wide">
                    Sonic Stream
                  </span>
                </div>

                {music?.isPlaying ? (
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 font-mono text-[11px] font-bold">
                    {/* Equalizer animation */}
                    <div className="flex items-end gap-0.5 h-3">
                      <span className="w-0.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
                      <span className="w-0.5 h-3 bg-emerald-500 rounded-full animate-[pulse_0.7s_infinite_150ms]" />
                      <span className="w-0.5 h-1.5 bg-emerald-500 rounded-full animate-[pulse_0.9s_infinite_300ms]" />
                    </div>
                    <span>LIVE ON AIR</span>
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-ink/5 border border-ink/10 text-ink/70 font-mono text-[11px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-text/60" />
                    <span>RECENT ROTATION</span>
                  </div>
                )}
              </div>

              {/* Music Player Body */}
              {loadingMusic ? (
                <div className="animate-pulse flex items-center gap-4 py-4">
                  <div className="w-20 h-20 rounded-xl bg-ink/10 shrink-0" />
                  <div className="space-y-2 flex-1">
                    <div className="h-4 bg-ink/10 rounded w-3/4" />
                    <div className="h-3 bg-ink/10 rounded w-1/2" />
                    <div className="h-3 bg-ink/10 rounded w-2/3" />
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-4 py-2">
                  {/* Album Cover Frame with Vinyl Peek */}
                  <div className="relative group shrink-0">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden border border-black/15 dark:border-white/15 bg-black/5 dark:bg-white/5 shadow-md relative z-10">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={music?.albumArt}
                        alt={music?.title || "Album Art"}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Vinyl disc peek behind jacket */}
                    <div
                      className="absolute top-1 -right-3 w-18 h-18 sm:w-22 sm:h-22 rounded-full bg-[#111] border border-white/20 -z-0 opacity-80 group-hover:translate-x-1.5 transition-transform duration-300 flex items-center justify-center"
                      aria-hidden="true"
                    >
                      <div className="w-6 h-6 rounded-full bg-accent-text/30 border border-white/40 flex items-center justify-center">
                        <Disc3 className="w-3 h-3 text-white/80 animate-spin [animation-duration:6s]" />
                      </div>
                    </div>
                  </div>

                  {/* Track Info */}
                  <div className="flex-1 min-w-0 pl-1">
                    <a
                      href={music?.songUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-base sm:text-lg font-bold text-ink hover:text-accent-text transition-colors line-clamp-2 block leading-snug group"
                    >
                      <span>{music?.title}</span>
                      <ExternalLink className="w-3 h-3 inline-block ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>

                    <div className="font-sans text-xs sm:text-sm font-semibold text-accent-text mt-1 truncate">
                      {music?.artist}
                    </div>

                    <div className="font-sans text-[11px] text-ink/65 mt-1 truncate">
                      {music?.album}
                    </div>

                    {music?.isFallback && (
                      <span className="inline-block mt-2 font-mono text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-ink/5 border border-ink/10 text-ink/50">
                        CURATED SELECTION // .ENV READY
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Action Footer */}
            <div className="pt-4 mt-6 border-t border-black/10 dark:border-white/10 flex items-center justify-between">
              <a
                href={music?.songUrl || "https://www.last.fm"}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-press font-mono text-xs text-accent-text hover:underline inline-flex items-center gap-1.5 font-medium"
              >
                <Music2 className="w-3.5 h-3.5" />
                <span>Last.fm Broadcast</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <span className="font-mono text-[10px] text-ink/50 uppercase">
                LATENCY: &lt;30S
              </span>
            </div>
          </SwissFrame>
        </MotionFadeUp>

        {/* Right Wing: Letterboxd Cinema Reel (lg:col-span-7) */}
        <MotionFadeUp delay={0.14} yOffset={16} scaleFrom={0.98} className="lg:col-span-7 h-full">
          <SwissFrame
            tag="OPTICAL-ARCHIVE // LETTERBOXD DIARY"
            accentBorder="peach"
            className="p-6 sm:p-7 rounded-2xl flex flex-col justify-between h-full shadow-md"
          >
            <div>
              {/* Status Header */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-black/10 dark:border-white/10">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-accent-peach/15 text-accent-peach">
                    <Film className="w-4 h-4" />
                  </span>
                  <span className="font-mono text-xs font-bold text-ink uppercase tracking-wide">
                    Cinema Reel
                  </span>
                </div>

                <div className="inline-flex items-center gap-1.5 font-mono text-[11px] text-ink/70">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-peach" />
                  <span>35MM DIARY LOGS</span>
                </div>
              </div>

              {/* 4-Film Poster Grid */}
              {loadingCinema ? (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 my-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="animate-pulse space-y-2">
                      <div className="aspect-[2/3] rounded-xl bg-ink/10" />
                      <div className="h-3 bg-ink/10 rounded w-3/4" />
                      <div className="h-2.5 bg-ink/10 rounded w-1/2" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 my-3">
                  {cinema?.films.map((film, idx) => (
                    <a
                      key={`${film.title}-${idx}`}
                      href={film.letterboxdUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col focus:outline-none focus:ring-1 focus:ring-accent-peach rounded-xl"
                    >
                      {/* Poster Card */}
                      <div className="relative aspect-[2/3] w-full rounded-xl overflow-hidden border border-black/15 dark:border-white/15 bg-black/5 dark:bg-white/5 shadow-xs group-hover:shadow-lg transition-[transform,box-shadow] duration-200 ease-out group-hover:-translate-y-1">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={film.posterUrl}
                          alt={film.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
                        />

                        {/* Star Rating Overlay */}
                        {film.ratingStars && (
                          <div className="absolute bottom-1.5 left-1.5 right-1.5 flex items-center justify-between pointer-events-none">
                            <span className="font-mono text-[10px] text-accent-peach font-bold px-1.5 py-0.5 rounded bg-black/80 backdrop-blur-xs border border-white/15 leading-none">
                              {film.ratingStars}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Film Meta */}
                      <div className="mt-2 text-left">
                        <div
                          className="font-mono text-xs font-bold text-ink truncate group-hover:text-accent-peach transition-colors"
                          title={film.title}
                        >
                          {film.title}
                        </div>
                        <div className="font-sans text-[11px] text-ink/65 flex items-center justify-between gap-1 mt-0.5">
                          <span>{film.year}</span>
                          {film.watchedDate && (
                            <span className="font-mono text-[9px] uppercase tracking-tight text-ink/50 truncate">
                              {film.watchedDate}
                            </span>
                          )}
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Bottom Action Footer */}
            <div className="pt-4 mt-4 border-t border-black/10 dark:border-white/10 flex items-center justify-between">
              <a
                href="https://letterboxd.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-press font-mono text-xs text-accent-peach hover:underline inline-flex items-center gap-1.5 font-medium"
              >
                <Film className="w-3.5 h-3.5" />
                <span>Letterboxd Profile</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              {cinema?.isFallback ? (
                <span className="font-mono text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-ink/5 border border-ink/10 text-ink/50">
                  FALLBACK ACTIVE // .ENV READY
                </span>
              ) : (
                <span className="font-mono text-[10px] text-ink/50 uppercase">
                  CACHE: 1 HR
                </span>
              )}
            </div>
          </SwissFrame>
        </MotionFadeUp>
      </div>
    </section>
  );
}
