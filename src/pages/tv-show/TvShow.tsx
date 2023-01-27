import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useSelector, useDispatch } from "../../redux/store/hooks";
import { fetchTvShowById } from "../../redux/slices/tv-shows/tv-shows";
import { selectCachedShowById } from "../../redux/slices/tv-shows/selectors";

import TvShowOverview from "./tv-show-overview/TvShowOverview";
import TvShowInformation from "./tv-show-information/TvShowInformation";
import TvShowSeasonSection from "./tv-show-season-section/TvShowSeasonSection";
import TvShowSupplementalContent from "./tv-show-supplemental-content/TvShowSupplementalContent";
import TvShowSimilarShows from "./tv-show-similar-shows/TvShowSimilarShows";
import Separator from "../../components/separator/Separator";

import BaseLayout from "../../layouts/base-layout/BaseLayout";

import CSS from "./TvShow.module.scss";

function TvShow() {
  const { id: _id } = useParams();
  const id = +_id!;
  const dispatch = useDispatch();

  // Grab show details from cache if it exists.
  const show = useSelector((state) => selectCachedShowById(state, id));

  // If show doesn't exist in cache, dispatch action to fetch it.
  useEffect(() => {
    if (!show) var fetch = dispatch(fetchTvShowById(id));

    return () => fetch.abort();
  }, []);

  if (!show) return null;

  return (
    <BaseLayout>
      <main>
        {/* Backdrop section */}
        <TvShowOverview show={show} />

        {/* Show Information */}
        <TvShowInformation show={show} />

        <Separator />

        {/* Show Seasons */}
        <TvShowSeasonSection show={show} />

        <Separator />

        {/* Show Trailers/Other Media Content */}
        <TvShowSupplementalContent show={show} />

        <Separator />

        {/* Similar Shows */}
        {/* Optimization: Use IntersectionObserver to fetch similar shows only when
      user scrolls far enough down to see Trailers? */}
        <TvShowSimilarShows show={show} />

        <Separator />
      </main>
    </BaseLayout>
  );
}

export default TvShow;
