import { useEffect, useState } from "react";
import { apiClientInstance } from '../../api/axiosInstance/axiosClientRequest';

import { JobPostCard } from "../../components/common/JobPostCard";

const JobsRender = ({ clientId, type }: any) => {

  
  const [myJobs, setMyJobs]: any = useState({});
  const [progressingJobs, setProgressingJobs]: any = useState({});

  useEffect(() => {
    try {
      (async () => {
        const response = await apiClientInstance.get(
          `http://localhost:3000/client/jobs/${type}/${clientId}`
        );

        console.log("The response ", response?.data);
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
            <JobPostCard jobs={myJobs} role='client' type={type} />
          </section>
        </>
      ) : type === "progressing-jobs" ? (
        <>
          <section>
            <JobPostCard jobs={progressingJobs} role='client' type={type} />
          </section>
        </>
      ) : null}
    </main>
  );
};

export default JobsRender;
