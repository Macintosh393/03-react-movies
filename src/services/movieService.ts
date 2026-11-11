import type { Movie } from '../types/movie';
import apiClient from '../api';

type apiResponse<T> = {
  results: T[];
};

export const fetchMovies = async (query: string): Promise<Movie[]> => {
  const response = await apiClient.get<apiResponse<Movie>>('/search/movie', {
    params: {
      adult: false,
      language: 'en-US',
      page: 1,
      query,
    },
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + import.meta.env.VITE_TMDB_TOKEN,
    },
  });

  return response.data.results;
};
