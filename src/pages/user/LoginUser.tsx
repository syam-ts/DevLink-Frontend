import {useEffect, useState} from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { toast } from "sonner";
import { Sonner } from '../../components/sonner/Toaster';
import { signInUser } from '../../utils/redux/slices/userSlice'
import { useSelector } from 'react-redux';
import Google from '../../components/common/Google';

const LoginUser = () => {

  const [sonner, setSonner] = useState({ message: "", timestamp: 0 });
  const dispatch = useDispatch();
  const currentUser = useSelector((store: any) => store.user.isUser);
 
  const message = useLocation();
  const navigate = useNavigate(); 
  

  // useEffect(() => {
 
  //   // checking whether use exists or not 
  //   if(currentUser) {
  //     navigate('/user/home')
  // }
  //  }, []);
 
  // useEffect(() => {

  //   if (sonner.message) {
  //     toast.error(sonner.message, {
  //       style: {
  //         backgroundColor: "red",
  //         color: "white"
  //       }
  //     });  
  //   }
  //   setSonner({ message: "", timestamp: 0 })
  //  }, [sonner.message]);

 

  const [formData, setFormData] = useState({
   email: ""
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
     const response = await axios.post('http://localhost:3000/user/login', formData, {
      withCredentials: true,  
    });
    console.log('The token', response.data)
    const { accessToken  }= response.data;

    localStorage.setItem('accessTokenU', accessToken);
    // localStorage.setItem('refreshToken', refreshToken);

    window.location.href = '/user/home';
     
 
      // if(response.data.type !== 'success') {
      //   setSonner({ message: response.data.message, timestamp: Date.now() });
      // } else {
      //   dispatch(signInUser(response.data))
      //   navigate('/user/home', { state: { message: response.data.message } });
      // }
    
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
            <h3 className="text-gray-800 text-4xl font-extrabold">DevLink</h3>
            <p className="text-gray-800 text-sm mt-6">Already have an account <Link to='/user/signup'> <a href="javascript:void(0);" className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap">Signup here</a> </Link> </p>
          </div>

          <div>                   
            <label className="text-gray-800 text-sm block mb-2">Email</label>
            <div className="relative flex items-center">
              <input name="email" type="text" onChange={handleChange} required className="w-full border-1 text-sm text-gray-800 border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none" placeholder="Enter email" />
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
              <input name="password" type="text" onChange={handleChange} required className="w-full border-1 text-sm text-gray-800 border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none" placeholder="Enter password" />
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
    
            <div>
              <Link to='/user/verify-email' >
              <a href="jajvascript:void(0);" className="text-blue-600 font-thin text-xs hover:underline">
                Forgot Password?
              </a>
              </Link>
            </div>
          </div>

          <div className="mt-12">
            <button onClick={handleSubmit} type="button" className="w-full py-2.5 px-4 text-sm tracking-wide rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
              Login
            </button>
          </div>

          <div className="my-6 flex items-center gap-4">
            <hr className="w-full border-gray-300" />
            <p className="text-sm text-gray-800 text-center">or</p>
            <hr className="w-full border-gray-300" />
          </div>

          <Google role={'user'} />
        </form>
      </div>
    </div>
 
 

 </div>
 
    )
}

export default LoginUser;