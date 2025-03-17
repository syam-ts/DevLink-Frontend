import { useEffect, useState } from "react";
import { SuccessTransferMoneyModal } from "../../../components/nextUi/modals/SuccessTransferMoneyModal";
import { apiAdminInstance } from "../../../api/axiosInstance/axiosAdminInstance";

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
        {Object.entries(data).map((request: any) => (
          <div className="flex bg-white shadow-lg rounded-large justify-between">
            <div className="px-5 grid py-5">
              <span className="font-bold text-md">
                UserName: {request[1].userName}{" "}
              </span>
              <span className="font-bold text-md">
                Amount: {request[1].amount}{" "}
              </span>
              <span className="font-bold text-md">
                Account Number: {request[1].accountNumber}{" "}
              </span>
            </div>
            <div className="py-16 px-5">
              <button
                className="rounded-small bg-[#0000ff] text-center text-sm text-white hover:bg-slate-700 ml-2"
                type="button"
              >
                <SuccessTransferMoneyModal
                  userId={request[1].roleId}
                  requestId={request[1]._id}
                  requestedAmount={request[1].amount}
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
