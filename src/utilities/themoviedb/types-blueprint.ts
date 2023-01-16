/**
 * NOTE:
 *  This types file is not used directly. It's simply a type blueprint
 *  of all returned properties from the TMDB API. This application
 *  doesn't make use of all properties, but would like to have the
 *  unused properties available in case they are needed in the future.
 */

type PageData = {
  page: number;
  total_results: number;
  total_pages: number;
};

type GeneralInformation = {
  id: number;
  backdrop_path: string | null;
  vote_average: number;

  genre_ids: number[];
  overview: string;
  original_language: string;
  origin_country: string[];
  poster_path: string | null;
  popularity: number;
  vote_count: number;
};

type SpecificInformation = {
  episode_run_time: number[];
  genres: {
    id: number;
    name: string;
  }[];
  next_episode_to_air: any | null; // API states that it returns only null?
  networks: {
    name: string;
    id: number;
    logo_path: string | null;
    origin_country: string;
  }[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  overview: string;
  seasons: {
    id: number;
    air_date: string;
    episode_count: number;
    name: string;
    overview: string;
    poster_path: string;
    season_number: number;
  }[];

  created_by: {
    id: number;
    credit_id: string;
    name: string;
    gender: number;
    profile_path: string | null;
  }[];
  homepage: string;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: {
    air_date: string;
    episode_number: number;
    id: number;
    name: string;
    overview: string;
    production_code: string;
    season_number: number;
    still_path: string | null;
    vote_average: number;
    vote_count: number;
    popularity: number;
    poster_path: string | null;
    production_companies: {
      id: number;
      logo_path: string | null;
      name: string;
      origin_country: string;
    }[];
    production_countries: {
      iso_3166_1: string;
      name: string;
    }[];
  };
  original_name: string;
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string;
  type: string;

  first_air_date: string;
  name: string;

  id: number;
  backdrop_path: string | null;
  vote_average: number;
};

type TvShow = {
  first_air_date: string;
  name: string;

  media_type: "tv";

  original_name: string;
};

type Movie = {
  release_date: string;
  title: string;

  media_type: "movie";

  original_title: string;
  video: boolean; // Unsure what this is for
};

export {};
