"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { Certification } from "@/types/portfolio";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import {
  Award,
  ShieldCheck,
  ExternalLink,
  Calendar,
  BadgeCheck,
  CheckCircle2,
} from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const certIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "meta-frontend": Award,
  "aws-cloud-practitioner": ShieldCheck,
  "linux-sysadmin": BadgeCheck,
};

export function CertificationsSection() {
  return (
    <motion.section
      id="certifications"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className="py-24 px-4 sm:px-6 max-w-6xl mx-auto"
    >
      {/* Chapter 05 Header */}
      <motion.div variants={itemVariants}>
        <SectionHeader
          chapter="05"
          tag="CREDENTIALS // ATTESTATIONS"
          title="Verified Milestones"
          subtitle="Professional certifications, accredited proficiencies, and systems knowledge."
        />
      </motion.div>

      {/* Grid Layout */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"
      >
        {portfolioData.certifications.map((cert: Certification, index: number) => {
          const CertIcon =
            certIconMap[cert.id] || (index % 2 === 0 ? Award : ShieldCheck);

          return (
            <GlassCard
              key={cert.id}
              accentBorder
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="p-6 sm:p-7 flex flex-col justify-between group transition-all duration-300 h-full"
            >
              <div>
                {/* Top row: Starlight glowing badge icon & verified pill */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center text-ethereal-lilac shadow-[0_0_15px_rgba(167,139,250,0.25)] group-hover:shadow-[0_0_20px_rgba(56,189,248,0.35)] group-hover:border-ethereal-cyan/40 group-hover:text-ethereal-cyan transition-all duration-300">
                    <CertIcon className="w-5 h-5" />
                  </div>
                  <div className="font-mono text-[11px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span>Verified</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-serif text-lg font-medium text-slate-100 my-3 leading-snug group-hover:text-white transition-colors">
                  {cert.title}
                </h3>

                {/* Issuer */}
                <p className="font-sans text-sm text-slate-400 mb-4">
                  {cert.issuer}
                </p>

                {/* Credential ID */}
                {cert.credentialId && (
                  <div className="font-mono text-xs text-slate-400 bg-white/[0.04] px-2.5 py-1 rounded-md border border-white/[0.06] mb-4 inline-block">
                    ID: {cert.credentialId}
                  </div>
                )}
              </div>

              {/* Bottom row: Date badge & direct outbound verification link */}
              <div className="pt-4 mt-auto border-t border-white/[0.06] flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-1.5 text-slate-400">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>{cert.issueDate}</span>
                </div>
                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs text-ethereal-lilac hover:text-white flex items-center gap-1.5 transition-colors group/link"
                  >
                    <span>Verify Credential ↗</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-80 group-hover/link:opacity-100 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-all" />
                  </a>
                )}
              </div>
            </GlassCard>
          );
        })}
      </motion.div>
    </motion.section>
  );
}

export default CertificationsSection;
