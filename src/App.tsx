import Footer from "./components/common/Footer";
import Navbar from "./components/common/Navbar"; 
import HomeUser from './pages/user/HomeUser'
import HomeClient from './pages/client/HomeClient'

import SignupUser from './pages/user/SignupUser'
import LoginUser from './pages/user/LoginUser'
import SignupClient from './pages/client/SignupClient'
import LoginClient from './pages/client/LoginClient'
import { Routes, Route, useLocation } from 'react-router-dom';
import Google from "./components/common/Google";
import LandingPage from "./pages/publicPages/LandingPage";
import Role from "./pages/publicPages/Role";
import LoginAdmin from "./pages/admin/LoginAdmin";
 

const showNavAndFooter: any = (pathname: string) => {

  const restrictedPaht = [
    '/user/signup',
    '/user/login',
    '/client/signup',
    '/client/login',
    '/role',
    '/landingpage'
  ];
  return !restrictedPaht.includes(pathname);
};


const App = () => { 
 
  const location = useLocation();

  return (
    <div> 
        { showNavAndFooter(location.pathname) && <Navbar />}
       <Routes>
         {/* Public Routes */}
          <Route path='/landingpage' element={<LandingPage />} />
          <Route path='/role' element={<Role />} />

          {/* User Routes */}
          <Route path='/user/signup' element={<SignupUser />} />
          <Route path='/user/login' element={<LoginUser />} />
          <Route path='/user/home' element={<HomeUser />} />

          {/* Client Routes */}
          <Route path='/client/signup' element={<SignupClient />} />
          <Route path='/client/login' element={<LoginClient />} />
          <Route path='/client/home' element={<HomeClient />} />

          {/* Admin Routes */} 
          <Route path='/admin/login' element={<LoginAdmin />} /> 
      </Routes> 
      {showNavAndFooter(location.pathname) && <Footer />}
    </div>
  )
};

export default App;



    
   