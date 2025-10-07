// TMDB API response types

export interface TMDBMovie {
  id: number;
  title: string;
  release_date: string;
  genre_ids: number[];
  overview: string;
  vote_average: number;
  poster_path: string | null;
  original_language: string;
}

export interface TMDBGenre {
  id: number;
  name: string;
}

export interface TMDBProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface TMDBCastMember {
  id: number;
  name: string;
  character: string;
  order: number;
}

export interface TMDBCrewMember {
  id: number;
  name: string;
  job: string;
  department: string;
}

export interface TMDBCredits {
  cast: TMDBCastMember[];
  crew: TMDBCrewMember[];
}

export interface TMDBMovieDetails {
  id: number;
  title: string;
  release_date: string;
  genres: TMDBGenre[];
  overview: string;
  vote_average: number;
  poster_path: string | null;
  original_language: string;
  runtime: number | null;
  production_countries: TMDBProductionCountry[];
  revenue: number;
  credits?: TMDBCredits;
}

export interface TMDBMoviesResponse {
  page: number;
  results: TMDBMovie[];
  total_pages: number;
  total_results: number;
}
