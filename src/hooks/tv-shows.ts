import { useEffect } from "react";

import { useDispatch, useSelector } from "../redux/store/hooks";
import { fetchTvShows, clearShowsCache } from "../redux/slices/tv-shows/tv-shows";
import { elapsedOneHour } from "../utilities/date";
import { KIND } from "../utilities/enum";

import type { TvShowsState } from "../redux/slices/tv-shows/tv-shows";

const isReadyToRefresh = (kind: KIND, tvShows: TvShowsState) => {
  return (
    tvShows[kind].lastFetch == null || elapsedOneHour(tvShows[kind].lastFetch!)
  );
};

const dispatchRefresh = (kind: KIND, tvShows: TvShowsState, dispatch: any) => {
  // This switch is needed to filter out `showsCache`
  switch (kind) {
    case KIND.TRENDING:
    case KIND.POPULAR:
    case KIND.TOP_RATED:
      if (isReadyToRefresh(kind, tvShows)) {
        dispatch(clearShowsCache());
        return dispatch(fetchTvShows[kind](1));
      }
      break;

    default:
      break;
  }
};

export const useRefreshTvShows = (kind?: KIND) => {
  const dispatch = useDispatch();
  const fetches: any[] = [];

  const tvShows = useSelector((state) => state.tvShows);

  // Initial fetch or refreshing data every hour
  // from initial/subsequent fetch.
  useEffect(() => {
    if (kind != null) fetches.push(dispatchRefresh(kind, tvShows, dispatch));
    // `kind` wasn't passed in, so dispatch a fetch for every `kind`
    else
      for (const tvKind in tvShows)
        fetches.push(dispatchRefresh(tvKind as KIND, tvShows, dispatch));

    return () => fetches.forEach((fetch) => fetch && fetch.abort());
  }, []);
};
