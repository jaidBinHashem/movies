import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

// TMDb API Configuration
const TMDB_API_KEY = 'YOUR_TMDB_API'; // this should be stored securely in env variables
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

// Create axios instance with configuration
const createApiClient = (): AxiosInstance => {
  const client = axios.create({
    baseURL: TMDB_BASE_URL,
    timeout: 10000, // 10 seconds timeout
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    params: {
      api_key: TMDB_API_KEY,
    },
  });

  // Request interceptor
  client.interceptors.request.use(
    config => {
      return config;
    },
    error => {
      console.error('❌ Request Error:', error);
      return Promise.reject(error);
    },
  );

  // Response interceptor
  client.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    (error: AxiosError) => {
      // Handle specific error cases
      if (error.response?.status === 401) {
        console.error('API Key invalid or expired');
      } else if (error.response?.status === 429) {
        console.error('Rate limit exceeded');
      } else if (error.code === 'ECONNABORTED') {
        console.error('⏱Request timeout');
      } else if (!error.response) {
        console.error('Network error - check internet connection');
      }

      return Promise.reject(error);
    },
  );

  return client;
};

export const apiClient = createApiClient();

// Helper function to get user-friendly error messages
export const getErrorMessage = (error: AxiosError): string => {
  if (error.response) {
    // Server responded with error status
    switch (error.response.status) {
      case 401:
        return 'Invalid API key. Please check your TMDb API key.';
      case 404:
        return 'Movie not found.';
      case 429:
        return 'Too many requests. Please try again later.';
      case 500:
        return 'Server error. Please try again later.';
      default:
        return `Server error: ${error.response.status} ${error.response.statusText}`;
    }
  } else if (error.request) {
    // Request was made but no response received
    return 'Network error. Please check your internet connection.';
  } else {
    // Something else happened
    return error.message || 'An unexpected error occurred.';
  }
};

// Export API configuration constants
export const API_CONFIG = {
  TMDB_API_KEY,
  TMDB_BASE_URL,
  TMDB_IMAGE_BASE_URL,
} as const;
