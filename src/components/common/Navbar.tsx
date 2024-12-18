import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { signOutUser } from '../../redux/slices/userSlice'
import { useSelector } from 'react-redux';

  

const Navbar = () => {
  
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const currentUser = useSelector((store: any) => store.user);

  const logout = () => {

    const isUser = false;
    //type user | client ( redux | jwt)
    dispatch(signOutUser(currentUser))
    navigate('/user/login')
  }

    return ( 
<nav className="bg-white border-1 shadow-md">
    <div className="relative flex h-16 items-center justify-between "> 

      <div className="flex flex-1 sm:items-stretch sm:justify-start ml-12">
        <div className="flex shrink-0 items-start">
          <img className="h-8 w-auto" src="../../public/devLink_logo.png" alt="Your Company"/>
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
       <div className='mx-4 font-thin'>
          <span>mohith kumar</span>
       </div>
 
        <div>
          <div>
            <button type="button" className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
              <img className="size-8 object-cover rounded-full" src="https://t4.ftcdn.net/jpg/10/08/49/15/360_F_1008491578_V8DDIEITrHEYYFoNyum3NYg2AAmTvktt.jpg" alt="image"/>
            </button>
          </div>

          <div className='bg-white pl-12 top-6 absolute cursor-pointer' onClick={logout}>
             <img className='h-4' src='data:image/png;base64,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' alt='user image' />
          </div>
 
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