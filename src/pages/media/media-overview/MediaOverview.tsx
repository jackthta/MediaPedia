import { useEffect, useRef, useState } from "react";
import throttle from "lodash.throttle";

import { useSelector } from "../../../redux/store/hooks";
import { selectTmdbConfiguration } from "../../../redux/slices/tmdb-configuration";
import { generateImgSrcsetDimensions } from "../../../utilities/image";
import { BREAKPOINT } from "../../../utilities/enum";

import type { MediaSpecificInformation } from "../../../redux/slices/media/types";

import CSS from "./MediaOverview.module.scss";

type Props = {
  show: MediaSpecificInformation;
};

function MediaOverview({ show }: Props) {
  const { secure_base_url: imgBaseUrl, backdrop_sizes: backdropSizes } =
    useSelector(selectTmdbConfiguration);
  const overviewRef = useRef<HTMLDivElement | null>(null);
  const [overviewExpanded, setOverviewExpanded] = useState(false);

  const CSS_overview = `${CSS.overview} ${
    !overviewExpanded && CSS.unexpandedOverview
  }`;

  const backdropBackgroundImageUrl = `url(${imgBaseUrl}${
    backdropSizes.url.slice(-1)[0]
  }${show.backdrop_path})`;

  const logoFilePath = show.logos.filter((logo) => logo.file_path != null)[0];
  const logoImage = generateImgSrcsetDimensions(
    imgBaseUrl,
    backdropSizes,
    logoFilePath?.file_path
  );
  const logoImageSizes = `(min-width: ${BREAKPOINT.DESKTOP}) 40vw, 70vw `;

  const handleExpandOverview = () => setOverviewExpanded(true);

  const MoreButton = !overviewExpanded && (
    <button className={CSS.moreButton} onClick={handleExpandOverview}>
      More
    </button>
  );

  // Don't show `MORE` button if overview doesn't overflow.
  useEffect(() => {
    if (overviewRef.current && !isElementOverflow(overviewRef.current))
      setOverviewExpanded(true);
  });

  // Edge case – Check for overview overflow on resize
  // If overview overflows on mobile (and has `MORE`
  // button), but doesn't on tablet or desktop, the latter
  // views will have the `MORE` button when it doesn't make
  // sense to (after resizing).
  useEffect(() => {
    const checkOverviewOverflow = throttle(() => {
      if (overviewRef.current && !isElementOverflow(overviewRef.current))
        setOverviewExpanded(true);
    }, 150);

    addEventListener("resize", checkOverviewOverflow);

    // Remove "resize" event listener the moment
    // `overviewExpanded` is true. Don't need to
    // listen for "resize" event after that point.
    if (overviewExpanded) removeEventListener("resize", checkOverviewOverflow);

    return () => removeEventListener("resize", checkOverviewOverflow);
  }, [overviewExpanded]);

  if (!imgBaseUrl) return null;

  return (
    <div
      className={CSS.backdrop}
      style={{
        backgroundImage: backdropBackgroundImageUrl,
      }}
    >
      {/* Show Logo */}
      {logoFilePath != null ? (
        <img
          className={CSS.logo}
          src={logoImage.defaultSrc}
          srcSet={logoImage.srcset}
          sizes={logoImageSizes}
          alt={`${show.name} logo`}
          data-test="media-logo"
        />
      ) : (
        <p className={`${CSS.logo} ${CSS.placeholderLogo}`}>{show.name}</p>
      )}

      <div className={CSS.blur}>
        {/* Show Overview */}
        <div className={CSS.overviewContainer}>
          <p
            className={CSS_overview}
            ref={overviewRef}
            aria-label="Synopsis"
            data-test="media-synopsis"
          >
            {show.overview}
          </p>

          {MoreButton}
        </div>
      </div>
    </div>
  );
}

// Source: https://stackoverflow.com/a/21064102
function isElementOverflow(element: HTMLElement) {
  return element.clientHeight < element.scrollHeight;
}

export default MediaOverview;
