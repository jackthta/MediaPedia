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

// Possible enhancement: use matchMedia to determine viewport to programmatically
// set `background-images` to appropriate size.
function MediaOverview({ show }: Props) {
  const imageConfiguration = useSelector(selectTmdbConfiguration);
  const overviewRef = useRef<HTMLDivElement | null>(null);
  const [overviewExpanded, setOverviewExpanded] = useState(false);

  const CSS_overview = `${CSS.overview} ${
    !overviewExpanded && CSS.unexpandedOverview
  }`;

  // Possible enhancement: make backdrop image responsive.
  const backdropBackgroundImageUrl = `url(${
    imageConfiguration.secure_base_url
  }${imageConfiguration.backdrop_sizes.url.slice(-1)[0]}${show.backdrop_path})`;
  const logoImage = generateImgSrcsetDimensions(
    imageConfiguration.secure_base_url,
    imageConfiguration.backdrop_sizes,
    show.logos[0].file_path
  );
  const logoImageSizes = `(min-width: ${BREAKPOINT.TABLET}) 500px, (min-width: ${BREAKPOINT.DESKTOP}) 33vw, 100vw `;

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

  if (!imageConfiguration.secure_base_url) return null;

  return (
    <div
      className={CSS.backdrop}
      style={{
        backgroundImage: backdropBackgroundImageUrl,
      }}
    >
      {/* Show Logo */}
      <img
        className={CSS.logo}
        src={logoImage.defaultSrc}
        srcSet={logoImage.srcset}
        sizes={logoImageSizes}
        alt=""
      />

      <div className={CSS.blur}>
        {/* Show Overview */}
        <div className={CSS.overviewContainer}>
          <p className={CSS_overview} ref={overviewRef}>
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
