import LandingPage from "../pages/publicPages/LandingPage";
import Role from "../pages/publicPages/Role";
import Footer from "../components/common/Footer";
import { Routes, Route } from 'react-router-dom';
import LoginComponent from "../components/common/LoginComponent";



const LandingRoute = () => {
 

    return (
        <>
        
            <Routes>
                <Route path='/landingpage' element={<LandingPage />} />
                <Route path='/role' element={<Role />} /> 
                <Route path='/login/:roleType' element={<LoginComponent />} />
            </Routes>
        <Footer />
        </>
    )
};

export default LandingRoute;

