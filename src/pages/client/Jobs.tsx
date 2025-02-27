import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Sonner } from "../../components/sonner/Toaster";
import { Link } from "react-router-dom";
import { JobPostCard } from "../../components/common/JobPostCard";
import { apiClientInstance } from "../../api/axiosInstance/axiosClientRequest";

interface Jobs {
  jobs: {
    _id: string
    title: string
    description: string
    expertLevel: string
    location: string
    amount: number
    paymentType: string
    estimateTimeinHours: string
    projectType: string
  }
};

const Jobs = () => {
  const [activeTab, setActiveTab] = useState<string>("myJobs");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [jobs, setJobs] = useState<Jobs>({
    jobs: {
      _id: "",
      title: "",
      description: "",
      expertLevel: "",
      location: "",
      amount: 0,
      paymentType: "",
      estimateTimeinHours: "",
      projectType: "",
    },
  });

  useEffect(() => {
    (async () => {
      try {
        const { data } = await apiClientInstance.get(
          `/jobs/${activeTab}?currentPage=${currentPage}`
        ); 
        setJobs(data?.data?.jobs);
        setTotalPages(data?.data?.totalPages);
      } catch (error: unknown) {
        const err = error as { message?: string };
        toast.error(err.message, {
          style: {
            backgroundColor: "red",
            color: "white",
          },
        });
      }
    })();
  }, [activeTab, currentPage]);

  const changePage = async (page: number) => {
    setCurrentPage(page);
  };

  const changeActiveTab = (e: any) => {
    setActiveTab(e);
    setCurrentPage(1);
  };

  return (
    <main>
      <Sonner />
      <section>
        <section>
          <div className="max-w-full arsenal-sc-regular mt-20 p-6 mx-60 bg-white border border-gray-200 rounded-lg shadow  ">
            <span>
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900  ">
                Job post creation section
              </h5>
            </span>
            <p className="mb-3 font-normal text-gray-700  ">
              The need to create a job.
            </p>
            <div>
              <p className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-[#0000ff] rounded-lg hover:bg-blue-800  ">
                <Link to="/client/draftJobPost">
                  <button className="text-white font-bold">
                    Create Job Post
                  </button>
                </Link>

                <svg
                  className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </p>
            </div>
          </div>
        </section>
      </section>
      <section>
        <div className="text-center">
          <div className="justify-center mt-44">
            <div className="tabs-container flex justify-center ">
              <button
                className={`tab-button text-2xl arsenal-sc-regular w-1/6 ${
                  activeTab === "myJobs" && "border-b border-black"
                }`}
                value="myJobs"
                onClick={(e: any) => changeActiveTab(e.target.value)}
              >
                My Jobs
              </button>
              <button
                className={`tab-button text-2xl arsenal-sc-regular w-1/6 ${
                  activeTab === "completedJobs" && "border-b border-black"
                }`}
                value="completedJobs"
                onClick={(e: any) => changeActiveTab(e.target.value)}
              >
                Completed Matches
              </button>
            </div>

            <div className="tab-content mt-8">
              <JobPostCard jobs={jobs} role="client" type="client-view" />
            </div>
            <div>
              <div>
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
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Jobs;
