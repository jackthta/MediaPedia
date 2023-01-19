import React from "react";
import ReactDOM from "react-dom/client";

import { Provider } from "react-redux";
import store from "./redux/store";
import { fetchConfiguration } from "./redux/slices/tmdb-configuration";

import router from "./router/router";
import { RouterProvider } from "react-router-dom";

import "./styles/index.scss";

// Fetch TMDB system wide configuration information.
// E.g., image backdrop width sizes
// Source: https://developers.themoviedb.org/3/configuration/get-api-configuration
store.dispatch(fetchConfiguration());

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
