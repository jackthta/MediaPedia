import { createBrowserRouter } from "react-router-dom";

import Home from "./pages/home/Home";

const HOME = {
  path: "/",
  element: <Home />,
};

export default createBrowserRouter([HOME]);
