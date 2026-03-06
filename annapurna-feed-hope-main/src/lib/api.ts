import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


// ================= REQUEST INTERCEPTOR =================
api.interceptors.request.use((config) => {

  const token = localStorage.getItem('annapurna_token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;

});


// ================= RESPONSE INTERCEPTOR =================
api.interceptors.response.use(

  (response) => response,

  (error) => {

    const isLoginRequest = error.config?.url?.includes('/auth/login');

    if (error.response?.status === 401 && !isLoginRequest) {

      localStorage.removeItem('annapurna_token');
      localStorage.removeItem('annapurna_user');

      window.location.href = '/login';

    }

    return Promise.reject(error);

  }

);

export default api;