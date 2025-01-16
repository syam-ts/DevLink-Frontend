import { Navigate , Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux'; 
import LoginUser from '../../pages/user/LoginUser'
import axiosInstance from '../../api/axiosInstance'
import { useEffect, useState } from 'react';


export const UserProctedRoute = () => { 
  const isUserAuth = useSelector((state: any) => state?.user?.isUser);
  const user = useSelector((state: any) => state?.user?.isUser)
  console.log('THE USER : ', user)
     
  return isUserAuth !== undefined ? <Outlet /> : <Navigate to="/user/login" />;
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




