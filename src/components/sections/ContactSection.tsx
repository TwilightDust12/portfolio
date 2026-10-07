"use client";

import React, { useState } from "react";
import { portfolioData } from "@/data/portfolio";
import { SwissFrame } from "@/components/ui/SwissFrame";
import { CopyEmailButton } from "@/components/ui/CopyEmailButton";
import {
  Mail,
  ArrowUpRight,
  Send,
  MessageSquare,
  Sparkles,
  Terminal,
  CheckCircle2,
  Copy,
  Check,
} from "lucide-react";
import {
  GithubIcon as Github,
  LinkedinIcon as Linkedin,
  InstagramIcon as Instagram,
  FacebookIcon as Facebook,
} from "@/components/ui/Icons";
import { toast } from "sonner";

function DiscordIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}

export function ContactSection() {
  const [discordCopied, setDiscordCopied] = useState(false);

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "github":
        return <Github className="w-5 h-5" />;
      case "linkedin":
        return <Linkedin className="w-5 h-5" />;
      case "facebook":
        return <Facebook className="w-5 h-5" />;
      case "instagram":
        return <Instagram className="w-5 h-5" />;
      case "discord":
        return <DiscordIcon className="w-5 h-5" />;
      default:
        return <MessageSquare className="w-5 h-5" />;
    }
  };

  const handleCopyDiscord = (e: React.MouseEvent, username: string) => {
    e.preventDefault();
    navigator.clipboard?.writeText(username);
    setDiscordCopied(true);
    toast.success("Discord handle copied", {
      description: `@${username}`,
    });
    setTimeout(() => setDiscordCopied(false), 2000);
  };

  return (
    <section id="comms" className="max-w-5xl mx-auto px-4 py-20 relative">
      {/* Anchor alias to support legacy navigation targeting #contact */}
      <span id="contact" className="absolute -top-20 invisible" aria-hidden="true" />

      {/* Header */}
      <div className="mb-10">
        <h2 className="font-mono text-3xl sm:text-4xl font-bold text-ink lowercase tracking-tight">
          get in touch.
        </h2>

        <p className="font-sans text-sm sm:text-base text-accent-text mt-2 font-medium">
          Open for OJT and internship opportunities.
        </p>

        <p className="font-sans text-sm sm:text-base text-ink/70 mt-2 leading-relaxed max-w-2xl">
          Open for On-the-Job Training (OJT), software engineering internships, and collaborations.
        </p>
      </div>

      {/* Invitation Card wrapped in SwissFrame */}
      <SwissFrame
        tag="CONTACT // TRANSMISSION"
        accentBorder="mauve"
        showCalipers={true}
        className="p-8 sm:p-12 rounded-2xl relative overflow-hidden shadow-lg"
      >
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto space-y-6">
          {/* OJT Banner */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl border border-emerald-500/35 bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 font-mono text-xs tracking-wide shadow-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span>Actively Seeking OJT &amp; Internship Placement (2025–2026)</span>
          </div>

          {/* Primary Headline */}
          <div className="space-y-2">
            <h3 className="font-mono text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
              Let&apos;s build something together.
            </h3>
            <p className="font-sans text-xs sm:text-sm text-ink/80 max-w-lg mx-auto leading-relaxed">
              Whether you have an internship opening, a project inquiry, or want to talk about full-stack web engineering and Linux setups - feel free to reach out.
            </p>
          </div>

          {/* Mount CopyEmailButton */}
          <div className="pt-2 w-full">
            <CopyEmailButton email={portfolioData.personal.email} />
          </div>

          {/* Subtext info */}
          <div className="flex items-center justify-center gap-4 pt-2 font-mono text-[11px] text-ink/60 select-none flex-wrap">
            <span className="flex items-center gap-1 font-semibold">
              <Terminal className="w-3.5 h-3.5 text-accent-text" />
              <span>Response SLA: &lt;24h</span>
            </span>
            <span>·</span>
            <span className="flex items-center gap-1 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5 text-accent-green" />
              <span>GPG / Direct Mail</span>
            </span>
            <span>·</span>
            <span className="flex items-center gap-1 font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-accent-pink" />
              <span>Lucena City, PH</span>
            </span>
          </div>
        </div>
      </SwissFrame>

      {/* Social Channels Matrix (5 columns on desktop) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-8">
        {portfolioData.socials.map((social) => {
          const isDiscord = social.platform.toLowerCase() === "discord";

          return (
            <div key={social.platform} className="relative group">
              <SwissFrame
                tag={social.platform.toUpperCase()}
                className="p-4 sm:p-5 rounded-2xl flex flex-col justify-between h-full hover:border-black/30 dark:hover:border-white/20 transition-all duration-150 hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-ink/80 group-hover:text-accent-text transition-colors">
                      {getSocialIcon(social.platform)}
                    </div>
                    {isDiscord ? (
                      <button
                        type="button"
                        onClick={(e) => handleCopyDiscord(e, social.username)}
                        className="relative after:absolute after:-inset-2 min-w-[32px] min-h-[32px] flex items-center justify-center text-ink/40 group-hover:text-accent-text hover:opacity-100 transition-opacity p-1.5 rounded hover:bg-ink/5 touch-manipulation"
                        title="Copy Discord username"
                        aria-label="Copy Discord username"
                      >
                        {discordCopied ? (
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    ) : (
                      <a
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative after:absolute after:-inset-2 min-w-[32px] min-h-[32px] flex items-center justify-center text-ink/40 group-hover:text-accent-text group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all p-1.5 touch-manipulation"
                        aria-label={`Open ${social.label}`}
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                  <div className="font-mono text-xs font-bold text-ink tracking-tight mb-0.5">
                    {social.label}
                  </div>
                  <div className="font-mono text-[11px] text-ink/60 truncate" title={social.username}>
                    {social.username}
                  </div>
                </div>

                <div className="pt-3 mt-3 border-t border-ink/10 flex items-center justify-between">
                  {isDiscord ? (
                    <button
                      type="button"
                      onClick={(e) => handleCopyDiscord(e, social.username)}
                      className="font-mono text-[10px] text-accent-text hover:underline flex items-center gap-1 py-1 touch-manipulation"
                    >
                      <span>{discordCopied ? "Copied tag ✓" : "Copy tag"}</span>
                    </button>
                  ) : (
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-[10px] text-accent-text hover:underline flex items-center gap-1 group-hover:text-accent-text py-1 touch-manipulation"
                    >
                      <span>Connect</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  )}
                  <span className="font-mono text-[10px] text-ink/40 uppercase">
                    LIVE
                  </span>
                </div>
              </SwissFrame>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default ContactSection;
