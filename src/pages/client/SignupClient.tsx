import {useEffect, useState} from 'react';
import axios from 'axios';
import { Link ,useNavigate} from 'react-router-dom';  
import Google from '../../components/common/Google';
import { Sonner } from '../../components/sonner/Toaster';
import { toast } from "sonner";

const SignupClient = () => {
  
  
  const [sonner, setSonner] = useState({ message: "", timestamp: 0 });

  const navigate: any = useNavigate(); 
  const [formData, setFormData] = useState({
    companyName: "",
    password: "",
    email: "" 
  });
 
 useEffect(() => {

  if (sonner.message) {
    toast.error(sonner.message, {
      style: {
        backgroundColor: 'red',
        color: 'white'
      }
    });  
    setSonner({ message: "", timestamp: 0 })
  }
 }, [sonner.message]);
 

  const handleChange = (e: any) => {
  
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  const handleSubmit = async () => { 
    try { 
      const response = await axios.post('http://localhost:3000/client/signup', formData); 

      if(!response.data.success) {
        setSonner({ message: response.data.message, timestamp: Date.now() });
      } else {
        const data = {
          clientData: response.data.data,
          mailOtp: response.data.otp
        }
         navigate('/client/verify-otp', { state: { message: data, color: 'success' } });      }
    
   } catch (err: any) {
     console.error('ERROR: ',err.response.data.message)
     setSonner({
       message: err.response?.data?.message || "An error occurred",
      timestamp: Date.now(),
    });
   }
  }
  

    return ( 
  
 <div>
    <div>
           <Sonner />
    </div>
   <div className="font-[sans-serif]">
      <div className="grid lg:grid-cols-2 md:grid-cols-2 items-center gap-4">
        <div className="max-md:order-1 h-screen min-h-full">
          <img src="/public/login.webp" className="w-full h-full object-cover" alt="login-image" />
        </div>

        <form className="max-w-xl w-full p-6 mx-auto">
          <div className="mb-12">
            <h3 className="text-gray-800 text-4xl font-extrabold">DevLink</h3>
            <p className="text-gray-800 text-sm mt-6">Already have an account <Link to='/client/login' className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap">Login here</Link></p>
          </div>

          <div>                   
            <label className="text-gray-800 text-sm block mb-2">Company Name</label>
            <div className="relative flex items-center">
              <input onChange={ handleChange } name="companyName" type="text" required className="w-full border border-1 text-sm text-gray-800 border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none" placeholder="Apple.inc" />
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
            
            <label className="text-gray-800 text-sm block mb-2">Email</label>
            <div className="relative flex items-center">
              <input name="email" type="text" onChange={handleChange} required className="w-full text-sm text-gray-800 border border-1  border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none" placeholder="appleglobal64@gmail.com" />
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

          <div className="mt-8">
            <label className="text-gray-800 text-sm block mb-2">Password</label>
            <div className="relative flex items-center">
              <input name="password" onChange={handleChange} type="text" required className="w-full text-sm text-gray-800 border border-1  border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none" placeholder="Enter password" />
              <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-2 cursor-pointer" viewBox="0 0 128 128">
                <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" data-original="#000000"></path>
              </svg>
            </div>
          </div>
 

          <div className="mt-12">
            <button onClick={handleSubmit} type="button" className="w-full py-2.5 px-4 text-sm tracking-wide rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
              Sign up
            </button>
          </div>

          <div className="my-6 flex items-center gap-4">
            <hr className="w-full border-gray-300" />
            <p className="text-sm text-gray-800 text-center">or</p>
            <hr className="w-full border-gray-300" />
          </div>

     
            <Google role={'client'} />
        </form>
      </div>
    </div>
 
 

 </div>
 
    )
}

export default SignupClient;