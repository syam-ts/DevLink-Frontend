import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { userRouteHelper } from "../config/helper/routeHelper";

const {
  VerfiyEmail,
  ResetPassword,
  HomeUser,
  JobPage,
  UserProfile,
  MonoJobPost,
  Proposals,
  AllContract,
  Contract,
  InviteComponent,
  Wishlist,
  ProfileAlter,
  BoostPaymentSuccess,
  Wallet,
  ListAllClientChat,
  ChatBox,
  Navbar,
  Footer,
} = userRouteHelper;

const UserRoute = () => {
  const currentUser = useSelector((store: any) => store.user);
  const user: string = currentUser?.currentUser;

  return (
    <>
      <Navbar roleType="user" roleInfo={user} />

      <Routes>
        <Route path="/verify-email" element={<VerfiyEmail />} />
        <Route path="/resetPassword/:userId" element={<ResetPassword />} />
        <Route path="/home" element={<HomeUser />} />
        <Route path="/jobs" element={<JobPage />} />
        <Route path="/job/:jobPostId/:type" element={<MonoJobPost />} />
        <Route path="/userProfile/:userId/:type" element={<UserProfile />} />
        <Route path="/profile/:type" element={<ProfileAlter />} />
        <Route path="/jobs/proposals" element={<Proposals />} />
        <Route path="/contract/:contractId/:roleType" element={<Contract />} />
        <Route
          path="/profile/boost/success/:userId"
          element={<BoostPaymentSuccess />}
        />
        <Route
          path="/job/myContracts/:roleId/:roleType"
          element={<AllContract />}
        />
        <Route
          path="/wallet/view/:roleId"
          element={<Wallet roleType="user" />}
        />
        <Route
          path="/invite/view/:roleId/:type"
          element={<InviteComponent />}
        />
        <Route path="/wishlist-view" element={<Wishlist />} />

        <Route
          path="/allChats/:roleType/:roleId"
          element={<ListAllClientChat />}
        />
        <Route path="/chat/view/:roleType/:targetId" element={<ChatBox />} />
      </Routes>
      <Footer />
    </>
  );
};

export default UserRoute;
