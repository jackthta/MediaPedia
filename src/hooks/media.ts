import { useEffect } from "react";

import { useDispatch, useSelector } from "../redux/store/hooks";
import { fetchMediaByKindAndType } from "../redux/slices/media/thunks";
import { clearShowsCache } from "../redux/slices/media/media";
import { elapsedOneHour } from "../utilities/date";
import { KIND } from "../utilities/enum";

import type { KindState, MediaType } from "../redux/slices/media/types";

const isReadyToRefresh = (kind: KIND, kinds: KindState) => {
  return (
    kinds[kind].lastFetch == null || elapsedOneHour(kinds[kind].lastFetch!)
  );
};

const dispatchRefresh = (
  mediaType: MediaType,
  kind: KIND,
  kinds: KindState,
  dispatch: any
) => {
  // This switch is needed to filter out `showsCache`
  switch (kind) {
    case KIND.TRENDING:
    case KIND.POPULAR:
    case KIND.TOP_RATED:
      if (isReadyToRefresh(kind, kinds)) {
        dispatch(clearShowsCache(mediaType));
        return dispatch(fetchMediaByKindAndType[kind](mediaType)(1));
      }
      break;

    default:
      break;
  }
};

export const useRefreshTvShows = (mediaType: MediaType, kind?: KIND) => {
  const dispatch = useDispatch();
  const fetches: any[] = [];

  const kinds = useSelector(({ media }) => media[mediaType]);

  // Initial fetch or refreshing data every hour
  // from initial/subsequent fetch.
  useEffect(() => {
    if (kind != null)
      fetches.push(dispatchRefresh(mediaType, kind, kinds, dispatch));
    // `kind` wasn't passed in, so dispatch a fetch for every `kind`
    else
      for (const kind in kinds)
        fetches.push(dispatchRefresh(mediaType, kind as KIND, kinds, dispatch));

    return () => fetches.forEach((fetch) => fetch && fetch.abort());
  }, [mediaType]);
};
