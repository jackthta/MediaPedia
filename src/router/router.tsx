import { createHashRouter } from "react-router-dom";

import { ROUTES } from "../utilities/enum";

import Home from "../pages/home/Home";
import EveryMediaKind from "../pages/every-media-kind/EveryMediaKind";
import MediaKind from "../pages/media-kind/MediaKind";
import Media from "../pages/media/Media";

import { mediaKindParamGuard } from "./loaders/media-kind-loader";

import type { RouteObject } from "react-router-dom";
import SearchResults from "../pages/search-results/SearchResults";

const HOME: RouteObject = {
  path: ROUTES.HOME,
  element: <Home />,
};

const TV_SHOWS: RouteObject = {
  path: ROUTES.TV_SHOWS,
  element: <EveryMediaKind mediaType="tv" />,
};

const TV_SHOWS_KIND: RouteObject = {
  path: ROUTES.TV_SHOWS_KIND,
  element: <MediaKind mediaType="tv" />,
  loader: mediaKindParamGuard,
};

const TV_SHOW: RouteObject = {
  path: ROUTES.TV_SHOW,
  element: <Media mediaType="tv" />,
};

const MOVIES: RouteObject = {
  path: ROUTES.MOVIES,
  element: <EveryMediaKind mediaType="movie" />,
};

const MOVIES_KIND: RouteObject = {
  path: ROUTES.MOVIES_KIND,
  element: <MediaKind mediaType="movie" />,
  loader: mediaKindParamGuard,
};

const MOVIE: RouteObject = {
  path: ROUTES.MOVIE,
  element: <Media mediaType="movie" />,
};

const SEARCH_RESULTS: RouteObject = {
  path: ROUTES.SEARCH_RESULTS,
  element: <SearchResults />,
};

export default createHashRouter([
  HOME,

  TV_SHOW,
  TV_SHOWS,
  TV_SHOWS_KIND,

  MOVIE,
  MOVIES,
  MOVIES_KIND,

  SEARCH_RESULTS,
]);
