import { useEffect } from 'react';
import { Alert } from 'react-native';
import { useMoviesStore } from '../store/moviesStore';

/**
 * Custom hook for fetching and managing movie detail data
 * @param movieId The ID of the movie to fetch
 * @returns Object containing movie detail state and actions
 */
export const useMovieDetail = (movieId: number) => {
  const selectedMovie = useMoviesStore(state => state.selectedMovie);
  const loading = useMoviesStore(state => state.loading);
  const error = useMoviesStore(state => state.error);
  const fetchMovieById = useMoviesStore(state => state.fetchMovieById);
  const clearError = useMoviesStore(state => state.clearError);
  const clearSelectedMovie = useMoviesStore(state => state.clearSelectedMovie);

  // Fetch movie details when movieId changes
  useEffect(() => {
    fetchMovieById(movieId);
  }, [movieId, fetchMovieById]);

  // Handle error display
  useEffect(() => {
    if (error) {
      Alert.alert('Error', error, [{ text: 'OK', onPress: clearError }]);
    }
  }, [error, clearError]);

  // Cleanup selected movie on unmount
  useEffect(() => {
    return () => {
      clearSelectedMovie();
    };
  }, [clearSelectedMovie]);

  return {
    selectedMovie,
    loading,
    error,
  };
};
