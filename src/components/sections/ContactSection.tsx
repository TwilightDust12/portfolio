"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { CopyEmailButton } from "@/components/ui/CopyEmailButton";
import {
  Mail,
  ArrowUpRight,
  Send,
  MessageSquare,
  Sparkles,
} from "lucide-react";

// Platform SVG Icons (Lucide does not export brand icons)
function Github({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function Linkedin({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function Instagram({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function Facebook({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

const socialIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  github: Github,
  linkedin: Linkedin,
  instagram: Instagram,
  facebook: Facebook,
};

const socialDescriptions: Record<string, string> = {
  github: "Source Code & Experiments",
  linkedin: "Professional Trajectory",
  instagram: "Visual Aesthetics",
  facebook: "Direct Transmissions",
};

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

export function ContactSection() {
  return (
    <motion.section
      id="contact"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className="py-24 px-4 sm:px-6 max-w-6xl mx-auto"
    >
      {/* Chapter 06 Header */}
      <motion.div variants={itemVariants}>
        <SectionHeader
          chapter="06"
          tag="TRANSMISSIONS // DIALOGUE"
          title="Initiate Transmission"
          subtitle="Open for collaborations, systems engineering roles, and creative discussions across the ether."
        />
      </motion.div>

      {/* Main Transmission Hero Card */}
      <motion.div variants={itemVariants} className="mt-12">
        <GlassCard accentBorder className="p-8 sm:p-12 relative overflow-hidden">
          {/* Subtle ambient light glows */}
          <div className="absolute -right-24 -top-24 w-80 h-80 bg-ethereal-violet/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-24 -bottom-24 w-80 h-80 bg-ethereal-cyan/10 rounded-full blur-3xl pointer-events-none" />

          {/* Watermark icon in the background */}
          <div className="absolute right-6 bottom-6 text-white/[0.02] pointer-events-none select-none hidden md:block">
            <MessageSquare className="w-56 h-56" />
          </div>

          <div className="relative z-10 flex flex-col gap-6 sm:gap-8">
            {/* Status badge: availability */}
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-mono shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                </span>
                <span>{portfolioData.personal.availability}</span>
              </div>

              <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-slate-400 text-xs font-mono">
                <Sparkles className="w-3 h-3 text-ethereal-lilac" />
                <span>Response window: &lt; 24h</span>
              </div>
            </div>

            {/* Editorial invitation */}
            <div className="space-y-4 max-w-3xl">
              <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-slate-100 leading-[1.15]">
                Let&apos;s build something unforgettable in the ether.
              </h3>
              <p className="font-sans text-sm sm:text-base text-slate-400 leading-relaxed max-w-xl">
                Whether you have a breakthrough project in mind, systems engineering opportunities, or simply want to explore ideas across the digital realm, let&apos;s connect.
              </p>
            </div>

            {/* CopyEmailButton */}
            <CopyEmailButton email={portfolioData.personal.email} />
          </div>
        </GlassCard>
      </motion.div>

      {/* Social Matrix Grid */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8"
      >
        {portfolioData.socials.map((social) => {
          const IconComponent = socialIconMap[social.platform.toLowerCase()] || MessageSquare;
          const description =
            socialDescriptions[social.platform.toLowerCase()] || "Direct Transmissions";

          return (
            <a
              key={social.platform}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-ethereal-violet h-full"
            >
              <GlassCard className="p-6 h-full flex flex-col justify-between transition-all duration-300 group-hover:border-ethereal-violet/40 group-hover:-translate-y-1">
                <div className="flex items-start justify-between">
                  {/* Platform icon in circular frosted container with hover glow */}
                  <div className="w-12 h-12 rounded-full flex items-center justify-center bg-white/[0.05] border border-white/[0.1] text-slate-300 group-hover:text-ethereal-lilac group-hover:bg-ethereal-violet/15 group-hover:border-ethereal-violet/40 transition-all duration-300 shadow-sm">
                    <IconComponent className="w-5 h-5" />
                  </div>

                  {/* Outbound arrow that translates slightly on hover */}
                  <div className="text-slate-400 group-hover:text-ethereal-lilac transition-colors p-1">
                    <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-1">
                  <span className="font-serif text-lg font-medium text-slate-100 group-hover:text-white transition-colors">
                    {social.label}
                  </span>
                  <span className="font-mono text-xs text-ethereal-lilac/80">
                    {social.username}
                  </span>
                  <p className="font-sans text-xs text-slate-400 mt-2 line-clamp-2">
                    {description}
                  </p>
                </div>
              </GlassCard>
            </a>
          );
        })}
      </motion.div>
    </motion.section>
  );
}

export default ContactSection;
