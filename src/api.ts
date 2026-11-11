import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  timeout: 5000,
});

export default apiClient;
