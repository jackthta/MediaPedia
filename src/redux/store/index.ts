import { configureStore } from "@reduxjs/toolkit";
import tvShowsReducer from "../slices/tv-show-slice";

export default configureStore({
  reducer: { tvShowsReducer },
});
