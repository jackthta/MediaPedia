import { useParams } from "react-router";
import { Fragment, useEffect } from "react";

import { useSelector, useDispatch } from "../../redux/store/hooks";
import { useRefreshTvShows } from "../../hooks/tv-shows";
import { fetchTvShows } from "../../redux/slices/tv-show/tv-show";
import {
  selectShowsByKind,
  selectPageByKind,
} from "../../redux/slices/tv-show/selectors";
import { KIND } from "../../utilities/enum";

import MediaCard from "../../components/media-card/MediaCard";
import Separator from "../../components/separator/Separator";
import TrendingSVG from "../../components/SVGs/TrendingSVG";
import FireSVG from "../../components/SVGs/FireSVG";
import TopRatedSVG from "../../components/SVGs/TopRatedSVG";

import BaseLayout from "../../layouts/base-layout/BaseLayout";

import TvShowsCSS from "../tv-shows/TvShows.module.scss";
import CSS from "./TvShowsKind.module.scss";

function TvShowsKind() {
  let { kind: _kind } = useParams();
  const kind = _kind! as KIND;
  const dispatch = useDispatch();
  let fetch: any;

  const shows = useSelector((state) => selectShowsByKind(state, kind));
  const page = useSelector((state) => selectPageByKind(state, kind));

  const observerOptions = {
    // Set intersection relative to
    // the viewport.
    root: null,
    // 1 visible pixel of target element
    // to trigger callback.
    threshold: 0,
  };
  const observer = new IntersectionObserver(([lastElement]) => {
    // NOTE: There should only be one element being observed at
    // any given time, so destructuring like that 👆 should be okay.

    // Callback will be fired on IntersectionObserver
    // instantiation (default behavior). Need to check
    // whether the target element is actually intersecting
    // as a guard.
    // Source: https://stackoverflow.com/a/53385264
    // and https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#intersection_observer_concepts_and_usage
    if (lastElement.isIntersecting) {
      /**
       * NOTE❗️: This is a failure point. If user loses internet connection
       * and intersects the last element, the last element indicator will
       * be removed and the dispatched API call will fail, so if they reconnect
       * w/o refreshing the page and scroll to the bottom again, there will be
       * no last element being observed for intersection to fetch the next page.
       */
      // Remove last element indicator
      lastElement.target.removeAttribute("data-last");
      observer.unobserve(lastElement.target);

      // Fetch next page
      fetch = dispatch(fetchTvShows[kind](page));
    }
  }, observerOptions);

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
  const Shows = shows.map((show, index) => (
    <Fragment key={show.id}>
      <MediaCard
        show={show}
        loading={index >= 3 ? "lazy" : "eager"}
        dataLast={index === shows.length - 1 ? true : null}
      />
    </Fragment>
  ));

  useRefreshTvShows(kind);

  useEffect(() => {
    // Obtain target element to observe (i.e., last <MediaCard>)
    const lastElement = document.querySelector("[data-last]");
    if (lastElement) observer.observe(lastElement);

    return () => {
      fetch.abort();

      if (lastElement) observer.unobserve(lastElement);
    };
  }, [shows.length]);

  return (
    <BaseLayout>
      <main>
        <h1 className={CSS.heading}>{Heading}</h1>
        <Separator className={TvShowsCSS.separator} />
        <div className={CSS.mediaGrid}>{Shows}</div>
      </main>
    </BaseLayout>
  );
}

export default TvShowsKind;
