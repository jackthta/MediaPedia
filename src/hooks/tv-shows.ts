import { useEffect } from "react";

import { useDispatch, useSelector } from "../redux/store/hooks";
import {
  fetchTrending,
  fetchPopular,
  fetchTopRated,
  clearShowsCache,
} from "../redux/slices/tv-show";
import { elapsedOneHour } from "../utilities/date";

export const useRefreshTvShows = () => {
  const dispatch = useDispatch();

  const tvShows = useSelector((state) => state.tvShows);

  // Initial fetch or refreshing data every hour
  // from initial/subsequent fetch.
  useEffect(() => {
    if (
      tvShows.trending.lastFetch == null ||
      elapsedOneHour(tvShows.trending.lastFetch)
    ) {
      dispatch(fetchTrending(1));
      dispatch(clearShowsCache());
    }

    if (
      tvShows.popular.lastFetch == null ||
      elapsedOneHour(tvShows.popular.lastFetch)
    ) {
      dispatch(fetchPopular(1));
      dispatch(clearShowsCache());
    }

    if (
      tvShows.topRated.lastFetch == null ||
      elapsedOneHour(tvShows.topRated.lastFetch)
    ) {
      dispatch(fetchTopRated(1));
      dispatch(clearShowsCache());
    }
  }, []);
};
