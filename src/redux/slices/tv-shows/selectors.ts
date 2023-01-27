import { KIND } from "../../../utilities/enum";

import type { RootState } from "../../store";

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
