import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import config from "../../../helper/config";
import { signOutAdmin } from "../../../redux/slices/adminSlice";

const Logout: React.FC = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        try {
            const logoutFunction = async () => {
                const response = await axios.post(
                    `${config.VITE_SERVER_URL}/admin/logout`,
                    {},
                    { withCredentials: true }
                );
                if (response.data.success) {
                    localStorage.removeItem("accessToken");
                    dispatch(signOutAdmin());
                    window.location.href = `${config.BASE_URL}/login?rt=admin`;
                }
            };
            logoutFunction();
        } catch (err) {
            console.log(err.message);
        }
    }, []);
    return <></>;
};

export default Logout;
