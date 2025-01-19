import axios from "axios";
import { useEffect, useState } from "react";
import { Card, CardHeader, Image } from "@nextui-org/react";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { toast } from "sonner";
import { Sonner } from '../../components/sonner/Toaster';
import { signOutUser } from '../../utils/redux/slices/userSlice';
import LinkAttribute from '../../components/nextUi/Link'
import apiInstance from '../../api/axiosInstance'



const HomeUser = () => {

  const [clients, setClients]: any = useState({});
  const [jobs, setJobs] = useState({});

  let message: any = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((store: any) => store.user.isUser);
  

  useEffect(() => {

    (async () => {
      const response = await apiInstance.axiosInstanceUser.get('http://localhost:3000/user/listAllJobs');

    
      setJobs(response.data?.data);
    })();

  }, []);

  // useEffect(() => {
  //   if (message.state) { 

  //     toast.error(message.state?.message);  
  //   };

  //   // checking whether use exists or not 
  //   if(!currentUser) {
  //     navigate('/user/login')
  // }
  //  }, []);


  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        // Fetch data from the backend
        const { data } = await apiInstance.axiosInstanceUser.get('/getHome', {
          withCredentials: true,
        });

        // Update the state with the fetched data
        setClients(data?.data || []);
      } catch (error: any) {
        console.error('Error fetching home data:', error?.response?.data?.message || error.message);
        // alert('Failed to fetch home data. Please try again.');
      }
    };

    // Call the async function
    fetchHomeData();
  }, []);




  return (
    <>

     
        <Sonner />
      
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
        <span className='font-sans text-3xl'>Top Clients</span>
        <hr className='border-gray-700 mt-12 w-2/4 mx-auto' />
      </section>


      {/* cards */}
      <section>
        <div className="max-w-[1480px] gap-12 grid grid-cols-12 grid-rows-2 mx-auto my-24">
          {Object.values(clients).map((client: any, index: number) => (
            <Card key={index} className="col-span-12 sm:col-span-4 h-[200px]">
              <CardHeader className="absolute z-10 top-1 flex-col !items-start"> 
     
                 <div> 
                <span className="absolute bg-white text-black font-bold top-0 right-0 min-h-[24px] min-w-[24px]">
                  TOP CLIENT
                </span>
              <h4 className="text-black font-medium text-lg py-4">{client.companyName}</h4>
              </div>
              </CardHeader> 
                
 

          
 
              <div className="absolute top-7">
                <span className="font-thin text-white">{client.email || "John Snow"}</span>
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
                        <Link to='/user/jobs'>
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
        <span className='font-sans text-4xl'>Top Jobs</span>
        
        <hr className='border-gray-400 mt-12 w-2/4 mx-auto' />
       
        <div className='text-end px-96'> 
        <span className=''>  
          <Link to='/user/jobs'>
                <LinkAttribute text='More Jobs' />
          </Link>
        </span>
        </div>
      </section>

      <section> 
        {
          Object.entries(jobs).map((job: any) => (
            <div className='w-2/3 border-gray-100 shadow-xl rounded-xl h-[300px] border mx-auto my-20 p-12'>
               <div className='flex justify-between '>


                  <div className='grid'>
                  <span className='text-2xl'>{ job[1]?.title }</span> 
                    <span className='text-sm mt-2'>{ job[1]?.description }</span> 
                    <div className='flex gap-4 mt-3'>
                      <span className='text-sm'>{ job[1]?.expertLevel }</span> 
                      <span className='text-sm'>{ job[1]?.location }</span> 
                    </div>
                    <span className='flex gap-3'>
                      {
                        job[1]?.requiredSkills?.map((skill: string) => (
                           
                            <span className="rounded-full border border-transparent my-4 py-1.5 px-8  text-center text-sm transition-all text-slate-900  bg-slate-300 focus:bg-slate-100 active:bg-slate-100 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" >
                               {skill}
                          </span>
                        ))
                      }  
                    </span> 
                  </div>

                 <div className='grid text-end py-3'>
                  <span className='text-sm'>{ job[1]?.amount }.00₹</span> 
                    <span className='text-sm'>{ job[1]?.paymentType }</span> 
                    <span className='text-sm'>{ job[1]?.estimateTimeinHours }/hr</span> 
                    <span className='text-sm text-green-500'>{ job[1]?.projectType }</span> 
                     <button className="rounded-md bg-slate-800 px-12 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2" type="button">
                    View
                  </button>     
                  </div>
               </div>
               
            
                 
              

            </div>

              

         
              
          
            // <div className='w-2/3 border justify-between border-gray-100 shadow-xl rounded-xl h-[220px] mx-auto my-12 '>

             

       



            // </div>
          ))
        }

      </section>
    </>
  );
};

export default HomeUser;
