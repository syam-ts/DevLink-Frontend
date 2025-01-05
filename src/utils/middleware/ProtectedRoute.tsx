import { Navigate , Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAccessToken } from "../../api/auth";
import LoginUser from '../../pages/user/LoginUser'


export const UserProctedRoute = () => { 
    const accessToken = localStorage.getItem("accessTokenU");
 
    if (accessToken) {
        console.log('ENTERED HERE 3: ')
        return <Outlet />;
    }
    return <LoginUser />
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




