import { useEffect } from "react";

import { useDispatch, useSelector } from "../../redux/store/hooks";
import {
  clearShowsCache,
  fetchTrending,
  fetchPopular,
  fetchTopRated,
} from "../../redux/slices/tv-show";
import { KIND } from "../../utilities/enum";
import { elapsedOneHour } from "../../utilities/date";

import Separator from "../../components/separator/Separator";
import MediaSection from "../../components/media-section/MediaSection";

import BaseLayout from "../../layouts/base-layout/BaseLayout";

import CSS from "./TvShows.module.scss";

function TvShows() {
  const dispatch = useDispatch();

  const tv = useSelector((state) => state.tvShows);

  // Initial fetch or refreshing data every hour
  // from initial/subsequent fetch.
  useEffect(() => {
    if (
      tv.trending.lastFetch == null ||
      elapsedOneHour(tv.trending.lastFetch)
    ) {
      dispatch(fetchTrending(1));
      dispatch(clearShowsCache());
    }

    if (tv.popular.lastFetch == null || elapsedOneHour(tv.popular.lastFetch)) {
      dispatch(fetchPopular(1));
      dispatch(clearShowsCache());
    }

    if (
      tv.topRated.lastFetch == null ||
      elapsedOneHour(tv.topRated.lastFetch)
    ) {
      dispatch(fetchTopRated(1));
      dispatch(clearShowsCache());
    }
  }, []);

  return (
    <BaseLayout>
      <h1 className={CSS.heading}>TV Shows</h1>

      <Separator className={CSS.separator} />

      <MediaSection kind={KIND.TRENDING} />

      <Separator className={CSS.separator} />

      <MediaSection kind={KIND.POPULAR} />

      <Separator className={CSS.separator} />

      <MediaSection kind={KIND.TOP_RATED} />

      <Separator className={CSS.separator} />
    </BaseLayout>
  );
}

export default TvShows;
