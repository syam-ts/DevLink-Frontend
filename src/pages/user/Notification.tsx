import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

function Notification() {

    const [notifications, setNotifications] = useState({})
    const user = useParams()

 

    
    useEffect(() => {

        (async() => {
              const { data } = await axios.get(`http://localhost:3000/user/notifications/${user?.userId}`);
              
              setNotifications(data?.notifications);
        })();
    }, []);


  return (
    <div className='text-center text-xl py-12'>
     {
        Object.entries(notifications).map((notification: any) => (

      <div className='grid gap-2 border-2 h-44 font-semibold border-black my-12 mx-96 rounded-xl'>
        <span>Contractid: {notification[1]?.contractInfo?._id} {console.log('THE DATA : ', notification)} </span>
        <span>Job Title: {notification[1]?.contractInfo?.jobPostData?.title} </span>
        <span>Job Description: {notification[1]?.contractInfo?.jobPostData?.description} </span>
        <div className='text-end px-8 pb-4'>
            <button className="rounded-md w-28 bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2" type="button">
            Reponsd
            </button>
        </div>
      </div>
        ))
     }
      </div>
     
  )
}

export default Notification