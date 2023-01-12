import { createSlice } from "@reduxjs/toolkit";

// TODO add types
const initialState = {
  trending: [],
  popular: [],
  topRated: [],
  latest: [],
};

export const tvShowsSlice = createSlice({
  name: "tv-shows",
  initialState,
  reducers: {},
});

export default tvShowsSlice.reducer;
