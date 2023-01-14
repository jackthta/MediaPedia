import { configureStore } from "@reduxjs/toolkit";
import tvShowsReducer from "../slices/tv-show";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const store = configureStore({
  reducer: { tvShows: tvShowsReducer },
});

export default store;
