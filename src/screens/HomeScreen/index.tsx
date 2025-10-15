import React, { memo, useCallback, useRef } from 'react';
import { View, Text, RefreshControl, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { styles } from './styles';

import { COLORS } from '../../const/colors';
import { SPACING, ANIMATION, LAYOUT } from '../../const';
import {
  LOADING_MESSAGES,
  EMPTY_STATES,
  SAFE_AREA_EDGES,
} from '../../const/strings';
import { useMoviesData } from '../../hooks/useMoviesData';
import MovieItem from '../../components/MovieItem';
import LoadingSpinner from '../../components/LoadingSpinner';
import Footer from '../../components/Footer';
import HeaderSpacer from '../../components/HeaderSpacer';
import { Movie } from '../../types/Movie';
import SearchHeader from '../../components/SearchHeader';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { useHeaderAnimation } from '../../hooks/useHeaderAnimation';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

const DEFAULT_HEADER_HEIGHT =
  Platform.select({
    ios: SPACING.headerHeightIOS,
    android: SPACING.headerHeightAndroid,
  }) || SPACING.headerHeight;

const HomeScreen = memo(({ navigation }: HomeScreenProps) => {
  const flatListRef = useRef<Animated.FlatList<Movie> | null>(null);
  const {
    movies,
    loading,
    loadingMore,
    hasMoreMovies,
    isSearching,
    searchQuery,
    handleRefresh,
    handleLoadMore,
    refreshing,
  } = useMoviesData();

  const {
    headerAnimatedStyle,
    onScroll,
    setHeaderHeightFromJS,
    headerHeightJS,
  } = useHeaderAnimation(DEFAULT_HEADER_HEIGHT);

  const handleHeaderMeasured = useCallback(
    (h: number) => {
      setHeaderHeightFromJS(h);
    },
    [setHeaderHeightFromJS],
  );

  const handleMoviePress = useCallback(
    (movie: Movie) => {
      navigation.navigate('MovieDetail', { movieId: movie.id });
    },
    [navigation],
  );

  // adding index to keyExtractor as the free API sometimes returns duplicate IDs
  const keyExtractor = useCallback(
    (item: Movie, index: number) => `${item.id}-${index}`,
    [],
  );

  const renderMovieItem = useCallback(
    ({ item }: { item: Movie }) => (
      <MovieItem movie={item} onPress={handleMoviePress} />
    ),
    [handleMoviePress],
  );

  const renderEmpty = useCallback(() => {
    if (isSearching) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            {LOADING_MESSAGES.SEARCHING_MOVIES}
          </Text>
        </View>
      );
    }
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          {searchQuery
            ? EMPTY_STATES.NO_MOVIES_SEARCH
            : EMPTY_STATES.NO_MOVIES_AVAILABLE}
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
        edges={SAFE_AREA_EDGES.STANDARD as any}
      >
        <LoadingSpinner message={LOADING_MESSAGES.MOVIES} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={styles.container}
      edges={SAFE_AREA_EDGES.STANDARD as any}
    >
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
        contentContainerStyle={styles.listContainer}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={LAYOUT.scrollThreshold}
        keyboardShouldPersistTaps="handled"
        onScroll={onScroll}
        scrollEventThrottle={ANIMATION.throttle}
        keyboardDismissMode="on-drag"
        initialNumToRender={LAYOUT.flatListInitial}
        maxToRenderPerBatch={LAYOUT.flatListBatch}
        windowSize={LAYOUT.flatListWindow}
        entering={FadeInDown.delay(ANIMATION.fast).springify()}
      />
    </SafeAreaView>
  );
});

HomeScreen.displayName = 'HomeScreen';

export default HomeScreen;
