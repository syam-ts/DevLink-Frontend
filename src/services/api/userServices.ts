import axios from "axios";
import config from "../../config/helper/config";

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

    signupUser: async (
        name: string,
        password: string,
        email: string, 
    ) => {
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
};
