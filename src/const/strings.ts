// App String Constants

// Loading Messages
export const LOADING_MESSAGES = {
  DEFAULT: 'Loading...',
  MOVIES: 'Loading movies...',
  MOVIE_DETAILS: 'Loading movie details...',
  MORE_MOVIES: 'Loading more movies...',
  SEARCHING_MOVIES: 'Searching movies...',
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  FETCH_MOVIES_FAILED: 'Failed to fetch movies',
  SEARCH_MOVIES_FAILED: 'Failed to search movies',
  LOAD_MORE_FAILED: 'Failed to load more movies',
  FETCH_MOVIE_DETAILS_FAILED: 'Failed to fetch movie details',
  MOVIE_NOT_FOUND: 'Movie not found',
} as const;

// Empty State Messages
export const EMPTY_STATES = {
  NO_MOVIES_SEARCH: 'No movies found matching your search.',
  NO_MOVIES_AVAILABLE: 'No movies available.',
} as const;

// UI Text
export const UI_TEXT = {
  SEARCH_PLACEHOLDER: 'Search movies by title...',
  GO_BACK: 'Go Back',
  NO_IMAGE: 'No Image',
  MOVIE_NOT_FOUND: 'Movie not found',
  MOVIES_TITLE: 'Movies',
  MOVIE_DETAILS_TITLE: 'Movie Details',
  END_OF_LIST: 'You\'ve reached the end!',
  NO_MORE_MOVIES: 'No more movies to load',
  UNKNOWN: 'Unknown',
  NOT_AVAILABLE: 'N/A',
  WORKLET: 'worklet',
  ERROR_TITLE: 'Something went wrong',
  ERROR_MESSAGE: 'We encountered an unexpected error. Please try again.',
  TRY_AGAIN: 'Try Again',
  ERROR_DETAILS_LABEL: 'Error Details:',
  OK: 'OK',
} as const;

// Movie Detail Section Titles
export const MOVIE_SECTIONS = {
  DIRECTOR: 'Director',
  GENRE: 'Genre',
  PLOT: 'Plot',
  CAST: 'Cast',
  LANGUAGE: 'Language',
  COUNTRY: 'Country',
  AWARDS: 'Awards',
} as const;

// Navigation Names
export const SCREEN_NAMES = {
  HOME: 'Home',
  MOVIE_DETAIL: 'MovieDetail',
} as const;

// Store Initial Values
export const STORE_DEFAULTS = {
  EMPTY_SEARCH_QUERY: '',
} as const;

// Genre Mappings
export const GENRE_MAP = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  878: 'Science Fiction',
  10770: 'TV Movie',
  53: 'Thriller',
  10752: 'War',
  37: 'Western',
} as const;

// Platform Text Input Props
export const TEXT_INPUT_PROPS = {
  RETURN_KEY_TYPE: 'search',
  AUTO_CAPITALIZE: 'none',
  RESIZE_MODE: 'cover',
} as const;

// SafeAreaView Edges
export const SAFE_AREA_EDGES = {
  STANDARD: ['left', 'right', 'bottom'],
} as const;