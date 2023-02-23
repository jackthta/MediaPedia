import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useSelector, useDispatch } from "../../redux/store/hooks";
import { fetchMediaById } from "../../redux/slices/media/thunks";
import { selectCachedShowById } from "../../redux/slices/media/selectors";

import MediaOverview from "./media-overview/MediaOverview";
import MediaInformation from "./media-information/MediaInformation";
import TvShowSeasonSection from "./tv-show-season-section/TvShowSeasonSection";
import MediaSupplementalContent from "./media-supplemental-content/MediaSupplementalContent";
import MediaSimilarShows from "./media-similar-shows/MediaSimilarShows";

import BaseLayout from "../../layouts/base-layout/BaseLayout";

import type { MediaType } from "../../redux/slices/media/types";

import CSS from "./Media.module.scss";

type Props = {
  mediaType: MediaType;
};

function Media({ mediaType }: Props) {
  const { id: _id } = useParams();
  const id = +_id!;
  const dispatch = useDispatch();

  // Grab show details from cache if it exists.
  const show = useSelector((state) =>
    selectCachedShowById(state, mediaType, id)
  );

  // If show doesn't exist in cache, dispatch action to fetch it.
  useEffect(() => {
    if (!show) var fetch = dispatch(fetchMediaById({ mediaType, mediaId: id }));

    return () => fetch && fetch.abort();
  }, [show]);

  if (!show) return null;

  return (
    <BaseLayout>
      <main>
        {/* Backdrop section */}
        <MediaOverview show={show} />

        {/* Show Information */}
        <MediaInformation show={show} />

        {/* Show Seasons */}
        {mediaType === "tv" && <TvShowSeasonSection show={show} />}

        {/* Show Trailers/Other Media Content */}
        <MediaSupplementalContent show={show} />

        {/* Similar Shows */}
        <MediaSimilarShows show={show} />
      </main>
    </BaseLayout>
  );
}

export default Media;
