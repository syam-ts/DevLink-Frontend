import {useEffect, useState} from 'react'; 
import axios from 'axios';
import { toast } from "sonner";
import { Sonner } from '../../components/sonner/Toaster'; 

const VerfiyEmail = () => {

  const [sonner, setSonner] = useState({ message: "", timestamp: 0 }); 
 
 
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
   email: ''
  })

  const handleChange = (e) => {
  
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  const handleSubmit = async () => {
        
    try {
       
     const response = await axios.post('http://localhost:3000/user/verify-email', formData, {
      withCredentials: true, 
    }) 
 
      if(response.data.type !== 'success') {
        setSonner({ message: response.data.message, timestamp: Date.now() });
      } else {
        toast.success(response.data.message)
      }
    
   } catch (err) {
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
          </div>
 

          <div>                   
            <label className="text-gray-800 text-sm block mb-2">Email</label>
            <div className="relative flex items-center">
              <input name="email" type="text" onChange={handleChange} required className="w-full border-1 text-sm text-gray-800 border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none" placeholder="Enter Your Email" />
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
          {/* handleSubmit */}
            <button onClick={handleSubmit} type="button" className="w-full py-2.5 px-4 text-sm tracking-wide rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
              Verify Email
            </button>
          </div> 
 
       

        
        </form>
      </div>
    </div>
 
 

 </div>
 
    )
}

export default VerfiyEmail;