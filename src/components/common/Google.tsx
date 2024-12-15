import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Google = ({role}: any) => {

    const navigate = useNavigate();
 

    return (
        <GoogleLogin
            onSuccess={async (credentialResponse: any) => {
                try {
                    let credentialResponseDecode: any = jwtDecode(credentialResponse.credential)
                    let data = {email: credentialResponseDecode.email, name: credentialResponseDecode.given_name}
                console.log(credentialResponseDecode.email, 'and ',credentialResponseDecode.name );
                const response = await axios.post(`http://localhost:3000/${role}/googleLogin`,data );
                console.log(response.data.message);
                 navigate(`/${role}/home`);
                } catch (error) {
                    console.log('ERROR: ',error);
                }

            }}

            
            onError={() => {
                console.log('Login Failed');
            }}
        />
    )
}


export default Google;
