import { useEffect, useState } from "react";
import { Sonner } from "../../../components/sonner/Toaster";
import { toast } from "sonner";
import { apiAdminInstance } from "../../../api/axiosInstance/axiosAdminInstance";
import { VerifyClientViewByAdmin } from "../../../components/nextUi/modals/VerifyClientByAdmin";

interface Request {
  _id: string
  type: string
  status: string
  clientId: string
  data: {
    unChangedData: {
      companyName: string
      description: string
      location: string
      numberOfEmployees: number
      since: number
    }
  }
};

const Requests: React.FC = () => {
  const [requests, setRequests] = useState<Request>({
    _id: "",
    type: "",
    status: "",
    clientId: "",
    data: {
      unChangedData: {
        companyName: "",
        description: "",
        location: "",
        numberOfEmployees: 0,
        since: 0,
      }
    },
  });

  useEffect(() => {
    try {
      const fetchRequest = async () => {
        const { data } = await apiAdminInstance.get("/getRequests");
        if (data.data) {
          setRequests(data?.data);
        } else {
          setRequests(data?.data);
        }
      };
      fetchRequest();
    } catch (err) {
      console.log("ERROR: ", err.message);
    }
  }, []);

  const acceptRequest = async (clientId: string) => {
    try {
      const data = {
        clientId: clientId,
        editData: requests[0]?.data,
      };

      const response = await apiAdminInstance.put("/verifyClient/accept", data);

      if (response.data.success) {
        window.location.href = "/admin";
      }
    } catch (error: unknown) {
      const err = error as { message: string };
      toast.error(err.message);
    }
  };


  return (
    <div className="text-center mt-20">
      <div>
        <Sonner />
        <span className="text-2xl">Requests</span>
        <hr className="w-2/3 mx-auto mt-5" />
      </div>

      <div className="mt-44">
        {Object.entries(requests).length == 0 ? (
          <div className="text-center my-64 text-xl font-bold arsenal-sc-regular">
            <div className="text-center">
              <p className="mb-4 text-lg">No Requests are hitted.</p>
            </div>
          </div>
        ) : (
          <div>
            <Sonner />
            {Object.entries(requests).map(
              ([key, request]: [string, Request]) => (
                <div
                  key={key}
                  className="flex w-2/3 mx-auto flex-col p-4 bg-white m-5 shadow-[6px_0px_61px_30px_rgba(0,_0,_0,_0.1)] rounded-2xl"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div>
                        <button className="" type="button">
                          <VerifyClientViewByAdmin
                            unChangedData={request?.data?.unChangedData}
                          />
                        </button>
                      </div>

                      <div className="grid justify-center ml-5 ">
                        <div className="font-medium leading-none text-black">
                          {request?.type}
                        </div>
                        <p className="text-sm text-gray-500 leading-none mt-1">
                          {request?.type}
                        </p>
                      </div>
                    </div>
                    {request?.status !== "verified" && (
                      <div>
                        <button
                          onClick={() => acceptRequest(request?.clientId)}
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
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Requests;
