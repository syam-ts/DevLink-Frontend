import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { AdminState, ClientState, UserState } from "../../config/state/allState";


// export const RootProtectedRoute = () => { 
//   const location = useLocation();  
//   console.log('The location: ',location)
 
//   if (location.pathname === "/login" && location.search === '?rt=user') {
//     const isUserAuth = useSelector((state: UserState) => state?.user?.isUser); 
//     if(isUserAuth) { 
//       return <Navigate to="/user/home" />;  
//     } 
//   } else if(location.pathname === "/login" && location.search === '?rt=client') {
//     const isClientAuth = useSelector((state: ClientState) => state?.client?.isClient); 
//     if(isClientAuth) { 
//       return <Navigate to="/client/home" />;  
//     } 
//   } else if(location.pathname === "/login" && location.search === '?rt=admin') {
//     const isAdminAuth = useSelector((state: AdminState) => state?.admin?.isAdmin); 
//     if(isAdminAuth) {
//       return <Navigate to="/admin" />;  
//     } 
//   }
 
//   return;
 
// };


export const UserProtectedRoute = () => {
  const isUserAuth = useSelector((state: UserState) => state?.user?.isUser); 
  const location = useLocation();  
 
  if (isUserAuth && location.pathname === "/login") {
    return <Navigate to="/user/home" />;  
  }
 
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
 
  const location = useLocation();  
  if (isAdminAuth && location.pathname === "/login") {
    return <Navigate to="/admin" />;  
  }
  return (
    isAdminAuth ? <Outlet/> : <Navigate to='/login?rt=admin'/>
  )
 
};
