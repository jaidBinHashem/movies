import React, { FC, memo, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Movie } from '../types/Movie';

interface MovieItemProps {
  movie: Movie;
  onPress: (movie: Movie) => void;
}

const MovieItem: FC<MovieItemProps> = memo(({ movie, onPress }) => {
  const handlePress = useCallback(() => {
    onPress(movie);
  }, [movie, onPress]);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={2}>
            {movie.title}
          </Text>
          <Text style={styles.year}>{movie.year}</Text>
          <Text style={styles.director} numberOfLines={1}>
            Director: {movie.director}
          </Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>⭐ {movie.imdbRating || 'N/A'}</Text>
            <Text style={styles.genre}>
              {movie.genre?.join(', ') || 'Unknown'}
            </Text>
          </View>
        </View>
        {movie.poster && (
          <Image
            source={{ uri: movie.poster }}
            style={styles.poster}
            resizeMode="cover"
          />
        )}
      </View>
    </TouchableOpacity>
  );
});

MovieItem.displayName = 'MovieItem';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 4,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  content: {
    flexDirection: 'row',
    padding: 16,
  },
  textContainer: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  year: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  director: {
    fontSize: 14,
    color: '#888',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    color: '#FF6B35',
    fontWeight: '600',
  },
  genre: {
    fontSize: 12,
    color: '#999',
    flex: 1,
    textAlign: 'right',
  },
  poster: {
    width: 60,
    height: 90,
    borderRadius: 8,
  },
});

export default MovieItem;
