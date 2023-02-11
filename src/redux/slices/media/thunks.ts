import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../../utilities/axios/axios";
import { KIND } from "../../../utilities/enum";

import type { AxiosResponse } from "axios";
import type {
  ImagesResponse,
  MediaKindResponse,
  MovieDetailsResponse,
  TvContentRatingsResponse,
  TvDetailsResponse,
  TvSeasonsResponse,
  VideosResponse,
} from "../../../utilities/themoviedb/types";
import type {
  SupplementalVideo,
  MediaType,
  MediaGeneralInformation,
  MediaSpecificInformation,
} from "./types";

const createFetchMediaByKindAndTypeThunk = (
  mediaType: MediaType,
  kind: KIND
) => {
  let typePrefix: string;
  let endpoint: string;

  switch (kind) {
    case KIND.TRENDING:
      typePrefix = `${mediaType}/${KIND.TRENDING}`;

      endpoint = `/trending/${mediaType}/day`;
      break;

    case KIND.POPULAR:
      typePrefix = `${mediaType}/${KIND.POPULAR}`;

      endpoint = `/${mediaType}/popular`;
      break;

    case KIND.TOP_RATED:
      typePrefix = `${mediaType}/${KIND.TOP_RATED}`;

      endpoint = `/${mediaType}/top_rated`;
      break;
  }

  return createAsyncThunk(
    typePrefix,
    async (
      page: number,
      { signal }
    ): Promise<{
      mediaType: MediaType;
      shows: MediaGeneralInformation[];
      page: number;
      totalPages: number;
    }> => {
      const { data: fetched } = await axios.get<
        never,
        AxiosResponse<MediaKindResponse>
      >(endpoint, {
        params: {
          page,
        },
        signal,
      });

      // Cherry pick data returned from API to be return type compliant.
      const shows = fetched.results.map((_show): MediaGeneralInformation => {
        const { id, backdrop_path, vote_average } = _show;

        // NOTE: popular and top_rated endpoints
        // don't return data with a `media_type`.
        return {
          id,
          backdrop_path,
          vote_average,
          media_type: mediaType,
          name: mediaType === "tv" ? _show.name : _show.title,
          release_date:
            mediaType === "tv" ? _show.first_air_date : _show.release_date,
        };
      });

      return {
        mediaType,
        shows,
        page: fetched.page,
        totalPages: fetched.total_pages,
      };
    }
  );
};
export const fetchMediaByKindAndType: Record<KIND, any> = {
  [KIND.TRENDING]: (mediaType: MediaType) =>
    createFetchMediaByKindAndTypeThunk(mediaType, KIND.TRENDING),
  [KIND.POPULAR]: (mediaType: MediaType) =>
    createFetchMediaByKindAndTypeThunk(mediaType, KIND.POPULAR),
  [KIND.TOP_RATED]: (mediaType: MediaType) =>
    createFetchMediaByKindAndTypeThunk(mediaType, KIND.TOP_RATED),
};

export const fetchMediaById = createAsyncThunk(
  "fetchMediaById",
  async (
    { mediaType, mediaId }: { mediaType: MediaType; mediaId: number },
    { signal }
  ): Promise<MediaSpecificInformation> => {
    // Fetch for (more) (tv show | movie) details
    const { data: _mediaDetails } = await axios.get<
      never,
      AxiosResponse<TvDetailsResponse | MovieDetailsResponse>
    >(`/${mediaType}/${mediaId}`, {
      signal,
    });

    // Cherry pick data returned from API to be return type compliant.
    const {
      id,
      backdrop_path,
      vote_average,
      overview,
      genres,
      original_language,
    } = _mediaDetails;

    const mediaDetails = {
      id,

      name: mediaType === "tv" ? _mediaDetails.name : _mediaDetails.title,
      backdrop_path,
      vote_average,

      release_date:
        mediaType === "tv"
          ? _mediaDetails.first_air_date
          : _mediaDetails.release_date,

      overview,
      genres,
      original_language,
      media_type: mediaType,

      run_time:
        mediaType === "tv"
          ? _mediaDetails.episode_run_time
          : [_mediaDetails.runtime],

      // Properties for TV shows only
      networks: mediaType === "tv" ? _mediaDetails.networks : undefined,

      number_of_seasons:
        mediaType === "tv" ? _mediaDetails.number_of_seasons : undefined,

      next_episode_to_air:
        mediaType === "tv" ? _mediaDetails.next_episode_to_air : undefined,

      origin_country:
        mediaType === "tv" ? _mediaDetails.origin_country : undefined,
    };

    // Fetch for (tv show | movie)'s images (e.g., logo(s))
    const { data: mediaImages } = await axios.get<
      never,
      AxiosResponse<ImagesResponse>
    >(`/${mediaType}/${mediaId}/images`);

    const { logos } = mediaImages;

    // Fetch for tv show's content rating
    // NOTE: TMDB API doesn't return the
    // content rating for movies... or such
    // documentation indicating otherwise does
    // not exist.
    if (mediaType === "tv") {
      const { data: showContentRatings } = await axios.get<
        never,
        AxiosResponse<TvContentRatingsResponse>
      >(`/tv/${mediaId}/content_ratings`);

      // Extract only US rating for now
      var content_rating = showContentRatings.results.find(
        (rating) => rating.iso_3166_1 === "US"
      );
    }

    return {
      ...mediaDetails,

      logos,

      content_rating,

      // Initialize empty object for seasons
      // to be filled in when seasons API
      // endpoint is queried.
      seasons: {},
    };
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

export const fetchMediaSupplementalVideos = createAsyncThunk(
  "fetchMediaSupplementalVideos",
  async (
    { mediaType, mediaId }: { mediaType: MediaType; mediaId: number },
    { signal }
  ) => {
    const { data: fetched } = await axios.get<
      never,
      AxiosResponse<VideosResponse>
    >(`/${mediaType}/${mediaId}/videos`, { signal });

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

    return { mediaType, mediaId, supplementalVideos };
  }
);

export const fetchMediaSimilarShows = createAsyncThunk(
  "tv-shows/fetchMediaSimilarShows",
  async (
    { mediaType, mediaId }: { mediaType: MediaType; mediaId: number },
    { signal }
  ) => {
    const {
      data: { results: fetchedSimilarShows },
    } = await axios.get<never, AxiosResponse<MediaKindResponse>>(
      `/${mediaType}/${mediaId}/similar`,
      {
        signal,
      }
    );

    // Cherry pick data returned from API to be return type compliant.
    const similarShows = fetchedSimilarShows.map(
      (_show): MediaGeneralInformation => {
        const { id, backdrop_path, vote_average } = _show;

        return {
          id,
          backdrop_path,
          vote_average,
          media_type: mediaType,
          name: mediaType === "tv" ? _show.name : _show.title,
          release_date:
            mediaType === "tv" ? _show.first_air_date : _show.release_date,
        };
      }
    );

    return { mediaType, mediaId, similarShows };
  }
);
