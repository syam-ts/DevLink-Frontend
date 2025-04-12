import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { clientRouteHelper } from "../config/helper/routeHelper";
import { ClientState } from "../config/state/allState"; 
import ClientProfile1 from '../pages/client/ProfileClient'
import {Suspense} from "react";

const {
  Navbar,
  Footer,
  HomeClient,
  Developers,
  Jobs,
  MonoJobPost,
  ProposalsClient,
  AllContracts,
  ContractApprovals,
  DraftJobPost,
  PaymentSuccess,
  PaymentFailed, 
  Profile,
  InviteCilent,
  Wallet,
  UserProfile,
  MonoJobPage,
  Contract,
  ListAllUserChat,
  ChatBox,
  Notifications,
} = clientRouteHelper;

const ClientRoute = () => {
  const currentClient = useSelector((state: ClientState) => state.client);
  const client = currentClient?.currentClient;
 

  return (
    <>
      <Navbar roleType="client" roleInfo={client} />
      <Routes>
        <Route path="/home" element={<HomeClient />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/job/:jobPostId/:viewType" element={<MonoJobPost />} />
        <Route path="/proposals" element={<ProposalsClient />} />
        <Route path="/contracts/:roleType" element={<AllContracts />} />
        <Route path="/contractsApprovals" element={<ContractApprovals />} />
        <Route path="/draftJobPost" element={<DraftJobPost />} />
        <Route path="/developers" element={<Developers />} />
        <Route path="/paymentSuccess/:clientId/:data" element={<PaymentSuccess />} />
        <Route path="/paymenFailed" element={<PaymentFailed />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/userProfile/:type/:userId" element={<UserProfile />} />

        <Route path="/contracts/:roleType" element={

        <Suspense fallback={<div>Loading...</div>}>
             <AllContracts />
        </Suspense>
        }/>
         


        <Route path="/contract/:contractId/:roleType" element={<Contract />} />
        <Route path="/wallet" element={<Wallet roleType="client" />} />
        <Route path="/invites" element={<InviteCilent />} /> 
        <Route path="/job/:jobPostId/:type" element={<MonoJobPage />} />
        <Route path="/allChats/:roleType/:roleId" element={<ListAllUserChat />} />
        <Route path="/chat/view/:roleType/:targetId" element={<ChatBox roleType='' targetId='' />} />
        <Route path="/notifications/:roleId/:role" element={<Notifications />} /> 
        <Route path="/profile-new" element={<ClientProfile1 />} /> 
      </Routes>
      <Footer />
    </>
  );
};

export default ClientRoute;
