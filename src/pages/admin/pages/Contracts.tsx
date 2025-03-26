import { useEffect, useState } from "react";
import { Sonner } from "../../../components/sonner/Toaster";
import { apiAdminInstance } from "../../../api/axiosInstance/axiosAdminInstance";
import { ContractView } from "../../../components/nextUi/modals/ContractViewAdmin";

interface Contract {
  clientData: {
    companyName: string
  }
  userData: {
    name: string
  }
  jobPostData: {
    title: string
  }
  amount: number
  deadline: number
  status: string
  createdAt: number
};

const Contracts: React.FC = () => {
  const [contracts, setContracts] = useState<Contract[]>([{
    clientData: {
      companyName: ""
    },
    userData: {
      name: ""
    },
    jobPostData: {
      title: ""
    },
    amount: 0,
    deadline: 0,
    status: "",
    createdAt: 0,
  }]);

  useEffect(() => {
    try {
      const fetchContracts = async () => {
        const { data } = await apiAdminInstance.get("/viewContracts"); 
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
      <div className="flex flex-wrap nunito-regular mt-44 border rounded-large mx-5 ">
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
                      Object.entries(contracts).map(([key, contract]: [string, Contract]) => (
                        <div key={key} className='border-b border-gray-400'>
                          <td className="w-[100px]">
                            <span className="text-sm">
                              {contract?.clientData.companyName}
                            </span>
                          </td>
                          <td className="w-[230px] text-center">
                            <span className="text-sm w-20">
                              {contract?.userData.name}
                            </span>
                          </td>
                          <td className="w-[360px]">
                            <span className="text-sm w-20">
                              {contract?.jobPostData.title}
                            </span>
                          </td>
                          <td className="w-[260px]">
                            <span className="text-sm w-20">
                              {contract.amount}
                            </span>
                          </td>
                          <td className="w-[260px]">
                            <span className="text-sm w-20">
                              {contract.deadline}
                            </span>
                          </td>
                          <td className="w-[260px]">
                            <span className="text-sm w-20">
                              {contract.status}
                            </span>
                          </td>
                          <td className="w-[260px]">
                            <span className="text-sm w-20">
                              <ContractView contract={contract} />
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
