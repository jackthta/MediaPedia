import { Link } from "react-router-dom";
import { Fragment } from "react";

import { useSelector } from "../../redux/store/hooks";
import { selectShowsByKind } from "../../redux/slices/media/selectors";
import { KIND } from "../../utilities/enum";

import MediaCard from "../media-card/MediaCard";

import TrendingSVG from "../SVGs/TrendingSVG";
import FireSVG from "../SVGs/FireSVG";
import TopRatedSVG from "../SVGs/TopRatedSVG";
import ChevronRightSVG from "../SVGs/ChevronRightSVG";

import type { MediaType } from "../../redux/slices/media/types";

import CSS from "./MediaSection.module.scss";

type Props = {
  mediaType: MediaType;
  kind: KIND;
};

function MediaSection({ mediaType, kind }: Props) {
  const shows = useSelector((state) =>
    // Only want 10 shows, don't need the whole list.
    selectShowsByKind(state, mediaType, kind).slice(0, 10)
  );

  let Heading;
  switch (kind) {
    case KIND.TRENDING:
      Heading = (
        <>
          <span>Trending</span>
          <TrendingSVG />
        </>
      );
      break;
    case KIND.POPULAR:
      Heading = (
        <>
          <span>Popular</span>
          <FireSVG />
        </>
      );
      break;
    case KIND.TOP_RATED:
      Heading = (
        <>
          <span>Top Rated</span>
          <TopRatedSVG />
        </>
      );
      break;
  }

  // Only eagerly load first three show backdrops for LCP;
  // lazy load the rest.
  const Shows = shows.map((show, index) => {
    return (
      <Fragment key={show.id}>
        <MediaCard show={show} loading={index >= 3 ? "lazy" : "eager"} />
      </Fragment>
    );
  });

  return (
    <section data-test="media-section">
      <header className={CSS.header}>
        <h2 className={CSS.heading}>{Heading}</h2>

        <Link className={CSS.seeAllLink} to={`${kind}`}>
          <span>See all</span>
          <ChevronRightSVG />
        </Link>
      </header>

      <div className={CSS.shows} data-test="media-section-shows">{Shows}</div>
    </section>
  );
}

export default MediaSection;
