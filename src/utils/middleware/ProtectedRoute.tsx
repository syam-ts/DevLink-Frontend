import { Navigate , Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';



export const UserProctedRoute = () => {
    const isUserAuth = useSelector((state: any) => state.currentUser.user.isUser);
    return (
        isUserAuth ? <Outlet /> : <Navigate to='/user/login' />
    )
}


export const ClientProctedRoute = () => {
    const isClientAuth = useSelector((state: any) => state.currentClient.client.isClient);
    return (
        isClientAuth ? <Outlet /> : <Navigate to='/client/login' />
    )
}