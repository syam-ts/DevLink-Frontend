import { useEffect, useState } from "react"; 
import apiInstance from '../../api/axiosInstance'


const JobsRender = ({ clientId , type}: any) => {


    const [allJobs, setAllJobs] = useState({});
    const [myJobs, setMyJobs] = useState({});
    const [latestJobs, setLatestJobs] = useState({});
    


    useEffect(() => {
        try{

            (async () => {
                const response = await apiInstance.axiosInstanceClient.get(`http://localhost:3000/client/jobs/${type}/${clientId}`);
    
                console.log('The response ', response?.data);
                if(type === 'all-jobs') {
                    setAllJobs(response.data?.data)
                } else if (type === 'my-jobs') {
                    setMyJobs(response.data?.data)
                } else if (type === 'latest-jobs') {
                    setLatestJobs(response.data?.data)
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
              {type === 'all-jobs' ? (
                <>
                  <section className='text-center my-12'>
                    <span className='comfortaa-regular text-3xl'>All Jobs</span>
                    <hr className='border-gray-400 mt-12 w-2/4 mx-auto' />
                  </section>
                  <section>
                    {Object.entries(allJobs).map((job: any) => (
                      <ul className="bg-[#efefef] shadow overflow-hidden sm:rounded-md max-w-full mx-96 mt-16" key={job[0]}>
                        <li>
                          <div className="py-4 sm:px-12">
                            <div className="flex items-center justify-between">
                              <h3 className="text-lg leading-6 font-medium text-gray-900">{job[1]?.description}</h3>
                              <p className="mt-1 max-w-2xl text-sm text-gray-500">{job[1]?.status}</p>
                              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">{job[1]?.paymentType}</a>
                            </div>
                            <div className="mt-2 grid items-center justify-between">
                              <p className="text-sm font-medium text-gray-500">{job[1]?.title}</p>
                              <p className="text-sm font-medium text-gray-500">{job[1]?.keyResponsiblities}</p>
                            </div>
                          </div>
                        </li>
                      </ul>
                    ))}
                  </section>
                </>
              ) : type === 'my-jobs' ? (
                <>
                  <section className='text-center my-12'>
                    <span className='comfortaa-regular text-3xl'>My Jobs</span>
                    <hr className='border-gray-400 mt-12 w-2/4 mx-auto' />
                  </section>
                  <section>
                    {Object.entries(myJobs).map((job: any) => (
                      <ul className="bg-[#efefef] shadow overflow-hidden sm:rounded-md max-w-full mx-60 mt-16" key={job[0]}>
                        <li>
                          <div className="px-4 py-5 sm:px-6">
                            <div className="flex items-center justify-between">
                              <h3 className="text-lg leading-6 font-medium text-gray-900">{job[1]?.description}</h3>
                              <p className="mt-1 max-w-2xl text-sm text-gray-500">{job[1]?.status}</p>
                             <div>
                              <p className="font-medium text-indigo-600 hover:text-indigo-500">{job[1]?.paymentType}</p>
                              <p className="font-medium text-indigo-600 hover:text-indigo-500">{job[1]?.amount}</p>
                              <p className="font-medium text-indigo-600 hover:text-indigo-500">{job[1]?.estimateTimeinHours}</p>
                             </div>
                            </div>
                            <div className="mt-2 grid items-center justify-between">
                              <p className="text-sm font-medium text-gray-500">{job[1]?.title}</p>
                              <p className="text-sm font-medium text-gray-500">{job[1]?.keyResponsiblities}</p>
                            </div>
                          </div>
                        </li>
                      </ul>
                    ))}
                  </section>
                </>
              ) : type === 'latest-jobs' ? (
                <>
                  <section className='text-center my-12'>
                    <span className='comfortaa-regular text-3xl'>Latest Jobs</span>
                    <hr className='border-gray-400 mt-12 w-2/4 mx-auto' />
                  </section>
                  <section>
                    {Object.entries(latestJobs).map((job: any) => (
                      <ul className="bg-[#efefef] shadow overflow-hidden sm:rounded-md max-w-full mx-60 mt-16" key={job[0]}>
                        <li>
                          <div className="px-4 py-5 sm:px-6">
                            <div className="flex items-center justify-between">
                              <h3 className="text-lg leading-6 font-medium text-gray-900">{job[1]?.description}</h3>
                              <p className="mt-1 max-w-2xl text-sm text-gray-500">{job[1]?.status}</p>
                              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">{job[1]?.paymentType}</a>
                            </div>
                            <div className="mt-2 grid items-center justify-between">
                              <p className="text-sm font-medium text-gray-500">{job[1]?.title}</p>
                              <p className="text-sm font-medium text-gray-500">{job[1]?.keyResponsiblities}</p>
                            </div>
                          </div>
                        </li>
                      </ul>
                    ))}
                  </section>
                </>
              ) : null}
            </main> 
           
    )
};
 

export default JobsRender;