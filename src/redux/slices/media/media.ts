import { createSlice, isAnyOf } from "@reduxjs/toolkit";

import { KIND } from "../../../utilities/enum";
import {
  fetchMediaById,
  fetchMediaSimilarShows,
  fetchMediaSupplementalVideos,
  fetchTvShowSeason,
  fetchMediaByKindAndType,
} from "./thunks";

import type { PayloadAction } from "@reduxjs/toolkit";
import type { MediaType, MediaState } from "./types";

const initialState: MediaState = {
  tv: {
    trending: {
      shows: [],
      page: 1,
      totalPages: Infinity,
      lastFetch: null,
    },
    popular: {
      shows: [],
      page: 1,
      totalPages: Infinity,
      lastFetch: null,
    },
    topRated: {
      shows: [],
      page: 1,
      totalPages: Infinity,
      lastFetch: null,
    },

    cache: {},
  },

  movie: {
    trending: {
      shows: [],
      page: 1,
      totalPages: Infinity,
      lastFetch: null,
    },
    popular: {
      shows: [],
      page: 1,
      totalPages: Infinity,
      lastFetch: null,
    },
    topRated: {
      shows: [],
      page: 1,
      totalPages: Infinity,
      lastFetch: null,
    },

    cache: {},
  },
};

export const mediaSlice = createSlice({
  name: "media",
  initialState,
  reducers: {
    clearShowsCache(state, { payload: mediaType }: PayloadAction<MediaType>) {
      // Point to new empty object reference;
      // allow old object reference containing
      // possibly outdated media details to be
      // garbage collected.
      state[mediaType].cache = {};
    },
  },
  extraReducers(builder) {
    // TV Show Details Page
    builder
      .addCase(fetchMediaById.fulfilled, (state, { payload: show }) => {
        state[show.media_type].cache[show.id] = show;
      })
      .addCase(fetchTvShowSeason.fulfilled, (state, { payload: season }) => {
        const { showId, season_number } = season;

        state.tv.cache[showId].seasons[season_number] = season;
      })
      .addCase(
        fetchMediaSupplementalVideos.fulfilled,
        (state, { payload: { mediaType, mediaId, supplementalVideos } }) => {
          state[mediaType].cache[mediaId].supplemental_videos =
            supplementalVideos;
        }
      )
      .addCase(
        fetchMediaSimilarShows.fulfilled,
        (state, { payload: { mediaType, mediaId, similarShows } }) => {
          state[mediaType].cache[mediaId].similar_shows = similarShows;
        }
      );

    // TV Show Kind Page
    // Better pattern than having separate a `addCase` for every `KIND`
    // Source: https://github.com/reduxjs/redux-toolkit/issues/429#issuecomment-810031743
    builder.addMatcher(
      isAnyOf(
        fetchMediaByKindAndType[KIND.TRENDING]("tv").fulfilled,
        fetchMediaByKindAndType[KIND.POPULAR]("tv").fulfilled,
        fetchMediaByKindAndType[KIND.TOP_RATED]("tv").fulfilled,
        fetchMediaByKindAndType[KIND.TRENDING]("movie").fulfilled,
        fetchMediaByKindAndType[KIND.POPULAR]("movie").fulfilled,
        fetchMediaByKindAndType[KIND.TOP_RATED]("movie").fulfilled
      ),
      (
        state,
        { type, payload: { mediaType, page, totalPages, shows: newShows } }
      ) => {
        // RTK documentation doesn't seem to explain how to set `action.payload`
        // type in `extraReducers`. Manually cast for now.

        // `action.type` format: `${tv | movie}/${KIND}/fulfilled`
        const kind: KIND = type.split("/")[1];

        if (page === 1) {
          // Initial fetch or refresh

          state[mediaType as MediaType][kind].shows = newShows;
          state[mediaType as MediaType][kind].lastFetch = Date.now();
        } else if (page > 1) {
          // A "new page" fetch

          // Remove any duplicate shows.
          // API, on occasion, returns the same show
          // at (n) page's last item and (n + 1) page's
          // first item.
          state[mediaType as MediaType][kind].shows = [
            ...new Map(
              [...state[mediaType as MediaType][kind].shows, ...newShows].map(
                (show) => [show.id, show]
              )
            ).values(),
          ];
        }

        state[mediaType as MediaType][kind].page += 1;
        state[mediaType as MediaType][kind].totalPages = totalPages;
      }
    );
  },
});

export const { clearShowsCache } = mediaSlice.actions;

export default mediaSlice.reducer;
