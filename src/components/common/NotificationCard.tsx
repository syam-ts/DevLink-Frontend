import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { apiUserInstance } from "../../api/axiosInstance/axiosUserInstance";
import { RateUserModal } from "../shadcn/modal/RateUserModal";
import { ImageZoom } from "../nextUi/modals/imageZoom";
import { useDispatch, useSelector } from "react-redux";
import { addNotificationClient } from "../../redux/slices/clientSlice";
import { apiClientInstance } from "../../api/axiosInstance/axiosClientRequest";
import { ClientState, UserState } from "../../config/state/allState";
import {
  addNotification,
  markAsReadNotifications,
} from "../../redux/slices/userSlice";

interface Notification {
  _id: string
  type: string
  message: string
  sender_id: string
  reciever_id: string
  extra?: {
    documentId: string
  }
  createdAt?: string
  newContract: {
    userId: string
    contractId: string
  }
  closeContract: {
    userId: string
    contractId: string
  }
  inviteSuccess: {
    userId: string
  }
  withdrawData: {
    paymentScreenshot: string
  }
};

const Notification = () => {
  const { role, roleId } = useParams<{ role: string; roleId: string }>();
  const dispatch = useDispatch();
  let notification;
 
  //Re-render after user rating happend
  //  if(rateUser) {
  //   localStorage.removeItem('notificationsPageFirstVisit');

  //   dispatch(clearNotifications());

  //   window.location.href = `http://localhost:5173/client/notifications/${roleId}`;
  //  }

  if (role === "user") {
    notification = useSelector(
      (state: UserState) => state?.user?.notifications
    );
  } else {
    notification = useSelector(
      (state: ClientState) => state?.client?.notifications
    );
  }

  const getTimeAgo = (timestamp: string) => {
    const now: Date = new Date();
    const past: Date = new Date(timestamp);
    const diffInSeconds: number = Math.floor(
      (now.getTime() - past.getTime()) / 1000
    );

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
    dispatch(markAsReadNotifications());
  }, []);

  useEffect(() => {
    try {
      const hasVisited = localStorage.getItem("notificationsPageFirstVisit");
      if (!hasVisited) {
        (async () => {
          let response;
          if (role === "user") {
            response = await apiUserInstance.get(`/notifications/${roleId}`);
          } else {
            response = await apiClientInstance.get(`/notifications/${roleId}`);
          } 

          const notifications = JSON.stringify(response?.data?.notifications);
          if (role === "user") {
            dispatch(addNotification(notifications));
          } else {
            dispatch(addNotificationClient(notifications));
          }

          localStorage.setItem("notificationsPageFirstVisit", "true");
        })();
      } else {
        return;
      }
    } catch (err) {
      console.error("ERROR: ", err.message);
    }
  }, []);
  console.log('The not: ',notification)

  return (
    <div className="text-center text-xl py-12 arsenal-sc-regular pt-44 ">
      <div className="grid justify-center gap-4 items-center inset-0 z-50 ">
        {Object.entries(notification).map(
          ([key, notif]: [string, Notification]) => (
            <div
              key={key}
              className="flex shadow-lg hover:shodow-xl rounded-large justify-between border w-[70rem] py-2"
            >
              <div className="flex items-center w-[50rem]">
                <div className="pl-16 w-[10rem]">
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/18365/18365539.png"
                    className="w-6 h-6"
                  />
                </div>
                <div className="grid w-[30rem]  ">
                  <span className="text-md text-green-500"> 
                    {notif?.type}  
                  </span>
                  <span className="text-sm"> {notif?.message}</span>
                </div>
                <div className="w-[10rem]">
                  <span className="text-sm">
                    {getTimeAgo(notif?.createdAt)}
                  </span>
                </div>
              </div>
              <div>
                {notif?.newContract && (
                  <div className="px-20">
                    <button
                      className="rounded-small bg-[#0000ff] py-1.5 px-5 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg hover:bg-slate-700  ml-2"
                      type="button"
                    >
                      <Link
                        to={`/${role}/contract/${notif.newContract.contractId}/${role}`}
                        className="no-underline text-white font-bold"
                      >
                        View
                      </Link>
                    </button>
                  </div>
                )}
              </div>
              <div>
                {notif?.closeContract && (
                  <div className="px-3 flex gap-2">
                    <div> 
                      <button
                        className="rounded-small bg-[#0000ff] py-1.5 px-5 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg hover:bg-slate-700  ml-2"
                        type="button"
                      >
                        <Link
                          to={`/${role}/contract/${notif.closeContract.contractId}/${role}`}
                          className="no-underline text-white font-bold"
                        >
                          View
                        </Link>
                      </button>
                    </div>
                    {role === "client" && (
                      <div>
                        <RateUserModal
                          notificationId={notif?._id}
                          userId={notif?.closeContract.userId}
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div>
                {notif?.inviteSuccess && (
                  <div className="px-20">
                    <div>
                      <button
                        className="rounded-small bg-[#0000ff] py-1.5 px-5 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg hover:bg-slate-700  ml-2"
                        type="button"
                      >
                        <Link
                          to={`/client/userProfile/client-view/${notif.inviteSuccess.userId}`}
                          className="no-underline text-white font-bold"
                        >
                          View
                        </Link>
                      </button>
                    </div>
                  </div>
                )}
              </div>
              {
                notif?.withdrawData && (
                  <div className='flex justify-center w-screen'> 
                  <ImageZoom image={notif.withdrawData.paymentScreenshot} />  
                  </div>
                )
              }
            </div>
          )
        )}

      </div>
    </div>
  );
};

export default Notification;
