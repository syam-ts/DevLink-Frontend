import axios from "axios";
import { useEffect, useState } from "react";

 

const Jobs = () => {

    const [jobs , setJobs] = useState({});

    useEffect(() => {

        (async() => {
            const response = await axios.get('http://localhost:3000/client/listAllJobs');

            console.log('The response ', response?.data?.data);
            setJobs(response.data?.data)
        })();
        
    }, []);
    
    
    const createJobPost = async () => {
        try{
            
            const response = await axios.post('http://localhost:3000/client/createJobPost');
            
            console.log('The response data : ', response);


        }catch(err: any) {
            console.log("ERROR : ",err.message);
        }
    }

    console.log(
        Object.entries(jobs).map((j: any) => {
            console.log('This ', j[1])
        })
    )


  return (
    <main>
   
        <section>
             
            <div className="max-w-full mt-20 p-6 mx-60 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Job post creation section</h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">The need to create a job.</p>
                <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                     



     {/* new page for creatin jobs and link it here to redirect */}
                      <button >Create Job Post</button>



                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                    </svg>
                </a>
            </div>

        </section>

        
        <section>
            {
                Object.entries(jobs).map((job: any) => (
                    <ul className="bg-[#efefef] shadow overflow-hidden sm:rounded-md max-w-full mx-60 mt-16">
                    <li>
                    <div className="px-4 py-5 sm:px-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg leading-6 font-medium text-gray-900"> {job[1]?.description} </h3>
                            <p className="mt-1 max-w-2xl text-sm text-gray-500"> {job[1]?.status} </p>
                            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">{job[1]?.paymentType}</a>
                        </div>
                        <div className="mt-2 grid items-center justify-between">
                            <p className="text-sm font-medium text-gray-500"> {job[1]?.title} </p>
                            <p className="text-sm font-medium text-gray-500"> {job[1]?.keyResponsiblities} </p>
                        </div>
                    </div>
                </li> 
              </ul>
                ))
            }

          
 
        </section>
    </main>
  )
}

export default Jobs;