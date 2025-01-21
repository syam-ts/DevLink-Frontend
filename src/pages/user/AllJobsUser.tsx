import { useEffect, useState } from "react"; 
import apiInstance from '../../api/axiosInstance'
import { JobPostCard } from "../../components/common/JobPostCard";


const JobsRender = ({ userId , type}: any) => {

 
    const [myJobs, setMyJobs]: any = useState({});
    const [progressingJobs, setProgressingJobs]: any = useState({});
    


    useEffect(() => {
        try{

            (async () => {
                const response = await apiInstance.axiosInstanceClient.get(`http://localhost:3000/user/jobs/${type}/${userId}`);
    
                console.log('The response ', response?.data);
                if (type === 'my-jobs') {
                    setMyJobs(response.data?.data)
                } else if (type === 'progressing-jobs') {
                  setProgressingJobs(response.data?.data)
                } else {
                    throw new Error('Something went wrong')
                }
               
            })();

        }catch(err: any) {
            console.error('ERROR : ', err.message);
        }
    }, []);


    return (
         
            <main>
              { type === 'my-jobs' ? (
                <>
                  <section className='text-center my-12'>
                    <span className='comfortaa-regular text-3xl'>My Jobs</span>
                    <hr className='border-gray-400 mt-12 w-2/4 mx-auto' />
                  </section>
                  <section>

                    <JobPostCard jobs={myJobs} />
                 
                  </section>
                </>
              ) : type === 'progressing-jobs' ? (
                <>
                  <section className='text-center my-12'>
                    <span className='comfortaa-regular text-3xl'>Progressing Jobs</span>
                    <hr className='border-gray-400 mt-12 w-2/4 mx-auto' />
                  </section>
                  <section>
                  <JobPostCard jobs={progressingJobs} />
                  </section>
                </>
              ) : null}
            </main> 
           
    )
};
 

export default JobsRender;