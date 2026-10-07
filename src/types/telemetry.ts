export interface MusicData {
  isPlaying: boolean;
  title: string;
  artist: string;
  album: string;
  albumArt: string;
  songUrl: string;
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
  isFallback: boolean;
}
