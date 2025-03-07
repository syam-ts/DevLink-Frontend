import { useEffect, useState } from "react";
import { Sonner } from "../../../components/sonner/Toaster";
import { apiAdminInstance } from "../../../api/axiosInstance/axiosAdminInstance";

const Contracts: React.FC = () => {
  const [contracts, setContracts] = useState({});

  useEffect(() => {
    try {
      const fetchContracts = async () => {
        const { data } = await apiAdminInstance.get("/viewContracts");
        console.log("The response new: ", data);
        setContracts(data.contracts);
      };
      fetchContracts();
    } catch (error: unknown) {
      const err = error as { message: string };
      console.error(err.message);
    }
  }, []);

  return (
    <div>
      <div className="flex flex-wrap nunito-regular mt-44 border border-black rounded-large mx-5 ">
        <Sonner />

        <div className="flex-auto block py-8 pt-6 px-9 ">
          <div className="overflow-x-hidden">
            <table className="w-full my-0 align-middle">
              <thead className="align-bottom">
                <tr className="border-b border-black bg-[hsl(0, 0%, 98%)] text-[1rem] flex gap-20 text-secondary-dark">
                  <th className="pb-3 text-start">Client Name</th>
                  <th className="pb-3 text-start">User Name</th>
                  <th className="pb-3 text-start">Title</th>
                  <th className="pb-3 text-start pl-20">Amount</th>
                  <th className="pb-3 text-start pl-10">Deadline</th>
                  <th className="pb-3 text-start pl-20">Status</th>
                  <th className="pb-3 text-start pl-16">View</th>
                </tr>
              </thead>
              <tbody>
                <tr className="">
                  <div className="grid gap-12 py-4">
                    {
                      Object.entries(contracts).map((contract: any) => (
                        <div className='border-b border-gray-400'>
                          <td className="w-[100px]">
                            <span className="text-sm"> 
                             {contract[1].clientData.companyName}
                            </span>
                          </td>
                          <td className="w-[230px] text-center">
                            <span className="text-sm w-20">
                            {contract[1].userData.name}
                            </span>
                          </td>
                          <td className="w-[360px]">
                            <span className="text-sm w-20">
                            {contract[1].jobPostData.title}
                            </span>
                          </td> 
                          <td className="w-[260px]">
                            <span className="text-sm w-20">
                            {contract[1].amount}
                            </span>
                          </td>
                          <td className="w-[260px]">
                            <span className="text-sm w-20">
                            {contract[1].deadline} 
                            </span>
                          </td>
                          <td className="w-[260px]">
                            <span className="text-sm w-20">
                            {contract[1].status}
                            </span>
                          </td>
                          <td className="w-[260px]">
                            <span className="text-sm w-20">
                               View
                            </span>
                          </td>
                        </div>
                      ))
                    }



                  </div>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contracts;
