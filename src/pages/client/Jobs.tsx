import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Sonner } from "../../components/sonner/Toaster";
import { Link } from "react-router-dom";
import { JobPostCard } from "../../components/common/JobPostCard";
import { apiClientInstance } from "../../api/axiosInstance/axiosClientRequest";
import { useSelector } from "react-redux";
import { ClientState } from "../../config/state/allState";
import { CreatePostPopover } from "../../components/nextUi/popover/CreateJobPostPopover"; 

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
  const isVerified = useSelector((state: ClientState) => state.client.currentClient.isVerified);

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

  const changeActiveTab = (e) => {
    setActiveTab(e);
    setCurrentPage(1);
  };

  return (
    <main className='pt-20'>
      <Sonner /> 
      <section className="px-4 sm:px-6 md:px-12 lg:px-24 mt-20">
  <div className="w-full max-w-6xl mx-auto p-6 bg-white border border-gray-200 rounded-xl shadow arsenal-sc-regular">
    <h5 className="mb-2 text-xl sm:text-2xl font-bold tracking-tight text-gray-900">
      Job post creation section
    </h5>
    <p className="mb-4 text-sm sm:text-base text-gray-700">
      The need to create a job.
    </p>

    <div>
      {isVerified ? (
        <Link to="/client/draftJobPost">
          <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-[#0000ff] rounded-small hover:bg-blue-700 transition-all duration-200">
            Create Job Post
            <svg
              className="ml-2 w-4 h-4 rtl:rotate-180"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
              aria-hidden="true"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </button>
        </Link>
      ) : (
        <div>
          <CreatePostPopover />
        </div>
      )}
    </div>
  </div>
</section>

      
      <section>
        <div className="text-center">
          <div className="justify-center mt-44">
          <div className="tabs-container flex flex-wrap justify-center gap-4 sm:gap-8 my-4">
  <button
    className={`tab-button text-base sm:text-xl md:text-2xl arsenal-sc-regular px-4 py-2 w-1/2 sm:w-1/4 md:w-1/6 text-center ${
      activeTab === "myJobs" ? "border-b-2 border-black" : ""
    }`}
    value="myJobs"
    onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
      changeActiveTab((e.target as HTMLButtonElement).value)
    }
  >
    My Jobs
  </button>

  <button
    className={`tab-button text-base sm:text-xl md:text-2xl arsenal-sc-regular px-4 py-2 w-1/2 sm:w-1/4 md:w-1/6 text-center ${
      activeTab === "completedJobs" ? "border-b-2 border-black" : ""
    }`}
    value="completedJobs"
    onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
      changeActiveTab((e.target as HTMLButtonElement).value)
    }
  >
    Completed Jobs
  </button>
</div>




            <div className="tab-content mt-8">
              {
                Object.entries(jobs).length === 0 ? (
                <div className='flex justify-center my-64'>
                  <p>No Job Found</p>
                </div>
              ) : (
                  <JobPostCard jobs={jobs} role="client" type="client-view" />
                )
              }
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
