export type TvShowFetchResponse = PageData & { results: TvShowInformation[] };
export type MovieFetchResponse = PageData & { results: MovieInformation[] };

type PageData = {
  page: number;
  total_results: number;
  total_pages: number;
};

export type TvShowInformation = TvShow & GeneralInformation;
export type MovieInformation = Movie & GeneralInformation;

export type TvShowSpecificInformation = TvShowInformation & SpecificInformation;
export type MovieSpecificInformation = TvShowInformation & SpecificInformation;

type GeneralInformation = {
  id: number;
  backdrop_path: string | null;
  vote_average: number;
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
};

type TvShow = {
  first_air_date: string;
  name: string;

  media_type: "tv";
};

type Movie = {
  release_date: string;
  title: string;

  media_type: "movie";
};
