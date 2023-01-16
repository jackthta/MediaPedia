import type { TvShowInformation } from "../../utilities/axios/types";

import MediaBadge from "./media-badge/MediaBadge";
import MediaRating from "./media-rating/MediaRating";

import CSS from "./MediaCard.module.scss";

type Props = {
  show: TvShowInformation;
};

function MediaCard({ show }: Props) {
  // TODO: Add placeholder backdrop for this case.
  const hasBackdropPath =
    show.backdrop_path != null && show.backdrop_path.length > 0;
  if (!hasBackdropPath) return null;

  // TODO: Look for all supported width sizes from TMDB docs
  // for responsive imaging (in the Example tab in the below link).

  const hasDebutYear = show.first_air_date.length > 0;
  const debutYear = hasDebutYear
    ? new Date(show.first_air_date).getFullYear()
    : "?";

  const hasRating = show.vote_average > 0;
  const rating = hasRating ? show.vote_average : "?";

  // Image URL formula:
  // https://developers.themoviedb.org/3/configuration/get-api-configuration
  const imageUrl = `${import.meta.env.VITE_TMDB_IMAGE_BASE_URL}/w500${
    show.backdrop_path
  }`;

  return (
    <button className={CSS.container}>
      <img className={CSS.backdrop} src={imageUrl} alt="" />
      <div className={CSS.info}>
        <p className={CSS.mediaName}>{show.name}</p>

        <div className={CSS.supplementalInfo}>
          <p className={CSS.debutYear}>{debutYear}</p>
          <MediaBadge mediaType={show.media_type} />
          <MediaRating rating={rating} />
        </div>
      </div>
    </button>
  );
}

export default MediaCard;
