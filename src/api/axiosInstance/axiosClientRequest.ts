import axios from 'axios';  
import { signOutClient } from '../../redux/slices/clientSlice';
import store from '../../redux/store/mainStore'

const BASE_SERVER_URL: string = import.meta.env.VITE_SERVER_URL;

 
 export const apiClientInstance = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL}/client`, 
  withCredentials: true,  
});

 

// Request interceptor
apiClientInstance.interceptors.request.use( 
  (config: any) => { 
   
    const token = localStorage.getItem('accessToken');   
    if (token) {
      if (!config.headers) {
        config.headers = {}; 
      }
      config.headers.Authorization = `Bearer ${token}`; 
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);



apiClientInstance.interceptors.response.use( 

    (response) => response, 
    async (error) => {    
      const originalRequest = error.config;
  
      if (error.response?.status === 401) {  
        if (originalRequest._retry) { 
          localStorage.removeItem('accessToken');
          window.location.href = '/login?rt=client';
          return Promise.reject(error);
        }
  
        originalRequest._retry = true;
  
        try {
          const { data } = await apiClientInstance.post(`${BASE_SERVER_URL}/client/refresh-token`);
          const { accessToken } = data;
  
          if (!accessToken) {
            throw new Error('No new access token received');
          }
  
          localStorage.setItem('accessToken', accessToken);
          apiClientInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  
          return apiClientInstance(originalRequest);
        } catch (refreshError) {
          console.error('Refresh token failed:', refreshError); 
        
          localStorage.removeItem('accessToken'); 
          store.dispatch(signOutClient());
          // window.location.href = '/login?rt=client'; 
          return Promise.reject(refreshError);
        }
      } 
      return Promise.reject(error);
    }
  );