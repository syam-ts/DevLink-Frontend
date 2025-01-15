import axios from 'axios';
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { ContractRespond } from '../../components/nextUi/modals/ContractRespond'


const Notification = () => {

    const [notifications, setNotifications] = useState({})
    const user = useParams()

 

    
    useEffect(() => {

      try{
        (async() => {
            const { data } = await axios.get(`http://localhost:3000/user/notifications/${user?.userId}`);
            console.log('THE WHOLE DATA : ', data?.notifications)
            
            setNotifications(data?.notifications);
      })();
      }catch(err: any) {
        console.error('ERROR: ', err.message);
      }

    }, []);







  return (
    <div className='text-center text-xl py-12'>
     {
        Object.entries(notifications).map((notification: any) => (

      <div className='grid gap-2 border-2 h-44 font-semibold border-black my-12 mx-96 rounded-xl'>
        <span>Contractid: {notification[1]?.contractInfo?._id} </span>
        <span>Status: {notification[1]?.contractInfo?.status} </span>
        <span>Job Title: {notification[1]?.contractInfo?.jobPostData?.title} </span>
        <span>Job Description: {notification[1]?.contractInfo?.jobPostData?.description} </span>
        <div className='text-end px-8 pb-4 '>
            <button  type="button">
            <ContractRespond contractId={notification[1]?.contractInfo?._id} />
            </button>
        </div>
      </div>
        ))
     }
      </div>
     
  )
}

export default Notification