import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../../utilities/axios/axios";
import { KIND } from "../../../utilities/enum";

import type { AxiosResponse } from "axios";
import type {
  TvContentRatingsResponse,
  TvDetailsResponse,
  TvImagesResponse,
  TvKindResponse,
  TvSeasonsResponse,
  TvSimilarResponse,
  TvVideosResponse,
} from "../../../utilities/themoviedb/types";
import type {
  TvShowGeneralInformation,
  TvShowSpecificInformation,
  SupplementalVideo,
} from "./types";

const createFetchTvShowsThunk = (kind: KIND) => {
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

  return createAsyncThunk(typePrefix, async (page: number, { signal }) => {
    const { data: fetched } = await axios.get<
      never,
      AxiosResponse<TvKindResponse>
    >(endpoint, {
      params: {
        page,
      },
      signal,
    });

    // TODO: move this to MediaCard.
    // Reason: Might save some operations because it's possible
    // that not all shows will be displayed.
    // I.e., only do the operation when MediaCard is displayed
    // Format rating to contain only one fractional digit
    // (API returns rating with three fractional digits)
    // data.results = data.results.map((show) => ({
    //   ...show,
    //   vote_average: +show.vote_average.toFixed(1),
    // }));

    // Cherry pick data returned from API to be return type compliant.
    const shows = fetched.results.map(
      ({
        id,
        media_type,
        name,
        backdrop_path,
        vote_average,
        first_air_date,
      }): TvShowGeneralInformation => ({
        id,
        // Data returned from popular/top_rated endpoints will
        // not contain a `media_type: "tv"`. Manually set.
        media_type: media_type ? media_type : "tv",
        name,
        backdrop_path,
        vote_average,
        first_air_date,
      })
    );

    return {
      shows,
      page: fetched.page,
    };
  });
};
export const fetchTvShows: Record<KIND, any> = {
  [KIND.TRENDING]: createFetchTvShowsThunk(KIND.TRENDING),
  [KIND.POPULAR]: createFetchTvShowsThunk(KIND.POPULAR),
  [KIND.TOP_RATED]: createFetchTvShowsThunk(KIND.TOP_RATED),
};

export const fetchTvShowById = createAsyncThunk(
  "tv-shows/fetchTvShowById",
  async (showId: number, { signal }) => {
    // Fetch for (more) TV show details
    const { data: showDetails } = await axios.get<
      never,
      AxiosResponse<TvDetailsResponse>
    >(`/tv/${showId}`, {
      signal,
    });

    // TODO: Decide whether you want to format the rating's
    // fractional digits here or during rendering.
    // Format rating to contain only one fractional digit
    // (API returns rating with three fractional digits)
    // data.vote_average = +data.vote_average.toFixed(1);

    // Fetch for TV show's images (e.g., logo(s))
    const { data: showImages } = await axios.get<
      never,
      AxiosResponse<TvImagesResponse>
    >(`/tv/${showId}/images`);

    // Fetch for TV show's content rating
    const { data: showContentRatings } = await axios.get<
      never,
      AxiosResponse<TvContentRatingsResponse>
    >(`/tv/${showId}/content_ratings`);

    // Cherry pick data returned from API to be return type compliant.
    const {
      id,
      name,
      backdrop_path,
      vote_average,
      first_air_date,

      overview,
      genres,
      original_language,
      networks,
      number_of_seasons,
      next_episode_to_air,
      episode_run_time,
      origin_country,
    } = showDetails;

    const { logos } = showImages;

    // Extract only US rating for now
    const content_rating = showContentRatings.results.find(
      (rating) => rating.iso_3166_1 === "US"
    );

    return {
      id,
      name,
      backdrop_path,
      vote_average,
      first_air_date,

      overview,
      genres,
      original_language,
      networks,
      number_of_seasons,
      next_episode_to_air,
      episode_run_time,
      origin_country,

      logos,

      content_rating,

      // Initialize empty object for seasons
      // to be filled in when seasons API
      // endpoint is queried.
      seasons: {},
    } as TvShowSpecificInformation;
  }
);

export const fetchTvShowSeason = createAsyncThunk(
  "tv-shows/fetchTvShowSeason",
  async (
    {
      tvId,
      seasonNumber,
    }: {
      tvId: number;
      seasonNumber: number;
    },
    { signal }
  ) => {
    const { data: season } = await axios.get<
      never,
      AxiosResponse<TvSeasonsResponse>
    >(`/tv/${tvId}/season/${seasonNumber}`, {
      signal,
    });

    // Cherry pick data returned from API to be return type compliant.
    const { _id, season_number, name, episodes } = season;

    return { showId: tvId, _id, season_number, name, episodes };
  }
);

export const fetchTvShowSupplementalVideos = createAsyncThunk(
  "tv-shows/fetchTvShowSupplementalVideos",
  async (tvId: number, { signal }) => {
    const { data: fetched } = await axios.get<
      never,
      AxiosResponse<TvVideosResponse>
    >(`/tv/${tvId}/videos`, { signal });

    const { results: fetchedSupplementalVideos } = fetched;

    // Cherry pick data returned from API to be return type compliant.
    const supplementalVideos = fetchedSupplementalVideos.map(
      ({
        id,
        name,
        key,
        site,
        size,
        type,
        published_at,
      }): SupplementalVideo => ({
        id,
        name,
        key,
        site,
        size,
        type,
        published_at,
      })
    );

    return { showId: tvId, supplementalVideos };
  }
);

export const fetchTvShowSimilarShows = createAsyncThunk(
  "tv-shows/fetchTvShowSimilarShows",
  async (tvId: number, { signal }) => {
    const { data: fetched } = await axios.get<
      never,
      AxiosResponse<TvSimilarResponse>
    >(`/tv/${tvId}/similar`, {
      signal,
    });

    const { results: fetchedSimilarShows } = fetched;

    // Cherry pick data returned from API to be return type compliant.
    const similarShows = fetchedSimilarShows.map(
      ({
        id,
        media_type,
        name,
        backdrop_path,
        vote_average,
        first_air_date,
      }): TvShowGeneralInformation => ({
        id,
        media_type,
        name,
        backdrop_path,
        vote_average,
        first_air_date,
      })
    );

    return { showId: tvId, similarShows };
  }
);
