"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Disc3, Film } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import type { MusicData, CinemaData } from "@/types/telemetry";

type FeedState<T> = { data: T | null; loading: boolean; error: boolean };

function Artwork({ src, alt, film = false }: { src?: string; alt: string; film?: boolean }) {
  const [failed, setFailed] = useState(false);
  const className = film ? "film-poster" : "music-art";
  if (!src || failed) return <div className={`${className} grid place-items-center text-muted`} role="img" aria-label={alt}>{film ? <Film size={22} aria-hidden="true" /> : <Disc3 size={26} aria-hidden="true" />}</div>;
  // Remote feed images come from Last.fm and Letterboxd, with an explicit failure state.
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} className={className} loading="lazy" onError={() => setFailed(true)} />;
}

export function MoodSection() {
  const [music, setMusic] = useState<FeedState<MusicData>>({ data: null, loading: true, error: false });
  const [cinema, setCinema] = useState<FeedState<CinemaData>>({ data: null, loading: true, error: false });

  useEffect(() => {
    const controller = new AbortController();
    async function load<T>(url: string, validate: (value: unknown) => value is T, setFeed: (state: FeedState<T>) => void) {
      try {
        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) throw new Error("Feed unavailable");
        const data: unknown = await response.json();
        if (!validate(data)) throw new Error("Invalid feed");
        if (!controller.signal.aborted) setFeed({ data, loading: false, error: false });
      } catch {
        if (!controller.signal.aborted) setFeed({ data: null, loading: false, error: true });
      }
    }
    void load("/api/music", (value): value is MusicData => {
      if (!value || typeof value !== "object") return false;
      const item = value as Partial<MusicData>;
      return typeof item.title === "string" && typeof item.artist === "string" && typeof item.isPlaying === "boolean" && typeof item.isFallback === "boolean";
    }, setMusic);
    void load("/api/cinema", (value): value is CinemaData => {
      if (!value || typeof value !== "object") return false;
      const item = value as Partial<CinemaData>;
      return Array.isArray(item.films) && typeof item.isFallback === "boolean" && item.films.every((film) => film && typeof film.title === "string" && typeof film.letterboxdUrl === "string");
    }, setCinema);
    return () => controller.abort();
  }, []);

  const track = music.data;
  const films = cinema.data?.films.slice(0, 4) ?? [];
  return (
    <section id="mood" className="portfolio-section content-width">
      <span id="sensory" className="anchor-alias" aria-hidden="true" />
      <div className="section-heading"><h2 className="section-title">Away from the keyboard.</h2><p className="section-note">A few things that find their way into what I make.</p></div>
      <div className="personal-grid">
        <div className="personal-panel" aria-busy={music.loading}>
          <div className="flex justify-between items-baseline gap-3"><h3>On rotation</h3><span className="personal-meta">{track?.isFallback ? "Curated selection" : track?.isPlaying ? "Listening now" : "Last.fm"}</span></div>
          {music.loading ? (
            <div className="music-body" role="status"><div className="music-art loading-skeleton" /><div className="flex-1 py-2"><div className="loading-skeleton h-4 w-3/4 mb-3" /><div className="loading-skeleton h-3 w-1/2" /><span className="sr-only">Loading recent music</span></div></div>
          ) : track ? (
            <div className="music-body">
              <Artwork key={track.albumArt} src={track.albumArt} alt={`${track.album} album artwork`} />
              <div className="min-w-0">
                <p className="font-medium text-base leading-snug">{track.title}</p>
                <p className="text-sm text-accent-text mt-1">{track.artist}</p>
                <p className="personal-meta mt-2">{track.album}</p>
              </div>
            </div>
          ) : <p className="text-sm text-muted leading-relaxed my-6">Recent music is unavailable right now. You can still explore my listening history on Last.fm.</p>}
          <a href={track?.profileUrl || "https://www.last.fm/user/TwilightDust12"} target="_blank" rel="noopener noreferrer" className="inline-link">Last.fm <ArrowUpRight size={14} aria-hidden="true" /></a>
        </div>
        <div className="personal-panel" aria-busy={cinema.loading}>
          <div className="flex justify-between items-baseline gap-3"><h3>In the picture</h3><span className="personal-meta">{cinema.data?.isFallback ? "Curated favorites" : "Letterboxd"}</span></div>
          {cinema.loading ? (
            <div className="film-grid" role="status">{[0, 1, 2, 3].map((index) => <div key={index} className="film-poster loading-skeleton" />)}<span className="sr-only">Loading recent films</span></div>
          ) : films.length ? (
            <div className="film-grid">
              {films.map((film, index) => <a key={`${film.title}-${index}`} href={film.letterboxdUrl} target="_blank" rel="noopener noreferrer" className="film-link">
                <Artwork src={film.posterUrl} alt={`${film.title} poster`} film />
                <p className="film-title">{film.title}</p>
                <p className="personal-meta mt-1">{film.year}{film.ratingStars ? ` · ${film.ratingStars}` : ""}</p>
              </a>)}
            </div>
          ) : <p className="text-sm text-muted leading-relaxed my-6">{cinema.error ? "Recent films are unavailable right now." : "No recent films to show."} My film diary is on Letterboxd.</p>}
          <a href={cinema.data?.profileUrl || "https://letterboxd.com/twilightdust"} target="_blank" rel="noopener noreferrer" className="inline-link mt-3">Letterboxd <ArrowUpRight size={14} aria-hidden="true" /></a>
        </div>
      </div>
      <div className="interest-note">
        <p><strong>Anime.</strong> {portfolioData.animeInterests.description} Favorites include {portfolioData.animeInterests.favorites.join(", ")}.</p>
        <p><strong>Games.</strong> {portfolioData.gamingInterests.description}</p>
      </div>
    </section>
  );
}
