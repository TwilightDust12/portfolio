"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowDownRight, ArrowUpRight, RefreshCw } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

const AVATARS = [
  { src: "/assets/profile.jpg", label: "Jose Raphael Jaro" },
  { src: "/assets/profile2.jpg", label: "Jose Raphael Jaro, alternate portrait" },
  { src: "/assets/reze.jpg", label: "Reze from Chainsaw Man" },
];

export default function HeroSection() {
  const [avatarIndex, setAvatarIndex] = useState(0);
  const [animate, setAnimate] = useState(true);

  const avatar = AVATARS[avatarIndex];
  return (
    <section id="hero" className="hero content-width">
      <div className="hero-field" aria-hidden="true">
        <span className="hero-watermark">twilight</span>
        <span className="hero-orbit" />
      </div>
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
          <span className="portrait-coordinate" aria-hidden="true">13.93° N / 121.62° E</span>
          <div className="portrait-frame">
            <button type="button" className="portrait-button" data-motion={animate} onClick={(event) => {
              setAnimate(event.detail !== 0);
              setAvatarIndex((index) => (index + 1) % AVATARS.length);
            }} aria-label={`Change portrait. Currently ${avatar.label}, ${avatarIndex + 1} of ${AVATARS.length}`}>
              {AVATARS.map((item, index) => (
                <Image key={item.src} src={item.src} alt={index === avatarIndex ? item.label : ""} aria-hidden={index !== avatarIndex} fill sizes="(max-width: 767px) 360px, 440px" priority={index === 0} className="portrait-photo" data-active={index === avatarIndex} />
              ))}
              <span className="portrait-rail kanji-rail" lang="ja">黄昏</span>
            </button>
            <figcaption className="portrait-caption">
              <span>{avatarIndex === 2 ? "Reze · Chainsaw Man" : "A face behind the code"}</span>
              <span className="inline-flex items-center gap-2" aria-hidden="true"><RefreshCw size={12} /> {avatarIndex + 1} / {AVATARS.length}</span>
            </figcaption>
          </div>
          <p className="mt-3 text-xs text-muted text-right">Click the portrait to switch.</p>
        </figure>
      </div>
      <a href="#works" className="hero-scroll-link"><span>Explore the work</span><ArrowDownRight size={18} aria-hidden="true" /></a>
    </section>
  );
}
