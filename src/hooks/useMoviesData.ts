import { useMoviesStore } from '../store/moviesStore';

/**
 * Custom hook to extract movies store state
 * @returns Object containing all the movie store state values
 */
export const useMoviesData = () => {
  const movies = useMoviesStore(state => state.searchedMovies);
  const loading = useMoviesStore(state => state.loading);
  const loadingMore = useMoviesStore(state => state.loadingMore);
  const error = useMoviesStore(state => state.error);
  const hasMoreMovies = useMoviesStore(state => state.hasMoreMovies);
  const isSearching = useMoviesStore(state => state.isSearching);
  const searchQuery = useMoviesStore(state => state.searchQuery);

  return {
    movies,
    loading,
    loadingMore,
    error,
    hasMoreMovies,
    isSearching,
    searchQuery,
  };
};
