import axios from 'axios';
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { ContractRespond } from '../nextUi/modals/ContractRespond'
import apiInstance from '../../api/axiosInstance';
import { RateUserModal } from '../nextUi/modals/RateUserModal';
import { useDispatch, useSelector } from 'react-redux';
import { addNotification, markAsReadNotifications } from '../../utils/redux/slices/userSlice';
import { useSelect } from '@nextui-org/react';

const Notification = ({ role, roleId }: any) => {


  const [notifications, setNotifications] = useState({});
  const user = useParams();
  const dispatch = useDispatch();

  const notification = useSelector((state: any) => state?.user?.notifications);
  const notificationsUnread = useSelector((state: any) => state?.user?.notificationsUnread);

  const getTimeAgo = (timestamp: string) => {
    const now = new Date();
    const past = new Date(timestamp);
    const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);
  
    if (diffInSeconds < 60) {
      return `${diffInSeconds} seconds ago`;
    } else if (diffInSeconds < 3600) {
      return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    } else if (diffInSeconds < 86400) {
      return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    } else {
      return `${Math.floor(diffInSeconds / 86400)} days ago`;
    }
  };

  useEffect(() => {
       dispatch(markAsReadNotifications())
  }, []);



  useEffect(() => {

    try {

      const hasVisited = localStorage.getItem("notificationsPageFirstVisit");
      console.log('Is visited teh page : ', hasVisited)

      if (!hasVisited) { 
     
        (async () => {
          const { data } = await apiInstance.get(`/${role}/notifications/${roleId}`);

          console.log('noti', data.notifications)

          setNotifications(data?.notifications);
          const notifications: any = JSON.stringify(data?.notifications);
          dispatch(addNotification(notifications));

          localStorage.setItem("notificationsPageFirstVisit", "true");

        })();
      } else {
        return
      }
    } catch (err: any) {
      console.error('ERROR: ', err.message);
    }

  }, []);







  return (
    <div className='text-center text-xl py-12 arsenal-sc-regular mt-20'>
      <div className=" flex-col space-y-4 min-w-screen animated fadeIn faster  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none">
        {
          Object.entries(notification).map((notif: any) => (


            <div className="flex p-4 bg-white shadow-md hover:shodow-xl justify-center rounded-2xl border w-2/4">
              <div className="flex  items-center justify-between">
                <div className="flex gap-20 items-center">
                  <svg xmlns="http://www.w3.org/2000/svg"
                    className="w-16 h-16 rounded-2xl p-3 border border-[#0000ff] text-[#0000ff] bg-blue-50" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <div className="flex flex-col ml-3">
                    <div className="font-medium leading-none">{notif[1]?.type}</div>
                    <p className="text-sm text-gray-600 leading-none mt-1">{notif[1]?.message}
                    </p>
                  </div>
                  <div>
                  <span>{getTimeAgo(notif[1].createdAt)}</span>
                  </div>
                </div>
                {/* <button  className="flex-no-shrink bg-blue-500 px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 text-white rounded-full">
              Mark as Read
            </button> */}
                {
                  notif[1]?.extra?.userId && (
                    <div>

                      <RateUserModal notificationId={notif[1]?._id} userId={notif[1]?.extra?.userId} />

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