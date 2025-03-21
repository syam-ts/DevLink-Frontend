import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { AdminState, ClientState, UserState } from "../../config/state/allState";

export const UserProtectedRoute = () => {
  const isUserAuth = useSelector((state: UserState) => state?.user?.isUser); 

  return (
    isUserAuth ? <Outlet/> : <Navigate to='/login?rt=user'/>
  )
 
};

export const ClientProtectedRoute = () => {
    const isClientAuth = useSelector((state: ClientState) => state?.client?.isClient);
   
  return (
    isClientAuth ? <Outlet/> : <Navigate to='/login?rt=client'/>
  )
  };

export const AdminProtectedRoute = () => {
  const isAdminAuth: boolean = useSelector((state: AdminState) => state.admin.isAdmin); 
  
  return (
    isAdminAuth ? <Outlet/> : <Navigate to='/login?rt=admin'/>
  )
 
};
