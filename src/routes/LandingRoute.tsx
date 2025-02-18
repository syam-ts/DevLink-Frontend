import LandingPage from "../pages/publicPages/LandingPage";
import Role from "../pages/publicPages/Role";
import Footer from "../components/common/Footer";
import { Routes, Route } from 'react-router-dom';
import OtpVerify from "../pages/publicPages/OtpVerify";
import { ModalMui } from "../components/nextUi/modals/ModalMui";



const LandingRoute = () => {
 

    return (
        <> 
            <Routes>
                <Route path='/landingpage' element={<LandingPage />} />
                <Route path='/role' element={<Role />} /> 
                <Route path='/verify-otp' element={<OtpVerify />} /> 
                <Route path='/rating/view' element={<ModalMui />} /> 
            </Routes>
        <Footer />
        </>
    )
};

export default LandingRoute;

