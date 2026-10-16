export interface MusicData {
  isPlaying: boolean;
  title: string;
  artist: string;
  album: string;
  albumArt: string;
  songUrl: string;
  profileUrl?: string;
  isFallback: boolean;
}

export interface FilmItem {
  title: string;
  year: string;
  rating?: string;
  ratingStars?: string;
  posterUrl: string;
  letterboxdUrl: string;
  watchedDate?: string;
}

export interface CinemaData {
  films: FilmItem[];
  profileUrl?: string;
  isFallback: boolean;
}

export interface GithubContributionDay {
  date: string;
  count: number;
}

export interface GithubContributionsData {
  total: number;
  contributions: GithubContributionDay[];
  username: string;
  isFallback: boolean;
}
