import { createBrowserRouter } from "react-router-dom";

import { ROUTES } from "../utilities/enum";

import Home from "../pages/home/Home";
import TvShow from "../pages/tv-show/TvShow";
import TvShows from "../pages/tv-shows/TvShows";
import TvShowsKind from "../pages/tv-shows-kind/TvShowsKind";

import { tvShowKindParamGuard } from "./loaders/tv-show-kind-loader";

import type { RouteObject } from "react-router-dom";

const HOME: RouteObject = {
  path: ROUTES.HOME,
  element: <Home />,
};

const TV_SHOWS: RouteObject = {
  path: ROUTES.TV_SHOWS,
  element: <TvShows />,
};

const TV_SHOWS_KIND: RouteObject = {
  path: ROUTES.TV_SHOWS_KIND,
  element: <TvShowsKind />,
  loader: tvShowKindParamGuard,
};

const TV_SHOW: RouteObject = {
  path: ROUTES.TV_SHOW,
  element: <TvShow />,
};

export default createBrowserRouter([HOME, TV_SHOW, TV_SHOWS, TV_SHOWS_KIND]);
