import axios from "axios";
import { useEffect, useState } from "react";
// import { ViewClient } from '../../../../components/nextUi/modals/AdminViewClientModal'
import { Sonner } from "../../../components/sonner/Toaster";

const Requests: React.FC = () => {
  const [requests, setRequests] = useState({});

  useEffect(() => {
    (async () => {
      const data = await axios.get("http://localhost:3000/admin/getRequests");

      setRequests(data?.data?.data);
    })();
  }, []);

  const acceptRequest = async (clientId: string) => {
    try {
      const data = {
        clientId: clientId,
        editData: requests[0]?.data,
      };

      console.log("The client id : ", data.clientId, data.editData);

      const response = await axios.put(
        "http://localhost:3000/admin/verifyClient/accept",
        data
      );

      if (response.data.success) {
        window.location.href = "/admin/index/requests";
      }
    } catch (err: any) {
      console.log("ERROR: ", err.message);
    }
  };

  return (
    <div className="text-center mt-20">
      <div>
        <span className="text-2xl">Requests</span>
        <hr className="w-2/3 mx-auto mt-5" />
      </div>

      <div className="mt-44">
        {Object.entries(requests).length == 0 ? (
          <div className="text-center my-44 text-xl font-bold">
            <div className="text-center">
              {/* <h1 className="mb-4 text-6xl font-semibold text-red-500">Empty</h1> */}
              <p className="mb-4 text-lg text-gray-600">
                Oops! No Requests are hitted.
              </p>
              <div className="animate-bounce">
                <svg
                  className="mx-auto h-16 w-16 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  ></path>
                </svg>
              </div>
              <p className="mt-4 text-gray-600">
                Let's get you back{" "}
                <a href="/admin/index/dashboard" className="text-blue-500">
                  Dashboard
                </a>
                .
              </p>
            </div>
          </div>
        ) : (
          <div>
            <Sonner />
            {Object.entries(requests).map((request: any) => (
              <div className="flex w-2/3 mx-auto flex-col p-4 bg-white m-5 shadow-[6px_0px_61px_30px_rgba(0,_0,_0,_0.1)] rounded-2xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {/* getRequestedClient */}
                    {/* <button>
            <ViewClient clientId={request[1]?.clientId} />
         </button> */}

                    <div className="flex flex-col ml-3">
                      <div className="font-medium leading-none text-black">
                        {request[1]?.type}
                      </div>
                      <p className="text-sm text-gray-500 leading-none mt-1">
                        {request[1]?.type}
                      </p>
                    </div>
                  </div>
                  {request[1]?.status !== "verified" && (
                    <div>
                      <button
                        onClick={() => acceptRequest(request[1]?.clientId)}
                        className="font-bold bg-green-500 px-4 ml-4 py-2 text-sm shadow-sm border-2  text-white rounded-2xl"
                      >
                        Accept
                      </button>
                      <button className="font-bold bg-red-500 px-4 ml-4 py-2 text-sm shadow-sm border-2 text-white rounded-2xl">
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Requests;
