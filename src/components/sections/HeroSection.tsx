import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { PortraitDeck } from "@/components/ui/PortraitDeck";

export default function HeroSection() {
  return (
    <section id="hero" className="hero content-width">
      <div className="hero-field" aria-hidden="true">
        <span className="hero-watermark">twilight</span>
        <span className="hero-orbit" />
      </div>
      <div className="hero-kicker"><span>Jose’s corner of the internet</span><span lang="ja">黄昏 / twilight</span></div>
      <div className="hero-grid">
        <div className="hero-copy">
          <h1 className="hero-name">Jose Raphael<br />{" "}<span className="hero-surname">Jaro<span className="hero-period">.</span></span><span className="hero-alias">Developer. Linux tinkerer. A little curious.</span></h1>
          <p className="hero-intro">I build web applications for campus workflows and client businesses.</p>
          <p className="mt-3 text-sm text-muted leading-relaxed max-w-md">Computer Science student working with Next.js, TypeScript, and Supabase. At home in a browser and a Linux terminal.</p>
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
        <PortraitDeck />
      </div>
      <div className="hero-bottom"><a href="#works" className="hero-scroll-link">Scroll into the workspace <ArrowDownRight size={18} aria-hidden="true" /></a><p>Useful things, made personal.</p></div>
    </section>
  );
}
