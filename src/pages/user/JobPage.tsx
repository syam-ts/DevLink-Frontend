import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Sonner } from "../../components/sonner/Toaster";
import { JobPostCard } from "../../components/common/JobPostCard";
import apiInstance from "../../api/axiosInstance";
import { useSelector } from "react-redux";

const Jobs = () => {
  const [activeTab, setActiveTab] = useState("listAllJobs");
  const [jobs, setJobs]: any = useState([]);
  const userId = useSelector(
    (state: any) => state?.user?.currentUser?.user?._id
  );

  useEffect(() => {
    (async () => {
      try {
        const { data } = await apiInstance.axiosInstanceUser.get(
          `http://localhost:3000/user/${activeTab}/${userId}`
        );
        console.log("THE RESPON S: ", data?.data);
        setJobs(data?.data);
      } catch (err: any) {
        toast.error(err.message, {
          style: {
            backgroundColor: "red",
            color: "white",
          },
        });
      }
    })();
  }, [activeTab]);

  return (
    <main>
      <div className="text-center">
        <Sonner />
        <div className="justify-center mt-20">
          <div className="tabs-container flex justify-center">
          <button className={`tab-button text-2xl arsenal-sc-regular w-1/6 ${activeTab === 'listAllJobs' && 'border-b border-black'}`}
             onClick={() => setActiveTab("listAllJobs")} >
              All Jobs
             
            </button>
            <button className={`tab-button text-2xl arsenal-sc-regular w-1/6 ${activeTab === 'bestMatches' && 'border-b border-black'}`}
             onClick={() => setActiveTab("bestMatches")} >
              Best Matches
            
            </button>
          </div>

          <div className="tab-content mt-8">
            <JobPostCard jobs={jobs} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Jobs;
