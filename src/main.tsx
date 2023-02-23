import React, { useState } from "react";
import ReactDOM from "react-dom/client";

import { Provider } from "react-redux";
import store from "./redux/store";
import { fetchConfiguration } from "./redux/slices/tmdb-configuration";

import router from "./router/router";
import { RouterProvider } from "react-router-dom";

import { ThemeContext } from "./context/theme";
import {
  useMatchSystemPrefTheme,
  useListenForSystemPrefThemeChange,
} from "./hooks/theme";

import "./styles/index.scss";

function App() {
  const [theme, setTheme] = useState(null);

  useMatchSystemPrefTheme();
  useListenForSystemPrefThemeChange();

  return (
    <React.StrictMode>
      <Provider store={store}>
        <ThemeContext.Provider value={{ theme, setTheme }}>
          <RouterProvider router={router} />
        </ThemeContext.Provider>
      </Provider>
    </React.StrictMode>
  );
}

// Fetch TMDB system wide configuration information.
// E.g., image backdrop width sizes
// Source: https://developers.themoviedb.org/3/configuration/get-api-configuration
store.dispatch(fetchConfiguration());

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <App />
);
