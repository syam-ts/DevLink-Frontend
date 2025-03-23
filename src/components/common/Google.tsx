import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { signInUser } from "../../redux/slices/userSlice";
import { useDispatch } from "react-redux";
import { signInClient } from "../../redux/slices/clientSlice";
import config from "../../config/helper/config";
import axios from "axios";

interface GoogleProps {
  role: string
};

const Google: React.FC<GoogleProps> = ({ role }) => {
  const navigate = useNavigate(),
    dispatch = useDispatch();
 
  return (
    <GoogleLogin
      onSuccess={async (credentialResponse) => {
        try {
          interface Credentials {
            email: string
            given_name: string
            jti: string
          };
          let credentialResponseDecode: Credentials = jwtDecode(
            credentialResponse.credential
          );
          let data = {
            email: credentialResponseDecode.email,
            name: credentialResponseDecode.given_name,
            password: credentialResponseDecode.jti,
          };

          const response = await axios.post(
            `${config.VITE_SERVER_URL}/${role}/googleLogin`,
            data,
            {
              withCredentials: true,
            }
          ); 

          if (response.data.success) {
            const { accessToken } = response.data;
            localStorage.setItem("accessToken", accessToken);
           if(role === 'user') {
            dispatch(signInUser(response.data.user));
            navigate(`/user/home`);
           } else {
            dispatch(signInClient(response.data.client));
            navigate(`/client/home`);
           }
          }
        } catch (error) {
          console.log("ERROR: ", error);
        }
      }}
      onError={() => {
        console.log("Login Failed");
      }}
    />
  );
};

export default Google;
