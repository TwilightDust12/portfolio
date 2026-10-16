"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import ContributionSkyline from "@/components/ui/contribution-skyline";
import type { GithubContributionsData } from "@/types/telemetry";

export default function GithubSection() {
  const [contributionsData, setContributionsData] = useState<GithubContributionsData | null>(null);

  const github = portfolioData.socials.find((social) => social.platform === "github");
  const username = github ? new URL(github.url).pathname.split("/")[1] : "TwilightDust12";

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/github", { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch contributions");
        return res.json();
      })
      .then((data: GithubContributionsData) => {
        setContributionsData(data);
      })
      .catch(() => {
        // Handled gracefully; fallback or seeded data available
      });

    return () => controller.abort();
  }, []);

  if (!github) return null;

  return (
    <section id="github" className="portfolio-section content-width" aria-labelledby="github-heading">
      <div className="section-heading">
        <h2 id="github-heading" className="section-title">Little by little.</h2>
        <p className="section-note">My contributions on GitHub, across projects and everyday experiments.</p>
      </div>

      <ContributionSkyline
        data={contributionsData?.contributions}
        palette="catppuccin"
        defaultView="3d"
        orbit={true}
        title={
          contributionsData ? (
            <>
              <span className="font-semibold tabular-nums">{contributionsData.total}</span> contributions on GitHub in the last year
            </>
          ) : undefined
        }
      />

      <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
        <a href={github.url} target="_blank" rel="noopener noreferrer" className="inline-link">
          View {username} on GitHub <ArrowUpRight size={14} aria-hidden="true" />
        </a>
        {contributionsData?.isFallback && (
          <span className="text-xs text-muted font-mono">Cached activity record</span>
        )}
      </div>
    </section>
  );
}
