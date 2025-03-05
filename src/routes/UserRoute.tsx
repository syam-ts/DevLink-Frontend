import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { userRouteHelper } from "../config/helper/routeHelper";
import { UserState } from "../config/state/allState";

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
  
  InviteComponent,
  ListAllClientChat,
  ChatBox,
} = userRouteHelper;

const UserRoute = () => {
  const currentUser = useSelector((store: UserState) => store.user);
  const user = currentUser?.currentUser;

  return (
    <>
      <Navbar roleType="user" roleInfo={user} />

      <Routes> 
        <Route path="/home" element={<HomeUser />} /> 
        <Route path="/jobs" element={<JobPage />} />
        <Route path="/proposals" element={<Proposals />} />
        <Route path="/contracts/:roleType" element={<AllContracts />} />
        <Route path="/profile/:type" element={<UserProfile />} /> 
        <Route path="/profileAlter/:type" element={<ProfileAlter />} /> 
        <Route path="/profileBoostSuccess" element={<BoostPaymentSuccess />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/wallet" element={<Wallet roleType="user" />} /> 
        <Route path="/job/:jobPostId/:viewType" element={<MonoJobPost />} /> 
        <Route path="/contract/:contractId/:roleType" element={<Contract />} />
        <Route path="/invites" element={<InviteComponent />} />

              {/* ----------Pending---------- */}
        <Route path="/allChats/:roleType/:roleId" element={<ListAllClientChat />} />
        <Route path="/chat/view/:roleType/:targetId" element={<ChatBox />} />
      </Routes>
      <Footer />
    </>
  );
};

export default UserRoute;
