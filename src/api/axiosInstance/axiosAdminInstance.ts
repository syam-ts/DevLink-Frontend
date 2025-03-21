import axios from "axios";
import { signOutAdmin } from "../../redux/slices/adminSlice";
import store from "../../redux/store/mainStore";

const BASE_SERVER_URL: string = import.meta.env.VITE_SERVER_URL;

export const apiAdminInstance = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL}/admin`,
  withCredentials: true,
});

// Request interceptor
apiAdminInstance.interceptors.request.use(
  (config: any) => {
    const token = localStorage.getItem("accessToken"); 
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

apiAdminInstance.interceptors.response.use(
  (response) => response,
  async (error) => { 
    const originalRequest = error.config;

    if (error.response?.status === 401) {
      if (originalRequest._retry) {
        console.log("Redirecting to login due to failed token refresh");
        localStorage.removeItem("accessToken");
        window.location.href = "/login?rt=admin";
        return Promise.reject(error);
      }

      originalRequest._retry = true; 
      try {
        const { data } = await apiAdminInstance.post(
          `${BASE_SERVER_URL}/admin/refresh`
        );
        const { accessToken } = data;

        if (!accessToken) {
          throw new Error("No new access token received");
        }

        localStorage.setItem("accessToken", accessToken);
        apiAdminInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessToken}`;

        return apiAdminInstance(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token failed:", refreshError);

        localStorage.removeItem("accessToken");

        store.dispatch(signOutAdmin());
        window.location.href = "/login?rt=admin";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
