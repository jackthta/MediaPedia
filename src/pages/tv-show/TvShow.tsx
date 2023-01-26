import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useSelector, useDispatch } from "../../redux/store/hooks";
import {
  fetchTvShowById,
  selectCachedShowById,
} from "../../redux/slices/tv-show";

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

  useEffect(() => {
    // If show doesn't exist in cache, dispatch action to fetch it.
    if (!show) dispatch(fetchTvShowById(id));
  }, []);

  if (!show) return null;

  return (
    <BaseLayout>
      <main className={CSS.main}>
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

        {/* Similar Shows */}
        {/* Optimization: Use IntersectionObserver to fetch similar shows only when
      user scrolls far enough down to see Trailers? */}
        <TvShowSimilarShows show={show} />
      </main>
    </BaseLayout>
  );
}

export default TvShow;
