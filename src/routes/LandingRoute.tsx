import LandingPage from "../pages/publicPages/LandingPage";
import Role from "../pages/publicPages/Role";
import Footer from "../components/common/Footer";
import { Routes, Route } from 'react-router-dom';



const LandingRoute = () => {
 

    return (
        <>
        
            <Routes>
                <Route path='/landingpage' element={<LandingPage />} />
                <Route path='/role' element={<Role />} /> 
            </Routes>
        <Footer />
        </>
    )
};

export default LandingRoute;

