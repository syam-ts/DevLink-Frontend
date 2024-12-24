import { Grid, Box } from "@mui/material"; 
import { useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Modal from '../../../../../components/nextUi/modals/LargeModal'



const Profile = () => {
  
 const navigate = useNavigate();
//  const isUser = useSelector((state: any) => state?.user?.isUser);

 const [ users, setUsers ] = useState({});

 


// useEffect(() => {
//   const getUserData = async () => {

//     try {
      
//       const response = await axios.get('http://localhost:3000/user/profile/view',{
//         withCredentials: true
//     }); 
  
  
//       setUsers(response.data.data.allUsers);
//     } catch (err: any) {
//       console.log('The err', err.response.data.message)
//     if(err.response.data.message == 'No token provided') {
//       navigate('/user/login')
//     }
//     }
//   }

//   getUserData();
// }, []);

// useEffect(() => {
//   console.log('Enterd')
//   if(isUser=== undefined) {
//       navigate('/user/login')
//   }

// }, []);

  return (
    <div> 


<div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
  <div className="container max-w-screen-lg mx-auto">
    <div>
      <h2 className="font-semibold text-xl text-gray-600">Your Profile</h2>
      <p className="text-gray-500 text-xs mb-6">Mangae all here.</p>

      <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
          <div className="text-gray-600">
            <p className="font-medium text-lg">Personal Details</p> 
            <img className='h-44 w-44 mt-12' src='https://kalsisolar.com/images/543955831.jpg' />
          </div>

          <div className="lg:col-span-2">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
              <div className="md:col-span-5">
                <label>Name</label>
                <input name="full_name" id="full_name" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value="" />
              </div>

              <div className="md:col-span-5">
                <label>Email Address</label>
                <input name="email" id="email" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value="" placeholder="email@domain.com" />
              </div>

              

              <div className="md:col-span-5">
                <label>Mobile</label>
                <input name="mobile" id="email" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value="" placeholder="email@domain.com" />
              </div>

              <div className="md:col-span-5 pt-12">
                <label>Description</label>
                <input name="full_name" id="full_name" className="h-44 border mt-1 rounded px-4 w-full bg-gray-50" value="" />
              </div>
              

              <div className="md:col-span-5">
                <label>Location</label>
                <input name="email" id="email" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value="" placeholder="email@domain.com" />
              </div>

              

              <div className="md:col-span-5">
                <label>Skills</label>
                <input name="email" id="email" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value="" placeholder="email@domain.com" />
              </div>

              

              

              <div className="md:col-span-5">
                <label>Pay per hour</label>
                <input name="email" id="email" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value="" placeholder="email@domain.com" />
              </div>

              

              <div className="md:col-span-5">
                <label>Total Jobs finished on Devlink</label>
                <input name="email" id="email" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value="" placeholder="email@domain.com" />
              </div>
 
              <div className="md:col-span-5 text-right">
                <div className="inline-flex items-end">
                  <button>  
                    <Modal /> 
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
 
  </div>
</div>
    </div>
  );
};

export default Profile;




