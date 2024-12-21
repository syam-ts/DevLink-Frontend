
import HomeClient from '../pages/client/HomeClient'
import SignupClient from '../pages/client/SignupClient'
import LoginClient from '../pages/client/LoginClient'
import OtpClient from '../pages/client/otpClient'
import Footer from "../components/common/Footer";
import Navbar from "../components/common/Navbar";
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';



const ClientRoute = () => {

    const currentClient = useSelector((store: any) => store.client);
    const client: string = currentClient?.currentClient?.client?.client?.name;

    const showNavAndFooter: any = (pathname: string) => {
  
    
      const restrictedPath = [
        '/client/signup',
        '/client/login',
        '/client/verify-otp'
      ];
      return !restrictedPath.includes(pathname);
    };

    return (
        <>
          { showNavAndFooter(location.pathname) && <Navbar roleType='client' roleInfo={client} />}
            <Routes>
                <Route path='/signup' element={<SignupClient />} />
                <Route path='/verify-otp' element={<OtpClient />} />
                <Route path='/login' element={<LoginClient />} />
                <Route path='/home' element={<HomeClient />} />
            </Routes>
          { showNavAndFooter(location.pathname) && <Footer />}
        </>
    )
};

export default ClientRoute;

