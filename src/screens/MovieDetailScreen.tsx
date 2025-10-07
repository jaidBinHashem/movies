import React, { FC, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useMoviesStore } from '../store/moviesStore';
import LoadingSpinner from '../components/LoadingSpinner';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import Animated, { FadeInDown } from 'react-native-reanimated';

type MovieDetailScreenProps = StackScreenProps<
  RootStackParamList,
  'MovieDetail'
>;

const MovieDetailScreen: FC<MovieDetailScreenProps> = ({
  navigation,
  route,
}) => {
  const { movieId } = route.params;
  const { selectedMovie, loading, error, fetchMovieById, clearError } =
    useMoviesStore();

  useEffect(() => {
    fetchMovieById(movieId);
  }, [movieId, fetchMovieById]);

  useEffect(() => {
    if (error) {
      Alert.alert('Error', error, [{ text: 'OK', onPress: clearError }]);
    }
  }, [error, clearError]);

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <LoadingSpinner message="Loading movie details..." />
      </SafeAreaView>
    );
  }

  if (!selectedMovie) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Movie not found</Text>
          <TouchableOpacity
            style={styles.backButton}
            onPress={goBack}
          >
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <Animated.View
      style={styles.animatedContainer}
      entering={FadeInDown.delay(100).springify()}
    >
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <View style={styles.posterContainer}>
            {selectedMovie.poster ? (
              <Image
                source={{ uri: selectedMovie.poster }}
                style={styles.poster}
                resizeMode="cover"
              />
            ) : (
              <View style={styles.noPoster}>
                <Text style={styles.noPosterText}>No Image</Text>
              </View>
            )}
          </View>

          <View style={styles.detailsContainer}>
            <Text style={styles.title}>{selectedMovie.title}</Text>
            <Text style={styles.year}>({selectedMovie.year})</Text>

            <View style={styles.ratingContainer}>
              <Text style={styles.rating}>
                ⭐ {selectedMovie.imdbRating || 'N/A'}
              </Text>
              <Text style={styles.duration}>{selectedMovie.duration}</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Director</Text>
              <Text style={styles.sectionContent}>
                {selectedMovie.director}
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Genre</Text>
              <Text style={styles.sectionContent}>
                {selectedMovie.genre?.join(', ') || 'Unknown'}
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Plot</Text>
              <Text style={styles.sectionContent}>{selectedMovie.plot}</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Cast</Text>
              <Text style={styles.sectionContent}>
                {selectedMovie.actors?.join(', ') || 'Unknown'}
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Language</Text>
              <Text style={styles.sectionContent}>
                {selectedMovie.language}
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Country</Text>
              <Text style={styles.sectionContent}>{selectedMovie.country}</Text>
            </View>

            {selectedMovie.awards && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Awards</Text>
                <Text style={styles.sectionContent}>
                  {selectedMovie.awards}
                </Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  animatedContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
    marginBottom: 16,
  },
  content: {
    padding: 16,
  },
  posterContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  poster: {
    width: 200,
    height: 300,
    borderRadius: 12,
  },
  noPoster: {
    width: 200,
    height: 300,
    borderRadius: 12,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noPosterText: {
    fontSize: 16,
    color: '#666',
  },
  detailsContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 4,
  },
  year: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  rating: {
    fontSize: 18,
    color: '#FF6B35',
    fontWeight: '600',
  },
  duration: {
    fontSize: 16,
    color: '#666',
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  sectionContent: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default MovieDetailScreen;
