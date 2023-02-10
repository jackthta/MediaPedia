import { useEffect } from "react";

import { useDispatch } from "../redux/store/hooks";

import type { MediaGeneralInformation } from "../redux/slices/media/types";
import type { AsyncThunkAction } from "@reduxjs/toolkit";

const observerOptions = {
  // Set intersection relative to
  // the viewport.
  root: null,
  // 1 visible pixel of target element
  // to trigger callback.
  threshold: 0,
};

export const useInfiniteScrollShows = (
  shows: MediaGeneralInformation[],
  action: AsyncThunkAction<any, any, any>,
  page: number,
  totalPages: number
) => {
  const dispatch = useDispatch();

  useEffect(() => {
    let fetch: any;

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
        if (page < totalPages) fetch = dispatch(action);
      }
    }, observerOptions);

    // Obtain target element to observe (i.e., last <MediaCard>)
    const lastElement = document.querySelector("[data-last]");
    if (lastElement) observer.observe(lastElement);

    return () => {
      if (fetch) fetch.abort();
      if (lastElement) observer.unobserve(lastElement);
    };
  }, [page]);
};
