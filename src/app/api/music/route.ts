import { NextResponse } from "next/server";
import { MusicData } from "@/types/telemetry";

export const dynamic = "force-dynamic";

const FALLBACK_MUSIC: MusicData = {
  isPlaying: true,
  title: "Tsubasa wo Kudasai",
  artist: "Lily Chou-Chou",
  album: "Kokyuu (呼吸)",
  albumArt: "https://lastfm.freetls.fastly.net/i/u/300x300/c77605e5d36e4f35839ce6f272c72b21.png",
  songUrl: "https://www.last.fm/music/Lily+Chou-Chou/_/Tsubasa+wo+Kudasai",
  isFallback: true,
};

export async function GET() {
  const apiKey = process.env.LASTFM_API_KEY;
  const username = process.env.LASTFM_USERNAME;

  if (!apiKey || !username) {
    return NextResponse.json(FALLBACK_MUSIC, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    });
  }

  try {
    const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${encodeURIComponent(
      username
    )}&api_key=${encodeURIComponent(apiKey)}&format=json&limit=2`;

    const res = await fetch(url, {
      next: { revalidate: 30 },
      headers: {
        "User-Agent": "Portfolio-Telemetry/1.0",
      },
    });

    if (!res.ok) {
      throw new Error(`Last.fm API responded with ${res.status}`);
    }

    const data = await res.json();
    const tracks = data?.recenttracks?.track;

    if (!tracks || !Array.isArray(tracks) || tracks.length === 0) {
      return NextResponse.json(FALLBACK_MUSIC);
    }

    const latest = tracks[0];
    const isPlaying = latest["@attr"]?.nowplaying === "true";
    const title = latest.name || "Unknown Track";
    const artist =
      typeof latest.artist === "object" ? latest.artist["#text"] : latest.artist || "Unknown Artist";
    const album =
      typeof latest.album === "object" ? latest.album["#text"] : latest.album || "Single";

    // Extract best quality image
    const images = Array.isArray(latest.image) ? latest.image : [];
    const bestImage =
      images.find((img: { size?: string; "#text": string }) => img.size === "extralarge")?.["#text"] ||
      images.find((img: { size?: string; "#text": string }) => img.size === "large")?.["#text"] ||
      FALLBACK_MUSIC.albumArt;

    const payload: MusicData = {
      isPlaying,
      title,
      artist,
      album,
      albumArt: bestImage || FALLBACK_MUSIC.albumArt,
      songUrl: latest.url || `https://www.last.fm/user/${username}`,
      profileUrl: `https://www.last.fm/user/${username}`,
      isFallback: false,
    };

    return NextResponse.json(payload, {
      headers: {
        "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60",
      },
    });
  } catch (error) {
    console.error("Last.fm fetch error:", error);
    return NextResponse.json(FALLBACK_MUSIC, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
      },
    });
  }
}
