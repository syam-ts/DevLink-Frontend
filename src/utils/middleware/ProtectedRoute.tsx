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

 
 


export const protectedRoute = () => {

    const isUserAuth = useSelector((state: any) => state.currentUser.user.isUser);
    const isClientAuth = useSelector((state: any) => state.currentClient.client.isClient);

    if(isClientAuth) {
        return <Navigate to='/client/home' />
    } else if(isUserAuth) {
        return <Navigate to='/user/home' />
    } else {
        return <Outlet />
    }
};




