import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { ClientState, UserState } from "../../config/state/allState";

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
  //     const isAdminAuth = useSelector((state: any) => state?.admin?.isAdmin);

  //     return isAdminAuth ? <Outlet /> : <Navigate to="/admin/login" replace />;
  // };

  // export const ProtectedRoute = () => {
  //     const isUserAuth = useSelector((state: any) => state?.user?.isUser);
  //     const isClientAuth = useSelector((state: any) => state?.client?.isClient);
  //     const isAdminAuth = useSelector((state: any) => state?.admin?.isAdmin);

  //     if (isClientAuth) {
  //         return <Navigate to="/client/home" replace />;
  //     } else if (isUserAuth) {
  //         return <Navigate to="/user/home" replace />;
  //     } else if (isAdminAuth) {
  //         return <Navigate to="/admin/index/dashboard" replace />;
  //     }

  return <Outlet />;
};
