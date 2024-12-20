import Footer from "./components/common/Footer";
import Navbar from "./components/common/Navbar";

import HomeUser from './pages/user/HomeUser'
import SignupUser from './pages/user/SignupUser'
import LoginUser from './pages/user/LoginUser'

import HomeClient from './pages/client/HomeClient'
import SignupClient from './pages/client/SignupClient'
import LoginClient from './pages/client/LoginClient'

//admin  
import { Routes, Route, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import userStore,{ userPersistor } from './redux/store/userStore'
import clientStore,{ clientPersistor } from './redux/store/clientStore'
import LandingPage from "./pages/publicPages/LandingPage";
import Role from "./pages/publicPages/Role";
import LoginAdmin from "./pages/admin/LoginAdmin"; 
import Index from './pages/admin/index'
import OtpUser from "./pages/user/Otp-page";
import OtpClient from "./pages/client/otp-page";
 

const showNavAndFooter: any = (pathname: string) => {

  const restrictedPath = [
    '/user/signup',
    '/user/login',
    '/user/verify-otp',
    '/client/verify-otp',
    '/client/signup',
    '/client/login',
    '/admin/login',
    '/admin/index/dashboard',
    '/admin/index/tables/user-table',
    '/admin/index/tables/client-table',
    '/role',
    '/landingpage'
  ];
  return !restrictedPath.includes(pathname);
};


const App = () => { 
 
  const location = useLocation();

  let store = {user: userStore,
    client: clientStore
  }

  return (
    <Provider store={store}>


    <div> 
        { showNavAndFooter(location.pathname) && <Navbar />}
       <Routes>
         {/* Public Routes */}
          <Route path='/landingpage' element={<LandingPage />} />
          <Route path='/role' element={<Role />} />

          {/* User Routes */}
          <Route path='/user/signup' element={<SignupUser />} />
          <Route path='/user/verify-otp' element={<OtpUser />} />
          <Route path='/user/login' element={<LoginUser />} />
          <Route path='/user/home' element={<HomeUser />} />

          {/* Client Routes */}
          <Route path='/client/signup' element={<SignupClient />} />
          <Route path='/client/verify-otp' element={<OtpClient />} />
          <Route path='/client/login' element={<LoginClient />} />
          <Route path='/client/home' element={<HomeClient />} />

          {/* Admin Routes */} 
          <Route path='/admin/login' element={<LoginAdmin />} /> 
          <Route path='/admin/index/*' element={<Index />} /> 
      </Routes> 
      {showNavAndFooter(location.pathname) && <Footer />}
    </div>
    </Provider>
  )
};

export default App;



    
   