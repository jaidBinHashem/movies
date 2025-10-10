export interface Movie {
  id: number;
  title: string;
  year: number;
  director: string;
  genre: string[];
  plot: string;
  poster: string;
  duration: string;
  language: string;
  country: string;
  awards: string;
  actors: string[];
  imdbRating: number;
}

export interface PaginatedMoviesResponse {
  movies: Movie[];
  totalPages: number;
  currentPage: number;
}

export interface MoviesState {
  allMovies: Movie[];
  searchedMovies: Movie[];
  selectedMovie: Movie | null;
  loading: boolean;
  loadingMore: boolean;
  error: string | null;
  searchQuery: string;
  currentPage: number;
  totalPages: number;
  hasMoreMovies: boolean;
  isSearching: boolean;
}

export interface MoviesActions {
  fetchMovies: () => Promise<void>;
  searchMovies: (query: string) => Promise<void>;
  loadMoreMovies: () => Promise<void>;
  fetchMovieById: (id: number) => Promise<void>;
  setSearchQuery: (query: string) => void;
  clearError: () => void;
  resetMovies: () => void;
  clearSelectedMovie: () => void;
}
