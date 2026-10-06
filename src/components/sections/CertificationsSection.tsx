"use client";

import React from "react";
import PixelMascotDivider from "@/components/ui/PixelMascotDivider";
import { portfolioData } from "@/data/portfolio";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

export default function CertificationsSection() {
  return (
    <section id="certifications">
      <PixelMascotDivider number="05" label="CERTIFICATIONS" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {portfolioData.certifications.map((cert) => (
          <div
            key={cert.id}
            className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-6 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span className="font-mono text-xs text-zinc-500 uppercase tracking-wider">
                  {cert.issuer}
                </span>
              </div>

              <h3 className="font-sans font-bold text-base text-zinc-100 mb-2">
                {cert.title}
              </h3>

              {cert.credentialId && (
                <div className="font-mono text-xs text-zinc-400 mb-4">
                  ID: {cert.credentialId}
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between font-mono text-xs text-zinc-500">
              <span>{cert.issueDate}</span>

              {cert.credentialUrl && (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-white flex items-center gap-1 transition-colors underline decoration-zinc-800 underline-offset-4"
                >
                  <span>Verify</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
