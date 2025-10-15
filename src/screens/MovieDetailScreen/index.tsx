import React, { useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LoadingSpinner from '../../components/LoadingSpinner';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useMovieDetail } from '../../hooks/useMovieDetail';
import { ANIMATION } from '../../const';
import { LOADING_MESSAGES, UI_TEXT, MOVIE_SECTIONS } from '../../const/strings';

import { styles } from './styles';

type MovieDetailScreenProps = StackScreenProps<
  RootStackParamList,
  'MovieDetail'
>;

const MovieDetailScreen = ({ navigation, route }: MovieDetailScreenProps) => {
  const { movieId } = route.params;
  const { selectedMovie, loading } = useMovieDetail(movieId);

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <LoadingSpinner message={LOADING_MESSAGES.MOVIE_DETAILS} />
      </SafeAreaView>
    );
  }

  if (!selectedMovie) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{UI_TEXT.MOVIE_NOT_FOUND}</Text>
          <TouchableOpacity style={styles.backButton} onPress={goBack}>
            <Text style={styles.backButtonText}>{UI_TEXT.GO_BACK}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <Animated.View
      style={styles.animatedContainer}
      entering={FadeInDown.delay(ANIMATION.fast).springify()}
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
                <Text style={styles.noPosterText}>{UI_TEXT.NO_IMAGE}</Text>
              </View>
            )}
          </View>

          <View style={styles.detailsContainer}>
            <Text style={styles.title}>{selectedMovie.title}</Text>
            <Text style={styles.year}>({selectedMovie.year})</Text>

            <View style={styles.ratingContainer}>
              <Text style={styles.rating}>
                ⭐ {selectedMovie.imdbRating || UI_TEXT.NOT_AVAILABLE}
              </Text>
              <Text style={styles.duration}>{selectedMovie.duration}</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{MOVIE_SECTIONS.DIRECTOR}</Text>
              <Text style={styles.sectionContent}>
                {selectedMovie.director}
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{MOVIE_SECTIONS.GENRE}</Text>
              <Text style={styles.sectionContent}>
                {selectedMovie.genre?.join(', ') || UI_TEXT.UNKNOWN}
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{MOVIE_SECTIONS.PLOT}</Text>
              <Text style={styles.sectionContent}>{selectedMovie.plot}</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{MOVIE_SECTIONS.CAST}</Text>
              <Text style={styles.sectionContent}>
                {selectedMovie.actors?.join(', ') || UI_TEXT.UNKNOWN}
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{MOVIE_SECTIONS.LANGUAGE}</Text>
              <Text style={styles.sectionContent}>
                {selectedMovie.language}
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{MOVIE_SECTIONS.COUNTRY}</Text>
              <Text style={styles.sectionContent}>{selectedMovie.country}</Text>
            </View>

            {selectedMovie.awards && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>{MOVIE_SECTIONS.AWARDS}</Text>
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

export default MovieDetailScreen;
