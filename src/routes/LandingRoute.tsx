import React from "react";
import LandingPage from "../pages/publicPages/LandingPage";
import Role from "../pages/publicPages/Role";
import Footer from "../components/common/Footer";
import { Routes, Route } from 'react-router-dom';
import OtpVerify from "../pages/publicPages/OtpVerify"; 



const LandingRoute: React.FC = () => {
 

    return (
        <> 
            <Routes>
                <Route path='/landingpage' element={<LandingPage />} />
                <Route path='/role' element={<Role />} /> 
                <Route path='/verify-otp' element={<OtpVerify />} /> 
            </Routes>
        <Footer />
        </>
    )
};


export default LandingRoute;

