import type {
  ContentRating,
  Episode,
  Genre,
  Image,
  Network,
} from "../../../utilities/themoviedb/types";

export type TvShowsState = {
  trending: Kind;
  popular: Kind;
  topRated: Kind;

  showsCache: TVShowsCache; // *1
};

// Convenience types for `TvShowsState`
type Kind = {
  shows: TvShowGeneralInformation[];
  page: number;
  lastFetch: number | null;
};
export type TvShowGeneralInformation = {
  id: number;
  media_type: "tv";
  name: string;
  backdrop_path: string | null;
  vote_average: number;
  first_air_date: string;
};

type TVShowsCache = Record<number, TvShowSpecificInformation>;
export type TvShowSpecificInformation = TvShowGeneralInformation & {
  overview: string;
  genres: Genre[];
  original_language: string;
  networks: Network[];
  number_of_seasons: number;
  next_episode_to_air: any | null; // API states that it returns only null?
  episode_run_time: number[];
  origin_country: string[];

  logos: Image[];
  content_rating?: ContentRating;
  seasons: { [seasonNumber: number | string]: Season };
  supplemental_videos?: SupplementalVideo[];
  similar_shows?: TvShowGeneralInformation[];
};
export type Season = {
  _id: string;
  season_number: number;
  name: string;
  episodes: Episode[];
};
export type SupplementalVideo = {
  id: string;
  name: string;
  key: string;
  site: string;
  size: number;
  // Inferred values from data returned from API
  // because TMDB docs doesn't explicitly state.
  // Some may be missing.
  type:
    | "Trailer"
    | "Behind the Scenes"
    | "Bloopers"
    | "Opening Credits"
    | "Teaser"
    | string;
  published_at: string;
};

/**
 *
 * *1 — Optimization
 *      - Refresh TV Shows `shows` data every hour elapsed from:
 *          1. Initial page fetch timestamp
 *          2. Subsequent "refresh" fetch timestamps
 *      - `lastFetch` is set to each respective `Kind`'s
 *         state on _only_ (TV Shows or `Kind` TV Shows) pages mount.
 *      - "Refresh" means to:
 *          1. Fetch page 1 from `Kind` endpoint and replace that respective
 *             `Kind`'s `shows` and `page` properties (i.e. akin to an initial fetch).
 *          2. Clear `showsCache`.
 *
 */
