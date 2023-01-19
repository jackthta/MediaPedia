import { useSelector } from "../../redux/store/hooks";
import { selectTmdbConfiguration } from "../../redux/slices/tmdb-configuration";
import { generateImgSrcsetDimensions } from "../../utilities/image";
import { BREAKPOINT } from "../../utilities/enum";

import MediaBadge from "./media-badge/MediaBadge";
import MediaRating from "./media-rating/MediaRating";

import type { TvShowInformation } from "../../utilities/axios/types";

import CSS from "./MediaCard.module.scss";

import notFoundSVG from "../../assets/svgs/404.svg";

type Props = {
  show: TvShowInformation;
};

function MediaCard({ show, ...rest }: Props) {
  const { secure_base_url, backdrop_sizes } = useSelector(
    selectTmdbConfiguration
  );

  const hasBackdropPath =
    show.backdrop_path != null && show.backdrop_path.length > 0;
  const CSS_backdrop = `${CSS.backdrop} ${
    !hasBackdropPath && CSS.placeholderBackdrop
  }`;

  let image: {
    srcset: string;
    defaultSrc: string;
    sizes: string;
  } = {
    srcset: "",
    defaultSrc: "",
    sizes: "",
  };
  if (hasBackdropPath) {
    image = {
      ...image,
      ...generateImgSrcsetDimensions(
        secure_base_url,
        backdrop_sizes,
        show.backdrop_path!
      ),
      sizes: `(min-width: ${BREAKPOINT.TABLET}) 50vw, (min-width: ${BREAKPOINT.DESKTOP}) 33vw, 100vw`,
    };
  } else {
    image.defaultSrc = notFoundSVG;
  }

  const hasDebutYear = show.first_air_date.length > 0;
  const debutYear = hasDebutYear
    ? new Date(show.first_air_date).getFullYear()
    : "?";

  const hasRating = show.vote_average > 0;
  const rating = hasRating ? show.vote_average : "?";

  return (
    <button className={CSS.container} {...rest}>
      <img
        className={CSS_backdrop}
        src={image.defaultSrc}
        srcSet={image.srcset}
        sizes={image.sizes}
        width="300"
        height="169"
        alt=""
      />
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
