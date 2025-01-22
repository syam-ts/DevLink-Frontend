import { useEffect, useState } from "react";
import { Card, CardHeader } from "@nextui-org/react"; 
import { Link } from 'react-router-dom'; 
import LinkAttribute from '../../components/nextUi/Link'
import apiInstance from '../../api/axiosInstance';
import { JobPostCard } from '../../components/common/JobPostCard'
import { useSelector } from "react-redux";

 

const HomeUser = () => {

  const [clients, setClients]: any = useState({});
  const [jobs, setJobs]: any  = useState({});
  const userId = useSelector((state: any) => state?.user?.currentUser?.user?._id)
  

  useEffect(() => {

    (async () => {
      const response = await apiInstance.axiosInstanceUser.get(`http://localhost:3000/user/listAllJobs/${userId}`); 
      setJobs(response.data?.data);
    })();

  }, []);

 


  useEffect(() => {
    (async () => {
      try { 
        const { data } = await apiInstance.axiosInstanceUser.get('/getHome', {
          withCredentials: true,
        });

        setClients(data?.data || []);
      } catch (error: any) {
        console.error('Error fetching home data:', error?.response?.data?.message || error.message);
      }
    }
  )();
  }, []);




  return (
    <div className='arsenal-sc-regular'>
      
      <section>
        <div className="arsenal-sc-regular">

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
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                      </svg>
                    </div>
                    <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search your desire Jobs..." required />
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
        <span className='arsenal-sc-regular text-3xl'>Top Clients</span>
        <hr className='border-gray-700 mt-12 w-2/4 mx-auto' />
      </section>


      {/* cards */}
      <section>
        <div className="max-w-[1480px] gap-12 grid grid-cols-12 grid-rows-2 mx-auto my-24">
          {Object.values(clients).map((client: any, index: number) => (
            <Card key={index} className="col-span-12 sm:col-span-4 h-[200px]">
              <CardHeader className="absolute z-10 top-1 flex-col !items-start"> 
              </CardHeader> 
                <img src='https://media.istockphoto.com/id/622925970/photo/clouds-reflected-in-windows-of-modern-office-building.jpg?s=612x612&w=0&k=20&c=qcJr4d4hd0NDTY6v8LZLO6TFR7WdHBKdf39g08RggQY=' />
             
           

              <div className="absolute top-7 grid">
                <span className="px-3 text-xl text-white flex">{client.companyName || "xyzcompany"}
                  <img className='w-5 h-5' src='https://cdn-icons-png.flaticon.com/128/12559/12559876.png' alt='verified-icon' />
                </span>
              
                <span className="px-3 text-sm text-white"> {client?.location || "...."}</span>
              </div>

             
                 
 
              
            </Card>
            
          ))}
        </div> 
        </section> 

        <hr className='border-gray-700 mt-20 w-2/4 mx-auto' />
        <section> 

           <div className="relative max-w-full mt-44">
                <img className="h-[600px] w-full object-cover " src="/public/user-home-img-2.png" alt="start-freelaner-image" />
                <div className="absolute inset-0 rounded-md"></div>
                <div className="absolute grid inset-0 items-start justify-start my-56 mx-72">
                    <h2 className="text-white text-4xl font-bold ">Start as a Freelancer</h2>
                    <span className='text-white'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </span>
                    <button className="rounded-md w-52 border border-transparent bg-[#0000ff] py-3 px-4 flex font-bold items-center text-center text-md transition-all text-white hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                        <Link className='no-underline text-white' to='/user/jobs'>
                          Find Jobs
                        </Link>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 ml-1.5">
                        <path fill-rule="evenodd" d="M16.72 7.72a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 0 1 0 1.06l-3.75 3.75a.75.75 0 1 1-1.06-1.06l2.47-2.47H3a.75.75 0 0 1 0-1.5h16.19l-2.47-2.47a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                      </svg>
                    </button>
                </div>
             </div>
        </section>

        <section className='text-center my-12 mt-44'>
        <span className='arsenal-sc-regular text-4xl'>Top Jobs</span>
        
        <hr className='border-gray-400 mt-12 w-2/4 mx-auto' />
       
        <div className='text-end px-96'> 
        <span className='arsenal-sc-regular'>  
          <Link to='/user/jobs'>
                <LinkAttribute text='More Jobs' />
          </Link>
        </span>
        </div>
      </section>


  {/* jobpost card section */}
      <section>
           <JobPostCard jobs={jobs} />
      </section>

    </div>
  );
};

export default HomeUser;
