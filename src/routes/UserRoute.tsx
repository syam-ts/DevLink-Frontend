
import HomeUser from '../pages/user/HomeUser'
import SignupUser from '../pages/user/SignupUser'
import LoginUser from '../pages/user/LoginUser'
import OtpUser from '../pages/user/OtpUser'
import Footer from "../components/common/Footer";
import Navbar from "../components/common/Navbar";
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import VerfiyEmail from '../pages/user/VerifyEmailFP';
import ResetPassword from '../pages/user/ResetPassword';
import JobPage from '../pages/user/JobPage';
import Index from '../pages/user/profile/index'




const UserRoute = () => {

    const currentUser = useSelector((store: any) => store.user);
    const user: string = currentUser?.currentUser?.user?.user?.name;

    const showNavAndFooter: any = (pathname: string) => {
  
    
      const restrictedPath = [
        '/user/signup',
        '/user/login',
        '/user/verify-otp',
        '/user/verify-email',
        '/user/resetPassword/67697480bd289da770893f9c'
      ];
      return !restrictedPath.includes(pathname);
    };

    return (
        <>
          { showNavAndFooter(location.pathname) && <Navbar roleType='user' roleInfo={user} />}
            <Routes>
                <Route path='/signup' element={<SignupUser />} />
                <Route path='/verify-otp' element={<OtpUser />} />
                <Route path='/login' element={<LoginUser />} />
                <Route path='/verify-email' element={<VerfiyEmail />} />
                <Route path='/resetPassword/:userId' element={<ResetPassword />} />
                <Route path='/home' element={<HomeUser />} />
                <Route path='/jobs' element={<JobPage />} />
                <Route path='/profile/*' element={<Index />} />
            </Routes>
          { showNavAndFooter(location.pathname) && <Footer />}
        </>
    )
};

export default UserRoute;

