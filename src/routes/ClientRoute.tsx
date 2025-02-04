
import HomeClient from '../pages/client/HomeClient'
import SignupClient from '../pages/client/SignupClient'
import LoginClient from '../pages/client/LoginClient'
import OtpClient from '../pages/client/otpClient'
import Footer from "../components/common/Footer";
import Navbar from "../components/common/Navbar";
import VerfiyEmail from '../pages/client/VerifyEmail';
import ResetPassword from '../pages/client/ResetPassword'; 
import Jobs from '../pages/client/Jobs';
import DraftJobPost from '../pages/client/draftJobPost';
import PaymentSuccess from '../pages/client/SuccessPayment';
import PaymentFailed from '../pages/client/FailedPayment'; 
import JobPropsals from '../pages/client/JobProposal';
import TestingTables from '../pages/client/TestingTabs';
import MonoJobPage from '../components/common/MonoJobPost';
import Profile from '../pages/client/Profile'
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ProfileUser } from '../pages/user/ProfileUser';
import { Contract } from '../components/common/Contract';
import AllContracts from '../components/common/AllContract'
import ContractApprovals from '../pages/client/ContractApproval'
import { ProjectSubmissionViewDrawer } from '../components/shadcn/drawer/ProjectSubmitView';
import NotificationsClient from '../pages/client/NotificationsClient';
import {Chat} from '../pages/client/Chat'
import ListUsers from '../pages/client/ListUsers';
import ListAllUserChat from '../components/common/ListAllUserChat';
import { ChatBox } from '../components/common/ChatBox';



const ClientRoute = () => {

    const currentClient = useSelector((store: any) => store.client);
    const client: string = currentClient?.currentClient; 


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
                <Route path='/clientProfile/view/:clientId/:type' element={<Profile />} />
                <Route path='/userProfile/view/:userId/:type/:clientId' element={<ProfileUser />} />
                <Route path='/jobs' element={<Jobs />} />
                <Route path='/jobs/draftJobPost' element={<DraftJobPost />} />
                <Route path='/draftJobPost/payment-success/:clientId/:data' element={<PaymentSuccess />} />
                <Route path='/draftJobPost/payment-failed' element={<PaymentFailed />} /> 
                <Route path='/jobs/proposals' element={<JobPropsals />} />
                <Route path='/job/tabs' element={<TestingTables />} />
                <Route path='/developers/view' element={<ListUsers />} />
                <Route path='/job/myContracts/:roleId/:roleType' element={<AllContracts />} />
                <Route path='/contract/view/:contractId' element={<Contract />} />
                <Route path='/job/:jobPostId' element={<MonoJobPage />} />
                <Route path='/contracts/approvals' element={<ContractApprovals />} />
                <Route path='/ProjectSubmissionViewDrawer' element={<ProjectSubmissionViewDrawer />} />
                <Route path='/notifications/:clientId' element={<NotificationsClient />} />
                {/* <Route path='/chat/view/:roleId/:roleType' element={<Chat />} /> */}


                <Route path='/chat/alluser/:roleType/:roleId' element={<ListAllUserChat />} />
               <Route path='/chat/view/:roleType/:targetId' element={<ChatBox />} />
            </Routes>
          { showNavAndFooter(location.pathname) && <Footer />}
        </>
    )
};


export default ClientRoute;

