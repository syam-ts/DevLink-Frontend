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
    <nav className="bg-white shadow-md fixed w-full z-10">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <Link to={`/${roleType}/home`} className="no-underline">
            <span className=" text-black nunito-bold text-xl ">Devlink</span>
          </Link>
        </div>

        <div className="w-full sm:hidden max-sm:hidden md:flex md:items-center md:justify-center md:space-x-8 bg-white">
          <Link
            to={`/${roleType}/home`}
            className="text-md text-gray-900 hover:text-gray-500 no-underline arsenal-sc-regular"
          >
            Home
          </Link>
          <Link
            to={`/${roleType}/jobs`}
            className="text-md text-gray-900 hover:text-gray-500 no-underline arsenal-sc-regular"
          >
            Jobs
          </Link>
          <Link
            to={`/${roleType}/contracts/${roleType}`}
            className="text-md text-gray-900 hover:text-gray-500 no-underline arsenal-sc-regular"
          >
            Contracts
          </Link>
          <Link
            to={`/${roleType}/proposals`}
            className="text-md text-gray-900 hover:text-gray-500 no-underline arsenal-sc-regular"
          >
            Proposals
          </Link>
          <Link
            to={`/${roleType}/invites`}
            className="text-md text-gray-900 hover:text-gray-500 no-underline arsenal-sc-regular"
          >
            Invites
          </Link>
          {roleType === "client" && (
            <Link
              to="/client/contractsApprovals"
              className="text-md text-gray-900 hover:text-gray-500 no-underline arsenal-sc-regular"
            >
              Project Approvals
            </Link>
          )}
          <Link
            to={`/${roleType}/home`}
            className="text-md text-gray-900 hover:text-gray-500 no-underline arsenal-sc-regular"
          >
            About
          </Link>
          <Link
            to={`/${roleType}/home`}
            className="text-md text-gray-900 hover:text-gray-500 no-underline arsenal-sc-regular"
          >
            Contact
          </Link>

          {/* PENDING */}

          <Link
            to={`/${roleType}/notifications/${roleInfo._id}/user`}
            className="text-md text-gray-900 hover:text-gray-500 no-underline arsenal-sc-regular"
          >
            <img alt="notification-icon" />
          </Link>
        </div>

        {/* Profile section */}
        <div className="  md:flex items-center space-x-6">
          <Link
            to={`/${roleType}/notifications/${roleInfo?._id}/${roleType}`}
            className="relative"
          >
            {userNotificationsUnread > 0 && (
              <span className="absolute top-0 right-0 bg-red-600 text-white text-xs px-2 py-1 rounded-full">
                {userNotificationsUnread}
              </span>
            )}
          </Link>

          {/* Profile Dropdown */}

          <Dropdown
            placement="bottom-end"
            className="grid justify-center !pl-0"
          >
            <DropdownTrigger>
              {roleInfo?.profilePicture ? (
                <div className="flex gap-4">
                  <span>{roleInfo.name.split(' ').join('')}</span>
                  <img className="h-9 w-9 rounded-full border border-gray-300" src={roleInfo.profilePicture}  alt="Profile" />
                </div>
              ) : (
                <div className="flex gap-4">
                  <span>{roleInfo.companyName}</span>
                  <span className="h-9 w-9 flex items-center justify-center rounded-full bg-gray-300"></span>
                </div>
              )}
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem key="none">
                <Link
                  to={`/${roleType}/Profile/user-view`}
                  className="text-gray-900 no-underline"
                >
                  Profile
                </Link>
              </DropdownItem>
              <DropdownItem key="none">
                <Link
                  to={`/${roleType}/contracts/client`}
                  className="text-gray-900 no-underline"
                >
                  Requests
                </Link>
              </DropdownItem>
              <DropdownItem key="none">
                <Link
                  to={`/${roleType}/wallet`}
                  className="text-gray-900 no-underline"
                >
                  Wallet
                </Link>
              </DropdownItem>
              <DropdownItem key="none">
                <Link
                  to={`/${roleType}/home`}
                  className="text-gray-900 no-underline"
                >
                  Home
                </Link>
              </DropdownItem>
              <DropdownItem
                onClick={logout}
                key="none"
                className="text-red-600"
              >
                Logout
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      {/* Mobile Menu Button */}
      <button
        className="md:hidden focus:outline-none"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md py-3 absolute top-full left-0 w-full z-50">
          <div className="container mx-auto px-6 flex flex-col space-y-4">
            <Link
              to={`/${roleType}/home`}
              className="text-gray-900"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to={`/${roleType}/jobs`}
              className="text-gray-900"
              onClick={() => setMenuOpen(false)}
            >
              Jobs
            </Link>
            <Link
              to={`/${roleType}/contracts/${roleType}`}
              className="text-gray-900"
              onClick={() => setMenuOpen(false)}
            >
              Contracts
            </Link>
            <Link
              to={`/${roleType}/proposals`}
              className="text-gray-900"
              onClick={() => setMenuOpen(false)}
            >
              Proposals
            </Link>
            {/* <Link
              to={`/${roleType}/invites`}
              className="text-gray-900"
              onClick={() => setMenuOpen(false)}
            >
              Invites
            </Link> */}
            {roleType === "client" && (
              <Link
                to="/client/contractsApprovals"
                className="text-gray-900"
                onClick={() => setMenuOpen(false)}
              >
                Project Approvals
              </Link>
            )}
            <Link
              to={`/${roleType}/about`}
              className="text-gray-900"
              onClick={() => setMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to={`/${roleType}/contact`}
              className="text-gray-900"
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
