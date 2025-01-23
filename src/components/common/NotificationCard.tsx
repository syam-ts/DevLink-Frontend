import axios from 'axios';
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { ContractRespond } from '../nextUi/modals/ContractRespond'
import apiInstance from '../../api/axiosInstance';
import { RateUserModal } from '../nextUi/modals/RateUserModal';

const Notification = ({role, roleId}: any) => {

    const [notifications, setNotifications] = useState({})
    const user = useParams()

 

    
    useEffect(() => {

      try{
        (async() => {
            const { data } = await apiInstance.axiosInstanceUser.get(`http://localhost:3000/${role}/notifications/${roleId}`);
            
            setNotifications(data?.notifications);
        
      })();
      }catch(err: any) {
        console.error('ERROR: ', err.message);
      }

    }, []);







  return (
    <div className='text-center text-xl py-12 arsenal-sc-regular mt-20'>
      <div className=" flex-col space-y-4 min-w-screen animated fadeIn faster  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none">
     {
        Object.entries(notifications).map((notification: any) => (

         
        <div className="flex p-4 bg-white shadow-md hover:shodow-xl justify-center rounded-2xl border w-2/4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg"
                className="w-16 h-16 rounded-2xl p-3 border border-blue-100 text-blue-400 bg-blue-50" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <div className="flex flex-col ml-3">
                <div className="font-medium leading-none">{notification[1]?.type}</div>
                <p className="text-sm text-gray-600 leading-none mt-1">{notification[1]?.message}
                </p>
              </div>
            </div>
            <button  className="flex-no-shrink bg-blue-500 px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 text-white rounded-full">
              Mark as Read
            </button>
              {
                notification[1]?.extra?.userId && (
                  <div>
                
                  <RateUserModal notificationId={notification[1]?._id} userId={notification[1]?.extra?.userId} />
             
              </div>
                )
              }
          </div>
        </div>
        
           
        ))
     }

          </div>

     
      </div>
     
  )
}

export default Notification