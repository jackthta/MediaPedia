import { Fragment } from "react";

import { KIND } from "../../utilities/enum";
import { useInfiniteScrollShows } from "../../hooks/utility";

import MediaCard from "../../components/media-card/MediaCard";
import Separator from "../../components/separator/Separator";
import TrendingSVG from "../../components/SVGs/TrendingSVG";
import FireSVG from "../../components/SVGs/FireSVG";
import TopRatedSVG from "../../components/SVGs/TopRatedSVG";

import type {
  MediaGeneralInformation,
  MediaType,
} from "../../redux/slices/media/types";
import type { AsyncThunkAction } from "@reduxjs/toolkit";

import CSS from "./ShowResults.module.scss";
import EveryMediaKindCSS from "../../pages/every-media-kind/EveryMediaKind.module.scss";

type Props = {
  type: "media" | "search";
  shows: MediaGeneralInformation[];
  page: number;
  totalPages: number;
  action: AsyncThunkAction<any, any, any>;

  // Supplemental props for "media" type
  kind?: KIND;
  mediaType?: MediaType;

  // Supplemental prop for "search" type
  searchQuery?: string;
};

function ShowResults({
  type,
  shows,
  page,
  totalPages,
  action,
  kind,
  mediaType,
  searchQuery,
}: Props) {
  useInfiniteScrollShows(shows, action, page, totalPages);

  let Heading;
  switch (type) {
    case "media": {
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
      break;
    }

    case "search": {
      Heading = (
        <span>
          Results found for{" "}
          <span className={CSS.searchQuery}>{searchQuery}</span>
        </span>
      );
      break;
    }
  }

  // Only eagerly load first three show backdrops for LCP;
  // lazy load the rest.
  const Shows = shows.map((show, index) => (
    <Fragment key={show.id}>
      <MediaCard
        show={show}
        loading={index >= 3 ? "lazy" : "eager"}
        dataLast={index === shows.length - 1 ? true : null}
      />
    </Fragment>
  ));

  return (
    <main>
      <h1 className={CSS.heading}>{Heading}</h1>

      <Separator className={EveryMediaKindCSS.separator} />

      <div className={CSS.mediaGrid}>{Shows}</div>
    </main>
  );
}

export default ShowResults;
