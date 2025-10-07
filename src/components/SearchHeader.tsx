import React, {
  useState,
  useCallback,
  useEffect,
  memo,
  RefObject,
  useRef,
  FC,
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
import { useMoviesStore } from '../store/moviesStore';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Movie } from '../types/Movie';

interface SearchHeaderProps {
  flatListRef?: RefObject<FlatList<Movie> | null>;
  onHeightMeasured?: (height: number) => void;
}

const SearchHeader: FC<SearchHeaderProps> = memo(
  ({ flatListRef, onHeightMeasured }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const insets = useSafeAreaInsets();

    // Animation for clear button
    const clearButtonOpacity = useSharedValue(0);

    const isSearching = useMoviesStore(state => state.isSearching);
    const searchMovies = useMoviesStore(state => state.searchMovies);

    const debouncedSearchQuery = useDebounce(searchQuery, 500);

    const searchMoviesRef = useRef(searchMovies);
    searchMoviesRef.current = searchMovies;

    useEffect(() => {
      searchMoviesRef.current(debouncedSearchQuery);

      if (flatListRef?.current && debouncedSearchQuery !== '') {
        flatListRef.current.scrollToOffset?.({ offset: 0, animated: true });
      }
    }, [debouncedSearchQuery, flatListRef]);

    const handleTextChange = useCallback(
      (text: string) => {
        setSearchQuery(text);
        clearButtonOpacity.value = withTiming(text.length > 0 ? 1 : 0, {
          duration: 200,
        });
      },
      [clearButtonOpacity],
    );

    const handleClearSearch = useCallback(() => {
      setSearchQuery('');
      clearButtonOpacity.value = withTiming(0, { duration: 200 });
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
          scale: interpolate(clearButtonOpacity.value, [0, 1], [0.8, 1]),
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
            placeholder="Search movies by title..."
            placeholderTextColor="#999"
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
              activeOpacity={0.7}
            >
              <Text style={styles.clearButtonText}>×</Text>
            </TouchableOpacity>
          </Animated.View>
          {isSearching && (
            <ActivityIndicator
              size="small"
              color="#007AFF"
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
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  searchContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    backgroundColor: '#f8f8f8',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
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
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    lineHeight: 16,
  },
});

export default SearchHeader;
