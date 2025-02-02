import axios from 'axios';

 
 const api = axios.create({
  baseURL: 'http://localhost:3000', 
  withCredentials: true,  
});

 

//User

// Request interceptor
api.interceptors.request.use(
  (config: any) => {
    
    const token = localStorage.getItem('accessToken');  
    console.log('the tkn : ', token)
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

    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { data } = await api.post('http://localhost:3000/user/refresh-token'); 
        const { accessToken } = data;
        localStorage.setItem('accessToken', accessToken);
        api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  
 
        return api(originalRequest);
      } catch (refreshError) { 
        localStorage.removeItem('accessToken');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);


 

export default api;
