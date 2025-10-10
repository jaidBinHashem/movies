import { create } from 'zustand';
import { fetchPopularMovies, fetchMovieById, searchMovies } from '../api';
import { MoviesState, MoviesActions } from '../types/Movie';

interface MoviesStore extends MoviesState, MoviesActions {}

export const useMoviesStore = create<MoviesStore>((set, get) => ({
  // Initial state
  allMovies: [], // Popular movies (original list)
  searchedMovies: [], // Current movies to display (either allMovies or search results)
  selectedMovie: null,
  loading: false,
  loadingMore: false,
  error: null,
  searchQuery: '',
  currentPage: 1,
  totalPages: 1,
  hasMoreMovies: true,
  isSearching: false,

  // Actions
  fetchMovies: async () => {
    set({ loading: true, error: null, currentPage: 1, searchQuery: '' });
    try {
      const response = await fetchPopularMovies(1);
      set({
        allMovies: response.movies,
        searchedMovies: response.movies, // Display popular movies initially
        currentPage: response.currentPage,
        totalPages: response.totalPages,
        hasMoreMovies: response.currentPage < response.totalPages,
        loading: false,
      });
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : 'Failed to fetch movies',
        loading: false,
      });
    }
  },

  searchMovies: async (query: string) => {
    if (!query.trim()) {
      // When clearing search, restore all movies
      const state = get();
      set({
        searchedMovies: state.allMovies,
        searchQuery: '',
        isSearching: false,
        currentPage: 1,
        hasMoreMovies: state.allMovies.length > 0,
      });
      return;
    }

    set({ isSearching: true, error: null, searchQuery: query, currentPage: 1 });
    try {
      const response = await searchMovies(query, 1);
      set({
        searchedMovies: response.movies,
        currentPage: response.currentPage,
        totalPages: response.totalPages,
        hasMoreMovies: response.currentPage < response.totalPages,
        isSearching: false,
      });
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : 'Failed to search movies',
        isSearching: false,
      });
    }
  },

  loadMoreMovies: async () => {
    const state = get();

    if (state.loadingMore || state.currentPage >= state.totalPages) {
      return;
    }

    set({ loadingMore: true, error: null });
    try {
      const nextPage = state.currentPage + 1;

      let response;
      if (state.searchQuery.trim()) {
        // Loading more search results
        response = await searchMovies(state.searchQuery, nextPage);
        const newSearchedMovies = [...state.searchedMovies, ...response.movies];
        set({ searchedMovies: newSearchedMovies });
      } else {
        // Loading more popular movies
        response = await fetchPopularMovies(nextPage);
        const newAllMovies = [...state.allMovies, ...response.movies];
        const newSearchedMovies = [...state.searchedMovies, ...response.movies];
        set({
          allMovies: newAllMovies,
          searchedMovies: newSearchedMovies,
        });
      }

      set({
        currentPage: response.currentPage,
        totalPages: response.totalPages,
        hasMoreMovies: response.currentPage < response.totalPages,
        loadingMore: false,
      });
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : 'Failed to load more movies',
        loadingMore: false,
      });
    }
  },

  fetchMovieById: async (id: number) => {
    set({ loading: true, error: null });
    try {
      const selectedMovie = await fetchMovieById(id);
      set({
        selectedMovie,
        loading: false,
      });
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : 'Failed to fetch movie details',
        loading: false,
      });
    }
  },

  setSearchQuery: (query: string) => {
    set({ searchQuery: query });
  },

  clearError: () => {
    set({ error: null });
  },

  resetMovies: () => {
    set({
      allMovies: [],
      searchedMovies: [],
      currentPage: 1,
      totalPages: 1,
      hasMoreMovies: true,
      searchQuery: '',
      error: null,
      isSearching: false,
    });
  },

  clearSelectedMovie: () => {
    set({ selectedMovie: null });
  },
}));
