import { useEffect } from "react";

import { fetchMediaSupplementalVideos } from "../../../redux/slices/media/thunks";
import { selectSupplementalVideos } from "../../../redux/slices/media/selectors";
import { useDispatch, useSelector } from "../../../redux/store/hooks";

import SupplementalMediaCard from "./supplemental-media-card/SupplementalMediaCard";
import Separator from "../../../components/separator/Separator";

import type { MediaSpecificInformation } from "../../../redux/slices/media/types";

import CSS from "./MediaSupplementalContent.module.scss";

type Props = {
  show: MediaSpecificInformation;
};

function MediaSupplementalContent({ show }: Props) {
  const dispatch = useDispatch();
  const supplementalVideos = useSelector((state) =>
    selectSupplementalVideos(state, show.media_type, show.id)
  );

  // Fetch supplemental videos if it doesn't
  // exist in the cache.
  useEffect(() => {
    if (supplementalVideos == null) {
      var fetch = dispatch(
        fetchMediaSupplementalVideos({
          mediaType: show.media_type,
          mediaId: show.id,
        })
      );
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
          <section className={CSS.section} aria-label="Trailers">
            <h4 className={CSS.heading}>Trailers</h4>
            <div className={CSS.list}>{Trailers}</div>
          </section>

          <Separator />
        </>
      )}

      {/* Only show "Other Content" section if there is other content to show */}
      {OtherContent.length > 0 && (
        <>
          <section className={CSS.section} aria-label="Other Content">
            <h4 className={CSS.heading}>Other Content</h4>
            <div className={CSS.list}>{OtherContent}</div>
          </section>

          <Separator />
        </>
      )}
    </>
  );
}

export default MediaSupplementalContent;
