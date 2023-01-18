import { useEffect } from "react";

import { useDispatch, useSelector } from "../redux/store/hooks";
import { fetchTvShows, clearShowsCache } from "../redux/slices/tv-show";
import { elapsedOneHour } from "../utilities/date";
import { KIND } from "../utilities/enum";

import type { TvShowsState } from "../redux/slices/tv-show";

const isReadyToRefresh = (kind: KIND, tvShows: TvShowsState) => {
  return (
    tvShows[kind].lastFetch == null || elapsedOneHour(tvShows[kind].lastFetch!)
  );
};

const dispatchRefresh = (
  kind: KIND,
  tvShows: TvShowsState,
  dispatch: any,
  controller: AbortController
) => {
  // This switch is needed to filter out `showsCache`
  switch (kind) {
    case KIND.TRENDING:
    case KIND.POPULAR:
    case KIND.TOP_RATED:
      if (isReadyToRefresh(kind, tvShows)) {
        dispatch(fetchTvShows[kind](1, controller));
        dispatch(clearShowsCache());
      }
      break;

    default:
      break;
  }
};

export const useRefreshTvShows = (kind?: KIND) => {
  const dispatch = useDispatch();

  const tvShows = useSelector((state) => state.tvShows);

  // Initial fetch or refreshing data every hour
  // from initial/subsequent fetch.
  useEffect(() => {
    const controller = new AbortController();

    if (kind != null) dispatchRefresh(kind, tvShows, dispatch, controller);
    // `kind` wasn't passed in, so dispatch a fetch for every `kind`
    else
      for (const tvKind in tvShows)
        dispatchRefresh(tvKind as KIND, tvShows, dispatch, controller);

    return () => controller.abort();
  }, []);
};
