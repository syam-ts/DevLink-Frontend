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
    <div className="bg-white h-full ">
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
      {
        Object.entries(contracts).length !== 0 ? (
          <div>

          </div>
        ): (
          <div>
            <div className="flex justify-center my-[5rem]">
          <p className="arsenal-sc-regular text-2xl ">No Contracts To Show </p>
        </div>
          </div>
        )
      }
      </div>
    </div>
  );
}

export default AllContract;
