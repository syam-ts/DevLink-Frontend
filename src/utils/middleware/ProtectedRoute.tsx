import { Navigate , Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';



export const UserProctedRoute = () => {
    const isUserAuth = useSelector((state: any) => state?.currentUser?.user?.isUser);
    console.log('The user : ', isUserAuth)
    return isUserAuth === undefined ? <Outlet /> : <Navigate to="/user/login" />;
};

export const ClientProctedRoute = () => {
    const isClientAuth = useSelector((state: any) => state?.currentClient?.client?.isClient);
    console.log('The user : ', isClientAuth)
    return isClientAuth === undefined ? <Outlet /> : <Navigate to="/client/login" />;
};

 

export const AdminProctedRoute = () => {
    const isAdminAuth = useSelector((state: any) => state?.currentAdmin?.admin?.isAdmin);
    console.log('The admin : ', isAdminAuth)
    return isAdminAuth === undefined ? <Outlet /> : <Navigate to="/admin/login" />;
};

 
 


export const protectedRoute = () => {

    const isUserAuth = useSelector((state: any) => state.currentUser.user.isUser);
    const isClientAuth = useSelector((state: any) => state.currentClient.client.isClient);
    const isAdminAuth = useSelector((state: any) => state.currentAdmin.admin.isAdmin);

    if(isClientAuth) {
        return <Navigate to='/client/home' />
    } else if(isUserAuth) {
        return <Navigate to='/user/home' /> 
    } else if(isAdminAuth) {
        return <Navigate to='/admin/home' />
    } else {
        return <Outlet />
    }
};




