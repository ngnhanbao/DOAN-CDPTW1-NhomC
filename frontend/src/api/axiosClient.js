import axios from 'axios';

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Gắn Token tự động vào header của mỗi request
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('hotel_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Xử lý lỗi trả về chung (401 hết hạn phiên đăng nhập)
axiosClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Có thể xóa token khi token hết hạn
      // localStorage.removeItem('hotel_token');
    }
    return Promise.reject(error.response?.data || error.message);
  }
);

export default axiosClient;

