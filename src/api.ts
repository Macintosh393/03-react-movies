import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  timeout: 5000,
  headers: {
    Accept: 'application/json',
    Authorization: 'Bearer ' + import.meta.env.VITE_TMDB_TOKEN,
  },
  withCredentials: true,
  responseType: 'json',
});

export default apiClient;
