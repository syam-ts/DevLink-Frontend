import axios from 'axios'; 

 
 const api = axios.create({
  baseURL: 'http://localhost:3000', 
  withCredentials: true,  
});

  

// Request interceptor
api.interceptors.request.use(
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


// Response interceptor
api.interceptors.response.use(
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
        const { data } = await api.post('http://localhost:3000/user/refresh-token');
        const { accessToken } = data;

        if (!accessToken) {
          throw new Error('No new access token received');
        }

        localStorage.setItem('accessToken', accessToken);
        api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        console.error('Refresh token failed:', refreshError); 
      
        localStorage.removeItem('accessToken');
        window.location.href = '/landingpage'; 
        return Promise.reject(refreshError);
      }
    } 
    return Promise.reject(error);
  }
);


 

export default api;
