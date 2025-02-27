// ------- user imports ------------
import HomeUser from "../../pages/user/HomeUser";
import VerfiyEmail from "../../pages/user/VerifyEmailFP";
import ResetPassword from "../../pages/user/ResetPassword";
import JobPage from "../../pages/user/Jobs";
import ProfileAlter from "../../pages/user/ProfileAlter";
import BoostPaymentSuccess from "../../pages/user/BoostAcc-Success";
import Proposals from "../../pages/user/Proposals";

// ------- client imports ------------
import HomeClient from "../../pages/client/HomeClient";
import Jobs from "../../pages/client/Jobs";
import DraftJobPost from "../../pages/client/draftJobPost";
import PaymentSuccess from "../../pages/client/SuccessPayment";
import PaymentFailed from "../../pages/client/FailedPayment";
import ProposalsClient from "../../pages/client/Proposals";
import Profile from "../../pages/client/ProfileClient";
import ContractApprovals from "../../pages/client/ContractApproval";
import { ProjectSubmissionViewDrawer } from "../../components/shadcn/drawer/ProjectSubmitView";
import ListUsers from "../../pages/client/ListUsers"; 

// ---------- Common imports -----------
import Footer from "../../components/common/Footer";
import Navbar from "../../components/common/Navbar";
import UserProfile from "../../pages/common/UserProfile";
import Contract from "../../pages/common/Contract";
import AllContracts from "../../pages/common/AllContract";
import ListAllUserChat from "../../components/common/ViewAllChats";
import SignupComponent from "../../components/common/SignupComponent";
import LoginComponent from "../../components/common/LoginComponent";
import Notifications from "../../components/common/NotificationCard";
import MonoJobPage from "../../pages/common/MonoJobPost";
import ChatBox from "../../components/common/ChatBox";
import ListAllClientChat from "../../components/common/ViewAllChats";
import Wallet from "../../pages/common/Wallet";
import InviteComponent from "../../components/common/Invite";
import Wishlist from "../../pages/common/Wishlist";
import MonoJobPost from "../../pages/common/MonoJobPost"; 

// --------- user exports -----------
export const userRouteHelper = {
  VerfiyEmail,
  ResetPassword,
  HomeUser,
  JobPage,
  UserProfile,
  MonoJobPost,
  Proposals,
  AllContracts,
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
};

// --------- Client exports ----------
export const clientRouteHelper = {
  HomeClient,
  Jobs,
  MonoJobPost,
  DraftJobPost,
  PaymentSuccess,
  PaymentFailed,
  ProposalsClient,
  Profile,
  ContractApprovals,
  ProjectSubmissionViewDrawer,
  ListUsers,
  AllContracts,
  ListAllUserChat,
  SignupComponent,
  LoginComponent,
  Notifications,
  MonoJobPage,
  Navbar,
  Footer,
  UserProfile,
  Wallet,
  Contract,
  ChatBox,
};
