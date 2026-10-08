"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { toast } from "sonner";
import { portfolioData } from "@/data/portfolio";
import { CopyEmailButton } from "@/components/ui/CopyEmailButton";
import { copyToClipboard } from "@/lib/clipboard";

export function ContactSection() {
  const [discordCopied, setDiscordCopied] = useState(false);
  const [copying, setCopying] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  async function copyDiscord(username: string) {
    setCopying(true);
    const success = await copyToClipboard(username);
    setCopying(false);
    if (!success) {
      toast.error("Couldn't copy the Discord handle", { description: username });
      return;
    }
    setDiscordCopied(true);
    toast.success("Discord handle copied", { description: username });
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setDiscordCopied(false), 2500);
  }

  return (
    <section id="comms" className="contact-section content-width">
      <span id="contact" className="anchor-alias" aria-hidden="true" />
      <div className="contact-grid">
        <div>
          <h2 className="section-title">Let’s work together.</h2>
          <p className="mt-5 text-muted text-sm leading-relaxed max-w-md">{portfolioData.personal.availability}. Have an opening or a project in mind? I’d like to hear about it.</p>
          <p className="mt-4 text-sm">Based in Lucena City, Philippines.</p>
        </div>
        <div className="pt-1">
          <CopyEmailButton email={portfolioData.personal.email} />
          <div className="social-links" aria-label="Social profiles">
            {portfolioData.socials.map((social) => social.platform === "discord" ? (
              <button key={social.platform} type="button" className="inline-link" disabled={copying} onClick={() => copyDiscord(social.username)} aria-label={`Copy Discord handle ${social.username}`}>
                <span aria-live="polite">{discordCopied ? "Discord copied" : "Discord"}</span>{discordCopied && <Check size={14} aria-hidden="true" />}
              </button>
            ) : (
              <a key={social.platform} href={social.url} target="_blank" rel="noopener noreferrer" className="inline-link">{social.label} <ArrowUpRight size={13} aria-hidden="true" /></a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
export default ContactSection;
