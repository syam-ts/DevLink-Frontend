import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signOutUser } from "../../utils/redux/slices/userSlice";
import { signOutClient } from "../../utils/redux/slices/clientSlice";
import JobProposalsDrawer from '../rsuite/proposalsDrawer'
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import axios from "axios";

import {
  
  Avatar,
  User,
} from "@nextui-org/react";


const Navbar = ({ roleType, roleInfo }: any) => {
  console.log("the role ", roleInfo);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = async () => {
    const response = await axios.post(
      `http://localhost:3000/${roleType}/logout`,{},{withCredentials: true } 
    );



    if(roleType === 'user') {

      localStorage.removeItem('accessTokenU')
      // localStorage.removeItem('refreshToken');
  
      window.location.href = '/user/login'
    } else if(roleType === 'client') { 
      localStorage.removeItem('accessTokenC')
      // localStorage.removeItem('refreshToken');
  
      window.location.href = '/client/login'
    }

    // if (roleType === "user") {
    //   dispatch(signOutUser());
    //   navigate("/user/login");
    // } else {
    //   dispatch(signOutClient());
    //   navigate("/client/login");
    // }
  };
 

  return (
    <nav className="bg-white border-1 shadow-md ">
      <div className="relative flex h-16 items-center justify-between ">
        <div className="flex flex-1 sm:items-stretch sm:justify-start ml-12">
          <Link to={`/${roleType}/home`}>
            {" "}
            <div className="flex shrink-0 items-start cursor-pointer">
              <img
                className="h-8 my-2 w-auto"
                src="../../public/devLink_logo.png"
                alt="Devlink"
              />
            </div>
          </Link>
          <div className=" sm:ml-6 sm:block pl-16 ">
            <div className="flex space-x-44">
              <p className="rounded-md px-3 py-3 text-sm font-thin text-gray-950 hover:text-gray-300">
                <Link to={`/${roleType}/home`}>Home</Link>
              </p>
              <p className="rounded-md px-3 py-2 text-sm font-thin text-gray-950 hover:text-gray-300">
                About
              </p>
              <p className="rounded-md px-3 py-2 text-sm font-thin text-gray-950 hover:text-gray-300">
                Contact
              </p>
              <p className="rounded-md px-3 py-2 text-sm font-thin text-gray-950 hover:text-gray-300">
                <Link to={`/${roleType}/jobs`}>
                  <button>Jobs</button>
                </Link>
              </p>
              {
                roleType === 'client' &&
              <p>
                 <JobProposalsDrawer />
              </p>
              }
            </div>
          </div>
        </div>

        <div className="inset-y-0 right-0 flex pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 mr-12">
          {/* notification */}

          {/* <button type="button" className="relative rounded-full bg-white p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
          <span className="absolute -inset-1.5"></span>
          <span className="sr-only">View notifications</span>
          <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
          </svg>
        </button> */}

          {roleInfo && (
            <div className="mx-4 py-2 font-thin">
              <span className="comfortaa-regular text-lg"> {roleInfo.name} </span>
            </div>
          )}



<div className="flex items-center gap-4">
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          {
            roleInfo.profilePicture ? (
              <img 
              
            className="h-9 w-9 rounded-full ring-black ring-4 border-5 border-white"
            src={roleInfo.profilePicture}
          />
            ) : (
              <Avatar 
            isBordered
            as="button"
            className="transition-transform"
            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
          />
            )
          }
          
          
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownItem key="profile">
            <Link className='no-underline text-black comfortaa-regular text-medium' to={`/${roleType}/profile/profile`}>
            Profile
            </Link>
          </DropdownItem>
          <DropdownItem key="proposals">
          <Link className='no-underline text-black comfortaa-regular text-medium' to={`/${roleType}/job/proposals`}>
            Proposals
          </Link>
          </DropdownItem>
          <DropdownItem key="home">
          <Link className='no-underline text-black comfortaa-regular text-medium' to={`/${roleType}/all-contracts/${roleInfo?._id}`}>
             Contracts
          </Link>
          </DropdownItem>  
          <DropdownItem key="team_settings">
            Chat
          </DropdownItem>
          <DropdownItem key="home">
          <Link className='no-underline text-black comfortaa-regular text-medium' to={`/${roleType}/home`}>
             Home
          </Link>
          </DropdownItem>  
          <DropdownItem key="logout" onClick={logout} color="danger">
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      
    </div>
         

          
        </div>
      </div>

      <div className="sm:hidden" id="mobile-menu">
        <div className="space-y-1 px-2 pb-3 pt-2">
          <a
            href="#"
            className="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white"
            aria-current="page"
          >
            Dashboard
          </a>
          <a
            href="#"
            className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            Team
          </a>
          <a
            href="#"
            className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            {" "}
            Jobs{" "}
          </a>
          <a
            href="#"
            className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            Calendar
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
