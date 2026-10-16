import { NextResponse } from "next/server";
import fallbackData from "@/data/github-contributions.json";
import { portfolioData } from "@/data/portfolio";
import type { GithubContributionsData, GithubContributionDay } from "@/types/telemetry";

export const dynamic = "force-dynamic";

function parseContributionsHtml(html: string): GithubContributionDay[] {
  const idToDate = new Map<string, string>();
  const cellRegex = /<td[^>]*data-date="(\d{4}-\d{2}-\d{2})"[^>]*id="([^"]+)"/g;
  let m: RegExpExecArray | null;
  while ((m = cellRegex.exec(html)) !== null) idToDate.set(m[2], m[1]);
  const cellRegex2 = /<td[^>]*id="([^"]+)"[^>]*data-date="(\d{4}-\d{2}-\d{2})"/g;
  while ((m = cellRegex2.exec(html)) !== null) idToDate.set(m[1], m[2]);

  const tipRegex = /<tool-tip[^>]*for="([^"]+)"[^>]*>([\s\S]*?)<\/tool-tip>/g;
  const contributions: GithubContributionDay[] = [];
  while ((m = tipRegex.exec(html)) !== null) {
    const id = m[1];
    const text = m[2].trim();
    const date = idToDate.get(id);
    if (date) {
      const countMatch = text.match(/^(\d+)\s+contribution/);
      const count = countMatch ? parseInt(countMatch[1], 10) : 0;
      contributions.push({ date, count });
    }
  }
  contributions.sort((a, b) => a.date.localeCompare(b.date));
  return contributions;
}

export async function GET() {
  const github = portfolioData.socials.find((social) => social.platform === "github");
  const username = github ? new URL(github.url).pathname.split("/")[1] : "TwilightDust12";

  try {
    const res = await fetch(`https://github.com/users/${encodeURIComponent(username)}/contributions`, {
      next: { revalidate: 3600 },
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; Portfolio-Telemetry/1.0)",
        Accept: "text/html",
      },
    });

    if (!res.ok) {
      throw new Error(`GitHub responded with ${res.status}`);
    }

    const html = await res.text();
    const contributions = parseContributionsHtml(html);

    if (contributions.length === 0) {
      throw new Error("No contribution cells parsed from HTML");
    }

    const total = contributions.reduce((sum, d) => sum + d.count, 0);

    const data: GithubContributionsData = {
      username,
      total,
      contributions,
      isFallback: false,
    };

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch {
    const data: GithubContributionsData = {
      username: fallbackData.username,
      total: fallbackData.total,
      contributions: fallbackData.contributions,
      isFallback: true,
    };

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=3600",
      },
    });
  }
}
