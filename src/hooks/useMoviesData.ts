import { Alert } from 'react-native';
import { useEffect, useCallback, useState } from 'react';
import { useMoviesStore } from '../store/moviesStore';
import { UI_TEXT } from '../const/strings';

/**
 * Custom hook for movies data management including state and actions
 * @returns Object containing movies state and action handlers
 */
export const useMoviesData = () => {
  const movies = useMoviesStore(state => state.searchedMovies);
  const loading = useMoviesStore(state => state.loading);
  const loadingMore = useMoviesStore(state => state.loadingMore);
  const error = useMoviesStore(state => state.error);
  const hasMoreMovies = useMoviesStore(state => state.hasMoreMovies);
  const isSearching = useMoviesStore(state => state.isSearching);
  const searchQuery = useMoviesStore(state => state.searchQuery);
  const clearError = useMoviesStore(state => state.clearError);
  const fetchMovies = useMoviesStore(state => state.fetchMovies);
  const searchMovies = useMoviesStore(state => state.searchMovies);
  const loadMoreMovies = useMoviesStore(state => state.loadMoreMovies);
  
  const [refreshing, setRefreshing] = useState(false);

  // Initial fetch of movies
  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  // Handle error display
  useEffect(() => {
    if (error) {
      Alert.alert(UI_TEXT.ERROR_TITLE, error, [{ text: UI_TEXT.OK, onPress: clearError }]);
    }
  }, [error, clearError]);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      if (searchQuery?.trim()) {
        await searchMovies(searchQuery);
      } else {
        await fetchMovies();
      }
    } finally {
      setRefreshing(false);
    }
  }, [fetchMovies, searchMovies, searchQuery]);

  const handleLoadMore = useCallback(() => {
    if (!loadingMore && hasMoreMovies) {
      loadMoreMovies();
    }
  }, [loadingMore, hasMoreMovies, loadMoreMovies]);

  return {
    movies,
    loading,
    loadingMore,
    error,
    hasMoreMovies,
    isSearching,
    searchQuery,
    handleRefresh,
    handleLoadMore,
    refreshing,
  };
};
