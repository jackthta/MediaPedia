import { createSlice, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit";

import axios from "../../utilities/axios/axios";
import { KIND } from "../../utilities/enum";

import { AxiosResponse, isAxiosError } from "axios";
import type {
  ContentRating,
  ContentRatings,
  Images,
  Season,
  Seasons,
  SupplementalVideo,
  SupplementalVideos,
  TvShowFetchResponse,
  TvShowInformation,
  TvShowSpecificInformation,
} from "../../utilities/axios/types";
import type { RootState } from "../store";

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

const initialState: TvShowsState = {
  trending: {
    shows: [],
    page: 1,
    lastFetch: null,
  },
  popular: {
    shows: [],
    page: 1,
    lastFetch: null,
  },
  topRated: {
    shows: [],
    page: 1,
    lastFetch: null,
  },

  showsCache: {},
};

export const tvShowsSlice = createSlice({
  name: "tv-shows",
  initialState,
  reducers: {
    clearShowsCache(state) {
      // Point to new empty object reference;
      // allow old object reference containing
      // possibly outdated show details to be
      // garbage collected.
      state.showsCache = {};
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchTvShowById.fulfilled, (state, action) => {
      state.showsCache[action.payload.id] = action.payload;
    });

    builder.addCase(fetchTvShowSeason.fulfilled, (state, action) => {
      const { showId, season_number } = action.payload;

      state.showsCache[showId].seasons[season_number] = action.payload;
    });

    builder.addCase(
      fetchTvShowSupplementalVideos.fulfilled,
      (state, action) => {
        const { id, results } = action.payload;

        state.showsCache[id].supplementalVideos = results;
      }
    );

    builder.addCase(fetchTvShowSimilarShows.fulfilled, (state, action) => {
      const { id, results } = action.payload;

      state.showsCache[id].similarShows = results;
    });

    // Better pattern than having separate a `addCase` for every `KIND`
    // Source: https://github.com/reduxjs/redux-toolkit/issues/429#issuecomment-810031743
    builder.addMatcher(
      isAnyOf(
        fetchTvShows[KIND.TRENDING].fulfilled,
        fetchTvShows[KIND.POPULAR].fulfilled,
        fetchTvShows[KIND.TOP_RATED].fulfilled
      ),
      (tvShows, action) => {
        const {
          payload: { page, results: newShows },
        } = action;

        // `action.type` format: `tv-shows/${KIND}/fulfilled`
        const kind: KIND = action.type.split("/")[1];

        if (page === 1) {
          // Initial fetch or refresh

          tvShows[kind].shows = newShows;
          tvShows[kind].lastFetch = Date.now();
        } else if (page > 1) {
          // A "new page" fetch

          // Remove any duplicate shows
          // API, on occasion, returns the same show
          // at (n) page's last item and (n + 1) page's
          // first item.
          tvShows[kind].shows = [
            ...new Map(
              [...tvShows[kind].shows, ...newShows].map((show) => [
                show.id,
                show,
              ])
            ).values(),
          ];
        }

        tvShows[kind].page += 1;
      }
    );
  },
});

const createAsyncFetchThunk = (kind: KIND) => {
  let typePrefix = "tv-shows";
  let endpoint: string;

  switch (kind) {
    case KIND.TRENDING:
      typePrefix += `/${KIND.TRENDING}`;

      endpoint = "/trending/tv/day";
      break;
    case KIND.POPULAR:
      typePrefix += `/${KIND.POPULAR}`;

      endpoint = "/tv/popular";
      break;
    case KIND.TOP_RATED:
      typePrefix += `/${KIND.TOP_RATED}`;

      endpoint = "/tv/top_rated";
      break;
  }

  // TODO: AbortController isn't being passed in correctly.
  // Has to be passed in through an object now with `page`.
  return createAsyncThunk(
    typePrefix,
    async (page: number, controller?: AbortController) => {
      const { data } = await axios.get<
        never,
        AxiosResponse<TvShowFetchResponse>
      >(endpoint, {
        params: {
          page,
        },
        signal: controller?.signal,
      });

      // TODO: move this to MediaCard.
      // Reason: Might save some operations because it's possible
      // that not all shows will be displayed.
      // I.e., only do the operation when MediaCard is displayed
      // Format rating to contain only one fractional digit
      // (API returns rating with three fractional digits)
      data.results = data.results.map((show) => ({
        ...show,
        vote_average: +show.vote_average.toFixed(1),
      }));

      // Data returned from these endpoints will not contain
      // a `media_type: "tv"` in the results. Manually set.
      if (kind === KIND.POPULAR || kind === KIND.TOP_RATED) {
        data.results = data.results.map((show) => ({
          ...show,
          media_type: "tv",
        }));
      }

      return data;
    }
  );
};

export const fetchTvShowById = createAsyncThunk(
  "tv-shows/fetchTvShowById",
  async (id: number) => {
    const { data } = await axios.get<
      never,
      AxiosResponse<TvShowSpecificInformation>
    >(`/tv/${id}`);

    // Format rating to contain only one fractional digit
    // (API returns rating with three fractional digits)
    data.vote_average = +data.vote_average.toFixed(1);

    // Fetch for TV show's logo(s)
    const { data: showImages } = await axios.get<never, AxiosResponse<Images>>(
      `/tv/${id}/images`
    );

    // Fetch for TV show's content rating
    const { data: _contentRating } = await axios.get<
      never,
      AxiosResponse<ContentRatings>
    >(`/tv/${id}/content_ratings`);
    // Extract only US rating for now
    const contentRating: any = _contentRating.results.find(
      (rating) => rating.iso_3166_1 === "US"
    );

    // Remove `seasons`
    // NOTE: This is to make sure that fetching
    // the seasons data via another endpoint won't
    // clash with this data.
    // *This is one occurrence for explicitly
    // cherry-picking data returned from the API
    data.seasons = {};

    return {
      ...data,
      ...showImages,
      ...contentRating,
    };
  }
);

export const fetchTvShowSeason = createAsyncThunk(
  "tv-shows/fetchTvShowSeason",
  async ({
    tvId,
    season,
    controller,
  }: {
    tvId: number;
    season: number;
    controller: AbortController;
  }) => {
    const { data } = await axios.get<never, AxiosResponse<Season>>(
      `/tv/${tvId}/season/${season}`,
      {
        signal: controller?.signal,
      }
    );

    return { ...data, showId: tvId };
  }
);

export const fetchTvShowSupplementalVideos = createAsyncThunk(
  "tv-shows/fetchTvShowSupplementalVideos",
  async ({
    tvId,
    controller,
  }: {
    tvId: number;
    controller: AbortController;
  }) => {
    // TODO: fix type. API returns data in `results`,
    // but want to namespace that into `supplementalVideos`.
    // Another iteration of needing to separate data types
    // returned from API and data types to be used within the
    // application.
    const { data } = await axios.get<never, AxiosResponse<any>>(
      `/tv/${tvId}/videos`,
      { signal: controller.signal }
    );

    return data;
  }
);

export const fetchTvShowSimilarShows = createAsyncThunk(
  "tv-shows/fetchTvShowSimilarShows",
  async ({
    tvId,
    controller,
  }: {
    tvId: number;
    controller: AbortController;
  }) => {
    const { data } = await axios.get(`/tv/${tvId}/similar`, {
      signal: controller.signal,
    });

    return { ...data, id: tvId };
  }
);

export const { clearShowsCache } = tvShowsSlice.actions;

export const fetchTvShows: Record<KIND, any> = {
  [KIND.TRENDING]: createAsyncFetchThunk(KIND.TRENDING),
  [KIND.POPULAR]: createAsyncFetchThunk(KIND.POPULAR),
  [KIND.TOP_RATED]: createAsyncFetchThunk(KIND.TOP_RATED),
};

export const selectShowsByKind = (state: RootState, kind: KIND) =>
  state.tvShows[kind].shows;

export const selectPageByKind = (state: RootState, kind: KIND) =>
  state.tvShows[kind].page;

export const selectCachedShowById = (state: RootState, id: number) =>
  state.tvShows.showsCache[id];

export const selectTvShowSeasons = (state: RootState, tvId: number) =>
  state.tvShows.showsCache[tvId].seasons;

export const selectTvShowSeason = (
  state: RootState,
  tvId: number,
  season: number
) => state.tvShows.showsCache[tvId].seasons[season];

export const selectTvShowSupplementalVideos = (
  state: RootState,
  tvId: number
) => state.tvShows.showsCache[tvId].supplementalVideos;

export const selectTvShowSimilarShows = (state: RootState, tvId: number) =>
  state.tvShows.showsCache[tvId].similarShows;

export default tvShowsSlice.reducer;

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
