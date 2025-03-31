import { useEffect, useState } from "react";
import { SuccessTransferMoneyModal } from "../../../components/nextUi/modals/SuccessTransferMoneyModal";
import { apiAdminInstance } from "../../../api/axiosInstance/axiosAdminInstance";

interface Request {
  _id: string
  roleId: string
  userName: string
  amount: number
  accountNumber: number
}

function WithdrawRequest() {
  const [data, setData] = useState({});

  useEffect(() => {
    try {
      const fetchRequest = async () => {
        const { data } = await apiAdminInstance.get("/getWithdrawRequests");
        setData(data.requests);
      };
      fetchRequest();
    } catch (error: unknown) {
      const err = error as { message: string };
      console.error(err.message);
    }
  }, []);


  return (
    <div>
      <div className="grid gap-5 w-2/3 my-44 mx-auto rounded-small">
        {Object.entries(data).map(([key, request]: [string, Request]) => (
          <div key={key} className="flex bg-white shadow-lg rounded-large justify-between">
            <div className="px-5 grid py-4">
              <span className="font-bold text-md">
                UserName: {request.userName}{" "}
              </span>
              <span className="font-bold text-md">
                Amount: {request.amount}{" "}
              </span>
              <span className="font-bold text-md">
                Account Number: {request.accountNumber}{" "}
              </span>
            </div>
            <div className="py-4 px-5 ">
              <button
                className="rounded-small bg-[#0000ff] text-center text-sm text-white hover:bg-slate-700 ml-2"
                type="button"
              >
                <SuccessTransferMoneyModal
                  userId={request.roleId}
                  requestId={request._id}
                  requestedAmount={request.amount}
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WithdrawRequest;
