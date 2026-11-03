import { ArrowDownRight, ArrowUpRight, Download } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { PortraitDeck } from "@/components/ui/PortraitDeck";

export default function HeroSection() {
  return (
    <section id="hero" className="hero content-width">
      <div className="hero-field" aria-hidden="true">
        <span className="hero-watermark">twilight</span>
        <span className="hero-orbit" />
        <span className="hero-kanji" lang="ja">黄昏</span>
      </div>
      <div className="hero-grid">
        <div className="hero-copy">
          <h1 className="hero-name">Jose Raphael<br />Jaro<span className="hero-alias">/ twilight</span></h1>
          <p className="hero-intro">I build web applications for campus workflows and client businesses.</p>
          <p className="mt-3 text-sm text-muted leading-relaxed max-w-md">Computer Science student working with Next.js, TypeScript, and Supabase. At home in a browser and a Linux terminal.</p>
          <p className="hero-availability"><span className="status-dot" aria-hidden="true" />{portfolioData.personal.availability}</p>
          <div className="hero-actions">
            <a href="#works" className="primary-button">View projects <ArrowDownRight size={18} aria-hidden="true" /></a>
            <a href={`mailto:${portfolioData.personal.email}`} className="secondary-button">Contact me <ArrowUpRight size={18} aria-hidden="true" /></a>
            <a href="/cv.pdf" download="Jose-Raphael-Jaro-Resume.pdf" className="secondary-button">Download Resume <span className="sr-only">(PDF)</span><Download size={18} aria-hidden="true" /></a>
          </div>
          <div className="hero-location">
            <span>Lucena City, Philippines</span>
            <a href="https://github.com/TwilightDust12" target="_blank" rel="noopener noreferrer" className="hover:underline">GitHub <span aria-hidden="true">↗</span></a>
          </div>
        </div>
        <PortraitDeck />
      </div>
    </section>
  );
}
