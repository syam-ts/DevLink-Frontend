import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ClientJobTabs from '../../pages/client/TestingTabs' 
 

const Jobs = () => {


  return (
    <main>
        
        <section className='text-center my-12'>
            <span className='comfortaa-regular text-3xl'> Draft Job </span>
            <hr className='border-gray-400 mt-12 w-2/4 mx-auto' />
      </section>

   
        <section>
             
            <div className="max-w-full mt-20 p-6 mx-60 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Job post creation section</h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">The need to create a job.</p>
                <p className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      
                       <Link to='/client/jobs/draftJobPost'>
                         <button className='text-white font-bold'>
                              Create Job Post
                         </button>
                        </Link> 

                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                    </svg>
                </p>
            </div>

        </section>

        <ClientJobTabs />

      
 
    </main>
  )
}

export default Jobs;