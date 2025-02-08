import {apiUserInstance} from '../axiosInstanceRequest/axiosUserRequest';

const BASE_SERVER_URL: string = import.meta.env.VITE_SERVER_URL;
 

// Response interceptor
apiUserInstance.interceptors.response.use(
    (response) => response,
    async (error) => {  
      const originalRequest = error.config;
  
      if (error.response?.status === 401) { 
        if (originalRequest._retry) {
          console.log('Redirecting to /landingpage due to failed token refresh');
          localStorage.removeItem('accessToken');
          window.location.href = '/landingpage';
          return Promise.reject(error);
        }
  
        originalRequest._retry = true;
  
        try {
          const { data } = await apiUserInstance.post(`${BASE_SERVER_URL}/user/refresh-token`);
          const { accessToken } = data;
  
          if (!accessToken) {
            throw new Error('No new access token received');
          }
  
          localStorage.setItem('accessToken', accessToken);
          apiUserInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  
          return apiUserInstance(originalRequest);
        } catch (refreshError) {
          console.error('Refresh token failed:', refreshError); 
        
          localStorage.removeItem('accessToken');
          window.location.href = '/login/user'; 
          return Promise.reject(refreshError);
        }
      } 
      return Promise.reject(error);
    }
  );