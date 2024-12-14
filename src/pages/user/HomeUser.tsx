 

const HomeUser = () => {
 
 

  return (
    <div>
      <section>
        <div className="">
          <figure className="relative transition-all duration-300 cursor-pointer  hover:grayscale-0">
            <a href="#">
              <img
                className=" w-full h-[700px] object-cover"
                src="/public/user_home-1.png"
                alt="image description"
              />
            </a>
            <figcaption className="absolute text-lg text-white bottom-6">
               <div className='pb-60 px-56'>
                  <div className='font-extrabold text-4xl'>
                  <span>Find Your Desired Job Here</span>    
                </div>

                  <div className='font-extrabold text-4xl'>
                    <span>Over 1200+ stunnig projects are waiting for you</span>
                  </div>

             {/* ------Serach------- */}
                  <div> 
                    <label className="mb-2 text-sm font-medium sr-only text-white">Search</label>
                           <div className="relative">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                    </svg>
                                </div>
                                <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search your Jobs..." required />
                             <button type="submit" className="text-white h-full w-22 absolute end-0 bottom-0 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Search
                         </button>
                    </div>  
                  </div>
                  <div>
                      <span>Popular search : Full Stack development, php development</span>
                  </div>  
               </div>
            </figcaption>
          </figure>
        </div>
      </section>
      <section className='text-center my-12'>
         <span className='font-sans text-3xl'>Top Categories</span>
      </section>
    </div>
  );
};

export default HomeUser;
