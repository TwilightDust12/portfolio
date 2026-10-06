"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon, InstagramIcon, FacebookIcon } from "@/components/ui/Icons";
import { portfolioData } from "@/data/portfolio";
import SectionHeader from "@/components/ui/SectionHeader";
import CopyEmailButton from "@/components/ui/CopyEmailButton";

export default function ContactSection() {
  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "github":
        return <GithubIcon className="w-5 h-5 text-zinc-300" />;
      case "linkedin":
        return <LinkedinIcon className="w-5 h-5 text-zinc-300" />;
      case "instagram":
        return <InstagramIcon className="w-5 h-5 text-zinc-300" />;
      case "facebook":
        return <FacebookIcon className="w-5 h-5 text-zinc-300" />;
      default:
        return <ArrowUpRight className="w-5 h-5 text-zinc-300" />;
    }
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 max-w-5xl mx-auto">
      <SectionHeader
        chapter="05"
        tag="CONTACT & TRANSCRIPT"
        title="Get in Touch"
        subtitle="Open for fullstack engineering roles, systems projects, and open-source collaboration."
      />

      <div className="rounded-2xl border border-hairline bg-studio-900/40 p-8 sm:p-12 mb-10">
        <h3 className="font-serif text-3xl sm:text-4xl text-ivory-100 font-normal leading-tight mb-4">
          Let&apos;s build something enduring.
        </h3>
        <p className="font-sans text-sm sm:text-base text-zinc-400 max-w-xl leading-relaxed mb-8">
          Whether you want to discuss a software project, explore Linux desktop tooling, or talk about rhythm gaming engineering, feel free to reach out.
        </p>

        <CopyEmailButton email={portfolioData.personal.email} />
      </div>

      {/* Social Network Ledger */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {portfolioData.socials.map((social, index) => (
          <motion.a
            key={social.platform}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.2, delay: index * 0.04, ease: [0.23, 1, 0.32, 1] }}
            className="group rounded-xl border border-hairline bg-studio-900/30 p-5 hover:border-zinc-700/80 hover:bg-studio-900/60 transition-colors btn-press flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 rounded-lg bg-studio-950 border border-hairline">
                {getSocialIcon(social.platform)}
              </div>
              <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
            </div>

            <div>
              <div className="font-sans font-medium text-sm text-ivory-100 group-hover:text-white transition-colors">
                {social.label}
              </div>
              <div className="font-mono text-xs text-zinc-500 mt-0.5">
                {social.username}
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
