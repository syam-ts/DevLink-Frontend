import { useEffect, useState } from "react"; 
import { Sonner } from "../../components/sonner/Toaster";
import { JobPostCard } from "../../components/common/JobPostCard";
import { apiUserInstance } from "../../api/axiosInstance/axiosUserInstance";
import { FilterJobs } from "../../components/common/FilterJobs";

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
  const [filter, setFilter] = useState('paymentType=hourly');
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
          `/jobs/${activeTab}?${filter}&&currentPage=${currentPage}`
        );
        console.log("The result", data);
        setJobs(data?.data?.jobs);
        setTotalPages(data?.data?.totalPages);
      } catch (error: unknown) {
        const err = error as { message?: string };
        console.log('error: ', err.message)
      }
    })();
  }, [activeTab, currentPage,filter]);

  const changePage = async (page: number) => {
    setCurrentPage(page);
  };

  return (
    <main>
     
     <div className="flex flex-col md:flex-row gap-4 md:gap-6 pt-28 md:pt-44 px-4">
  <Sonner />

  {/* Sidebar Filter */}
  <section className="w-full md:w-[23rem]">
    <FilterJobs setFilter={setFilter} />
  </section>

  {/* Main Job Section */}
  <section className="flex-1 w-full">
    {/* Tabs */}
    <div className="tabs-container flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-0">
      <button
        className={`tab-button text-lg sm:text-2xl arsenal-sc-regular w-full sm:w-1/4 text-center ${
          activeTab === "listAllJobs" ? "border-b border-black" : ""
        }`}
        onClick={() => setActiveTab("listAllJobs")}
      >
        All Jobs
      </button>
      <button
        className={`tab-button text-lg sm:text-2xl arsenal-sc-regular w-full sm:w-1/4 text-center ${
          activeTab === "bestMatches" ? "border-b border-black" : ""
        }`}
        onClick={() => setActiveTab("bestMatches")}
      >
        Best Matches
      </button>
      <button
        className={`tab-button text-lg sm:text-2xl arsenal-sc-regular w-full sm:w-1/4 text-center ${
          activeTab === "trendingJobs" ? "border-b border-black" : ""
        }`}
        onClick={() => setActiveTab("trendingJobs")}
      >
        Trending Jobs
      </button>
    </div>

    {/* Job Posts */}
    <div className="tab-content mt-8">
      <JobPostCard jobs={jobs} role="user" type="user-view" />
    </div>

    {/* No Jobs Found */}
    {Object.entries(jobs).length === 0 && (
      <div className="flex justify-center py-20 sm:py-44">
        <span className="text-base sm:text-xl">No Jobs Found</span>
      </div>
    )}

    {/* Pagination */}
    <div className="container mx-auto px-4 mt-10">
      <nav
        className="flex flex-wrap justify-center items-center gap-2"
        aria-label="Pagination"
      >
        {currentPage - 1 >= 1 && (
          <a
            onClick={() => changePage(currentPage - 1)}
            className="cursor-pointer flex w-10 h-10 justify-center items-center rounded-full border border-gray-200 bg-white text-black hover:border-gray-300"
            title="Previous Page"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </a>
        )}

        {Array.from({ length: totalPages }).map((_, index) => (
          <p
            onClick={() => changePage(index + 1)}
            key={index}
            className={`cursor-pointer flex w-10 h-10 justify-center items-center rounded-full border border-gray-200 bg-white text-black hover:border-gray-300 ${
              currentPage === index + 1 ? "font-bold bg-gray-100" : ""
            }`}
            title={`Page ${index + 1}`}
          >
            {index + 1}
          </p>
        ))}

        {currentPage + 1 <= totalPages && (
          <a
            onClick={() => changePage(currentPage + 1)}
            className="cursor-pointer flex w-10 h-10 justify-center items-center rounded-full border border-gray-200 bg-white text-black hover:border-gray-300"
            title="Next Page"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </a>
        )}
      </nav>
    </div>
  </section>
</div>


    </main>
  );
};

export default Jobs;
