import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInUser } from '../../utils/redux/slices/userSlice' 
import { useDispatch } from 'react-redux';

import axios from 'axios';

const Google = ({role}: any) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    return (
        <GoogleLogin
            onSuccess={async (credentialResponse: any) => {
                try {
                    let credentialResponseDecode: any = jwtDecode(credentialResponse.credential)
                    let data = {email: credentialResponseDecode.email, name: credentialResponseDecode.given_name, password: credentialResponseDecode.jti}
                console.log(credentialResponseDecode.email, 'and ',credentialResponseDecode.name , 'whole data : ', credentialResponseDecode);
                const response = await axios.post(`http://localhost:3000/${role}/googleLogin`,data,  {
                    withCredentials: true,  
                  } );
                console.log(response.data.message);
                 if(response.data.success) {
                       dispatch(signInUser(response.data))
                    navigate(`/${role}/home`);
                 }
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
