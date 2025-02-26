import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { SubmitProject } from "../nextUi/modals/SubmitProjectModal";
import { apiUserInstance } from "../../api/axiosInstance/axiosUserInstance";
import { apiClientInstance } from "../../api/axiosInstance/axiosClientRequest";
import { toast } from "sonner";

 
function AllContract() {
  const [contracts, setContracts] = useState({});
  const [contractsViewType, setContractsViewType] = useState<string>("pending");
 

  const { roleType } = useParams();

  useEffect(() => {
    try {
      (async () => {
        let response;

        if (roleType === "user") {
          response = await apiUserInstance.get(
            `/contracts/${contractsViewType}`
          );
        } else {
          response = await apiClientInstance.get(
            `/contracts/${contractsViewType}`
          );
        }

        setContracts(response.data?.data);
      })();
    } catch (error: unknown) {
      const err = error as {
        message?: string;
      };
      toast.error(err.message);
    }
  }, [contractsViewType]);

  console.log("curr conta", contracts);

  //ADD ROLES

  return (
    <div className="h-full w-full">
      <div className=" text-center pt-5">
        <span className="arsenal-sc-regular text-center mx-auto text-2xl ">
          {contractsViewType === "pending"
            ? "Progressing Contracts"
            : contractsViewType === "rejected"
            ? "rejected Contracts"
            : "Completed Contracts"}
        </span>
        <hr className="w-2/3 mx-auto" />
      </div>

      {roleType === "user" && (
        <div className="arsenal-sc-regular flex justify-end px-4">
          <form className="w-60">
            <select
              id="countries"
              onChange={(e) => setContractsViewType(e.target.value)}
              className="shadow-lg border outline-none border-gray-800 text-gray-900 text-sm rounded-lg w-full p-2.5 "
            >
              <option selected value="pending">
                Pending Contracts
              </option>
              <option value="rejected">Rejected Contracts</option>
              <option value="completed">Completed Contracts</option>
            </select>
          </form>
        </div>
      )}

      <div className=" mt-44 gap-5 mx-auto w-[1270px] items-center justify-center arsenal-sc-regular">
       {
        Object.entries(contracts).length === 0 ? (
          <div>
             <span className="text-2xl flex justify-center">
                    Contracts Not Found
                  </span>
          </div>
        ) : (
          <div>
             {Object.entries(contracts)?.map((contract: any) => (
          <div className="containter mx-auto my-10">
            <div
              className={`${
                contract.status === "submitted" ? "bg-black" : "bg-white"
              } p-8 rounded-xl shadow-lg relative hover:shadow-2xl transition duration-500`}
            >
              <h1 className="text-2xl text-gray-800 font-semibold mb-3">
                {contract[1]?.jobPostData?.title}
              </h1>
              <p className="text-gray-600 leading-6 tracking-normal"> 
                {contract[1]?.jobPostData?.description}
              </p>
              <div className="grid">
                <span className="text-xs">
                  Contract Amount: {contract[1]?.amount}.00₹
                </span>
                <span className="text-xs">
                  Contract Amount Deadline: {contract[1]?.deadline}
                </span>
              </div>
              <div className="flex justify-between">
                <button className="py-2 px-4 mt-8 bg-[#0000ff] text-white rounded-md shadow-xl">
                  <Link
                    to={`/${roleType}/contract/${contract[1]?._id}/${roleType}`}
                    className="no-underline text-white"
                  >
                    View Contract
                  </Link>
                </button>

                {roleType === "user" && contractsViewType === "pending" && (
                  <div>
                    <SubmitProject
                      contractId={contract[1]?._id}
                      jobTitle={contract[1]?.jobPostData?.title}
                    />
                  </div>
                )}
              </div>
              <div>
                {
                  contractsViewType === "pending" && (
                    <span className="absolute py-2 px-8 text-sm text-white top-0 right-0 bg-[#0000ff] rounded-md transform translate-x-2 -translate-y-3 shadow-xl">
                  New
                </span>
                  )
                }
              </div>
            </div>
          </div>
        ))}
          </div>
        )
       }
      </div>
    </div>
  );
}

export default AllContract;
