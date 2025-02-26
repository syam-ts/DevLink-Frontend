import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { clientRouteHelper } from "../config/helper/routeHelper";
import { ClientState } from "../config/state/allState";

const {
  HomeClient,
  Jobs,
  DraftJobPost,
  PaymentSuccess,
  PaymentFailed,
  JobPropsals,
  Profile,
  ContractApprovals,
  ListUsers,
  AllContracts,
  ListAllUserChat,
  Notifications,
  MonoJobPage,
  Navbar,
  Footer,
  UserProfile,
  Wallet,
  Contract,
  ChatBox,
} = clientRouteHelper;

const ClientRoute = () => {
  const currentClient = useSelector((state: ClientState) => state.client);
  const client = currentClient?.currentClient;

  return (
    <>
      <Navbar roleType="client" roleInfo={client} />
      <Routes>
        <Route path="/home" element={<HomeClient />} />
        <Route
          path="/clientProfile/view/:clientId/:type"
          element={<Profile />}
        />
        <Route
          path="/userProfile/view/:userId/:type"
          element={<UserProfile />}
        />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/draftJobPost" element={<DraftJobPost />} />
        <Route
          path="/draftJobPost/payment-success/:clientId/:data"
          element={<PaymentSuccess />}
        />
        <Route
          path="/draftJobPost/payment-failed"
          element={<PaymentFailed />}
        />
        <Route path="/proposals" element={<JobPropsals />} />
        {/* <Route path='/job/tabs' element={<TestingTables />} /> */}
        <Route path="/developers/view" element={<ListUsers />} />
        <Route
          path="/job/myContracts/:roleId/:roleType"
          element={<AllContracts />}
        />
        <Route path="/contract/:contractId/:roleType" element={<Contract />} />
        <Route path="/job/:jobPostId/:type" element={<MonoJobPage />} />
        <Route path="/contracts/approvals" element={<ContractApprovals />} />
        {/* <Route path='/ProjectSubmissionViewDrawer' element={<ProjectSubmissionViewDrawer />} />  */}
        <Route
          path="/wallet/view/:roleId"
          element={<Wallet roleType="client" />}
        />
        <Route
          path="/notifications/:roleId/:role"
          element={<Notifications />}
        />

        <Route
          path="/allChats/:roleType/:roleId"
          element={<ListAllUserChat />}
        />
        <Route path="/chat/view/:roleType/:targetId" element={<ChatBox />} />
      </Routes>
      <Footer />
    </>
  );
};

export default ClientRoute;
