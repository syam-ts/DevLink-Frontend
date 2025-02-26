import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";
import { SubmitProject } from "../nextUi/modals/SubmitProjectModal";
import { apiUserInstance } from "../../api/axiosInstance/axiosUserInstance";
import { apiClientInstance } from "../../api/axiosInstance/axiosClientRequest";

interface Contract {
  _id: string;
  status: string;
  jobPostData: {
    title: string;
    description: string;
  };
  amount: number;
  deadline: number;
}

const AllContract: React.FC = () => {
  const [contracts, setContracts] = useState({});
  const [contractsViewType, setContractsViewType] = useState<string>("pending");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const { roleType } = useParams<{ roleType: string }>();

  useEffect(() => {
    try {
      (async () => {
        let response;
        if (roleType === "user") {
          response = await apiUserInstance.get(
            `/contracts/${contractsViewType}?currentPage=${currentPage}`
          );
        } else {
          response = await apiClientInstance.get(
            `/contracts/${contractsViewType}?currentPage=${currentPage}`
          );
        }
        const data = response.data.data;
        setContracts(data.contract);
        setTotalPages(data.totalPages);
      })();
    } catch (error: unknown) {
      const err = error as {
        message?: string;
      };
      toast.error(err.message);
    }
  }, [contractsViewType, currentPage]);

  const changePage = async (page: number) => {
    setCurrentPage(page);
  };

  const changeContactsViewType = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    setContractsViewType(e.target.value)
     setCurrentPage(1)
  };

  return (
    <div className="h-full w-full">
      <section>
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
      </section>

      <section>
        {roleType === "user" && (
          <div className="arsenal-sc-regular flex justify-end px-4">
            <form className="w-60">
              <select
                id="countries"
                 onChange={(e: React.ChangeEvent<HTMLSelectElement>) => changeContactsViewType(e)}
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
      </section>

      <section>
        <div className=" mt-44 gap-5 mx-auto w-[1270px] items-center justify-center arsenal-sc-regular">
          {Object.entries(contracts).length === 0 ? (
            <div>
              <span className="text-2xl flex justify-center">
                Contracts Not Found
              </span>
            </div>
          ) : (
            <div>
              {Object.entries(contracts).map((contract: any) => (
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

                      {roleType === "user" &&
                        contractsViewType === "pending" && (
                          <div>
                            <SubmitProject
                              contractId={contract[1]?._id}
                              jobTitle={contract[1]?.jobPostData?.title}
                            />
                          </div>
                        )}
                    </div>
                    <div>
                      {contractsViewType === "pending" && (
                        <span className="absolute py-2 px-8 text-sm text-white top-0 right-0 bg-[#0000ff] rounded-md transform translate-x-2 -translate-y-3 shadow-xl">
                          New
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
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
                className="md:flex w-10 h-10 mx-2 my-4 cursor-pointer justify-center items-center rounded-full border border-gray-200 bg-white  text-black  hover:border-gray-300 "
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

export default AllContract;
