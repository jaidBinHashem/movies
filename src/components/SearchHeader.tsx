import React, {
  useState,
  useCallback,
  useEffect,
  memo,
  RefObject,
  useRef,
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  Platform,
  LayoutChangeEvent,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
} from 'react-native-reanimated';
import { useDebounce } from '../hooks/useDebounce';
import { SEARCH, ANIMATION } from '../const';
import { UI_TEXT } from '../const/strings';
import { COLORS } from '../const/colors';
import { useMoviesStore } from '../store/moviesStore';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Movie } from '../types/Movie';

interface SearchHeaderProps {
  flatListRef?: RefObject<FlatList<Movie> | null>;
  onHeightMeasured?: (height: number) => void;
}

const SearchHeader = memo(
  ({ flatListRef, onHeightMeasured }: SearchHeaderProps) => {
    const [searchQuery, setSearchQuery] = useState('');
    const insets = useSafeAreaInsets();

    // Animation for clear button
    const clearButtonOpacity = useSharedValue(0);

    const isSearching = useMoviesStore(state => state.isSearching);
    const searchMovies = useMoviesStore(state => state.searchMovies);

    const debouncedSearchQuery = useDebounce(searchQuery, SEARCH.debounceDelay);

    const searchMoviesRef = useRef(searchMovies);
    searchMoviesRef.current = searchMovies;

    useEffect(() => {
      searchMoviesRef.current(debouncedSearchQuery);

      if (flatListRef?.current && debouncedSearchQuery !== '') {
        flatListRef.current.scrollToOffset?.({ offset: 0, animated: true });
      }
    }, [debouncedSearchQuery, flatListRef]);

    useEffect(() => {
      const shouldShow = searchQuery.length > SEARCH.minQueryLength && !isSearching && searchQuery === debouncedSearchQuery;
      clearButtonOpacity.value = withTiming(shouldShow ? ANIMATION.visible : ANIMATION.hidden, { duration: ANIMATION.normal });
    }, [isSearching, searchQuery.length, clearButtonOpacity, searchQuery, debouncedSearchQuery]);

    const handleTextChange = useCallback(
      (text: string) => {
        setSearchQuery(text);
        clearButtonOpacity.value = withTiming(ANIMATION.hidden, { duration: ANIMATION.normal });
      },
      [clearButtonOpacity],
    );

    const handleClearSearch = useCallback(() => {
      setSearchQuery('');
      clearButtonOpacity.value = withTiming(ANIMATION.hidden, { duration: ANIMATION.normal });
      if (flatListRef?.current) {
        flatListRef.current.scrollToOffset?.({ offset: 0, animated: true });
      }
    }, [clearButtonOpacity, flatListRef]);

    const onLayout = useCallback(
      (e: LayoutChangeEvent) => {
        onHeightMeasured?.(e.nativeEvent.layout.height);
      },
      [onHeightMeasured],
    );

    const clearButtonAnimatedStyle = useAnimatedStyle(() => ({
      opacity: clearButtonOpacity.value,
      transform: [
        {
          scale: interpolate(clearButtonOpacity.value, [ANIMATION.hidden, ANIMATION.visible], [ANIMATION.scalePressed, ANIMATION.scaleNormal]),
        },
      ],
    }));

    return (
      <View
        style={[
          styles.header,
          {
            paddingTop:
              Platform.OS === 'android' ? Math.max(insets.top, 16) : insets.top,
          },
        ]}
        onLayout={onLayout}
      >
        <Text style={styles.title}>Movies</Text>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder={UI_TEXT.SEARCH_PLACEHOLDER}
            placeholderTextColor={COLORS.placeholder}
            value={searchQuery}
            onChangeText={handleTextChange}
            returnKeyType="search"
            autoCorrect={false}
            autoCapitalize="none"
            selectTextOnFocus={false}
            autoFocus={false}
          />
          <Animated.View
            style={[styles.clearButtonContainer, clearButtonAnimatedStyle]}
          >
            <TouchableOpacity
              onPress={handleClearSearch}
              style={styles.clearButton}
              activeOpacity={ANIMATION.pressed}
            >
              <Text style={styles.clearButtonText}>×</Text>
            </TouchableOpacity>
          </Animated.View>
          {isSearching && (
            <ActivityIndicator
              size="small"
              color={COLORS.primary}
              style={styles.searchIndicator}
            />
          )}
        </View>
      </View>
    );
  },
);

SearchHeader.displayName = 'SearchHeader';

const styles = StyleSheet.create({
  header: {
    padding: 16,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.outline,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.onBackground,
    marginBottom: 16,
    textAlign: 'center',
  },
  searchContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    backgroundColor: COLORS.surfaceVariant,
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: COLORS.outline,
    flex: 1,
  },
  searchIndicator: {
    position: 'absolute',
    right: 15,
    marginTop: 2,
    marginRight: 2,
  },
  clearButtonContainer: {
    position: 'absolute',
    right: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearButtonText: {
    fontSize: 16,
    color: COLORS.onPrimary,
    fontWeight: 'bold',
    lineHeight: 16,
  },
});

export default SearchHeader;
