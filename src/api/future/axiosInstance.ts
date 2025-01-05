import axios from 'axios';
import { refreshToken } from './future/authUtil';


export const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true
});


axiosInstance.interceptors.request.use(
    (config) => {

        const accessToken = localStorage.getItem('accessTokenU') || '';
        if(accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


axiosInstance.interceptors.response.use(
    (response) => response,
    async(error) => {
        if(error.resonse && error.response.status === 401) {
            try{
                console.log('REACHED HERE......')
                // const newAccessToken = await refreshToken();
                // if(newAccessToken) {
                //     error.config.headers['Autharization'] = `Bearer ${newAccessToken}`;
                //     return axiosInstance(error.config);
                // }
                window.location.href = '/user/login';
            } catch(err) {
                console.error('Error refreshing token', err);
                window.location.href = '/user/login';
            }
        }
        return Promise.reject(error);
    }
)