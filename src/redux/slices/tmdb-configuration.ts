import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "../../utilities/axios/axios";

import type { TmdbApiConfiguration } from "../../utilities/axios/types";
import type { AxiosResponse } from "axios";
import type { RootState } from "../store";

// API returns backdrop_sizes in `w#` format.
// `backdrop_sizes.srcset` will contain a transformed
// version (`#w`) for `<img srcset=... />` consumption.
// Would rather store it in memory than transform the
// `backdrop_sizes.url` (aka `w#`) format at runtime
// to a `srcset` compatible one.
type TmdbConfigurationState = {
  images: {
    secure_base_url: string;
    backdrop_sizes: {
      srcset: string[];
      url: string[];
    };
    still_sizes: string[];
  };
};

const initialState: TmdbConfigurationState = {
  images: {
    secure_base_url: "",
    backdrop_sizes: {
      srcset: [],
      url: [],
    },
    still_sizes: [],
  },
};

export const tmdbConfigurationSlice = createSlice({
  name: "tmdb-configuration",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchConfiguration.fulfilled, (state, action) => {
      state.images = action.payload.images;
    });
  },
});

export const fetchConfiguration = createAsyncThunk(
  "tmdb-configuration/configuration",
  async () => {
    const { data: _data } = await axios.get<
      never,
      AxiosResponse<TmdbApiConfiguration>
    >("/configuration");

    // Transform srcset incompliant format sizes (`w#` || "original") to `#w` for `srcset` consumption.
    const backdropSizesSrcset = _data.images.backdrop_sizes.map((size) => {
      // "original" won't be a valid width value for `srcset`, so make it `1920w`.
      if (size === "original") return "1920w";
      else return size.split("w")[1].concat("w");
    });

    // Cherry pick needed properties
    const data = {
      images: {
        secure_base_url: _data.images.secure_base_url,
        backdrop_sizes: {
          srcset: backdropSizesSrcset,
          url: _data.images.backdrop_sizes,
        },
        still_sizes: _data.images.still_sizes,
      },
    } as TmdbConfigurationState;

    return data;
  }
);

export const selectTmdbConfiguration = (state: RootState) =>
  state.tmdbConfiguration.images;

export default tmdbConfigurationSlice.reducer;
