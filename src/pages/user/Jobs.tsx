import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Sonner } from "../../components/sonner/Toaster";
import { JobPostCard } from "../../components/common/JobPostCard";
import { apiUserInstance } from "../../api/axiosInstance/axiosUserInstance";

interface Jobs {
  jobs: {
    _id: string;
    title: string;
    description: string;
    expertLevel: string;
    location: string;
    amount: number;
    paymentType: string;
    estimateTimeinHours: string;
    projectType: string;
  };
}

const Jobs = () => {
  const [activeTab, setActiveTab] = useState<string>("listAllJobs");
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
        const { data } = await apiUserInstance.get(
          `/jobs/${activeTab}?currentPage=${currentPage}`
        );
        console.log("The result", data);
        setJobs(data?.data?.jobs);
        setTotalPages(data?.data?.totalPages);
      } catch (error: unknown) {
        const err = error as { message?: string };
        console.log('error: ', err.message)
      }
    })();
  }, [activeTab, currentPage]);

  const changePage = async (page: number) => {
    setCurrentPage(page);
  };

  return (
    <main>
      <div className="text-center">
        <Sonner />
        <div className="justify-center pt-44">
          <div className="tabs-container flex justify-center ">
            <button
              className={`tab-button text-2xl arsenal-sc-regular w-1/6 ${
                activeTab === "listAllJobs" && "border-b border-black"
              }`}
              onClick={() => setActiveTab("listAllJobs")}
            >
              All Jobs
            </button>
            <button
              className={`tab-button text-2xl arsenal-sc-regular w-1/6 ${
                activeTab === "bestMatches" && "border-b border-black"
              }`}
              onClick={() => setActiveTab("bestMatches")}
            >
              Best Matches
            </button>
            <button
              className={`tab-button text-2xl arsenal-sc-regular w-1/6 ${
                activeTab === "trendingJobs" && "border-b border-black"
              }`}
              onClick={() => setActiveTab("trendingJobs")}
            >
              Trending Jobs
            </button>
          </div>

          <div className="tab-content mt-8">
            <JobPostCard jobs={jobs} role="user" type="user-view" />
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
    </main>
  );
};

export default Jobs;
