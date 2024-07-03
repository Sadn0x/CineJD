import axios from 'axios';

const API_KEY = 'c310926470917dc2ec5866e960990e81'; 
const BASE_URL = 'https://api.themoviedb.org/3';

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'pt-BR',
    region: 'BR'
  },
});

export default api;