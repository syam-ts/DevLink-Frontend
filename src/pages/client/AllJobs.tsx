import React, { useEffect, useState } from "react";
import { apiClientInstance } from '../../api/axiosInstance/axiosClientRequest'; 
import { JobPostCard } from "../../components/common/JobPostCard";


interface JobsRenderProps {
  clientId: string;
  type: string
}

interface Jobs {
  _id: string;
  title: string;
  description: string;
  expertLevel: string;
  location: string;
  amount: number;
  paymentType: string;
  estimateTimeinHours: string;
  projectType: string 
};

const JobsRender: React.FC<JobsRenderProps> = ({ clientId, type }) => {

  
  const [myJobs, setMyJobs]: any = useState<Jobs>({
    _id: "",
    title: "",
    description: "",
    expertLevel: "",
    location: "",
    amount: 0,
    paymentType: "",
    estimateTimeinHours: "",
    projectType: ""
  });
  const [progressingJobs, setProgressingJobs]: any = useState<Jobs>({
    _id: "",
    title: "",
    description: "",
    expertLevel: "",
    location: "",
    amount: 0,
    paymentType: "",
    estimateTimeinHours: "",
    projectType: ""
  });

  useEffect(() => {
    try {
      (async () => {
        const response = await apiClientInstance.get(
          `/jobs/${type}/${clientId}`
        );
 
        if (type === "my-jobs") {
          setMyJobs(response.data?.data);
        } else if (type === "progressing-jobs") {
          setProgressingJobs(response.data?.data);
        } else {
          throw new Error("Something went wrong");
        }
      })();
    } catch (err: any) {
      console.error("ERROR : ", err.message);
    }
  }, []);

  return (
    
    <main>
      {type === "my-jobs" ? (
        <>
          <section className="bg-transparent shadow-sm">
            <JobPostCard jobs={myJobs} role='client' type='client-view' />
          </section>
        </>
      ) : type === "progressing-jobs" ? (
        <>
          <section>
            <JobPostCard jobs={progressingJobs} role='client' type='client-view' />
          </section>
        </>
      ) : null}
    </main>
  );
};

export default JobsRender;


 
 