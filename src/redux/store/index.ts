import { configureStore } from "@reduxjs/toolkit";

import mediaReducer from "../slices/media/media";
import searchReducer from "../slices/search";
import tmdbConfigurationReducer from "../slices/tmdb-configuration";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const store = configureStore({
  reducer: {
    media: mediaReducer,
    search: searchReducer,
    tmdbConfiguration: tmdbConfigurationReducer,
  },
});

export default store;
