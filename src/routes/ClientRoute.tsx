
import HomeClient from '../pages/client/HomeClient'
import SignupClient from '../pages/client/SignupClient'
import LoginClient from '../pages/client/LoginClient'
import OtpClient from '../pages/client/otpClient'
import Footer from "../components/common/Footer";
import Navbar from "../components/common/Navbar";
import VerfiyEmail from '../pages/client/VerifyEmail';
import ResetPassword from '../pages/client/ResetPassword';
import Index from '../pages/client/profile/index';
import Jobs from '../pages/client/Jobs';
import DraftJobPost from '../pages/client/draftJobPost';
import PaymentSuccess from '../pages/client/SuccessPayment';
import PaymentFailed from '../pages/client/FailedPayment';
import UserProfile from '../pages/client/UserViewProfile';
import JobPropsals from '../pages/client/JobProposal';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';



const ClientRoute = () => {

    const currentClient = useSelector((store: any) => store.client);
    const client: string = currentClient?.currentClient?.client?.client?.name;

    const showNavAndFooter: any = (pathname: string) => {
  
    
      const restrictedPath = [
        '/client/signup',
        '/client/login',
        '/client/verify-otp',
        '/client/verify-email',
        '/client/resetPassword/:clientId'
      ];
      return !restrictedPath.includes(pathname);
    };

    return (
        <>
          { showNavAndFooter(location.pathname) && <Navbar roleType='client' roleInfo={client} />}
            <Routes>
                <Route path='/signup' element={<SignupClient />} />
                <Route path='/verify-otp' element={<OtpClient />} />
                <Route path='/verify-email' element={<VerfiyEmail />} />
                <Route path='/resetPassword/:clientId' element={<ResetPassword />} />
                <Route path='/login' element={<LoginClient />} />
                <Route path='/home' element={<HomeClient />} />
                <Route path='/profile/*' element={<Index />} />
                <Route path='/jobs' element={<Jobs />} />
                <Route path='/jobs/draftJobPost' element={<DraftJobPost />} />
                <Route path='/draftJobPost/payment-success/:clientId/:data' element={<PaymentSuccess />} />
                <Route path='/draftJobPost/payment-failed' element={<PaymentFailed />} />
                <Route path='/userProfile/:userId' element={<UserProfile />} />
                <Route path='/job/proposals' element={<JobPropsals />} />
            </Routes>
          { showNavAndFooter(location.pathname) && <Footer />}
        </>
    )
};

export default ClientRoute;

