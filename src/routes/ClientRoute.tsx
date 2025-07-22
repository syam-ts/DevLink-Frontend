import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { clientRouteHelper } from "../helper/routeHelper";
import { ClientState } from "../config/state/allState";
import ClientProfile1 from "../pages/client/ProfileClient";
import { ROUTE } from "../config/constants/route";

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

const {
  HOME,
  JOBS,
  VIEW_JOBPOST,
  PROPOSALS,
  ALL_CONTRACTS,
  CONTRACT_APPROVAL,
  CREATE_JOBPOST,
  VIEW_DEVELOPERS,
  PAYMENT_SUCCESS,
  PAYMENT_FAILED,
  PROFILE_VIEW,
  VIEW_USER_PROFILE,
  VIEW_CONTRACT,
  VIEW_WALLET,
  VIEW_INVITES,
  LIST_CHATS,
  MESSAGES,
  NOTIFICATIONS,
  PROFILE_TEST,
} = ROUTE.CLIENT;

const ClientRoute = () => {
  const currentClient = useSelector((state: ClientState) => state.client);
  const client = currentClient?.currentClient;

  return (
    <>
      <Navbar roleType="client" roleInfo={client} />
      <Routes>
        <Route path={HOME} element={<HomeClient />} />
        <Route path={JOBS} element={<Jobs />} />
        <Route path={VIEW_JOBPOST} element={<MonoJobPost />} />
        <Route path={PROPOSALS} element={<ProposalsClient />} />
        <Route path={ALL_CONTRACTS} element={<AllContracts />} />
        <Route path={CONTRACT_APPROVAL} element={<ContractApprovals />} />
        <Route path={CREATE_JOBPOST} element={<DraftJobPost />} />
        <Route path={VIEW_DEVELOPERS} element={<Developers />} />
        <Route path={PAYMENT_SUCCESS} element={<PaymentSuccess />} />
        <Route path={PAYMENT_FAILED} element={<PaymentFailed />} />
        <Route path={PROFILE_VIEW} element={<Profile />} />
        <Route path={VIEW_USER_PROFILE} element={<UserProfile />} />
        <Route path={VIEW_CONTRACT} element={<Contract />} />
        <Route path={VIEW_WALLET} element={<Wallet roleType="client" />} />
        <Route path={VIEW_INVITES} element={<InviteCilent />} />
        <Route path="/job/:jobPostId/:type" element={<MonoJobPage />} />
        <Route path={LIST_CHATS} element={<ListAllUserChat />} />
        <Route path={MESSAGES} element={<ChatBox roleType="" targetId="" />} />
        <Route path={NOTIFICATIONS} element={<Notifications />} />
        <Route path={PROFILE_TEST} element={<ClientProfile1 />} />
      </Routes>
      <Footer />
    </>
  );
};

export default ClientRoute;
