"use client";

import React from "react";
import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import SectionHeader from "@/components/ui/SectionHeader";

export default function AboutSection() {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 max-w-5xl mx-auto">
      <SectionHeader
        chapter="02"
        tag="BIOGRAPHY & TRAJECTORY"
        title="About & Background"
        subtitle="Engineering focus, open source explorations, and professional history."
      />

      {/* Narrative Profile Spread */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-b border-hairline pb-16 mb-16">
        <div className="lg:col-span-5">
          <h3 className="font-serif text-2xl sm:text-3xl text-ivory-100 font-normal leading-snug">
            Building software with structural clarity, performance, and visual restraint.
          </h3>
          <div className="mt-6 flex flex-col gap-2 font-mono text-xs text-zinc-500">
            <div>
              <span className="text-zinc-400">LOCATION:</span> {portfolioData.personal.location}
            </div>
            <div>
              <span className="text-zinc-400">FOCUS:</span> Web Systems & Linux Environments
            </div>
            <div>
              <span className="text-zinc-400">AVAILABILITY:</span> {portfolioData.personal.availability}
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-5 text-sm sm:text-base text-zinc-300 leading-relaxed font-sans">
          {portfolioData.personal.bioParagraphs.map((para, index) => (
            <p key={index}>{para}</p>
          ))}
        </div>
      </div>

      {/* Experience Ledger */}
      <div className="mb-16">
        <div className="font-mono text-xs tracking-wider text-accent-warm uppercase mb-6 flex items-center gap-2">
          <span>// 02.1</span>
          <span>EXPERIENCE LEDGER</span>
        </div>

        <div className="divide-y divide-hairline border-y border-hairline">
          {portfolioData.experience.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.25, delay: index * 0.05, ease: [0.23, 1, 0.32, 1] }}
              className="py-8 grid grid-cols-1 md:grid-cols-12 gap-6"
            >
              {/* Period & Company */}
              <div className="md:col-span-4">
                <span className="font-mono text-xs text-zinc-500 block mb-1">{item.period}</span>
                <h4 className="font-serif text-lg text-ivory-100 font-normal">{item.role}</h4>
                <p className="font-sans text-xs text-zinc-400 mt-0.5">{item.company} · {item.location}</p>
              </div>

              {/* Achievements & Technologies */}
              <div className="md:col-span-8 space-y-4">
                <ul className="space-y-2">
                  {item.description.map((bullet, bIndex) => (
                    <li key={bIndex} className="text-xs sm:text-sm text-zinc-300 leading-relaxed flex items-start gap-2">
                      <span className="text-zinc-500 font-mono mt-0.5">•</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {item.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-[11px] text-zinc-400 px-2 py-0.5 rounded border border-hairline bg-studio-900"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Academic Foundations */}
      <div>
        <div className="font-mono text-xs tracking-wider text-accent-warm uppercase mb-6 flex items-center gap-2">
          <span>// 02.2</span>
          <span>ACADEMIC FOUNDATIONS</span>
        </div>

        <div className="border border-hairline rounded-xl bg-studio-900/40 p-6 sm:p-8">
          {portfolioData.education.map((edu) => (
            <div key={edu.id} className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-hairline pb-4">
                <div>
                  <h4 className="font-serif text-xl text-ivory-100 font-normal">{edu.degree}</h4>
                  <p className="font-sans text-xs text-zinc-400 mt-1">{edu.institution} · {edu.location}</p>
                </div>
                <div className="flex items-center gap-3 font-mono text-xs">
                  {edu.honors && <span className="text-accent-warm font-medium">{edu.honors}</span>}
                  <span className="text-zinc-500">{edu.period}</span>
                </div>
              </div>

              {edu.details && (
                <ul className="space-y-1.5 pt-2">
                  {edu.details.map((detail, dIndex) => (
                    <li key={dIndex} className="text-xs sm:text-sm text-zinc-400 flex items-start gap-2">
                      <span className="text-zinc-600 font-mono mt-0.5">•</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
