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
  console.log('The not: ', notification)

  return (
    <div className="text-center text-xl py-12 arsenal-sc-regular pt-44 px-4">
      <div className="grid justify-center gap-4 items-center inset-0 z-50">
        {Object.entries(notification).map(([key, notif]: [string, Notification]) => (
          <div
            key={key}
            className="flex flex-col md:flex-row md:justify-between shadow-lg hover:shadow-xl rounded-xl border md:w-[70rem] w-full py-2 px-4 gap-4"
          > 
            <div className="flex flex-col md:flex-row items-start md:items-center md:w-[50rem] gap-4">
              <div className="pl-0 md:pl-16">
                <img
                  src="https://cdn-icons-png.flaticon.com/128/18365/18365539.png"
                  className="w-6 h-6"
                  alt="notification"
                />
              </div>

              <div className="grid w-full md:w-[30rem]">
                <span className="text-sm text-green-600 font-medium">{notif?.type}</span>
                <span className="text-sm text-gray-800">{notif?.message}</span>
              </div>

              <div className="text-xs text-gray-500 md:w-[10rem]">{getTimeAgo(notif?.createdAt)}</div>
            </div>
 
            <div className="flex flex-col md:flex-row md:items-center gap-2">
              {notif?.newContract && (
                <div className="md:px-20">
                  <button
                    className="rounded bg-blue-600 hover:bg-slate-700 py-1.5 px-5 text-sm text-white shadow-md transition"
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

              {notif?.closeContract && (
                <div className="flex gap-2 px-0 md:px-3">
                  <button
                    className="rounded bg-blue-600 hover:bg-slate-700 py-1.5 px-5 text-sm text-white shadow-md transition"
                    type="button"
                  >
                    <Link
                      to={`/${role}/contract/${notif.closeContract.contractId}/${role}`}
                      className="no-underline text-white font-bold"
                    >
                      View
                    </Link>
                  </button>

                  {role === "client" && (
                    <RateUserModal
                      notificationId={notif?._id}
                      userId={notif?.closeContract.userId}
                    />
                  )}
                </div>
              )}

              {notif?.inviteSuccess && (
                <div className="md:px-20">
                  <button
                    className="rounded bg-blue-600 hover:bg-slate-700 py-1.5 px-5 text-sm text-white shadow-md transition"
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
              )}
            </div>
 
            {notif?.withdrawData && (
              <div className="">
                <ImageZoom image={notif.withdrawData.paymentScreenshot} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>

  );
};

export default Notification;
