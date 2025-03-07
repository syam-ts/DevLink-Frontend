import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearNotifications, signOutUser } from "../../redux/slices/userSlice";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import { Menu, X } from "lucide-react";
import axios from "axios";

import { Avatar } from "@heroui/react";
import { NavbarAutoOpen } from "../shadcn/drawer/NavbarAutoOpen";
import config from "../../config/helper/config";
import { useState } from "react";

const Navbar = ({ roleType, roleInfo }: any) => {

  const [menuOpen, setMenuOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userNotificationsUnread = useSelector(
    (state: any) => state?.user?.notificationsUnread
  );

  const logout = async () => {
    const response = await axios.post(
      `${config.VITE_SERVER_URL}/${roleType}/logout`,
      {},
      { withCredentials: true }
    );

    let userVerified;
    if (roleType === "user") {
      // MOVE ALL TO LOGOUT SLICE
      //remove trace of notification page visit
      localStorage.removeItem("notificationsPageFirstVisit");
      localStorage.removeItem("accessToken");
      dispatch(signOutUser());
      dispatch(clearNotifications());
      navigate("/login?rt=user");
    } else if (roleType === "client") {
      localStorage.removeItem("notificationsPageFirstVisit");
      localStorage.removeItem("accessToken");
      dispatch(signOutUser());

      navigate("/login?rt=client");
    }
  };

  return (
    <nav className="bg-white shadow-md arsenal-sc-regular fixed w-full z-10">
    <div className="container mx-auto px-6 py-3 flex justify-between items-center">
      {/* Left Section: Logo & Links */}
      <div className="flex items-center">
        <Link to={`/${roleType}/home`}>
          <img className="h-10 w-auto" src="../../public/devLink_logo.png" alt="Devlink" />
        </Link>
        <div className="  md:flex space-x-8 ml-10">
          <Link to={`/${roleType}/home`} className="text-sm text-gray-900 hover:text-gray-500">
            Home
          </Link>
          <Link to={`/${roleType}/developers`} className="text-sm text-gray-900 hover:text-gray-500">
            Developers
          </Link>
          <Link to={`/${roleType}/jobs`} className="text-sm text-gray-900 hover:text-gray-500">
            Jobs
          </Link>
          <Link to={`/${roleType}/contracts/${roleType}`} className="text-sm text-gray-900 hover:text-gray-500">
            Contracts
          </Link>
          <Link to={`/${roleType}/proposals`} className="text-sm text-gray-900 hover:text-gray-500">
            Proposals
          </Link>
          {roleType === "client" && (
            <Link to="/client/contractsApprovals" className="text-sm text-gray-900 hover:text-gray-500">
              Project Approvals
            </Link>
          )}
          <Link to={`/${roleType}/about`} className="text-sm text-gray-900 hover:text-gray-500">
            About
          </Link>
          <Link to={`/${roleType}/contact`} className="text-sm text-gray-900 hover:text-gray-500">
            Contact
          </Link>
        </div>
      </div>

      {/* Right Section: Notifications, Profile & Dropdown */}
      <div className="flex items-center space-x-6">
        <Link to={`/${roleType}/notifications/${roleInfo?._id}/${roleType}`} className="relative">
          <img className="h-6 w-6" src="data:image/png;base64,YOUR_BASE64_IMAGE" alt="Notifications" />
          {userNotificationsUnread > 0 && (
            <span className="absolute top-0 right-0 bg-red-600 text-white text-xs px-2 py-1 rounded-full">
              {userNotificationsUnread}
            </span>
          )}
        </Link>

        {/* Profile Dropdown */}
        {roleInfo && (
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              {roleInfo?.profilePicture ? (
                <img className="h-9 w-9 rounded-full border border-gray-300" src={roleInfo.profilePicture} alt="Profile" />
              ) : (
                <span className="h-9 w-9 flex items-center justify-center rounded-full bg-gray-300">
                  {roleInfo.name?.charAt(0)}
                </span>
              )}
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem key='profile'>
                <Link to={`/${roleType}/Profile`} className="text-gray-900">Profile</Link>
              </DropdownItem>
              <DropdownItem key='request'>
                <Link to={`/${roleType}/contracts/client`} className="text-gray-900">Requests</Link>
              </DropdownItem>
              <DropdownItem key='wallet' >
                <Link to={`/${roleType}/wallet`} className="text-gray-900">Wallet</Link>
              </DropdownItem>
              <DropdownItem key='home'>
                <Link to={`/${roleType}/home`} className="text-gray-900">Home</Link>
              </DropdownItem>
              <DropdownItem key='logout' onClick={logout} className="text-red-600">
                Logout
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        )}

        {/* Mobile Menu Button */}
        <button className="md:hidden focus:outline-none" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
    </div>

    {/* Mobile Menu */}
    {menuOpen && (
      <div className="md:hidden bg-white shadow-md py-3">
        <div className="container mx-auto px-6 flex flex-col space-y-4">
          <Link to={`/${roleType}/home`} className="text-gray-900">Home</Link>
          <Link to={`/${roleType}/developers`} className="text-gray-900">Developers</Link>
          <Link to={`/${roleType}/jobs`} className="text-gray-900">Jobs</Link>
          <Link to={`/${roleType}/contracts/${roleType}`} className="text-gray-900">Contracts</Link>
          <Link to={`/${roleType}/proposals`} className="text-gray-900">Proposals</Link>
          {roleType === "client" && <Link to="/client/contractsApprovals" className="text-gray-900">Project Approvals</Link>}
          <Link to={`/${roleType}/about`} className="text-gray-900">About</Link>
          <Link to={`/${roleType}/contact`} className="text-gray-900">Contact</Link>
          <button onClick={logout} className="text-red-600">Logout</button>
        </div>
      </div>
    )}
  </nav>
  );
};

export default Navbar;
