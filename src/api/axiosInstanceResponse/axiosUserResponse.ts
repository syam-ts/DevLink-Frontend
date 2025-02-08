import { useDispatch } from 'react-redux';
import {apiUserInstance} from '../axiosInstance/axiosUserInstance';
import { signOutUser } from '../../utils/redux/slices/userSlice';

const BASE_SERVER_URL: string = import.meta.env.VITE_SERVER_URL;
 
const dispatch = useDispatch();

// Response interceptor
export default apiUserInstance.interceptors.response.use(


    (response) => response, 
    async (error) => {  
      console.log('reched here')
      const originalRequest = error.config;
  
      if (error.response?.status === 401) { 
        console.log('again reache ')
        if (originalRequest._retry) {
          console.log('Redirecting to login due to failed token refresh');
          localStorage.removeItem('accessToken');
          window.location.href = '/login/user';
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

          //  dispatch(signOutUser());
          window.location.href = '/login/user'; 
          return Promise.reject(refreshError);
        }
      } 
      return Promise.reject(error);
    }
  );