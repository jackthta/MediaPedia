import type {
  ContentRating,
  Images,
  Seasons,
  SupplementalVideos,
  TvShowInformation,
  TvShowSpecificInformation,
} from "../../../utilities/axios/types";

type Kind = {
  shows: TvShowInformation[];
  page: number;
  lastFetch: number | null;
};

type TVShowsCache = Record<
  number,
  TvShowSpecificInformation &
    Images &
    ContentRating &
    Seasons &
    SupplementalVideos & { similarShows: TvShowInformation[] }
>;

export type TvShowsState = {
  trending: Kind;
  popular: Kind;
  topRated: Kind;

  showsCache: TVShowsCache; // *1
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
