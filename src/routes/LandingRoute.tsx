import React from "react";
import LandingPage from "../pages/publicPages/LandingPage";
import Role from "../pages/publicPages/Role"; 
import { Routes, Route } from 'react-router-dom';
import OtpVerify from "../pages/publicPages/OtpVerify";  
import NotFound from "../pages/404/NotFound";
import LoginComponent from "../components/common/LoginComponent";
import SignupComponent from "../components/common/SignupComponent";



const LandingRoute: React.FC = () => {
 
 

    return (
        <>  
            <Routes>
                <Route path='/' element={<LandingPage />} />
                <Route path='*' element={<NotFound />} />
                <Route path='/rt' element={<Role />} /> 
                <Route path='/login' element={<LoginComponent />} />
               <Route path='/signup' element={<SignupComponent />} />
                <Route path='/verify-otp' element={<OtpVerify />} /> 
      {/* VERIFY EMAIL & RESET PASSWORD ROUTE PENDING */}
                {/* <Route path='/verify-otp' element={<OtpVerify />} /> 
                <Route path='/verify-otp' element={<OtpVerify />} />  */}
            </Routes>  
        </>
    )
};


export default LandingRoute;

