import { createSlice, isAnyOf } from "@reduxjs/toolkit";

import { KIND } from "../../../utilities/enum";
import {
  fetchTvShowById,
  fetchTvShows,
  fetchTvShowSeason,
  fetchTvShowSimilarShows,
  fetchTvShowSupplementalVideos,
} from "./thunks";

import { TvShowsState } from "./types";

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

export const { clearShowsCache } = tvShowsSlice.actions;

export default tvShowsSlice.reducer;
