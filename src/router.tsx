import { createBrowserRouter } from "react-router-dom";

import Home from "./pages/home/Home";
import TvShows from "./pages/tv-shows/TvShows";

const HOME = {
  path: "/",
  element: <Home />,
};

const TV_SHOWS = {
  path: "tv-shows",
  element: <TvShows />,
};

export default createBrowserRouter([HOME, TV_SHOWS]);
