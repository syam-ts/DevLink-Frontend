import axios from "axios";
import { signOutUser } from "../../redux/slices/userSlice";
import store from "../../redux/store/mainStore";

const BASE_SERVER_URL: string = import.meta.env.VITE_SERVER_URL;

export const apiUserInstance = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL}/user`,
  withCredentials: true,
});

// Request interceptor
apiUserInstance.interceptors.request.use(
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

apiUserInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    // const dispatch = useDispatch();
    const originalRequest = error.config;

    if (error.response?.status === 401) {
      if (originalRequest._retry) {
        console.log("Redirecting to login due to failed token refresh");
        localStorage.removeItem("accessToken");
        window.location.href = "/login?rt=user";
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      try {
        const { data } = await apiUserInstance.post(
          `${BASE_SERVER_URL}/user/refresh-token`
        );
        const { accessToken } = data;

        if (!accessToken) {
          throw new Error("No new access token received");
        }

        localStorage.setItem("accessToken", accessToken);
        apiUserInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessToken}`;

        return apiUserInstance(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token failed:", refreshError);

        localStorage.removeItem("accessToken");

        store.dispatch(signOutUser());
        window.location.href = "/login?rt=user";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
