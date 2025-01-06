import { Navigate , Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAccessToken } from "../../api/auth";
import LoginUser from '../../pages/user/LoginUser'
import axiosInstance from '../../api/axiosInstance'
import { useEffect, useState } from 'react';


export const UserProctedRoute = () => { 
    const [isAuthenticated, setIsAuthenticated]: any = useState(null); // null for loading state

    useEffect(() => {
      const validateToken = async () => {
        try {
          const accessToken = localStorage.getItem('accessTokenU');
          if (!accessToken) throw new Error('No token found');
  
          // Send a request to the backend to validate the token
          await axiosInstance.get('/user/auth/validate-token', {
            headers: { Authorization: `Bearer ${accessToken}` },
          });
  
          setIsAuthenticated(true);
        } catch (error: any) {
          console.error('Token validation failed:', error.message);
          setIsAuthenticated(false);
        }
      };
  
      validateToken();
    }, []);
  
    // Show a loading indicator while checking authentication
    if (isAuthenticated === null) {
      return <div>Loading...</div>;
    }
  
    // Navigate to login if not authenticated
    if (!isAuthenticated) {
      return <LoginUser />;
    }
  
    // Render protected route if authenticated
    return <Outlet />;
};

export const ClientProctedRoute = () => {
    const isClientAuth = useSelector((state: any) => state?.currentClient?.client?.isClient);
     
    return isClientAuth === undefined ? <Outlet /> : <Navigate to="/client/login" />;
};

 

export const AdminProctedRoute = () => {
    const isAdminAuth = useSelector((state: any) => state?.admin?.isAdmin);
   
    return isAdminAuth !== undefined ? <Outlet /> : <Navigate to="/admin/login" />;
};

 
 


export const protectedRoute = () => {

    const isUserAuth = useSelector((state: any) => state.currentUser.user.isUser);
    const isClientAuth = useSelector((state: any) => state.currentClient.client.isClient);
    const isAdminAuth = useSelector((state: any) => state?.admin?.isAdmin);

    if(isClientAuth) {
        return <Navigate to='/client/home' />
    } else if(isUserAuth) {
        return <Navigate to='/user/home' /> 
    } else if(isAdminAuth) {
        return <Navigate to='/admin/index/dashboard' />
    } else {
        return <Outlet />
    }
};




