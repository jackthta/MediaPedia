// NOTE: The order of all properties are in the order
// that TMDB's documentation has it. I decided to keep
// it consistent with the documentation's order so that
// it would be easier to reference back to the documentation.

// Response object for /trending/tv, /tv/popular,
// and /tv/top_rated (Trending/Popular/Top Rated)
export type TvKindResponse = {
  page: number;
  results: TvResultObject[];
  total_results: number;
  total_pages: number;
};

// Convenience types for `TvKindResponse`
type TvResultObject = ResultObject & TvShow;
type ResultObject = {
  poster_path: string | null;
  popularity: number;
  id: number;
  backdrop_path: string | null;
  vote_average: number;
  overview: string;
  origin_country: string[];
  genre_ids: number[];
  original_language: string;
  vote_count: number;
  name: string;
  original_name: string;
};
// (extracted) properties from `ResultObject` that define a Tv Show
type TvShow = {
  first_air_date: string;
  name: string;

  media_type: "tv";

  original_name: string;
};
// (extracted) properties from `ResultObject` that define a Movie
type Movie = {
  release_date: string;
  title: string;

  media_type: "movie";

  original_title: string;
  video: boolean; // Unsure what this is for
};

// Response object for /tv/{tv_id} (Tv Show Specific Details)
export type TvDetailsResponse = {
  backdrop_path: string | null;
  created_by: Creator[];
  episode_run_time: number[];
  first_air_date: string;
  genres: Genre[];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: string;

  // Unfortunately, TMDB doesn't make the "Episode"
  // the same shape as `TvSeasonsResponse`'s `Episode`
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
  };

  name: string;
  next_episode_to_air: any | null; // API states that it returns only null?
  networks: Network[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  seasons: Season[];
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
};

// Convenience types for `TvDetailsResponse`
type Creator = {
  id: number;
  credit_id: string;
  name: string;
  gender: number;
  profile_path: string | null;
};
export type Genre = {
  id: number;
  name: string;
};
export type Network = {
  name: string;
  id: number;
  logo_path: string | null;
  origin_country: string;
};
type ProductionCompany = {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
};
type ProductionCountry = {
  iso_3166_1: string;
  name: string;
};
type Season = {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
};
type SpokenLanguage = {
  english_name: string;
  iso_639_1: string;
  name: string;
};

// Response object for /tv/{tv_id}/images (Tv Show Images)
export type TvImagesResponse = {
  backdrops: Image[];
  id: number;
  posters: Image[];

  // NOTE: the documentation doesn't show that
  // it returns a `logo` property, but it actually
  // does. It's a relatively new property, so the
  // documentation hasn't updated to reflect that.
  // Source: https://www.themoviedb.org/talk/5b8effd792514173b2000bb9?language=en-US
  logos: Image[];
};

// Convenience type for `TvImagesResponse`
export type Image = {
  aspect_ratio: number;
  file_path: string;
  height: number;
  iso_639_1: string | null;
  vote_average: number;
  vote_count: number;
  width: number;
};

// Response object for /tv/{tv_id}/content_ratings (Tv Show Content Ratings)
export type TvContentRatingsResponse = {
  results: ContentRating[];
  id: number;
};

// Convenience type for `TvContentRatingsResponse`
export type ContentRating = {
  iso_3166_1: string;
  rating: string;
};

// Response object for /tv/{tv_id}/content_ratings (Tv Show Season(s))
export type TvSeasonsResponse = {
  _id: string;
  air_date: string;
  episodes: Episode[];
  name: string;
  overview: string;
  id: number;
  poster_path: string | null;
  season_number: number;
};

// Convenience types for `TvSeasonsResponse`
export type Episode = {
  air_date: string;
  episode_number: number;
  crew: Crew[];
  guest_stars: GuestStar[];
  id: number;
  name: string;
  overview: string;
  production_code: string;
  season_number: number;
  still_path: string;
  vote_average: number;
  vote_count: number;
};
type Crew = {
  department: string;
  job: string;
  credit_id: string;
  adult: boolean | null;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
};
type GuestStar = {
  credit_id: string;
  order: number;
  character: string;
  adult: boolean;
  gender: number | null;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
};

// Response object for /tv/{tv_id}/videos (Tv Show Video(s))
export type TvVideosResponse = {
  id: number;
  results: Video[];
};

// Convenience type for `TvVideosResponse`
type Video = {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
};

// Response object for /tv/{tv_id}/similar (Similar Tv Shows)
// Exactly the same shape as `TvKindResponse`
export type TvSimilarResponse = TvKindResponse;

/* =========================== CONFIGURATION ===========================*/

// Response object for /configuration (TMDB Image Configuration)
export type ImageConfiguration = {
  images: {
    base_url: string;
    secure_base_url: string;
    backdrop_sizes: string[];
    logo_sizes: string[];
    poster_sizes: string[];
    profile_sizes: string[];
    still_sizes: string[];
  };
  change_keys: string[];
};

// Response object for /configuration/languages (TMDB Language Configuration)
export type LanguageConfiguration = {
  iso_639_1: string;
  english_name: string;
  name: string;
}[];
