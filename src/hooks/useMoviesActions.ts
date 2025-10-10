import { useMoviesStore } from '../store/moviesStore';
import { useEffect } from 'react';

/**
 * Custom hook to extract movies store actions
 * @returns Object containing all the movie store action functions and cleanup utilities
 */
export const useMoviesActions = () => {
  const fetchMovies = useMoviesStore(state => state.fetchMovies);
  const searchMovies = useMoviesStore(state => state.searchMovies);
  const loadMoreMovies = useMoviesStore(state => state.loadMoreMovies);
  const clearError = useMoviesStore(state => state.clearError);
  const clearSelectedMovie = useMoviesStore(state => state.clearSelectedMovie);

  return {
    fetchMovies,
    searchMovies,
    loadMoreMovies,
    clearError,
    clearSelectedMovie,
  };
};

/**
 * Custom hook that automatically clears selected movie on component unmount
 * Use this in components that show movie details
 */
export const useMoviesCleanup = () => {
  const clearSelectedMovie = useMoviesStore(state => state.clearSelectedMovie);

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      clearSelectedMovie();
    };
  }, [clearSelectedMovie]);
};
