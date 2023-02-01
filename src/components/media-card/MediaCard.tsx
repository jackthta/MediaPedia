import { useNavigate } from "react-router-dom";

import { useSelector } from "../../redux/store/hooks";
import { selectTmdbConfiguration } from "../../redux/slices/tmdb-configuration";
import { generateImgSrcsetDimensions } from "../../utilities/image";
import { BREAKPOINT, ROUTES } from "../../utilities/enum";

import MediaBadge from "./media-badge/MediaBadge";
import MediaRating from "./media-rating/MediaRating";
import CardImage from "../card-image/CardImage";

import type { TvShowGeneralInformation } from "../../redux/slices/tv-shows/types";

import CSS from "./MediaCard.module.scss";

import notFoundSVG from "../../assets/svgs/404.svg";

type Props = {
  show: TvShowGeneralInformation;

  // Lazy loading for images
  loading?: "lazy" | "eager";

  // Last element hook for infinite scrolling
  dataLast?: boolean | null;

  // Rest props
  [attribute: string]: any;
};

function MediaCard({ show, loading, dataLast }: Props) {
  const navigate = useNavigate();
  const { secure_base_url, backdrop_sizes } = useSelector(
    selectTmdbConfiguration
  );

  const hasBackdropPath =
    show.backdrop_path != null && show.backdrop_path.length > 0;
  const CSS_backdrop = `${!hasBackdropPath && CSS.placeholderBackdrop}`;

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

  const navigateToShowDetails = () =>
    navigate(`${ROUTES.TV_SHOW.replace(":id", show.id.toString())}`);

  return (
    <button
      className={CSS.container}
      data-last={dataLast}
      onClick={navigateToShowDetails}
    >
      <CardImage
        className={CSS_backdrop}
        src={image.defaultSrc}
        srcSet={image.srcset}
        sizes={image.sizes}
        width="300"
        height="169"
        alt=""
        loading={loading}
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
