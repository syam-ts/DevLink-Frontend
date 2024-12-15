import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';

const Google = ({role}: any) => {

    const navigate = useNavigate();

    return (
        <GoogleLogin
            onSuccess={(credentialResponse: any) => {
                let credentialResponseDecode = jwtDecode(credentialResponse.credential)
                console.log(credentialResponseDecode);
                navigate(`/${role}/home`);

            }}

            
            onError={() => {
                console.log('Login Failed');
            }}
        />
    )
}


export default Google;
