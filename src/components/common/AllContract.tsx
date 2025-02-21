import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { SubmitProject } from "../nextUi/modals/SubmitProjectModal";
import { apiUserInstance } from "../../api/axiosInstance/axiosUserInstance";
import { apiClientInstance } from "../../api/axiosInstance/axiosClientRequest";

function AllContract() {
  const [contracts, setContracts] = useState({});
  const [contractsViewType, setContractsViewType]: any =
    useState("myContracts");

  const { roleId, roleType } = useParams();

  useEffect(() => {
    try {
      (async () => {
        let response;

        if (roleType === "user") {
          response = await apiUserInstance.get(
            `/contract/${contractsViewType}/${roleId}`
          );
        } else {
          response = await apiClientInstance.get(
            `/job/${contractsViewType}/${roleId}`
          );
        }

        setContracts(response.data?.data);
      })();
    } catch (err: any) {
      console.error("ERROR: ", err.message);
    }
  }, [contractsViewType]);

  return (
    <div className="bg-gray-100 h-full ">
      <div className=" text-center pt-5">
        <span className="arsenal-sc-regular text-center mx-auto text-2xl ">
          {contractsViewType === "myContracts"
            ? "My Contracts"
            : "SUbmitted Contracts"}
        </span>
        <hr className="w-2/3 mx-auto" />
      </div>

      {roleType === "user" && (
        <div className="arsenal-sc-regular flex justify-end px-4">
          <form className="w-60">
            <select
              id="countries"
              onChange={(e) => setContractsViewType(e.target.value)}
              className="bg-gray-50 shadow-lg border border-gray-800 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            >
              <option selected value="myContracts">
                My Contracts
              </option>
              <option value="submittedContracts">Submitted Contracts</option>
            </select>
          </form>
        </div>
      )}

      <div className=" mt-44 grid gap-5 mx-auto w-[1270px] items-center justify-center arsenal-sc-regular">
        {Object.entries(contracts)?.map((contract: any) => (
          <div className='w-[1270px]'>
            <div
              className={`${
                contract.status === "submitted" ? "bg-black" : "bg-white"
              } p-8 rounded-xl shadow-lg relative hover:shadow-2xl transition duration-500`}
            >
              <h1 className="text-2xl text-gray-800 font-semibold mb-3">
                {contract[1]?.jobPostData?.title}{" "}
              </h1>
              <p className="text-gray-600 leading-6 tracking-normal">
                {" "}
                {contract[1]?.jobPostData?.description}{" "}
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

                {roleType === "user" && contractsViewType === "myContracts" && (
                  <div>
                    <SubmitProject contractId={contract[1]?._id} jobTitle={contract[1]?.jobPostData?.title} />
                  </div>
                )}
              </div>
              <div>
                <span className="absolute py-2 px-8 text-sm text-white top-0 right-0 bg-[#0000ff] rounded-md transform translate-x-2 -translate-y-3 shadow-xl">
                  New
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllContract;
