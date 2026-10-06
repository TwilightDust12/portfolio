"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import SectionHeader from "@/components/ui/SectionHeader";

export default function CertificationsSection() {
  return (
    <section id="certifications" className="py-20 px-4 sm:px-6 max-w-5xl mx-auto">
      <SectionHeader
        chapter="04"
        tag="CREDENTIALS // ATTESTATIONS"
        title="Verified Certifications"
        subtitle="Accredited technical certifications and professional milestones."
      />

      <div className="divide-y divide-hairline border-y border-hairline">
        {portfolioData.certifications.map((cert, index) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.22, delay: index * 0.05, ease: [0.23, 1, 0.32, 1] }}
            className="py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
          >
            {/* Title & Issuer */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-accent-warm flex-shrink-0" />
                <span className="font-mono text-xs text-zinc-500 uppercase tracking-wider">{cert.issuer}</span>
              </div>
              <h3 className="font-serif text-lg sm:text-xl text-ivory-100 font-normal group-hover:text-white transition-colors">
                {cert.title}
              </h3>
            </div>

            {/* Meta & Link */}
            <div className="flex items-center gap-4 sm:gap-6 font-mono text-xs text-zinc-400">
              {cert.credentialId && (
                <span className="hidden md:inline px-2 py-1 rounded bg-studio-900 border border-hairline text-zinc-400">
                  {cert.credentialId}
                </span>
              )}
              <span className="text-zinc-500">{cert.issueDate}</span>

              {cert.credentialUrl && (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-press inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-hairline bg-studio-900 text-zinc-300 hover:text-white hover:border-zinc-500 transition-colors"
                >
                  <span>Verify</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
