import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.15.2:5000/api',
  timeout: 8000,
});

export default api;
