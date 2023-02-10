import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "../../utilities/axios/axios";

import type { AxiosResponse } from "axios";
import type {
  MediaKindResponse,
  MovieResultObject,
  TvResultObject,
} from "../../utilities/themoviedb/types";
import type { MediaGeneralInformation } from "./media/types";

type SearchState = {
  shows: MediaGeneralInformation[];
  page: number;
  totalPages: number;
};

const initialState: SearchState = {
  shows: [],
  page: 1,
  totalPages: Infinity,
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    clearSearchResults(state) {
      state.shows = [];
      state.page = 1;
      state.totalPages = Infinity;
    },
  },
  extraReducers(builder) {
    builder.addCase(
      searchShows.fulfilled,
      (state, { payload: { page, shows, totalPages } }) => {
        // Remove any duplicate shows.
        state.shows = [
          ...new Map(
            [...state.shows, ...shows].map((show) => [show.id, show])
          ).values(),
        ];

        state.page = page + 1;
        state.totalPages = totalPages;

        console.log(totalPages);
      }
    );
  },
});

export const searchShows = createAsyncThunk(
  "searchShows",
  async ({ query, page }: { query: string; page: number }, { signal }) => {
    const { data: fetched } = await axios.get<
      never,
      AxiosResponse<MediaKindResponse>
    >("/search/multi", {
      params: {
        query,
        page,
      },
      signal,
    });

    // Cherry pick data returned from API to be return type compliant.
    const shows = fetched.results
      // `/search/multi` endpoint returns tv, movie, _and_ person results.
      // Filter out person results.
      .filter(
        (result: TvResultObject | MovieResultObject) =>
          result.media_type === "tv" || result.media_type === "movie"
      )
      .map(
        (
          result: TvResultObject | MovieResultObject
        ): MediaGeneralInformation => {
          // `media_type` should be included in all results
          const { id, backdrop_path, vote_average, media_type } = result;

          // NOTE: popular and top_rated endpoints
          // don't return data with a `media_type`.
          return {
            id,
            backdrop_path,
            vote_average,
            media_type,
            name: result.media_type === "tv" ? result.name : result.title,
            release_date:
              result.media_type === "tv"
                ? result.first_air_date
                : result.release_date,
          };
        }
      );

    return { shows, page: fetched.page, totalPages: fetched.total_pages };
  }
);

export const { clearSearchResults } = searchSlice.actions;

export default searchSlice.reducer;
