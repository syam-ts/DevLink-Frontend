import { lazy } from "react";
import { Navigate } from "react-router-dom";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout/FullLayout.tsx"));
/****End Layouts*****/

/*****Pages******/
const Dashboard1 = lazy(() => import("../views/dashboards/Dashboard1.js"));

/*****Tables******/ 
const ClientTable = lazy(() => import("../views/tables/ClientTable.js"));
const UserTable = lazy(() => import("../views/tables/UserTable.js"));

 
  
 
/*****Routes******/

const ThemeRoutes = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      // { path: "/", element: <Navigate to="dashboards/dashboard1" /> },
      { path: "/", exact: true, element: <Dashboard1 /> },
      { path: "/tables/user-table", element: <UserTable /> },
      { path: "/tables/client-table", element: <ClientTable /> } 
    ],
  },
];

export default ThemeRoutes;
