import {useEffect, useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import { toast } from "sonner";
import { Sonner } from '../../components/sonner/Toaster'; 

const OtpClient = () => {

  const [sonner, setSonner] = useState({ message: "", timestamp: 0 });
 
 


  const message = useLocation();
  const navigate = useNavigate();
  

 
 
  useEffect(() => {

    if (sonner.message) {
      toast.error(sonner.message, {
        style: {
          backgroundColor: "red",
          color: "white"
        }
      });  
    }
    setSonner({ message: "", timestamp: 0 })
   }, [sonner.message]);

 

  const [formData, setFormData] = useState({
   otp: 0
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
      const data = {
        client: message.state.message.clientData,
        mailOtp: message.state.message.mailOtp,
        clientOtp: formData
      }
      
     const response = await axios.post('http://localhost:3000/client/verify-otp', data, {
      withCredentials: true, 
    }) 
 
      if(!response.data.sucess) {
        setSonner({ message: response.data.message, timestamp: Date.now() });
      } else {
        navigate('/client/login', { state: { message: response.data.message }});
      }
    
   } catch (err: any) {
     console.error('ERROR: ',err)
     setSonner({
      message: err.response?.data?.message || "An error occurred",
     timestamp: Date.now(),
   });
   }
  }


  const resendOtp = async () => {

    const response = await axios.post('http://localhost:3000/client/resend-otp',message.state.message.clientData);
    
    if(response.data.type === 'success') {

     console.log('The new otp ', response?.data)
     toast.error(response.data.message, {
       style: {
         backgroundColor: "white",
         color: "black"
       }
     })
       message.state.message.mailOtp = response.data.newOtp
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
          </div>
 

          <div>                   
            <label className="text-gray-800 text-sm block mb-2">OTP</label>
            <div className="relative flex items-center">
              <input name="otp" type="number" onChange={handleChange} required className="w-full border-1 text-sm text-gray-800 border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none" placeholder="Enter otp" />
              <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-2" viewBox="0 0 682.667 682.667">
                <defs>
                  <clipPath id="a" clipPathUnits="userSpaceOnUse">
                    <path d="M0 512h512V0H0Z" data-original="#000000"></path>
                  </clipPath>
                </defs> 
              </svg>
            </div>
          </div>

      
          <div className="mt-12">
            <button onClick={handleSubmit} type="button" className="w-full py-2.5 px-4 text-sm tracking-wide rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
              Verify OTP
            </button>
          </div>
 
          
          <div className="mt-12"> 
            <button onClick={resendOtp} type="button" className="w-full hover:text-gray-400 py-2.5 px-4 text-sm tracking-wide rounded-md text-black focus:outline-none">
              Resend OTP
            </button>
          </div>
        
        </form>
      </div>
    </div>
 
 

 </div>
 
    )
}

export default OtpClient;