
import axios from 'axios';

const axiosInstance = axios.create({
  // Configurations globales (si nécessaire)
});

axiosInstance.interceptors.request.use(config => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem('clientToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default axiosInstance;
