import {Card, CardHeader, Image} from "@nextui-org/react";
import axios from "axios";
import { useEffect, useState } from "react"; 
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from "sonner";
import { Sonner } from '../../components/sonner/Toaster'; 
import { signOutClient } from '../../redux/slices/clientSlice';
   


const HomeClient = () => {

    const [users, setUsers]: any = useState({});

  let message: any = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentClient = useSelector((store: any) => store.client.isClient);
 
 console.log('The current Client : ', currentClient);

  useEffect(() => {
    if (message.state) { 

      toast.error(message.state?.message);  
    };

    // checking whether use exists or not 
    if(!currentClient) {
      navigate('/client/login')
  }
   }, []);


  useEffect(() => {
     const findAllUsers = async () => { 
      try {
      const response = await axios.get('http://localhost:3000/client/getHome', {
         withCredentials: true
     });

 
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

  Object.entries(users).map((user) => {
    console.log('The all users', user?.[1])
  })

 

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
                    <Card className="col-span-12 sm:col-span-4 h-[300px]">
                        <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                        <p className="text-tiny text-black/60 font-bold">{user?.[1]?.email}</p> 
                        </CardHeader> 
                        <Image
                        removeWrapper
                        alt="Card background"
                        className="z-0 w-full h-full object-cover"
                        src="https://workreap.amentotech.com/wp-content/uploads/2024/04/11-1714142074-1714142074-600x600.jpg"
                        />
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