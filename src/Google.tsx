import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

const Google = () => {

    return (
        <GoogleLogin
            onSuccess={(credentialResponse: any) => {
                let credentialResponseDecode = jwtDecode(credentialResponse.credential)
                console.log(credentialResponseDecode);
            }}

            
            onError={() => {
                console.log('Login Failed');
            }}
        />
    )
}


export default Google;
