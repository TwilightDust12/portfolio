"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import fallbackData from "@/data/github-contributions.json";
import ContributionSkyline from "@/components/ui/contribution-skyline";
import type { GithubContributionsData } from "@/types/telemetry";

export default function GithubSection() {
  const [contributionsData, setContributionsData] = useState<GithubContributionsData>({ ...fallbackData, isFallback: true });

  const github = portfolioData.socials.find((social) => social.platform === "github");
  const username = github ? new URL(github.url).pathname.split("/")[1] : "TwilightDust12";

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/github", { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch contributions");
        return res.json();
      })
      .then((data: unknown) => {
        if (!data || typeof data !== "object") return;
        const feed = data as Partial<GithubContributionsData>;
        if (feed.username !== username || typeof feed.isFallback !== "boolean" ||
          !Number.isSafeInteger(feed.total) || !Array.isArray(feed.contributions) || !feed.contributions.length ||
          !feed.contributions.every((day) => {
            if (!day || typeof day.date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(day.date) ||
              !Number.isSafeInteger(day.count) || day.count < 0) return false;
            const date = new Date(day.date);
            return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === day.date;
          }) || feed.contributions.reduce((total, day) => total + day.count, 0) !== feed.total) return;
        if (!controller.signal.aborted) setContributionsData(feed as GithubContributionsData);
      })
      .catch(() => {
        // Keep the labeled real snapshot when the live record is unavailable.
      });

    return () => controller.abort();
  }, [username]);

  if (!github) return null;

  return (
    <section id="github" className="portfolio-section content-width" aria-labelledby="github-heading">
      <div className="section-heading">
        <h2 id="github-heading" className="section-title">Little by little.</h2>
        <p className="section-note">My contributions on GitHub, across projects and everyday experiments.</p>
      </div>

      <ContributionSkyline
        data={contributionsData.contributions}
        palette="catppuccin"
        defaultView="3d"
        orbit={true}
        title={
          <>
            <span className="font-semibold tabular-nums">{contributionsData.total}</span> contributions on GitHub
            {contributionsData.isFallback ? " in this activity record" : " in the last year"}
          </>
        }
      />

      <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
        <a href={github.url} target="_blank" rel="noopener noreferrer" className="inline-link">
          View {username} on GitHub <ArrowUpRight size={14} aria-hidden="true" />
        </a>
        {contributionsData.isFallback && (
          <span className="text-xs text-muted font-mono">Cached activity record · through <time dateTime={contributionsData.contributions.at(-1)?.date}>{contributionsData.contributions.at(-1)?.date}</time></span>
        )}
      </div>
    </section>
  );
}
