import {useState} from 'react';
import axios from 'axios';


const Login = () => {

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
       
    console.log('Form ', formData)
    const response = await axios.post('http://localhost:3000/user/login', formData)
    console.log(response.data.message);
   try {
    
   } catch (err) {
     console.error('ERROR: ',err)
   }
  }
 

    return ( 
  
 <div>
   <div className="font-[sans-serif]">
      <div className="grid lg:grid-cols-2 md:grid-cols-2 items-center gap-4">
        <div className="max-md:order-1 h-screen min-h-full">
          <img src="https://assets-us-01.kc-usercontent.com/7beb5311-75a4-0049-50f5-8f58fd55aba7/7a1ab39f-e032-47b9-aaa9-ab06f301ac80/Article_59.jpeg" className="w-full h-full object-cover" alt="login-image" />
        </div>

        <form className="max-w-xl w-full p-6 mx-auto">
          <div className="mb-12">
            <h3 className="text-gray-800 text-4xl font-extrabold">DevLink</h3>
            <p className="text-gray-800 text-sm mt-6">Already have an account <a href="javascript:void(0);" className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap">Signup here</a></p>
          </div>

          <div>                   
 
      
            <label className="text-gray-800 text-sm block mb-2">Email</label>
            <div className="relative flex items-center">
              <input name="email" type="text" onChange={handleChange} required className="w-full text-sm text-gray-800 border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none" placeholder="Enter email" />
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
              <a href="jajvascript:void(0);" className="text-blue-600 font-semibold text-sm hover:underline">
                Forgot Password?
              </a>
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

          <button type="button" className="w-full flex items-center justify-center gap-4 py-2.5 px-4 text-sm tracking-wide text-gray-800 border border-gray-300 rounded-md bg-transparent hover:bg-gray-50 focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" width="20px" className="inline" viewBox="0 0 512 512">
              <path fill="#fbbd00"
                d="M120 256c0-25.367 6.989-49.13 19.131-69.477v-86.308H52.823C18.568 144.703 0 198.922 0 256s18.568 111.297 52.823 155.785h86.308v-86.308C126.989 305.13 120 281.367 120 256z"
                data-original="#fbbd00" />
              <path fill="#0f9d58"
                d="m256 392-60 60 60 60c57.079 0 111.297-18.568 155.785-52.823v-86.216h-86.216C305.044 385.147 281.181 392 256 392z"
                data-original="#0f9d58" />
              <path fill="#31aa52"
                d="m139.131 325.477-86.308 86.308a260.085 260.085 0 0 0 22.158 25.235C123.333 485.371 187.62 512 256 512V392c-49.624 0-93.117-26.72-116.869-66.523z"
                data-original="#31aa52" />
              <path fill="#3c79e6"
                d="M512 256a258.24 258.24 0 0 0-4.192-46.377l-2.251-12.299H256v120h121.452a135.385 135.385 0 0 1-51.884 55.638l86.216 86.216a260.085 260.085 0 0 0 25.235-22.158C485.371 388.667 512 324.38 512 256z"
                data-original="#3c79e6" />
              <path fill="#cf2d48"
                d="m352.167 159.833 10.606 10.606 84.853-84.852-10.606-10.606C388.668 26.629 324.381 0 256 0l-60 60 60 60c36.326 0 70.479 14.146 96.167 39.833z"
                data-original="#cf2d48" />
              <path fill="#eb4132"
                d="M256 120V0C187.62 0 123.333 26.629 74.98 74.98a259.849 259.849 0 0 0-22.158 25.235l86.308 86.308C162.883 146.72 206.376 120 256 120z"
                data-original="#eb4132" />
            </svg>
            Continue with google
          </button>
        </form>
      </div>
    </div>
 
 

 </div>
 
    )
}

export default Login;