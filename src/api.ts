import axios from 'axios';

const apiClient = axios.create({
  baseURL: '',
  timeout: 5000,
  headers: {
    Authorization: 'Bearer ' + import.meta.env.VITE_TMDB_TOKEN,
  },
  withCredentials: true,
  responseType: 'json',
});

export default apiClient;
