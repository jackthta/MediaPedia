import { useEffect } from "react";

import { useDispatch, useSelector } from "../redux/store/hooks";
import {
  fetchTrending,
  fetchPopular,
  fetchTopRated,
  clearShowsCache,
} from "../redux/slices/tv-show";
import { elapsedOneHour } from "../utilities/date";
import { KIND } from "../utilities/enum";

import type { TvShowsState } from "../redux/slices/tv-show";

const isReadyToRefresh = (kind: KIND, tvShows: TvShowsState) => {
  return (
    tvShows[kind].lastFetch == null || elapsedOneHour(tvShows[kind].lastFetch!)
  );
};

const dispatchRefresh = (kind: KIND, tvShows: TvShowsState, dispatch: any) => {
  switch (kind) {
    case KIND.TRENDING:
      {
        if (isReadyToRefresh(kind, tvShows)) {
          dispatch(fetchTrending(1));
          dispatch(clearShowsCache());
        }
      }
      break;
    case KIND.POPULAR:
      {
        if (isReadyToRefresh(kind, tvShows)) {
          dispatch(fetchPopular(1));
          dispatch(clearShowsCache());
        }
      }
      break;

    case KIND.TOP_RATED:
      {
        if (isReadyToRefresh(kind, tvShows)) {
          dispatch(fetchTopRated(1));
          dispatch(clearShowsCache());
        }
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
    if (kind != null) dispatchRefresh(kind, tvShows, dispatch);
    // `kind` wasn't passed in, so check every `kind`
    else
      for (const tvKind in tvShows)
        dispatchRefresh(tvKind as KIND, tvShows, dispatch);
  }, []);
};
