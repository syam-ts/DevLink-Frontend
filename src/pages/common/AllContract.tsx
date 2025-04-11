import { toast } from "sonner";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { apiUserInstance } from "../../api/axiosInstance/axiosUserInstance";
import { apiClientInstance } from "../../api/axiosInstance/axiosClientRequest";
import { SubmitProject } from "../../components/nextUi/modals/SubmitProjectModal";

interface Contract {
  _id: string
  status: string
  jobPostData: {
    title: string
    description: string
  }
  amount: number
  deadline: number
};

const AllContract: React.FC = () => {
  const [contracts, setContracts] = useState<Contract>({
    _id: "",
    status: "",
    jobPostData: {
      title: "",
      description: "",
    },
    amount: 0,
    deadline: 0
  });
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

  const changeContactsViewType = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setContractsViewType(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="h-full w-full py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8">
      <section>
        <div className="text-center pt-20 sm:pt-20">
          <span className="arsenal-sc-regular text-center mx-auto text-xl sm:text-2xl">
            {contractsViewType === "pending"
              ? "Progressing Contracts"
              : contractsViewType === "rejected"
                ? "Rejected Contracts"
                : "Completed Contracts"}
          </span>
          <hr className="w-4/5 sm:w-2/3 mx-auto mt-2" />
        </div>
      </section>

      {/* Filter Section */}
      <section className="mt-6">
        <div className="arsenal-sc-regular flex justify-center sm:justify-end px-2 sm:px-4">
          <form className="w-full max-w-xs sm:w-60">
            <select
              id="countries"
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                changeContactsViewType(e)
              }
              className="shadow-lg border outline-none border-gray-800 text-gray-900 text-sm rounded-small w-full p-2.5"
            >
              <option selected value="pending">
                Pending Contracts
              </option>
              {roleType === "user" && (
                <option value="submitted">Submitted Contracts</option>
              )}
              <option value="rejected">Rejected Contracts</option>
              <option value="completed">Completed Contracts</option>
            </select>
          </form>
        </div>
      </section>

      {/* Contracts List Section */}
      <section>
        <div className="mt-12 sm:mt-16 md:mt-24 lg:mt-32 gap-5 mx-auto w-full max-w-7xl arsenal-sc-regular">
          {Object.entries(contracts).length === 0 ? (
            <div className="text-center py-12">
              <span className="text-xl sm:text-2xl">Contracts Not Found</span>
            </div>
          ) : (
            <div className="space-y-6 sm:space-y-8">
              {Object.entries(contracts).map(
                ([key, contract]: [string, Contract]) => (
                  <div className="w-full" key={key}>
                    <div
                      className={`${contract.status === "submitted"
                        ? "bg-white"
                        : "bg-white"
                        } p-4 sm:p-6 md:p-8 lg:p-10 rounded-xl shadow-lg relative hover:shadow-2xl border border-gray-300 transition duration-500 min-h-0`}
                    >
                      <h1 className="text-lg sm:text-xl md:text-2xl text-gray-800 font-semibold mb-3 sm:mb-4 md:mb-6 pr-12 sm:pr-16 line-clamp-1">
                        {contract?.jobPostData?.title}
                      </h1>

                      <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4 sm:mb-6 md:mb-8 line-clamp-2">
                        {contract?.jobPostData?.description}
                      </p>

                      <div className="grid gap-2 sm:gap-4 my-4 sm:my-6 md:my-8">
                        <span className="text-sm sm:text-base">
                          Contract Amount: {contract?.amount}.00₹
                        </span>
                        <span className="text-sm sm:text-base">
                          Contract Amount Deadline: {contract?.deadline}
                        </span>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mt-6 sm:mt-8 md:mt-10">
                        <button className="py-2.5 sm:py-2.5 px-4 sm:px-6 bg-[#0000ff] text-white rounded-small shadow-md hover:shadow-lg w-full sm:w-auto">
                          <Link
                            to={`/${roleType}/contract/${contract?._id}/${roleType}`}
                            className="no-underline text-white block text-center"
                          >
                            View Contract
                          </Link>
                        </button>

                        {roleType === "user" &&
                          contractsViewType === "pending" && (
                            <div className="w-full sm:w-auto mt-3 sm:mt-0">
                              <SubmitProject
                                contractId={contract?._id}
                                jobTitle={contract?.jobPostData?.title}
                              />
                            </div>
                          )}
                      </div>

                      {contractsViewType === "pending" && (
                        <span className="absolute py-1 sm:py-2 px-3 sm:px-5 text-xs sm:text-sm text-white top-0 right-0 bg-[#0000ff] rounded-small transform translate-x-2 -translate-y-2 sm:-translate-y-3 shadow-md">
                          New
                        </span>
                      )}
                    </div>
                  </div>
                )
              )}
            </div>
          )}
        </div>
      </section>

      {/* Pagination Section */}
      <section className="mt-8 sm:mt-12">
        <div className="container mx-auto px-2 sm:px-4">
          <nav
            className="flex flex-wrap justify-center items-center gap-1 sm:gap-0"
            aria-label="Pagination"
          >
            {currentPage - 1 < 1 ? (
              <div className="w-10 h-10"></div>
            ) : (
              <a
                onClick={() => changePage(currentPage - 1)}
                className="flex w-8 h-8 sm:w-10 sm:h-10 justify-center items-center rounded-full border border-gray-200 bg-white text-black hover:border-gray-300 cursor-pointer"
                title="Previous Page"
              >
                <span className="sr-only">Previous Page</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="block w-4 h-4 sm:w-5 sm:h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
              </a>
            )}

            <div className="flex flex-wrap justify-center">
              {Array.from({ length: totalPages }).map((_, index) => (
                <p
                  onClick={() => changePage(index + 1)}
                  key={index}
                  className="flex w-8 h-8 sm:w-10 sm:h-10 mx-1 sm:mx-2 my-2 sm:my-4 cursor-pointer justify-center items-center rounded-full border border-gray-200 bg-white text-black hover:border-gray-300"
                  title={`Page ${index + 1}`}
                >
                  {index + 1}
                </p>
              ))}
            </div>

            {currentPage + 1 > totalPages ? (
              <div className="w-10 h-10"></div>
            ) : (
              <a
                onClick={() => changePage(currentPage + 1)}
                className="flex w-8 h-8 sm:w-10 sm:h-10 justify-center items-center rounded-full border border-gray-200 bg-white text-black hover:border-gray-300 cursor-pointer"
                title="Next Page"
              >
                <span className="sr-only">Next Page</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="block w-4 h-4 sm:w-5 sm:h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
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
