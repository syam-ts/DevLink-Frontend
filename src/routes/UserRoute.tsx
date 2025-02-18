
import HomeUser from '../pages/user/HomeUser' 
import Footer from "../components/common/Footer";
import Navbar from "../components/common/Navbar";
import LoginComponent from '../components/common/LoginComponent'
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import VerfiyEmail from '../pages/user/VerifyEmailFP';
import ResetPassword from '../pages/user/ResetPassword';
import JobPage from '../pages/user/JobPage';
import { UserProfile } from '../components/common/UserProfile';
import ProfileAlter from '../pages/user/ProfileAlter';
import { Contract } from '../components/common/Contract'; 
import BoostPaymentSuccess from '../pages/user/BoostAcc-Success';
import MonoJobPost from '../components/common/MonoJobPost'
import AllContract from '../components/common/AllContract';
import Proposals from '../pages/user/ProposalsUser';
import {ChatBox} from '../components/common/ChatBox'
import ListAllClientChat from '../components/common/ViewAllChats'
import Wallet from '../components/common/Wallet';
import InviteComponent from '../components/common/Invite'
 
import Notifications from '../components/common/NotificationCard'
import NotificationsUser from '../pages/user/NotificationsUser';   
import SignupComponent from '../components/common/SignupComponent';
 
 




const UserRoute = () => {

    const currentUser = useSelector((store: any) => store.user);
    const user: string = currentUser?.currentUser;
 

    const showNavAndFooter: any = (pathname: string) => {
  
    
      const restrictedPath = [
        '/user/signup', 
        '/user/login',
        '/user/verify-otp',
        '/user/verify-email', 
        '/user/user-signup',
        '/user/resetPassword/67697480bd289da770893f9c'
      ];
      return !restrictedPath.includes(pathname);
    };

    return (
        <>
          { showNavAndFooter(location.pathname) && <Navbar roleType='user' roleInfo={user} />}
            <Routes>


               <Route path='/login' element={<LoginComponent />} />
               <Route path='/signup' element={<SignupComponent />} />
            {/*  <Route path='/signup' element={<SignupUser />} /> */} 
                <Route path='/verify-email' element={<VerfiyEmail />} />
                <Route path='/resetPassword/:userId' element={<ResetPassword />} />
                <Route path='/home' element={<HomeUser />} /> 
                <Route path='/jobs' element={<JobPage />} />
                <Route path='/job/:jobPostId/:type' element={<MonoJobPost />} />
                <Route path='/userProfile/view/:userId/:type' element={<UserProfile />} />
                <Route path='/profile/:type' element={<ProfileAlter />} />  
                <Route path='/jobs/proposals' element={<Proposals />} />  
                <Route path='/contract/view/:contractId' element={<Contract />} /> 
                <Route path='/profile/boost/success/:userId' element={<BoostPaymentSuccess />} />
                <Route path='/job/myContracts/:roleId/:roleType' element={<AllContract />} />
                <Route path='/notifications/:roleId/:role' element={<NotificationsUser />} />  
                <Route path='/wallet/view/:roleId' element={<Wallet roleType="user" />} />
                <Route path='/invite/view/:roleId/:type' element={<InviteComponent />} />


                <Route path='/allChats/:roleType/:roleId' element={<ListAllClientChat />} />  
                <Route path='/chat/view/:roleType/:targetId' element={<ChatBox />} />
            </Routes>
          { showNavAndFooter(location.pathname) && <Footer />}
        </>
    )
};

export default UserRoute;

