import MediaBadge from "./media-badge/MediaBadge";
import MediaRating from "./media-rating/MediaRating";

import type { TvShowInformation } from "../../utilities/axios/types";

import CSS from "./MediaCard.module.scss";

import notFoundSVG from "../../assets/svgs/404.svg";

type Props = {
  show: TvShowInformation;
};

function MediaCard({ show, ...rest }: Props) {
  const hasBackdropPath =
    show.backdrop_path != null && show.backdrop_path.length > 0;
  const CSS_backdrop = `${CSS.backdrop} ${
    !hasBackdropPath && CSS.placeholderBackdrop
  }`;

  const hasDebutYear = show.first_air_date.length > 0;
  const debutYear = hasDebutYear
    ? new Date(show.first_air_date).getFullYear()
    : "?";

  const hasRating = show.vote_average > 0;
  const rating = hasRating ? show.vote_average : "?";

  // TODO: Look for all supported width sizes from TMDB docs
  // for responsive imaging (in the Example tab in the below link).

  // Image URL formula:
  // https://developers.themoviedb.org/3/configuration/get-api-configuration
  const imageUrl = hasBackdropPath
    ? `${import.meta.env.VITE_TMDB_IMAGE_BASE_URL}/w500${show.backdrop_path}`
    : notFoundSVG;

  return (
    <button className={CSS.container} {...rest}>
      <img className={CSS_backdrop} src={imageUrl} alt="" />
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
