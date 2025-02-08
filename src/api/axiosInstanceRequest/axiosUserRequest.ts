import axios from 'axios';  
 
 export const apiUserInstance = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL}/user`, 
  withCredentials: true,  
});

 

// Request interceptor
apiUserInstance.interceptors.request.use(
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