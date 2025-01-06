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
        // Send refresh token request
        const response = await axios.post(
          'http://localhost:3000/user/refresh-token',
          {},
          { withCredentials: true }
        );
        const { accessToken } = response.data;

        // Update localStorage and retry the failed request
        localStorage.setItem('accessToken', accessToken);
        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
        return axiosInstance(originalRequest); // Retry the failed request
      } catch (refreshError) {
        // Handle refresh token failure (e.g., logout the user)
        console.error('Refresh token failed:', refreshError);
        localStorage.removeItem('accessToken');

        window.location.href = '/user/login'; // Redirect to login page
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
