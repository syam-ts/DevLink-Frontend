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

const Requests = lazy(() => import('../views/extra/Requests.tsx'));


const Contracts = lazy(() => import('../views/extra/Contracts.tsx'))
const Wallet = lazy(() => import('../views/extra/Wallet.tsx'))


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
      { path: "/requests", element:( 
      
        <Suspense fallback={<div>Loading...</div>}>
          <Requests />
        </Suspense>
      ) },
      { path: "/wallet", element:( 
      
        <Suspense fallback={<div>Loading...</div>}>
          <Wallet />
        </Suspense>
      ) }, 
      { path: "/contracts", element:( 
      
        <Suspense fallback={<div>Loading...</div>}>
          <Contracts />
        </Suspense>
      ) } 
    ],
  },
];

export default ThemeRoutes;
