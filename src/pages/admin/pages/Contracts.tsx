import { useEffect, useState } from "react";
import { Sonner } from "../../../components/sonner/Toaster";
import { apiAdminInstance } from "../../../api/axiosInstance/axiosAdminInstance";
import { ContractView } from "../../../components/nextUi/modals/ContractViewAdmin";

interface Contract {
  createdAt: number
  deadline: number
  amount: number
  status: string
  clientData: {
    companyName: string
    location: string
    email: string
  }
  userData: {
    name: string
    location: string
    email: string
  }
  jobPostData: {
    title: string
    description: string
    expertLevel: string
    projectType: string
  }
};

const Contracts: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [contracts, setContracts] = useState<Contract[]>([
    {
      createdAt: 0,
      deadline: 0,
      amount: 0,
      status: "",
      clientData: {
        companyName: "",
        location: "",
        email: "",
      },
      userData: {
        name: "",
        location: "",
        email: "",
      },
      jobPostData: {
        title: "",
        description: "",
        expertLevel: "",
        projectType: "",
      },
    },
  ]);

  useEffect(() => {
    try {
      const fetchContracts = async () => {
        const { data } = await apiAdminInstance.get(
          `/viewContracts?currentPage=${currentPage}`
        );
        setContracts(data.response.contracts);
        setTotalPages(data.response.totalPages);
      };
      fetchContracts();
    } catch (error: unknown) {
      const err = error as { message: string };
      console.error(err.message);
    }
  }, [currentPage]);

  const changePage = async (page: number) => {
    setCurrentPage(page);
  }; 

  return (
    <div>
      <Sonner />

      <section className=" text-center mt-28">
        <div>
          <span className="text-2xl text-center arsenal-sc-regular">
            Contracts
          </span>
        </div>
      </section>

      <section className="w-4/5 mx-auto arsenal-sc-regular mt-16">
        <div className="relative flex flex-col w-full h-full overflow-hidden border-1 border-[#c0bebe] text-gray-700 rounded-2xl bg-clip-border">
          <table className="w-full">
            <thead>
              <tr className="text-center">
                <th className="p-3 border-b border-blue-gray-100 bg-gray-200">
                  <p className="text-sm antialiased leading-none text-gray-500">
                    Client Name
                  </p>
                </th>
                <th className="p-3 border-b border-blue-gray-100 bg-gray-200">
                  <p className="text-sm antialiased leading-none text-gray-500">
                    User Name
                  </p>
                </th>
                <th className="p-3 border-b border-blue-gray-100 bg-gray-200">
                  <p className="text-sm antialiased leading-none text-gray-500">
                    Title
                  </p>
                </th>
                <th className="p-3 border-b border-blue-gray-100 bg-gray-200">
                  <p className="text-sm antialiased leading-none text-gray-500">
                    Amount
                  </p>
                </th>
                <th className="p-3 border-b border-blue-gray-100 bg-gray-200">
                  <p className="text-sm antialiased leading-none text-gray-500">
                    Deadline
                  </p>
                </th>
                <th className="p-3 border-b border-blue-gray-100 bg-gray-200">
                  <p className="text-sm antialiased leading-none text-gray-500">
                    Status
                  </p>
                </th>
                <th className="p-3 border-b border-blue-gray-100 bg-gray-200">
                  <p className="text-sm antialiased leading-none text-gray-500">
                    View
                  </p>
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(contracts).map(
                ([key, contract]: [string, Contract]) => (
                  <tr key={key} className="text-center">
                    <td className="p-3 border-b border-gray-300 ">
                      <p className="text-sm antialiased leading-normal text-gray-900">
                        {contract?.clientData.companyName}
                      </p>
                    </td>
                    <td className="p-3 border-b border-gray-300">
                      <p className="text-sm antialiased leading-normal text-gray-900">
                        {contract?.userData.name}
                      </p>
                    </td>
                    <td className="p-3 border-b border-gray-300">
                      <p className="text-sm antialiased leading-normal text-gray-900">
                        {contract?.jobPostData.title}
                      </p>
                    </td>
                    <td className="p-3 border-b border-gray-300">
                      <p className="text-sm antialiased leading-normal text-gray-900">
                        {contract.amount}
                      </p>
                    </td>
                    <td className="p-3 border-b border-gray-300">
                      <p className="text-sm antialiased leading-normal text-gray-900">
                        {contract.deadline}
                      </p>
                    </td>
                    <td className="p-3 border-b border-gray-300">
                      <p className="text-sm antialiased leading-normal text-gray-900">
                        {contract.status}
                      </p>
                    </td>
                    <td className="p-3 border-b border-gray-300">
                      <p className="text-sm antialiased leading-normal text-gray-900">
                        <ContractView contract={contract} />
                      </p>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <div className="container mx-auto px-4 ">
          <nav
            className="flex flex-row flex-nowrap justify-between md:justify-center items-center"
            aria-label="Pagination"
          >
            {currentPage - 1 < 1 ? (
              <div></div>
            ) : (
              <a
                onClick={() => changePage(currentPage - 1)}
                className="cursor-pointerflex w-10 h-10 justify-center items-center rounded-full border border-gray-200 bg-white  text-black  hover:border-gray-300"
                title="Previous Page"
              >
                <span className="sr-only">Previous Page</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="block w-5 h-5 my-2 mx-auto"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
              </a>
            )}

            {Array.from({ length: totalPages }).map((_, index) => (
              <p
                onClick={() => changePage(index + 1)}
                key={index}
                className="md:flex w-8 h-8 mx-2 my-4 cursor-pointer justify-center items-center rounded-full border-1 border-gray-400 bg-white  text-black  hover:border-gray-300 "
                title={`Page ${index + 1}`}
              >
                {index + 1}
              </p>
            ))}

            {currentPage + 1 > totalPages ? (
              <div></div>
            ) : (
              <a
                onClick={() => changePage(currentPage + 1)}
                className="cursor-pointer flex w-10 h-10 ml-1 justify-center items-center rounded-full border border-gray-200 bg-whitetext-black  hover:border-gray-300"
                title="Next Page"
              >
                <span className="sr-only">Next Page</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="block w-5 h-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </a>
            )}
          </nav>
        </div>
      </section>
    </div>
  );
};

export default Contracts;
