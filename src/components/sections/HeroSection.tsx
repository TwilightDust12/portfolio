"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowDownRight, ArrowUpRight, RefreshCw } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";

const AVATARS = [
  { src: "/assets/profile.jpg", label: "Jose Raphael Jaro" },
  { src: "/assets/profile2.jpg", label: "Jose Raphael Jaro, alternate portrait" },
  { src: "/assets/reze.jpg", label: "Reze from Chainsaw Man" },
];

export default function HeroSection() {
  const [avatarIndex, setAvatarIndex] = useState(0);
  const [glitching, setGlitching] = useState(false);
  const reduceMotion = useReducedMotion();
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  function cycleAvatar() {
    if (glitching) return;
    if (reduceMotion) {
      setAvatarIndex((index) => (index + 1) % AVATARS.length);
      return;
    }
    setGlitching(true);
    timers.current = [
      setTimeout(() => setAvatarIndex((index) => (index + 1) % AVATARS.length), 90),
      setTimeout(() => setGlitching(false), 220),
    ];
  }

  const avatar = AVATARS[avatarIndex];
  return (
    <section id="hero" className="hero content-width">
      <div className="hero-grid">
        <div>
          <h1 className="hero-name">Jose Raphael<br />Jaro<span className="hero-alias">/ twilight</span></h1>
          <p className="hero-intro">I build web applications for campus workflows and client businesses.</p>
          <p className="mt-3 text-sm text-muted leading-relaxed max-w-md">Computer Science student working with Next.js, TypeScript, and Supabase. At home in a browser—and a Linux terminal.</p>
          <p className="hero-availability"><span className="status-dot" aria-hidden="true" />{portfolioData.personal.availability}</p>
          <div className="hero-actions">
            <a href="#works" className="primary-button">View projects <ArrowDownRight size={18} aria-hidden="true" /></a>
            <a href={`mailto:${portfolioData.personal.email}`} className="secondary-button">Contact me <ArrowUpRight size={18} aria-hidden="true" /></a>
          </div>
          <div className="hero-location">
            <span>Lucena City, Philippines</span>
            <a href="https://github.com/TwilightDust12" target="_blank" rel="noopener noreferrer" className="hover:underline">GitHub <span aria-hidden="true">↗</span></a>
          </div>
        </div>
        <figure className="hero-portrait">
          <div className="portrait-frame">
            <button type="button" className="portrait-button" onClick={cycleAvatar} aria-label={`Change portrait. Currently ${avatar.label}, ${avatarIndex + 1} of ${AVATARS.length}`}>
              <Image src={avatar.src} alt={avatar.label} fill sizes="(max-width: 767px) 360px, 440px" priority className="portrait-photo" />
              <span className="portrait-rail kanji-rail" lang="ja">黄昏</span>
              {glitching && <span className="avatar-glitch" aria-hidden="true">{Array.from({ length: 64 }, (_, index) => <span key={index} style={{ opacity: ((index * 37 + avatarIndex * 19) % 10) / 10 }} />)}</span>}
            </button>
            <figcaption className="portrait-caption">
              <span>{avatarIndex === 2 ? "Reze · Chainsaw Man" : "A face behind the code"}</span>
              <span className="inline-flex items-center gap-2" aria-hidden="true"><RefreshCw size={12} /> {avatarIndex + 1} / {AVATARS.length}</span>
            </figcaption>
          </div>
          <p className="mt-3 text-xs text-muted text-right">Click the portrait to switch.</p>
        </figure>
      </div>
    </section>
  );
}
