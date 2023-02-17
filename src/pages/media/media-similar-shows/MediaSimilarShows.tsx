import { useEffect } from "react";

import { fetchMediaSimilarShows } from "../../../redux/slices/media/thunks";
import { selectSimilarShows } from "../../../redux/slices/media/selectors";
import { useDispatch, useSelector } from "../../../redux/store/hooks";

import MediaCard from "../../../components/media-card/MediaCard";
import Separator from "../../../components/separator/Separator";

import type { MediaSpecificInformation } from "../../../redux/slices/media/types";

import CSS from "./MediaSimilarShows.module.scss";

type Props = {
  show: MediaSpecificInformation;
};

function MediaSimilarShows({ show }: Props) {
  const dispatch = useDispatch();
  const similarShows = useSelector((state) =>
    selectSimilarShows(state, show.media_type, show.id)
  );

  // Fetch similar shows if it hasn't
  // been fetched and cached.
  useEffect(() => {
    if (similarShows == null) {
      var fetch = dispatch(
        fetchMediaSimilarShows({ mediaType: show.media_type, mediaId: show.id })
      );
    }

    return () => fetch && fetch.abort();
  }, []);

  if (!similarShows) return null;

  const SimilarShows = similarShows
    .slice(0, 10)
    .map((show, index) => (
      <MediaCard
        key={show.id}
        show={show}
        loading={index > 2 ? "lazy" : "eager"}
      />
    ));

  return (
    <>
      {SimilarShows.length > 0 && (
        <>
          <section className={CSS.section} aria-label="Similar Shows" data-test="media-similar-shows">
            <h4 className={CSS.heading}>Similar Shows</h4>
            <div className={CSS.list}>{SimilarShows}</div>
          </section>

          <Separator />
        </>
      )}
    </>
  );
}

export default MediaSimilarShows;
