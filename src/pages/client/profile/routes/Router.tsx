import React, { lazy } from "react";
import { Navigate } from "react-router-dom";
import { Suspense } from "react";
import JobProposals from "../../JobProposal.tsx";
 

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout/FullLayout.tsx"));
/****End Layouts*****/

/*****Profile******/
const Profile = lazy(() => import("../../Profile.js"));


/*****wallet******/
const JobProposal = lazy(() => import("../../JobProposal.tsx"));

const Wallet = lazy(() => import("../views/extra/WalletUser.tsx"));
 

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
      { path: "/", element: <Navigate to="/client/profile" /> },
      { path: "/view",  element: (
        <Suspense fallback={<div>Loading...</div>}>
          <Profile />
        </Suspense>
      )}, 
      { path: "/proposals", element:( 
      
        <Suspense fallback={<div>Loading...</div>}>
          <JobProposal />
        </Suspense>
      ) } ,
      { path: "/wallet", element:( 
      
        <Suspense fallback={<div>Loading...</div>}>
          <Wallet />
        </Suspense>
      ) } ,
      { path: "/notifications", element:( 
      
        <Suspense fallback={<div>Loading...</div>}>
          <Notifications />
        </Suspense>
      ) } 
    ],
  },
];

export default ThemeRoutes;
