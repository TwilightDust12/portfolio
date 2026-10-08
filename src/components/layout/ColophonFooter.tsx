import { ArrowUp } from "lucide-react";

export function ColophonFooter() {
  return (
    <footer className="site-footer content-width">
      <div className="footer-row">
        <p>© 2026 Jose Raphael Jaro</p>
        <p className="inline-flex items-center font-mono">Catppuccin / Latte &amp; Mocha
          <span className="palette-dots" aria-hidden="true"><span style={{ background: "var(--accent-text)" }} /><span style={{ background: "var(--accent-pink)" }} /><span style={{ background: "var(--accent-sky)" }} /></span>
        </p>
        <a href="#hero" className="inline-link text-xs">Back to top <ArrowUp size={13} aria-hidden="true" /></a>
      </div>
    </footer>
  );
}
export default ColophonFooter;
