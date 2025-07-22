import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { userRouteHelper } from "../helper/routeHelper";
import { UserState } from "../config/state/allState";
import { ROUTE } from "../config/constants/route";

const {
  Navbar,
  Footer,
  HomeUser,
  JobPage,
  Proposals,
  AllContracts,
  Contract,
  UserProfile,
  ProfileAlter,
  BoostPaymentSuccess,
  Wishlist,
  Wallet,
  MonoJobPost,
  Notifications,
  InviteComponent,
  ListAllClientChat,
  ChatBox,
} = userRouteHelper;

const {
  HOME,
  JOBS,
  PROPOSALS,
  CONTRACTS_LIST,
  PROFILE,
  PROFILE_EDIT,
  PROFILE_BOOST_SUCCESS,
  WISHLIST_VIEW,
  WALLET_VIEW,
  VIEW_JOBPOST,
  VIEW_CONTRACT,
  INVITE_VIEW,
  NOTIFIICATIONS,
  ALL_CHATS,
  MESSAGE_VIEW,
} = ROUTE.USER;

const UserRoute = () => {
  const currentUser = useSelector((store: UserState) => store.user);
  const user = currentUser?.currentUser;

  return (
    <>
      <Navbar roleType="user" roleInfo={user} />

      <Routes>
        <Route path={HOME} element={<HomeUser />} />
        <Route path={JOBS} element={<JobPage />} />
        <Route path={PROPOSALS} element={<Proposals />} />
        <Route path={CONTRACTS_LIST} element={<AllContracts />} />
        <Route path={PROFILE} element={<UserProfile />} />
        <Route path={PROFILE_EDIT} element={<ProfileAlter />} />
        <Route path={PROFILE_BOOST_SUCCESS} element={<BoostPaymentSuccess />} />
        <Route path={WISHLIST_VIEW} element={<Wishlist />} />
        <Route path={WALLET_VIEW} element={<Wallet roleType="user" />} />
        <Route path={VIEW_JOBPOST} element={<MonoJobPost />} />
        <Route path={VIEW_CONTRACT} element={<Contract />} />
        <Route path={INVITE_VIEW} element={<InviteComponent />} />
        <Route path={NOTIFIICATIONS} element={<Notifications />} />
        <Route path={ALL_CHATS} element={<ListAllClientChat />} />
        <Route
          path={MESSAGE_VIEW}
          element={<ChatBox roleType="" targetId="" />}
        />
      </Routes>
      <Footer />
    </>
  );
};

export default UserRoute;
