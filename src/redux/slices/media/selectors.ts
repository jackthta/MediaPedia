import { KIND } from "../../../utilities/enum";

import type { RootState } from "../../store";
import type { MediaType } from "./types";

export const selectShowsByKind = (
  { media }: RootState,
  mediaType: MediaType,
  kind: KIND
) => media[mediaType][kind].shows;

export const selectPageByKind = (
  { media }: RootState,
  mediaType: MediaType,
  kind: KIND
) => media[mediaType][kind].page;

export const selectCachedShowById = (
  { media }: RootState,
  mediaType: MediaType,
  mediaId: number
) => media[mediaType].cache[mediaId];

export const selectTvShowSeasons = ({ media }: RootState, tvId: number) =>
  media.tv.cache[tvId].seasons;

export const selectTvShowSeason = (
  { media }: RootState,
  tvId: number,
  season: number
) => media.tv.cache[tvId].seasons[season];

export const selectSupplementalVideos = (
  { media }: RootState,
  mediaType: MediaType,
  mediaId: number
) => media[mediaType].cache[mediaId].supplemental_videos;

export const selectSimilarShows = (
  { media }: RootState,
  mediaType: MediaType,
  mediaId: number
) => media[mediaType].cache[mediaId].similar_shows;
