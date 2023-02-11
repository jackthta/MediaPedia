import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "../../utilities/axios/axios";

import type {
  ImageConfiguration,
  LanguageConfiguration,
} from "../../utilities/themoviedb/types";
import type { AxiosResponse } from "axios";
import type { RootState } from "../store";

// API returns backdrop_sizes in `w#` format.
// `backdrop_sizes.srcset` will contain a transformed
// version (`#w`) for `<img srcset=... />` consumption.
// Would rather store it in memory than transform the
// `backdrop_sizes.url` (aka `w#`) format at runtime
// to a `srcset` compatible one.
type ConfigurationState = {
  languages: LanguageConfiguration;
  images: {
    secure_base_url: string;
    backdrop_sizes: {
      srcset: string[];
      url: string[];
    };
    still_sizes: string[];
  };
};

const initialState: ConfigurationState = {
  languages: [],
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
    builder.addCase(
      fetchConfiguration.fulfilled,
      (state, action) => action.payload
    );
  },
});

export const fetchConfiguration = createAsyncThunk(
  "tmdb-configuration/configuration",
  async () => {
    const tmdbImageConfigurationPromise = axios.get<
      never,
      AxiosResponse<ImageConfiguration>
    >("/configuration");

    // Fetch configuration languages
    // I.e., list of languages (ISO 639_1 tags) used throughout TMDB API.
    // Source: https://developers.themoviedb.org/3/configuration/get-languages
    const tmdbLanguageConfigurationPromise = axios.get<
      never,
      AxiosResponse<LanguageConfiguration>
    >("/configuration/languages");

    const [
      {
        data: { images },
      },
      { data: languages },
    ] = await Promise.all([
      tmdbImageConfigurationPromise,
      tmdbLanguageConfigurationPromise,
    ]);

    // Transform srcset incompliant format sizes (`w#` || "original") to `#w` for `srcset` consumption.
    const backdropSizesSrcset = images.backdrop_sizes.map((size) => {
      // "original" won't be a valid width value for `srcset`, so make it `1920w`.
      if (size === "original") return "1920w";
      else return size.split("w")[1].concat("w");
    });

    // Cherry pick needed properties
    const data = {
      languages,
      images: {
        secure_base_url: images.secure_base_url,
        backdrop_sizes: {
          srcset: backdropSizesSrcset,
          url: images.backdrop_sizes,
        },
        still_sizes: images.still_sizes,
      },
    } as ConfigurationState;

    return data;
  }
);

export const selectTmdbConfiguration = (state: RootState) =>
  state.tmdbConfiguration.images;

export const selectTmdbConfigurationLanguages = (state: RootState) =>
  state.tmdbConfiguration.languages;

export default tmdbConfigurationSlice.reducer;
