import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearNotifications, signOutUser } from "../../redux/slices/userSlice";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,

} from "@heroui/react";
import axios from "axios";

import { Avatar } from "@heroui/react";
import { NavbarAutoOpen } from "../shadcn/drawer/NavbarAutoOpen";
import config from '../../config/helper/config'


const Navbar = ({ roleType, roleInfo }: any) => {
 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userNotificationsUnread = useSelector((state: any) => state?.user?.notificationsUnread)


  const logout = async () => {
    const response = await axios.post(
      `${config.VITE_SERVER_URL}/${roleType}/logout`, {},
      { withCredentials: true }
    );

 
    let userVerified; 
    if (roleType === 'user') { 
      // MOVE ALL TO LOGOUT SLICE
      //remove trace of notification page visit 
      localStorage.removeItem('notificationsPageFirstVisit');
      localStorage.removeItem('accessToken');
      dispatch(signOutUser());
      dispatch(clearNotifications()); 
      navigate('/login?rt=user');

    } else if (roleType === 'client') {
      localStorage.removeItem('notificationsPageFirstVisit');
      localStorage.removeItem('accessToken');
      dispatch(signOutUser());

      navigate('/login?rt=client');
    }

  };


  return (


    <nav className="bg-white border-1 shadow-md arsenal-sc-regular ">
      <div className="relative flex h-16 items-center justify-between ">
        <div className="flex flex-1 sm:items-stretch sm:justify-start ml-12">
          <Link to={`/${roleType}/home`}>
            {" "}
            <div className="flex shrink-0 items-start cursor-pointer">
              <img
                className="h-8 my-3 w-auto"
                src="../../public/devLink_logo.png"
                alt="Devlink"
              />
            </div>
          </Link>
          {
            roleType === 'user' ? (
              <NavbarAutoOpen roleType={roleType} roleInfo={roleInfo} />
            ) : (
              <div className=" sm:ml-6 sm:block pl-10">
                <div className="flex space-x-28 ">
                  <p className="rounded-md px-1 py-3 text-sm belleza-regular font-thin text-gray-950 hover:text-gray-300">
                    <Link to={`/${roleType}/home`} className='no-underline text-black'>
                      Home
                    </Link>
                  </p>
                  <p className="rounded-md px-1 py-3 text-sm belleza-regular font-thin text-gray-950 hover:text-gray-300">
                    <Link to={`/${roleType}/developers`} className='no-underline text-black'>
                      Developers
                    </Link>
                  </p>

                  <p className="rounded-md px-1 py-3 text-sm font-thin text-gray-950 hover:text-gray-300">
                    <Link to={`/${roleType}/jobs`} className='no-underline text-black'>
                      <button>Jobs</button>
                    </Link>
                  </p>
                  <p className="rounded-md px-1 py-3 text-sm font-thin text-gray-950 hover:text-gray-300">
                    <Link to={`/${roleType}/contracts/${roleType}`} className='no-underline text-black'>
                      <button>Contracts</button>
                    </Link>
                  </p>

                  
                    <p className="rounded-md px-1 py-3 text-sm font-thin text-gray-950 hover:text-gray-300">
                    <Link to={`/${roleType}/proposals`} className='no-underline text-black'>
                      <button>proposals</button>
                    </Link>
                  </p>
               
    {/* ----------- INVITES SECTION ----------- */}
                  {/* <p className="rounded-md px-1 py-3 text-sm font-thin text-gray-950 hover:text-gray-300">
                    <Link to={`/${roleType}/jobs/proposals`} className='no-underline text-black'>
                      <button>Invites</button>
                    </Link>
                  </p> */}

                  {
                    roleType === 'client' &&
                    <p className="rounded-md px-1 py-3 text-sm font-thin text-gray-950 hover:text-gray-300">
                      <Link to='/client/contractsApprovals' className='no-underline text-black'>
                        <button>Project Approvals</button>
                      </Link>
                    </p>
                  }
                  <p className="rounded-md px-1 py-3 text-sm font-thin text-gray-950 hover:text-gray-300">
                    About
                  </p>
                  <p className="rounded-md px-1 py-3 text-sm font-thin text-gray-950 hover:text-gray-300">
                    Contact
                  </p>
                </div>
              </div>
            )
          }
        </div>

        <div className="inset-y-0 right-0 flex pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 mr-12">

          {/* NOTIFICATION SECITON */}
          {
            roleType === 'user' ? (
              <div className=''>
                <Link to={`/user/notifications/${roleInfo?._id}/user`}>
                  <img className='h-6 w-6 mt-2' src='data:image/png;base64,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' />
                  <span className="absolute font-extrabold grid min-h-[24px] min-w-[24px] translate-x-2/4 -translate-y-2/4 place-items-center rounded-full bg-red-600 py-1 px-1 text-xs text-white">
                    {userNotificationsUnread}
                  </span>
                </Link>
              </div>
            ) : (
              <div>
                <Link to={`/client/notifications/${roleInfo?._id}/client`}>
                  <img className='h-6 w-6 mt-2' src='data:image/png;base64,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' />
                </Link>
              </div>
            )
          }
          {/* notification */}

          {/* <button type="button" className="relative rounded-full bg-white p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
          <span className="absolute -inset-1.5"></span>
          <span className="sr-only">View notifications</span>
          <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
          </svg>
        </button>  

        
        
        {/* Profile Section */}
        {roleInfo && (
          <div className="mx-4 py-2 font-thin">
            <span className="arsenal-sc-regular text-lg"> {roleInfo.name || roleInfo.companyName}</span>
          </div>
        )}
          <div>
            <Dropdown placement="bottom-end" className='rounded-none w-full h-full text-center arsenal-sc-regular'>
              <DropdownTrigger>
                {
                  roleInfo?.profilePicture ? (
                    <img className="h-9 w-9 rounded-full ring-black ring-1 border-2  border-white "
                      src={roleInfo?.profilePicture}
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
                  <Link className='no-underline text-black font-sans text-lg arsenal-sc-regular' to={`/${roleType}/Profile/user-view`}>
                    Profile
                  </Link>
                </DropdownItem>



                <DropdownItem key="contracts">
                  <Link className='no-underline text-black font-sans text-lg arsenal-sc-regular' to={`/${roleType}/contracts/client`}>
                    Requests
                  </Link>
                </DropdownItem>



                <DropdownItem key="home">
                  {
                    roleType === 'user' ? (
                      <Link className='no-underline text-black font-sans text-lg arsenal-sc-regular' to={`/user/allChats/${roleType}/${roleInfo?._id}`}>
                        Chat
                      </Link>
                    ) : (
                      <Link className='no-underline text-black font-sans text-lg arsenal-sc-regular' to={`/client/allChats/${roleType}/${roleInfo?._id}`}>
                        Chat
                      </Link>
                    )
                  }
                </DropdownItem>


                <DropdownItem key="home">
                  <Link className='no-underline text-black font-sans text-lg arsenal-sc-regular' to={`/${roleType}/wallet`}>
                    Wallet
                  </Link>
                </DropdownItem>

                <DropdownItem key="home">
                  <Link className='no-underline text-black font-sans text-lg arsenal-sc-regular' to={`/${roleType}/home`}>
                    Home
                  </Link>
                </DropdownItem>

                <DropdownItem key="logout" onClick={logout} color="danger">
                  <Link className='no-underline text-black font-sans text-lg arsenal-sc-regular' to={`/${roleType}/home`}>
                    Logout
                  </Link>
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
            Home
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

            Jobs
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
