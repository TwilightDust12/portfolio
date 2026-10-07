import { NextResponse } from "next/server";
import { CinemaData, FilmItem } from "@/types/telemetry";

const FALLBACK_FILMS: FilmItem[] = [
  {
    title: "All About Lily Chou-Chou",
    year: "2001",
    rating: "5.0",
    ratingStars: "★★★★★",
    posterUrl: "https://a.ltrbxd.com/resized/film-poster/4/6/9/9/2/46992-all-about-lily-chou-chou-0-500-0-750-crop.jpg",
    letterboxdUrl: "https://letterboxd.com/film/all-about-lily-chou-chou/",
    watchedDate: "Masterpiece",
  },
  {
    title: "The End of Evangelion",
    year: "1997",
    rating: "5.0",
    ratingStars: "★★★★★",
    posterUrl: "https://a.ltrbxd.com/resized/film-poster/4/9/4/5/6/49456-the-end-of-evangelion-0-500-0-750-crop.jpg",
    letterboxdUrl: "https://letterboxd.com/film/the-end-of-evangelion/",
    watchedDate: "Canon",
  },
  {
    title: "Chainsaw Man: Reze Arc",
    year: "2025",
    rating: "4.5",
    ratingStars: "★★★★½",
    posterUrl: "https://a.ltrbxd.com/resized/film-poster/1/1/0/3/6/5/4/1103654-chainsaw-man-the-movie-reze-arc-0-500-0-750-crop.jpg",
    letterboxdUrl: "https://letterboxd.com/",
    watchedDate: "Anticipated",
  },
  {
    title: "Perfect Blue",
    year: "1997",
    rating: "5.0",
    ratingStars: "★★★★★",
    posterUrl: "https://a.ltrbxd.com/resized/film-poster/4/9/1/4/2/49142-perfect-blue-0-500-0-750-crop.jpg",
    letterboxdUrl: "https://letterboxd.com/film/perfect-blue/",
    watchedDate: "Essential",
  },
];

function formatRatingStars(ratingStr?: string): string {
  if (!ratingStr) return "";
  const num = parseFloat(ratingStr);
  if (isNaN(num)) return "";
  const fullStars = Math.floor(num);
  const hasHalf = num % 1 >= 0.5;
  return "★".repeat(fullStars) + (hasHalf ? "½" : "");
}

export async function GET() {
  const username = process.env.LETTERBOXD_USERNAME;

  if (!username) {
    return NextResponse.json(
      { films: FALLBACK_FILMS, isFallback: true },
      {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      }
    );
  }

  try {
    const feedUrl = `https://letterboxd.com/${encodeURIComponent(username)}/rss/`;
    const res = await fetch(feedUrl, {
      next: { revalidate: 3600 },
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; Portfolio-Telemetry/1.0)",
        Accept: "application/rss+xml, application/xml, text/xml",
      },
    });

    if (!res.ok) {
      throw new Error(`Letterboxd RSS returned status ${res.status}`);
    }

    const xml = await res.text();
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    const items: FilmItem[] = [];

    let match;
    while ((match = itemRegex.exec(xml)) !== null && items.length < 4) {
      const itemContent = match[1];

      // Extract title
      const filmTitleMatch =
        itemContent.match(/<letterboxd:filmTitle>([^<]+)<\/letterboxd:filmTitle>/) ||
        itemContent.match(/<title>([^,<\-]+)/);
      const title = filmTitleMatch ? filmTitleMatch[1].trim() : "Untitled Film";

      // Extract year
      const yearMatch = itemContent.match(/<letterboxd:filmYear>([^<]+)<\/letterboxd:filmYear>/);
      const year = yearMatch ? yearMatch[1].trim() : "";

      // Extract rating
      const ratingMatch = itemContent.match(
        /<letterboxd:memberRating>([^<]+)<\/letterboxd:memberRating>/
      );
      const rating = ratingMatch ? ratingMatch[1].trim() : undefined;
      const ratingStars = formatRatingStars(rating);

      // Extract link
      const linkMatch = itemContent.match(/<link>([^<]+)<\/link>/);
      const letterboxdUrl = linkMatch
        ? linkMatch[1].trim()
        : `https://letterboxd.com/${username}`;

      // Extract poster image from description CDATA
      const posterMatch = itemContent.match(/src="([^"]+)"/);
      const posterUrl = posterMatch ? posterMatch[1] : "";

      // Watched date
      const watchedMatch = itemContent.match(
        /<letterboxd:watchedDate>([^<]+)<\/letterboxd:watchedDate>/
      );
      const watchedDate = watchedMatch ? watchedMatch[1].trim() : undefined;

      if (title && posterUrl) {
        items.push({
          title,
          year,
          rating,
          ratingStars,
          posterUrl,
          letterboxdUrl,
          watchedDate,
        });
      }
    }

    if (items.length === 0) {
      return NextResponse.json({ films: FALLBACK_FILMS, isFallback: true });
    }

    return NextResponse.json(
      { films: items, isFallback: false },
      {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      }
    );
  } catch (error) {
    console.error("Letterboxd RSS fetch error:", error);
    return NextResponse.json(
      { films: FALLBACK_FILMS, isFallback: true },
      {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      }
    );
  }
}
