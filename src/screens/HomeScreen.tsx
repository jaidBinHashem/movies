import React, {
  FC,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  RefreshControl,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { COLORS } from '../const/colors';
import { useMoviesData } from '../hooks/useMoviesData';
import { useMoviesActions } from '../hooks/useMoviesActions';
import MovieItem from '../components/MovieItem';
import LoadingSpinner from '../components/LoadingSpinner';
import Footer from '../components/Footer';
import HeaderSpacer from '../components/HeaderSpacer';
import { Movie } from '../types/Movie';
import SearchHeader from '../components/SearchHeader';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useHeaderAnimation } from '../hooks/useHeaderAnimation';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

const DEFAULT_HEADER_HEIGHT = Platform.select({ ios: 88, android: 64 }) || 80;

const HomeScreen: FC<HomeScreenProps> = memo(({ navigation }) => {
  const {
    movies,
    loading,
    loadingMore,
    error,
    hasMoreMovies,
    isSearching,
    searchQuery,
  } = useMoviesData();

  const { fetchMovies, searchMovies, loadMoreMovies, clearError } = useMoviesActions();

  const [refreshing, setRefreshing] = useState(false);

  const flatListRef = useRef<Animated.FlatList<Movie> | null>(null);

  const { headerAnimatedStyle, onScroll, setHeaderHeightFromJS, freezeDuring, headerHeightJS } =
    useHeaderAnimation(DEFAULT_HEADER_HEIGHT);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  useEffect(() => {
    if (error) {
      Alert.alert('Error', error, [{ text: 'OK', onPress: clearError }]);
    }
  }, [error, clearError]);

  useEffect(() => {
    freezeDuring(!!loadingMore);
    if (loadingMore) {
      setHeaderHeightFromJS(headerHeightJS);
    }
  }, [loadingMore, freezeDuring, setHeaderHeightFromJS, headerHeightJS]);

  const handleHeaderMeasured = useCallback(
    (h: number) => {
      setHeaderHeightFromJS(h);
    },
    [setHeaderHeightFromJS],
  );

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    if (searchQuery?.trim()) {
      await searchMovies(searchQuery);
    } else {
      await fetchMovies();
    }
    setRefreshing(false);
  }, [fetchMovies, searchMovies, searchQuery]);

  const handleMoviePress = useCallback(
    (movie: Movie) => {
      navigation.navigate('MovieDetail', { movieId: movie.id });
    },
    [navigation],
  );

  const handleLoadMore = useCallback(() => {
    if (!loadingMore && hasMoreMovies) {
      loadMoreMovies();
    }
  }, [loadingMore, hasMoreMovies, loadMoreMovies]);

  const renderMovieItem = useCallback(
    ({ item }: { item: Movie }) => (
      <MovieItem movie={item} onPress={handleMoviePress} />
    ),
    [handleMoviePress],
  );

    const keyExtractor = useCallback(
    (item: Movie, index: number) => `${item.id}-${index}`,
    [],
  );

  const renderEmpty = useCallback(() => {
    if (isSearching) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Searching movies...</Text>
        </View>
      );
    }
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          {searchQuery
            ? 'No movies found matching your search.'
            : 'No movies available.'}
        </Text>
      </View>
    );
  }, [isSearching, searchQuery]);

  const renderFooter = useCallback(
    () => (
      <Footer
        loading={loadingMore}
        hasMore={hasMoreMovies}
        numberOfMovies={movies.length}
      />
    ),
    [loadingMore, hasMoreMovies, movies.length],
  );

  if (loading && movies.length === 0) {
    return (
      <SafeAreaView
        style={styles.container}
        edges={['left', 'right', 'bottom']}
      >
        <LoadingSpinner message="Loading movies..." />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <Animated.View
        style={[
          styles.headerOverlay,
          headerAnimatedStyle,
          { height: headerHeightJS },
        ]}
        pointerEvents="box-none"
      >
        <SearchHeader
          flatListRef={flatListRef}
          onHeightMeasured={handleHeaderMeasured}
        />
      </Animated.View>

      <Animated.FlatList
        ref={flatListRef}
        data={movies}
        renderItem={renderMovieItem}
        keyExtractor={keyExtractor}
        ListEmptyComponent={renderEmpty}
        ListFooterComponent={renderFooter}
        ListHeaderComponent={<HeaderSpacer height={headerHeightJS} />}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[COLORS.primary]}
            tintColor={COLORS.primary}
            progressViewOffset={headerHeightJS}
          />
        }
        contentInset={{ top: 0 }}
        scrollIndicatorInsets={{ top: headerHeightJS }}
        contentInsetAdjustmentBehavior="never"
        automaticallyAdjustContentInsets={false}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.3}
        keyboardShouldPersistTaps="handled"
        onScroll={onScroll}
        scrollEventThrottle={16}
        keyboardDismissMode="on-drag"
        initialNumToRender={8}
        maxToRenderPerBatch={12}
        windowSize={11}
        entering={FadeInDown.delay(100).springify()}
      />
    </SafeAreaView>
  );
});

HomeScreen.displayName = 'HomeScreen';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  headerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.07,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
      },
      android: { elevation: 3 },
    }),
  },
  listContainer: { paddingBottom: 20, marginTop: 6 },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyText: { fontSize: 16, color: '#666', textAlign: 'center' },
});

export default HomeScreen;
