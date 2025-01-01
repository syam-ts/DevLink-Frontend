import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

 

const Jobs = () => {

    const [jobs , setJobs] = useState({});

    useEffect(() => {

        (async() => {
            const response = await axios.get('http://localhost:3000/user/listAllJobs');

            console.log('The response ', response?.data?.data);
            setJobs(response.data?.data)
        })();
        
    }, []);
    


    console.log(
        Object.entries(jobs).map((j: any) => {
            console.log('This ', j[1])
        })
    )


  return (
    <main>

        
        <section> 
            <div className='text-center text-4xl bellota-text-regular pt-10'>
                 Available Jobs
            </div>
            {
                Object.entries(jobs).map((job: any) => (
                    <ul className="bg-[#efefef] shadow overflow-hidden sm:rounded-md max-w-full mx-60 mt-16">
                    <li>
                    <div className="px-4 py-5 sm:px-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-md leading-6 bellota-text-regular text-gray-900"> {job[1]?.description} </h3>
                            <p className="mt-1 max-w-2xl text-sm text-gray-500"> {job[1]?.status} </p>
                            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">{job[1]?.paymentType}</a>
                        </div>
                        <div className="mt-2 grid items-center justify-between">
                            <p className="text-sm font-medium text-gray-500"> {job[1]?.title} </p>
                            <p className="text-sm font-medium text-gray-500"> {job[1]?.keyResponsiblities} </p>
                        </div>
                        <div className="mt-4 grid items-center justify-between">
                            <button className="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2" type="button">
                               Apply
                            </button>
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