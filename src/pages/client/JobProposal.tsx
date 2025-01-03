import axios from "axios";
import { useEffect } from "react";
import { useSelector } from 'react-redux';
 




const Jobs = () => {

    const clientId = useSelector((state: any) => state?.client?.currentClient?.client?.client?._id);


    useEffect(() => {
         (async() => {
            try{
              const response = await axios.get(`http://localhost:3000/jobs/proposals/${clientId}`)
            }catch(err: any) {
                console.log('ERROR: ',err.message);
            }

         })();
    }, []);
   


  return (
    <main>
 
        
        <section>
      
                    <ul className="bg-[#efefef] shadow overflow-hidden sm:rounded-md max-w-full mx-60 mt-16">
                    <li>
                    <div className="px-4 py-5 sm:px-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">'  '</h3>
                            <p className="mt-1 max-w-2xl text-sm text-gray-500">' '</p>
                            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">''</a>
                        </div>
                        <div className="mt-2 grid items-center justify-between">
                            <p className="text-sm font-medium text-gray-500"> '' </p>
                            <p className="text-sm font-medium text-gray-500"> '' </p>
                        </div>
                    </div>
                </li> 
              </ul>
        </section>
    </main>
  )
}

export default Jobs;