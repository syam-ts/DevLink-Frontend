import axios from "axios";
import config from "../../config/helper/config";

export const ClientService = {
    loginClient: async (email: string, password: string) => {
        try {
            const { data } = await axios.post(
                `${config.VITE_SERVER_URL}/client/login`,
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

    signupClient: async (name: string, password: string, email: string) => {
        try {
            const { data } = await axios.post(
                `${config.VITE_SERVER_URL}/client/signup`,
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
