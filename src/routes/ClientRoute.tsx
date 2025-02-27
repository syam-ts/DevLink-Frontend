import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { clientRouteHelper } from "../config/helper/routeHelper";
import { ClientState } from "../config/state/allState";

const {
  Navbar,
  Footer,
  HomeClient, 
  Jobs,
  MonoJobPost,
  ProposalsClient,
  AllContracts,
  ContractApprovals,

  DraftJobPost,
  PaymentSuccess,
  PaymentFailed,

  Profile,
  UserProfile,
  Wallet,
  ListUsers,
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






        <Route path="/jobs/draftJobPost" element={<DraftJobPost />} />
        <Route
          path="/draftJobPost/payment-success/:clientId/:data"
          element={<PaymentSuccess />}
        />
        <Route
          path="/draftJobPost/payment-failed"
          element={<PaymentFailed />}
        />
        {/* <Route path='/job/tabs' element={<TestingTables />} /> */}
        <Route path="/developers/view" element={<ListUsers />} />
        <Route path="/contract/:contractId/:roleType" element={<Contract />} />
        <Route path="/job/:jobPostId/:type" element={<MonoJobPage />} />
        {/* <Route path='/ProjectSubmissionViewDrawer' element={<ProjectSubmissionViewDrawer />} />  */}
        <Route
          path="/wallet/view/:roleId"
          element={<Wallet roleType="client" />}
        />

        <Route
          path="/clientProfile/view/:clientId/:type"
          element={<Profile />}
        />
        <Route
          path="/userProfile/view/:userId/:type"
          element={<UserProfile />}
        />
        <Route
          path="/allChats/:roleType/:roleId"
          element={<ListAllUserChat />}
        />
        <Route path="/chat/view/:roleType/:targetId" element={<ChatBox />} />
        <Route
          path="/notifications/:roleId/:role"
          element={<Notifications />}
        />
      </Routes>
      <Footer />
    </>
  );
};

export default ClientRoute;
