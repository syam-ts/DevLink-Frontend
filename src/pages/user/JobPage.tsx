 import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import JobPropsalUserModal from '../../components/nextUi/modals/jobProposalUserModal';
import apiInstance from '../../api/axiosInstance';
import { toast } from "sonner";
import { Sonner } from '../../components/sonner/Toaster';
 

const Jobs = () => {

    const [allJobs , setAllJobs] = useState({});
    // const [bestMatchJobs , setBestMatchJobs] = useState({}); 
    const userId = useSelector((state: any) => state?.user?.currentUser?.user?._id);
 
 
    

    useEffect(() => {
      try{
        
        (async() => {
            const response = await apiInstance.axiosInstanceUser.get('http://localhost:3000/user/listAllJobs');

            console.log('The response ', response?.data?.data); 
            setAllJobs(response.data?.data)
        })();
        
      }catch(err: any) {
        console.log('ERROR : ', err.message);
        toast.warning(err.message)
      }
    }, []);


    // useEffect(() => {

    //     (async() => {
    //         const response = await apiInstance.axiosInstanceUser.get(`http://localhost:3000/user/listJobs/bestMatches/${userId}`);

    //         console.log('The response ', response?.data?.data);
    //         setBestMatchJobs(response.data?.data)
    //     })();
        
    // }, []);
    
 


  return (
    <main>

     <Sonner />
        
        <section> 
            <div className='text-center text-4xl bellota-text-regular pt-10'>
                 Available Jobs
            </div>
            {
                Object.entries(allJobs).map((job: any) => (
                    <ul className="bg-[#efefef] shadow overflow-hidden sm:rounded-md max-w-full mx-60 mt-12 h-72">
                    <li>
                    <div className="px-4 py-2">
                        <div className="flex items-center justify-between">
                            <h3 className="text-md font-mono text-gray-900"> {job[1]?.title} </h3>
                            {/* <p className="mt-1 max-w-2xl text-sm text-gray-500"> {job[1]?.status} </p> */}
                           <div className='grid'>
                            <p className="font-mono">{job[1]?.paymentType}</p>
                            <p className="font-mono">{job[1]?.amount}</p>
                            <p className="font-mono">{job[1]?.estimateTimeinHours}</p>
                           </div>
                        </div>
                        <div className="grid">
                            <p className="text-sm font-mono text-gray-500"> {job[1]?.description} </p>
                            <p className="text-sm font-mono text-gray-500"> {job[1]?.keyResponsiblities} </p>
                        </div>
                        <div className="mt-2 grid items-center justify-between">
                           {/* <button className="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2" type="button"> */}
                           < JobPropsalUserModal clientId={job[1]?.clientId} userId={userId} jobPostId={job[1]?._id} />
                            {/* </button> */}
                        </div>
                    </div>
                </li> 
              </ul>
                ))
            } 
 
        </section>

        {/* <section>
        <div className='text-center text-4xl bellota-text-regular pt-10'>
                 Best Matches
            </div>
        </section> */}
        {/* <section>
        {
                Object.entries(bestMatchJobs)?.map((job: any) => (
                    <ul className="bg-[#efefef] shadow overflow-hidden sm:rounded-md max-w-full mx-60 mt-16">
                    <li>
                    <div className="px-4 py-5 sm:px-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-md leading-6 bellota-text-regular text-gray-900"> {job[1]?.description} </h3>
                       
                            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">{job[1]?.paymentType}</a>
                        </div>
                        <div className="mt-2 grid items-center justify-between">
                            <p className="text-sm font-medium text-gray-500"> {job[1]?.title} </p>
                            <p className="text-sm font-medium text-gray-500"> {job[1]?.keyResponsiblities} </p>
                        </div>
                        <div className="mt-4 grid items-center justify-between"> */}
                           {/* <button className="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2" type="button"> */}
                           {/* < JobPropsalUserModal clientId={job[1]?.clientId} userId={userId} /> */}
                            {/* </button> */}
                        {/* </div>
                    </div>
                </li> 
              </ul>
                ))
            } 
        </section> */}
    </main>
  )
}

export default Jobs;