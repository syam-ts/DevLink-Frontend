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
    <div>

      <div>
        <Sonner />
      </div>
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
        <hr className='border-gray-400 mt-12 w-2/4 mx-auto' />
      </section>


      {/* cards */}
      <section>
        <div className="max-w-[1480px] gap-12 grid grid-cols-12 grid-rows-2 mx-auto">
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
                
              <img
                alt={`${client.name}'s profile`}
                className="z-0 w-full h-full object-cover"
                src="data:image/jpeg;base64,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"
              />

          

                
              <div className="absolute top-7">
                <span className="font-thin text-white">{client.email || "John Snow"}</span>
              </div>
              
            </Card>
            
          ))}
        </div>
        <div>
          
        </div>
        </section> 


        <section > 

           <div className="relative max-w-full mt-20">
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
            <div className='w-2/3 border flex border-gray-100 shadow-xl rounded-xl h-[200px] mx-auto my-20'>
               <div className='grid px-12 py-2 w-full font-mono'> 
                  <div>
                    <span className='font-semibold text-lg'> 
                      {job[1]?.title}
                    </span>
                  </div>
                  <div>
                    <span>
                      {job[1]?.description}
                    </span>
                  </div>

                

                  <div className=''>
                    <span>
                      {job[1]?.paymentType}
                    </span>
                  </div>
               

              </div>

              <div className='text-end w-full py-10'>
              <div>
                    <span>
                      {job[1]?.requiredSkills}
                    </span>
                  </div>


                  <div>
                    <span>
                      {job[1]?.keyResponsiblities}
                    </span>
                  </div>
              </div>


              <div className='grid justify-end pr-12 w-full gap-3 text-end'>
                <div className='ml-5 font-mono'>
                  <span>{job[1]?.amount}₹ </span>
                </div>
                {/* <div>
                  <button className="rounded-md border border-slate-300 py-2 px-12 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                   <Link to={`/client/userProfile/${proposal[1]?.userId}`}> View </Link>  
                  </button>
                  </div> */}
                <div>
                  <button className="rounded-md bg-slate-800 py-2 px-12 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2" type="button">
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
    </div>
  );
};

export default HomeUser;
