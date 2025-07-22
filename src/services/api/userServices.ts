import axios from "axios";
import config from "../../helper/config";
import { apiUserInstance } from "@/api/axiosInstance/axiosUserInstance";

export const UserService = {
    
    loginUser: async (email: string, password: string) => {
        try {
            const { data } = await axios.post(
                `${config.VITE_SERVER_URL}/user/login`,
                { email, password },
                {
                    withCredentials: true,
                }
            );

            return data;
        } catch (error: unknown) {
            const err = error as { response: { data: { success: boolean } } };
            if (!err.response.data.success) {
                return err.response.data;
            }
        }
    },

    signupUser: async (name: string, password: string, email: string) => {
        try {
            const { data } = await axios.post(
                `${config.VITE_SERVER_URL}/user/signup`,
                {
                    name,
                    password,
                    email,
                }
            );

            return data;
        } catch (error: unknown) {
            const err = error as { response: { data: { success: boolean } } };
            if (!err.response.data.success) {
                return err.response.data;
            }
        }
    },

    getClients: async () => {
        try {
            const { data } = await apiUserInstance.get("/getHome", {
                withCredentials: true,
            });

            return data;
        } catch (error: unknown) {
            const err = error as { response: { data: { success: boolean } } };
            if (!err.response.data.success) {
                return err.response.data;
            }
        }
    },

    getProfileData: async () => {
        try {
            const { data } = await apiUserInstance.get(`/profile/user-view`, {
                withCredentials: true,
            });

            return data;
        } catch (error: unknown) {
            const err = error as { response: { data: { success: boolean } } };
            if (!err.response.data.success) {
                return err.response.data;
            }
        }
    },

    editProfile: async (data: any, type: string) => {
        try {
            const response = await apiUserInstance.put(
                `/profileAlter/${type}`,
                data,
                {
                    withCredentials: true,
                }
            );
            return response.data;
        } catch (error: unknown) {
            const err = error as { response: { data: { success: boolean } } };
            if (!err.response.data.success) {
                return err.response.data;
            }
        }
    },
};
