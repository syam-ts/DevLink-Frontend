import React from "react";
import LandingPage from "../pages/publicPages/LandingPage";
import Role from "../pages/publicPages/Role"; 
import { Routes, Route } from 'react-router-dom';
import OtpVerify from "../pages/publicPages/OtpVerify";  
import NotFound from "../pages/404/NotFound";
import LoginComponent from "../components/common/LoginComponent";
import SignupComponent from "../components/common/SignupComponent";
import ResetPassword from "../pages/common/ResetPassword";
import VerifyEmail from "../pages/common/VerifyEmail";
// import ResetPassword from '../pages/user/ResetPassword'; 


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
                <Route path='/verifyEmail' element={<VerifyEmail />} /> 
                <Route path='/resetPassword/:roleId' element={<ResetPassword />} /> 
            </Routes>  
        </>
    )
};


export default LandingRoute;

