import axios from 'axios'; 

 
 export const apiClientInstance = axios.create({
  baseURL: `${import.meta.env.BASE_URL}/client`, 
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