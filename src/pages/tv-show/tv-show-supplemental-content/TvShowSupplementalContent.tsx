import { useEffect } from "react";

import { fetchTvShowSupplementalVideos } from "../../../redux/slices/tv-shows/thunks";
import { selectTvShowSupplementalVideos } from "../../../redux/slices/tv-shows/selectors";
import { useDispatch, useSelector } from "../../../redux/store/hooks";

import SupplementalMediaCard from "./supplemental-media-card/SupplementalMediaCard";
import Separator from "../../../components/separator/Separator";

import type {
  ContentRating,
  Images,
  Seasons,
  SupplementalVideos,
  TvShowSpecificInformation,
} from "../../../utilities/axios/types";

import CSS from "./TvShowSupplementalContent.module.scss";

type Props = {
  show: TvShowSpecificInformation &
    Images &
    ContentRating &
    Seasons &
    SupplementalVideos;
};

function TvShowSupplementalContent({ show }: Props) {
  const dispatch = useDispatch();
  const supplementalVideos = useSelector((state) =>
    selectTvShowSupplementalVideos(state, show.id)
  );

  // Fetch supplemental videos if it doesn't
  // exist in the cache.
  useEffect(() => {
    if (supplementalVideos == null) {
      var fetch = dispatch(fetchTvShowSupplementalVideos(show.id));
    }

    return () => fetch.abort();
  }, []);

  if (!supplementalVideos?.length) return null;

  const Trailers = supplementalVideos
    .filter((video) => video.type === "Trailer")
    .map((trailer, index) => (
      <SupplementalMediaCard
        key={trailer.key}
        media={trailer}
        loading={index > 2 ? "lazy" : "eager"}
      />
    ));

  const OtherContent = supplementalVideos
    .filter((video) => video.type !== "Trailer")
    .map((video, index) => (
      <SupplementalMediaCard
        key={video.key}
        media={video}
        loading={index > 2 ? "lazy" : "eager"}
      />
    ));

  return (
    <>
      <section className={CSS.section}>
        <h4 className={CSS.heading}>Trailers</h4>
        <div className={CSS.list}>{Trailers}</div>
      </section>

      <Separator />

      <section className={CSS.section}>
        <h4 className={CSS.heading}>Other Content</h4>
        <div className={CSS.list}>{OtherContent}</div>
      </section>
    </>
  );
}

export default TvShowSupplementalContent;
