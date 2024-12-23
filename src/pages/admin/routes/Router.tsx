import React, { lazy } from "react";
import { Navigate } from "react-router-dom";
import { Suspense } from "react";
 

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout/FullLayout.tsx"));
/****End Layouts*****/

/*****dashboard******/
const Dashboard = lazy(() => import("../views/dashboards/Dashboard1.js"));

/*****Tables******/ 
const ClientTable = lazy(() => import("../views/tables/ClientTable.js"));
const UserTable = lazy(() => import("../views/tables/UserTable.js"));

const Notifications = lazy(() => import('../views/extra/Notifications.tsx'))


/*****Routes******/

const ThemeRoutes = [
  {
    path: "/",
    element: (
    
      <Suspense fallback={<div>Loading...</div>}>
        <FullLayout />
      </Suspense>
    ),
    children: [
      { path: "/", element: <Navigate to="/admin/index/dashboard" /> },
      { path: "/dashboard",  element: (
        <Suspense fallback={<div>Loading...</div>}>
          <Dashboard />
        </Suspense>
      )}, //exact: true,
      { path: "/tables/user-table", element: (
      
        <Suspense fallback={<div>Loading...</div>}>
          <UserTable />
        </Suspense>
      ) },
      { path: "/tables/client-table", element:(
        
      
        <Suspense fallback={<div>Loading...</div>}>
          <ClientTable />
        </Suspense>
      ) },
      { path: "/notifications", element:( 
      
        <Suspense fallback={<div>Loading...</div>}>
          <Notifications />
        </Suspense>
      ) } 
    ],
  },
];

export default ThemeRoutes;
