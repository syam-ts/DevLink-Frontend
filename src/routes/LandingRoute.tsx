import React from "react";
import LandingPage from "../pages/publicPages/LandingPage";
import Role from "../pages/publicPages/Role";
import Footer from "../components/common/Footer";
import { Routes, Route } from 'react-router-dom';
import OtpVerify from "../pages/publicPages/OtpVerify"; 
import NotFound from "../pages/404/NotFound";



const LandingRoute: React.FC = () => {
 

    return (
        <> 
            <Routes>
                <Route path='/' element={<LandingPage />} />
                <Route path='*' element={<NotFound />} />
                <Route path='/role' element={<Role />} /> 
                <Route path='/verify-otp' element={<OtpVerify />} /> 
            </Routes>
        <Footer />
        </>
    )
};


export default LandingRoute;

