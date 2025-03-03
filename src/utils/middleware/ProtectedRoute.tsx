import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export const UserProtectedRoute = () => {
  const isUserAuth = useSelector((state: any) => state?.user?.isUser);
  const location = useLocation();

  if (location.pathname.startsWith("/user/signup")) {
    return <Outlet />;
  }

  if (!isUserAuth) {
    return location.pathname === "/user/login" ? (
      <Outlet />
    ) : (
      <Navigate to="/user/login?rt=user" replace />
    );
  }

  if (location.pathname.startsWith("/user/login")) {
    return <Navigate to="/user/home" replace />;
  }

  return <Outlet />;
};

export const ClientProtectedRoute = () => {
    const isClientAuth = useSelector((state: any) => state?.client?.isClient);
    const location = useLocation();
  
    if (location.pathname.startsWith("/clien/signup")) {
      return <Outlet />;
    }
  
    if (!isClientAuth) {
      return location.pathname === "/clien/login" ? (
        <Outlet />
      ) : (
        <Navigate to="/clien/login?rt=clien" replace />
      );
    }
  
    if (location.pathname.startsWith("/clien/login")) {
      return <Navigate to="/clien/home" replace />;
    }
  
    return <Outlet />;
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
