import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux'; 

export const UserProtectedRoute = () => {
    const isUserAuth = useSelector((state: any) => state?.user?.isUser);
    const location = useLocation(); 
    console.log('Path : ', location.pathname);

    if (location.pathname.startsWith("/user/signup")) {
        console.log('Ener')
        return <Outlet />;
    }


    if (!isUserAuth) {
        return location.pathname === "/user/login" ? <Outlet /> : <Navigate to="/user/login?rt=user" replace />;
    }

    if (location.pathname.startsWith("/user/login")) {
        return <Navigate to="/user/home" replace />;
    }

    return <Outlet />;
};


export const ClientProtectedRoute = () => {
    const isClientAuth = useSelector((state: any) => state?.client?.isClient);
    const location = useLocation();

    //FIX NEEDED
    if (!isClientAuth) {
        return location.pathname !== "/login?rt=client" ? <Outlet /> : <Navigate to="/client/login?rt=client" replace />;
    }

    if (location.pathname.startsWith("/login?rt=client")) {
        return <Navigate to="/client/home" replace />;
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
