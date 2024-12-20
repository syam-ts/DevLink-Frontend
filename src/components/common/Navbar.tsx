import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { signOutUser } from '../../redux/slices/userSlice';
import { useSelector } from 'react-redux';
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import { useEffect } from "react";
import axios from 'axios';
  

const Navbar = () => {


  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentUser = useSelector((store: any) => store.user);

  const user: string = currentUser?.currentUser?.user?.user?.name;

  

  const logout = async () => {
     
    //type user | client ( redux | jwt)


    const data = await axios.post('http://localhost:3000/user/logout');

    console.log('The Logout Response : ', data);

    dispatch(signOutUser())
    navigate('/user/login')
  }

    return ( 
<nav className="bg-white border-1 shadow-md">
    <div className="relative flex h-16 items-center justify-between "> 

      <div className="flex flex-1 sm:items-stretch sm:justify-start ml-12">
        <div className="flex shrink-0 items-start">
          <img className="h-8 w-auto" src="../../public/devLink_logo.png" alt="Devlink"/>
        </div>
        <div className=" sm:ml-6 sm:block pl-16 ">
          <div className="flex space-x-44">
            
            <a href="#" className="rounded-md px-3 py-2 text-sm font-thin text-gray-950 hover:bg-gray-700 hover:text-white">Home</a>
            <a href="#" className="rounded-md px-3 py-2 text-sm font-thin text-gray-950 hover:bg-gray-700 hover:text-white">About</a>
            <a href="#" className="rounded-md px-3 py-2 text-sm font-thin text-gray-950 hover:bg-gray-700 hover:text-white">Contact</a>
            <a href="#" className="rounded-md px-3 py-2 text-sm font-thin text-gray-950 hover:bg-gray-700 hover:text-white">Projects</a>
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
       <div className='mx-4 py-2 font-thin'>
          <span className='font-bold'> {user} </span>
       </div>
 
   {/* Profile dropdown */}
          <div>
            <button type="button" className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
              <div className=''>
              <Dropdown backdrop="blur">
                  <DropdownTrigger>
                    <Button variant="light">   
                    <img className="size-8 object-cover rounded-full" src="https://t4.ftcdn.net/jpg/10/08/49/15/360_F_1008491578_V8DDIEITrHEYYFoNyum3NYg2AAmTvktt.jpg" alt="image"/>
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Static Actions" variant="faded">
                    <DropdownItem key="new">Profile</DropdownItem>
                    <DropdownItem key="copy">Chat</DropdownItem>
              
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
      <a href="#" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Projects</a>
      <a href="#" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Calendar</a>
    </div>
  </div>
 </nav> 
    )
}

export default Navbar;