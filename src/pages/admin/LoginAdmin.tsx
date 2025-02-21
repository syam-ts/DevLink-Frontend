import {useEffect, useState} from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { Sonner } from '../../components/sonner/Toaster';
import { toast } from "sonner";
import { signInAdmin } from '../../redux/slices/adminSlice';
import { useDispatch } from 'react-redux';


const LoginClient = () => {
 
  const [sonner, setSonner] = useState({ message: "", timestamp: 0 });
  const message = useLocation();
  const navigate = useNavigate(); 
  const dispatch = useDispatch();

 
  useEffect(() => {

    if (sonner.message) {
      toast.error(sonner.message);  
    }
   }, [sonner.message]);

 

  const [formData, setFormData] = useState({
   name: ""
  })

  const handleChange = (e: any) => {
  
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  const handleSubmit = async () => {
        
    try {
     const response = await axios.post('http://localhost:3000/admin/login', formData, {
          withCredentials: true,  
     }) 
     console.log('The whoel ', response.data)
 
      if(!response.data.success) {
      
        setSonner({ message: response.data.message, timestamp: Date.now() });
      } else {
        console.log('Enterd from login')
        dispatch(signInAdmin(response.data.admin.admin));
        navigate('/admin/index/dashboard', { state: { message: response.data.message } });
      }
    
   } catch (err: any) {
     console.error('ERROR: ',err)
     setSonner({
      message: err.response?.data?.message || "An error occurred",
     timestamp: Date.now(),
   });
   }
  }
 

    return ( 
  
 <div>
   <div className="font-[sans-serif]">
 
    <div>
    <Sonner />
    </div>

      <div className="grid lg:grid-cols-2 md:grid-cols-2 items-center gap-4">
        <div className="max-md:order-1 h-screen min-h-full">
          <img src="/public/login.webp" className="w-full h-full object-cover" alt="login-image" />
        </div>

        <form className="max-w-xl w-full p-6 mx-auto">
          <div className="mb-12">
            <h3 className="text-red-600 text-4xl font-extrabold">DevLink <span className='text-sm'>@</span></h3>
          </div>

          <div>                   
            <label className="text-gray-800 text-sm block mb-2">Username</label>
            <div className="relative flex items-center">
              <input name="name" type="text" onChange={handleChange} required className="w-full border-1 text-sm text-gray-800 border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none" placeholder="Enter Username" />
              <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-2" viewBox="0 0 682.667 682.667">
                <defs>
                  <clipPath id="a" clipPathUnits="userSpaceOnUse">
                    <path d="M0 512h512V0H0Z" data-original="#000000"></path>
                  </clipPath>
                </defs>
                <g clip-path="url(#a)" transform="matrix(1.33 0 0 -1.33 0 682.667)">
                  <path fill="none" stroke-miterlimit="10" stroke-width="40" d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z" data-original="#000000"></path>
                  <path d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z" data-original="#000000"></path>
                </g>
              </svg>
            </div>
          </div>

          <div>                   
            <label className="text-gray-800 text-sm block mb-2">Password</label>
            <div className="relative flex items-center">
              <input name="password" type="text" onChange={handleChange} required className="w-full borde-1 text-sm text-gray-800 border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none" placeholder="Enter password" />
              <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-2" viewBox="0 0 682.667 682.667">
                <defs>
                  <clipPath id="a" clipPathUnits="userSpaceOnUse">
                    <path d="M0 512h512V0H0Z" data-original="#000000"></path>
                  </clipPath>
                </defs>
                <g clip-path="url(#a)" transform="matrix(1.33 0 0 -1.33 0 682.667)">
                  <path fill="none" stroke-miterlimit="10" stroke-width="40" d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z" data-original="#000000"></path>
                  <path d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z" data-original="#000000"></path>
                </g>
              </svg>
            </div>
          </div>

     

          <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
{/*     
            <div>
              <a href="jajvascript:void(0);" className="text-blue-600 font-semibold text-sm hover:underline">
                Forgot Password?
              </a>
            </div> */}
          </div>

          <div className="mt-12">
            <button onClick={handleSubmit} type="button" className="w-full py-2.5 px-4 text-sm tracking-wide rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
              Login
            </button>
          </div>
 
        </form>
      </div>
    </div>
 
 

 </div>
 
    )
}

export default LoginClient;