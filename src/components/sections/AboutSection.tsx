"use client";

import React from "react";
import PixelMascotDivider from "@/components/ui/PixelMascotDivider";
import { portfolioData } from "@/data/portfolio";

export default function AboutSection() {
  return (
    <section id="about">
      <PixelMascotDivider number="02" label="ABOUT" />

      {/* Intro Bio */}
      <div className="space-y-4 font-sans text-sm sm:text-base text-zinc-300 leading-relaxed max-w-3xl mb-10">
        <p>
          I&apos;m a software engineer and Linux enthusiast with a deep passion for building practical, high-performance systems. I got into software engineering because I love figuring out how low-level environments fit together and crafting interfaces that feel tactile and responsive.
        </p>
        <p>
          Right now, I spend my time engineering side projects, configuring Wayland window managers, and tuning audio pipelines for competitive rhythm gaming. I take genuine joy in turning rough ideas into tools that people can actually use every day.
        </p>
      </div>

      {/* Side-by-side Experience & Education Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Experience Card */}
        <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-6 sm:p-7">
          <div className="font-mono text-xs uppercase tracking-wider text-zinc-500 mb-6">
            EXPERIENCE
          </div>

          <div className="space-y-6">
            {portfolioData.experience.map((item) => (
              <div key={item.id} className="space-y-2">
                <div className="flex items-baseline justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="font-sans font-semibold text-sm text-zinc-100">
                      {item.role}
                    </span>
                  </div>
                  <span className="font-mono text-xs text-zinc-500">{item.period}</span>
                </div>

                <div className="font-mono text-xs text-zinc-400 pl-4">
                  {item.company} · {item.location}
                </div>

                <div className="space-y-1 pl-4 pt-1">
                  {item.description.map((desc, dIndex) => (
                    <div key={dIndex} className="font-mono text-xs text-zinc-400 flex items-start gap-2">
                      <span className="text-zinc-600">&gt;</span>
                      <span>{desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education Card */}
        <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-6 sm:p-7">
          <div className="font-mono text-xs uppercase tracking-wider text-zinc-500 mb-6">
            EDUCATION
          </div>

          <div className="space-y-6">
            {portfolioData.education.map((edu) => (
              <div key={edu.id} className="space-y-2">
                <div className="flex items-baseline justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="font-sans font-semibold text-sm text-zinc-100">
                      {edu.institution}
                    </span>
                  </div>
                  <span className="font-mono text-xs text-zinc-500">{edu.period}</span>
                </div>

                <div className="font-mono text-xs text-zinc-400 pl-4">
                  {edu.degree}
                </div>

                {edu.details && (
                  <div className="space-y-1 pl-4 pt-1">
                    {edu.details.map((detail, dIndex) => (
                      <div key={dIndex} className="font-mono text-xs text-zinc-400 flex items-start gap-2">
                        <span className="text-zinc-600">&gt;</span>
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Previous institutions */}
            <div className="pt-4 border-t border-zinc-800/80 space-y-4">
              <div className="flex items-baseline justify-between">
                <div>
                  <div className="font-sans text-sm text-zinc-300">Senior High School — STEM</div>
                  <div className="font-mono text-xs text-zinc-500">Science, Technology, Engineering & Mathematics</div>
                </div>
                <span className="font-mono text-xs text-zinc-600">2019 — 2021</span>
              </div>

              <div className="flex items-baseline justify-between">
                <div>
                  <div className="font-sans text-sm text-zinc-400">Junior High School</div>
                  <div className="font-mono text-xs text-zinc-500">Secondary Education</div>
                </div>
                <span className="font-mono text-xs text-zinc-600">2015 — 2019</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
