import { portfolioData } from "@/data/portfolio";

export function ChronicleSection() {
  return (
    <section id="about" className="portfolio-section content-width">
      <div className="section-heading"><h2 className="section-title">A little about me.</h2><span className="font-mono text-sm text-accent-text"><span lang="ja">黄昏</span> / twilight</span></div>
      <div className="about-grid">
        <div className="about-copy">
          <p>I’m Jose, a Computer Science student in Lucena City. I enjoy building useful web applications, working through the details of an interface, and understanding the systems underneath it.</p>
          <p className="text-muted">My work includes a student clearance capstone, a construction company’s web presence, and personal experiments with sound and the web. Outside the browser, I spend time tuning my CachyOS and Hyprland environment.</p>
          <blockquote className="mt-7 font-mono text-accent-text text-base">“Doing things, little by little.”</blockquote>
        </div>
        <div>
          {portfolioData.education.slice(0, 2).map((education) => (
            <div key={education.id} className="education-entry">
              <h3>{education.id === "college" ? "BS Computer Science" : "Mobile App & Web Development"}</h3>
              <p>{education.institution}<br />{education.period}</p>
              {education.honors && <p>{education.honors}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default ChronicleSection;
