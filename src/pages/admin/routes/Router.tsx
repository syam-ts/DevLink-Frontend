import { lazy } from "react";
import { Navigate } from "react-router-dom";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout/FullLayout.tsx"));
/****End Layouts*****/

/*****dashboard******/
const Dashboard = lazy(() => import("../views/dashboards/Dashboard1.js"));

/*****Tables******/ 
const ClientTable = lazy(() => import("../views/tables/ClientTable.js"));
const UserTable = lazy(() => import("../views/tables/UserTable.js"));

  
/*****Routes******/

const ThemeRoutes = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", element: <Navigate to="/admin/index/dashboard" /> },
      { path: "/dashboard",  element: <Dashboard /> }, //exact: true,
      { path: "/tables/user-table", element: <UserTable /> },
      { path: "/tables/client-table", element: <ClientTable /> } 
    ],
  },
];

export default ThemeRoutes;
