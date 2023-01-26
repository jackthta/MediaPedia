export type TvShowFetchResponse = PageData & {
  results: TvShowInformation[] | TvShowSpecificInformation[];
};
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
  // TODO: replace this with `Seasons`
  seasons:
    | {
        id: number;
        air_date: string;
        episode_count: number;
        name: string;
        overview: string;
        poster_path: string;
        season_number: number;
      }[]
    | {};
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

type Image = {
  file_path: string;
  width: number;
  height: number;
};

export type Images = {
  id: number;
  logos: Image[];
};

export type ContentRating = {
  iso_3166_1: string;
  rating: string;
};

export type ContentRatings = {
  id: number;
  results: ContentRating[];
};

export type Episode = {
  id: number;
  air_date: string;
  episode_number: number;
  name: string;
  overview: string;
  still_path: string;

  // Unsure whether this will be needed.
  // Might be convenient?
  season_number: number;
};

export type Season = {
  _id: string;
  season_number: number;
  name: string;
  episodes: Episode[];
};

export type Seasons = {
  seasons: {
    [season: number | string]: Season;
  };
};

export type SupplementalVideo = {
  id: string;
  name: string;
  key: string;
  site: string;
  size: number;
  // Inferred values from data returned from API
  // because TMDB docs doesn't explicitly state.
  // Some may be missing.
  type:
    | "Trailer"
    | "Behind the Scenes"
    | "Bloopers"
    | "Opening Credits"
    | "Teaser";
  published_at: string;
};

export type SupplementalVideos = {
  id: number;
  supplementalVideos: SupplementalVideo[];
};


export type TmdbApiConfiguration = {
  images: {
    secure_base_url: string;
    backdrop_sizes: string[];
    still_sizes: string[];
  };
};

export type TmdbApiConfigurationLanguages = {
  iso_639_1: string;
  english_name: string;
  name: string;
}[];
