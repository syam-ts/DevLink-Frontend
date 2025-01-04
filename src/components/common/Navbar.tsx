import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { signOutUser } from '../../utils/redux/slices/userSlice'; 
import { signOutClient } from '../../utils/redux/slices/clientSlice'; 
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import axios from 'axios';
  

const Navbar = ({ roleType, roleInfo }: any) => {

  console.log("the role ", roleInfo)
   
  const navigate = useNavigate();
  const dispatch = useDispatch();
  

  const logout = async () => {
    const response = await axios.post(`http://localhost:3000/${roleType}/logout`, {}, {
      withCredentials: true
    });

    if(roleType === 'user') {

      dispatch(signOutUser())
      navigate('/user/login')
    } else {
      dispatch(signOutClient())
      navigate('/client/login')

    } 
  }

    return ( 
<nav className="bg-white border-1 shadow-md">
    <div className="relative flex h-16 items-center justify-between "> 

      <div className="flex flex-1 sm:items-stretch sm:justify-start ml-12">
             <Link to={`/${roleType}/home`} > <div className="flex shrink-0 items-start cursor-pointer">
          <img className="h-8 w-auto" src="../../public/devLink_logo.png" alt="Devlink"/>
        </div>
        </Link>
        <div className=" sm:ml-6 sm:block pl-16 ">
          <div className="flex space-x-44">
            
            <p className="rounded-md px-3 py-2 text-sm font-thin text-gray-950 hover:bg-gray-700 hover:text-white"><Link to={`/${roleType}/home`} >Home</Link></p>
            <p className="rounded-md px-3 py-2 text-sm font-thin text-gray-950 hover:bg-gray-700 hover:text-white">About</p>
            <p className="rounded-md px-3 py-2 text-sm font-thin text-gray-950 hover:bg-gray-700 hover:text-white">Contact</p>
            <p className="rounded-md px-3 py-2 text-sm font-thin text-gray-950 hover:bg-gray-700 hover:text-white">
              
            <Link to={`/${roleType}/jobs`}><button >Jobs</button></Link> 
             </p>
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


       {
        roleInfo && (
          <div className='mx-4 py-2 font-thin'>
          <span className='font-bold'> { roleInfo.name } </span>
       </div>
        )  
       }
 
   {/* Profile dropdown */}
          <div>
            <button type="button" className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
              <div className=''>
              <Dropdown backdrop="blur">
                  <DropdownTrigger>
                    <Button variant="light">   
                       { 
                        roleInfo.profilePicture ? (
                          <img className="size-8 object-cover rounded-full" src={roleInfo.profilePicture} alt="image"/>
                        ) : (
                          <img className="size-8 object-cover rounded-full" src='data:image/png;base64,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' alt="image"/>
                        )
                       }
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Static Actions" variant="faded">
                    <DropdownItem key="new"> <Link to={`/${roleType}/profile/profile`} >Profile</Link> </DropdownItem>
                    <DropdownItem key="copy">Chat</DropdownItem>
                    <DropdownItem key="new"> <Link to={`/${roleType}/home`} >Home</Link> </DropdownItem>
                    <DropdownItem key="delete" className="text-danger" color="danger" onClick={logout}>
                      Logout
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </button>
          </div> 
      
      </div> 
  </div>
 
  <div className="sm:hidden" id="mobile-menu">
    <div className="space-y-1 px-2 pb-3 pt-2">
      <a href="#" className="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white" aria-current="page">Dashboard</a>
      <a href="#" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Team</a>
      <a href="#" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"> Jobs </a>
      <a href="#" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Calendar</a>
    </div>
  </div>
 </nav> 
    )
}

export default Navbar;