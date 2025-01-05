import axios from 'axios';


export const refreshToken = async () => {
    try{
        const response = await axios.get('http://localhost:3000/user/refresh-token',{
            withCredentials: true
        });
        const { accessToken } = response.data;

        //storing token to local storage
        localStorage.setItem('accessTokenU', accessToken);
        return accessToken;
    }catch(error) {
        console.error('Failed to refresh access token', error);
    }
}