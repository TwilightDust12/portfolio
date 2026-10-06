"use client";

import React from "react";
import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import SectionHeader from "@/components/ui/SectionHeader";

export default function TechStackSection() {
  return (
    <section id="tech" className="py-20 px-4 sm:px-6 max-w-5xl mx-auto">
      <SectionHeader
        chapter="03"
        tag="ARSENAL // REPERTOIRE"
        title="Technical Stack & Tools"
        subtitle="Languages, framework architectures, runtime platforms, and desktop Linux environments."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {portfolioData.skills.map((category, index) => (
          <motion.div
            key={category.category}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.25, delay: index * 0.05, ease: [0.23, 1, 0.32, 1] }}
            className="rounded-xl border border-hairline bg-studio-900/40 p-6 hover:border-zinc-700/80 transition-colors"
          >
            <div className="border-b border-hairline pb-4 mb-4">
              <span className="font-mono text-[11px] text-accent-warm uppercase tracking-wider block mb-1">
                // DOMAIN 0{index + 1}
              </span>
              <h3 className="font-serif text-xl font-normal text-ivory-100">
                {category.category}
              </h3>
              <p className="font-sans text-xs text-zinc-400 mt-1">
                {category.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {category.skills.map((skill) => (
                <div
                  key={skill.name}
                  className="font-mono text-xs px-3 py-1.5 rounded-lg border border-hairline bg-studio-950/70 text-zinc-300 flex items-center gap-2 hover:border-zinc-600 transition-colors"
                >
                  <span>{skill.name}</span>
                  {skill.level && (
                    <span className="text-[10px] text-zinc-500 uppercase">
                      · {skill.level}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
