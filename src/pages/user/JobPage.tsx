import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Sonner } from "../../components/sonner/Toaster";
import { JobPostCard } from "../../components/common/JobPostCard";
import { apiUserInstance } from '../../api/axiosInstance/axiosUserInstance';
import { useSelector } from "react-redux";
import { UserState } from '../../config/state/allState'

interface Jobs {
  _id: string,
  title: string,
  description: string,
  expertLevel: string,
  location: string,
  amount: number,
  paymentType: string,
  estimateTimeinHours: string,
  projectType: string
};




const Jobs = () => {

  const [activeTab, setActiveTab] = useState<string>("listAllJobs");
  const [jobs, setJobs]: any = useState<Jobs[]>([]);
  const userId: string = useSelector(
    (state: UserState) => state?.user?.currentUser?._id
  );


  useEffect(() => {
    (async () => {
      try {
        const { data } = await apiUserInstance.get(
          `http://localhost:3000/user/jobs/view/${activeTab}/${userId}`
        );

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
        <div className="justify-center mt-44">
          <div className="tabs-container flex justify-center ">
            <button className={`tab-button text-2xl arsenal-sc-regular w-1/6 ${activeTab === 'listAllJobs' && 'border-b border-black'}`}
              onClick={() => setActiveTab("listAllJobs")} >
              All Jobs

            </button>
            <button className={`tab-button text-2xl arsenal-sc-regular w-1/6 ${activeTab === 'bestMatches' && 'border-b border-black'}`}
              onClick={() => setActiveTab("bestMatches")} >
              Best Matches

            </button>
            <button className={`tab-button text-2xl arsenal-sc-regular w-1/6 ${activeTab === 'trendingJobs' && 'border-b border-black'}`}
              onClick={() => setActiveTab("trendingJobs")} >
              Trending Jobs

            </button>
          </div>

          <div className="tab-content mt-8">
            <JobPostCard jobs={jobs} role='user' type='user-view' />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Jobs;
