import axios from 'axios';

 
export const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000', 
  withCredentials: true,  
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken'); 
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
 
        const response = await axios.post(
          'http://localhost:3000/user/refresh-token',
          {},
          { withCredentials: true }
        );
        const { accessToken } = response.data;

       
        localStorage.setItem('accessToken', accessToken);
        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
        return axiosInstance(originalRequest);  
      } catch (refreshError) {
      
        console.error('Refresh token failed:', refreshError);
        localStorage.removeItem('accessToken');

        window.location.href = '/user/login';  
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
