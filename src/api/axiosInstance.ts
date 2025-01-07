import axios from 'axios';

 
 const axiosInstanceUser = axios.create({
  baseURL: 'http://localhost:3000/user', 
  withCredentials: true,  
});

 
 const axiosInstanceClient = axios.create({
  baseURL: 'http://localhost:3000/client', 
  withCredentials: true,  
});

 
 const axiosInstanceAdmin = axios.create({
  baseURL: 'http://localhost:3000/admin', 
  withCredentials: true,  
});


//User

// Request interceptor
axiosInstanceUser.interceptors.request.use(
  (config) => {
    const accessTokenU = localStorage.getItem('accessTokenU'); 
    if (accessTokenU) {
      config.headers['Authorization'] = `Bearer ${accessTokenU}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstanceUser.interceptors.response.use(
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
        const { accessTokenU } = response.data;

       
        localStorage.setItem('accessTokenU', accessTokenU);
        originalRequest.headers['Authorization'] = `Bearer ${accessTokenU}`;
        return axiosInstanceUser(originalRequest);  
      } catch (refreshError) {
      
        console.error('Refresh token failed:', refreshError);
        localStorage.removeItem('accessTokenU');

        window.location.href = '/user/login';  
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);


//Client
// Request interceptor
axiosInstanceClient.interceptors.request.use(
  (config) => {
    const accessTokenC = localStorage.getItem('accessTokenC'); 
    if (accessTokenC) {
      config.headers['Authorization'] = `Bearer ${accessTokenC}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstanceClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
 
        const response = await axios.post(
          'http://localhost:3000/client/refresh-token',
          {},
          { withCredentials: true }
        );
        const { accessTokenC } = response.data;

       
        localStorage.setItem('accessTokenC', accessTokenC);
        originalRequest.headers['Authorization'] = `Bearer ${accessTokenC}`;
        return axiosInstanceUser(originalRequest);  
      } catch (refreshError) {
      
        console.error('Refresh token failed:', refreshError);
        localStorage.removeItem('accessTokenC');

        window.location.href = '/client/login';  
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);



//Admin
// Request interceptor
axiosInstanceAdmin.interceptors.request.use(
  (config) => {
    const accessTokenA = localStorage.getItem('accessTokenA'); 
    if (accessTokenA) {
      config.headers['Authorization'] = `Bearer ${accessTokenA}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstanceAdmin.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
 
        const response = await axios.post(
          'http://localhost:3000/admin/refresh-token',
          {},
          { withCredentials: true }
        );
        const { accessTokenA } = response.data;

       
        localStorage.setItem('accessTokenA', accessTokenA);
        originalRequest.headers['Authorization'] = `Bearer ${accessTokenA}`;
        return axiosInstanceUser(originalRequest);  
      } catch (refreshError) {
      
        console.error('Refresh token failed:', refreshError);
        localStorage.removeItem('accessTokenA');

        window.location.href = '/admin/login';  
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default {
  axiosInstanceUser,
  axiosInstanceClient,
  axiosInstanceAdmin,
};
