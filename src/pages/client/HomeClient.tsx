import {Card, CardHeader, Image} from "@nextui-org/react";
 
import { useEffect, useState } from "react"; 
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from "sonner";
import { Sonner } from '../../components/sonner/Toaster'; 
import { signOutClient } from '../../utils/redux/slices/clientSlice'; 
import { Link } from 'react-router-dom';
import apiInstance from '../../api/axiosInstance'
   


const HomeClient = () => {

    
    let message: any = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isClient = useSelector((store: any) => store.client.isClient);
    
    const [modal, showModal] = useState(false);
    const [users, setUsers]: any = useState({});
  
 
 

  useEffect(() => {
    if (message.state) { 

      toast.error(message.state?.message);  
    };

    // checking whether use exists or not 
    if(!isClient) {
      navigate('/client/login')
  }
   }, []);


  useEffect(() => {
     const findAllUsers = async () => { 
      try {
      const response = await apiInstance.axiosInstanceClient.get('client/getHome', {
         withCredentials: true
     });

     console.log('The response ', response.data)
 
      setUsers(response.data.data)

      } catch (err: any) {
        
        if(err.response.data.message === 'Invalid Token') {
          dispatch(signOutClient());
            navigate('/client/login');
        } 
        toast.error(err.response.data.message);
      }
     };

     findAllUsers();
  }, []);

 
//   const openUserProfile = async (userId: string) => {
  
//     try{
//         const response = await axios.post(`http://localhost:3000/client/getUserProfile/${userId}`);

//         console.log('The response , ', response.data);

//     }catch(err: any) {
//         console.log('ERROR: ', err.message);
//     }

//   }
 

    return (
        <main>

            

            <section className='bg-rose-100'>

                <figure className="relative transition-all duration-300 cursor-pointer  hover:grayscale-0">
                    <a href="#">
                        <img
                            className="object-fill ml-auto"
                            src="/public/client_home-1.png"
                            alt="image description"
                        />
                    </a>
                    <figcaption className="absolute text-lg text-white bottom-6 ">
                        <div className='mb-44 ml-20'>
                            <div>
                                <span className='text-black font-extrabold text-3xl'>Thrive the World of Freelance
                                    <br /> Excellence Marketplace</span>
                            </div>
                            <div>
                                <span className='text-black font-bold text-xl'>TFlourish in a thriving freelance ecosystem dedicated to
                                    <br />   excellence and limitless opportunities.</span>
                            </div>

                            <label
                                className="mx-auto mt-40 relative bg-white min-w-sm max-w-2xl flex flex-col md:flex-row items-center justify-center border py-2 px-2 rounded-2xl gap-2 shadow-2xl focus-within:border-gray-300"
                            >
                                <input id="search-bar" placeholder="Search for freelancers..."
                                    className="px-6 py-2 w-full rounded-md flex-1 outline-none bg-white" />
                                <button
                                    className="w-full md:w-auto px-6 py-3 bg-black border-black text-white fill-white active:scale-95 duration-100 border will-change-transform overflow-hidden relative rounded-xl transition-all disabled:opacity-70">

                                    <div className="relative">

                                        <div
                                            className="flex items-center justify-center h-3 w-3 absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 transition-all">
                                            <svg className="opacity-0 animate-spin w-full h-full" xmlns="http://www.w3.org/2000/svg" fill="none"
                                                viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                                    stroke-width="4"></circle>
                                                <path className="opacity-75" fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                                </path>
                                            </svg>
                                        </div>

                                        <div className="flex items-center transition-all opacity-1 valid:"><span
                                            className="text-sm font-extrabold whitespace-nowrap truncate mx-auto">
                                            Search
                                        </span>
                                        </div>

                                    </div>

                                </button>
                            </label>

                        </div>
                    </figcaption>
                </figure>
            </section>

            <section className='flex bg-stone-300 h-auto text-center font-thin p-16 gap-48'>
                <div>
                    <span>Flourish in a thriving freelance ecosystem dedicated to
                        <br /> excellence and limitless opportunities.</span>
                </div>
                <div>
                    <span>4.91/5
                        <br />   Average rating for work with tech
                        <br />  talent.</span>
                </div>
                <div>
                    <span>211K+ contracts
                        <br />      Engaged in development & IT work in
                        <br />    the past year.</span>
                </div>
                <div>
                    <span>1,665 skills
                        <br />    Backed by talent on Workreap.</span>
                </div>
            </section>

            <section className='text-center my-12'>
                <span className='font-sans text-3xl'>Top Rated Freelancers</span> <br />
                <span>Browse talent for your projects</span>
            </section>

         {/* cards */}
            <section className='flex gap-12 mx-auto justify-center'> 
                {Object.entries(users).map((user: any) => (
                    
                    <div className="max-w-[900px] flex gap-12 ">
                    <Card className="col-span-12 sm:col-span-4 h-[250px]">
                        <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                        <p className="text-tiny text-black/60 font-bold">{user?.[1]?.email}</p> 
                        </CardHeader> 
                      <Link to={`/client/userProfile/${user?.[1]._id}`}>
                      <Image 
                        removeWrapper
                        alt="Card background"
                        className="z-0 w-full h-full object-cover cursor-pointer"
                        src="data:image/png;base64,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"
                        />
                        </Link>
                     </Card> 
                     <div className='absolute pt-80 pl-4'>
                         
                        <span className='font-thin'>{user?.[1]?.name}</span>
                     </div>
                   </div>
                ))}
            </section>
        </main>
    )
};


export default HomeClient;