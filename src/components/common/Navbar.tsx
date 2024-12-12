
const Navbar = () => {

    return ( 
<nav className="bg-white border border-1 shadow-md">
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

 
        <div className="">
          <div>
            <button type="button" className="relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
              <img className="size-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="image"/>
            </button>
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