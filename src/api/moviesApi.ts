import { AxiosError } from 'axios';
import { apiClient, getErrorMessage, API_CONFIG } from './client';
import { Movie } from '../types/Movie';
import { TMDBMovie, TMDBMovieDetails } from '../types/TMDBTypes';
import { API } from '../const';
import { GENRE_MAP, UI_TEXT } from '../const/strings';

const getGenreName = (genreId: number): string => {
  return GENRE_MAP[genreId as keyof typeof GENRE_MAP] || UI_TEXT.UNKNOWN;
};

const transformMovieData = (movie: TMDBMovie): Movie => ({
  id: movie.id,
  title: movie.title,
  year: new Date(movie.release_date).getFullYear(),
  director: 'Unknown',
  genre: movie.genre_ids.map((id: number) => getGenreName(id)),
  plot: movie.overview,
  poster: movie.poster_path ? `${API_CONFIG.TMDB_IMAGE_BASE_URL}${movie.poster_path}` : '',
  duration: 'Unknown',
  language: movie.original_language,
  country: 'Unknown',
  awards: '',
  actors: [],
  imdbRating: movie.vote_average
});

const transformDetailedMovieData = (movie: TMDBMovieDetails): Movie => ({
  id: movie.id,
  title: movie.title,
  year: new Date(movie.release_date).getFullYear(),
  director: movie.credits?.crew?.find((person) => person.job === 'Director')?.name || 'Unknown',
  genre: movie.genres?.map((g) => g.name) || [],
  plot: movie.overview,
  poster: movie.poster_path ? `${API_CONFIG.TMDB_IMAGE_BASE_URL}${movie.poster_path}` : '',
  duration: movie.runtime ? `${movie.runtime} min` : 'Unknown',
  language: movie.original_language,
  country: movie.production_countries?.[API.firstCountryIndex]?.name || UI_TEXT.UNKNOWN,
  awards: '',
  actors: movie.credits?.cast?.slice(API.firstCountryIndex, API.maxCastMembers).map((actor) => actor.name) || [],
  imdbRating: movie.vote_average
});

export const fetchPopularMovies = async (page: number = API.defaultPage): Promise<{ movies: Movie[]; totalPages: number; currentPage: number }> => {
  try {
    const response = await apiClient.get('/movie/popular', {
      params: {
        page,
        language: 'en-US',
        region: 'US',
      },
    });
    
    return {
      movies: response.data.results.map(transformMovieData),
      totalPages: response.data.total_pages,
      currentPage: response.data.page,
    };
  } catch (error) {
    throw new Error(getErrorMessage(error as AxiosError));
  }
};

export const fetchMovieById = async (id: number): Promise<Movie> => {
  try {
    const response = await apiClient.get(`/movie/${id}`, {
      params: {
        language: 'en-US',
        append_to_response: 'credits',
      },
    });
    
    return transformDetailedMovieData(response.data);
  } catch (error) {
    throw new Error(getErrorMessage(error as AxiosError));
  }
};

export const searchMovies = async (query: string, page: number = API.defaultPage): Promise<{ movies: Movie[]; totalPages: number; currentPage: number }> => {
  try {
    const response = await apiClient.get('/search/movie', {
      params: {
        query,
        language: 'en-US',
        page,
      },
    });
    
    return {
      movies: response.data.results.map(transformMovieData),
      totalPages: response.data.total_pages,
      currentPage: response.data.page,
    };
  } catch (error) {
    throw new Error(getErrorMessage(error as AxiosError));
  }
};
