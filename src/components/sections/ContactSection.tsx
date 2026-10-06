"use client";

import React, { useState } from "react";
import PixelMascotDivider from "@/components/ui/PixelMascotDivider";
import { portfolioData } from "@/data/portfolio";
import { Copy, Check, Mail, ArrowUpRight } from "lucide-react";

export default function ContactSection() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard?.writeText(portfolioData.personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="pb-24">
      <PixelMascotDivider number="06" label="CONTACT" />

      <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-8 sm:p-12 text-center max-w-2xl mx-auto space-y-6">
        <h3 className="font-mono text-xl sm:text-2xl font-bold text-white uppercase tracking-wider">
          Let&apos;s Connect
        </h3>

        <p className="font-sans text-sm text-zinc-400 leading-relaxed max-w-md mx-auto">
          Currently open to fullstack engineering roles, systems projects, and open-source collaboration. Feel free to send a message.
        </p>

        {/* Copy Email Box */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={handleCopy}
            className="btn-press inline-flex items-center gap-2.5 px-5 py-2.5 rounded-lg border border-zinc-700/80 bg-zinc-900 text-zinc-200 font-mono text-xs hover:border-zinc-500 hover:text-white transition-all"
          >
            <Mail className="w-4 h-4 text-zinc-400" />
            <span>{portfolioData.personal.email}</span>
            <span className="text-zinc-600">|</span>
            <span className="text-zinc-400 flex items-center gap-1">
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </span>
          </button>

          <a
            href={`mailto:${portfolioData.personal.email}`}
            className="btn-press inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-zinc-200 transition-colors"
          >
            <span>Send Email</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-black" />
          </a>
        </div>

        {/* Social Links List */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-6 border-t border-zinc-800/80 font-mono text-xs text-zinc-500">
          {portfolioData.socials.map((social) => (
            <a
              key={social.platform}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors underline decoration-zinc-800 underline-offset-4"
            >
              {social.label.toLowerCase()}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
