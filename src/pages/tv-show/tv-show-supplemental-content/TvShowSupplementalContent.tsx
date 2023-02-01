import { useEffect } from "react";

import { fetchTvShowSupplementalVideos } from "../../../redux/slices/tv-shows/thunks";
import { selectTvShowSupplementalVideos } from "../../../redux/slices/tv-shows/selectors";
import { useDispatch, useSelector } from "../../../redux/store/hooks";

import SupplementalMediaCard from "./supplemental-media-card/SupplementalMediaCard";
import Separator from "../../../components/separator/Separator";

import type { TvShowSpecificInformation } from "../../../redux/slices/tv-shows/types";

import CSS from "./TvShowSupplementalContent.module.scss";

type Props = {
  show: TvShowSpecificInformation;
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

    return () => fetch && fetch.abort();
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
      {/* Only show "Trailers" section if there are trailers to show */}
      {Trailers.length > 0 && (
        <>
          <section className={CSS.section}>
            <h4 className={CSS.heading}>Trailers</h4>
            <div className={CSS.list}>{Trailers}</div>
          </section>

          <Separator />
        </>
      )}

      {/* Only show "Other Content" section if there is other content to show */}
      {OtherContent.length > 0 && (
        <>
          <section className={CSS.section}>
            <h4 className={CSS.heading}>Other Content</h4>
            <div className={CSS.list}>{OtherContent}</div>
          </section>

          <Separator />
        </>
      )}
    </>
  );
}

export default TvShowSupplementalContent;
