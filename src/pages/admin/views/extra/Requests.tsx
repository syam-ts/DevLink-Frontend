import axios from "axios"
import { useEffect, useState } from "react"

 

const Requests: any = () => {

  const [requests, setRequests] = useState({});

  useEffect(() => {
    (async() => {

      const data = await axios.get('http://localhost:3000/admin/getRequests');

      console.log("The request data ", data?.data?.data[1]?.type);
  
       setRequests(data?.data?.data)
    })()  
  }, [])

 


  return (
    <div className=''>
      {
        Object.entries(requests).map((request: any) => (
 
      <div className="flex flex-col p-4 bg-white m-5 shadow-lg border-1 hover:shodow-lg rounded-2xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg"
            className="w-16 h-16 rounded-2xl p-3 border border-gray-800 text-blue-400 bg-gray-900" fill="none"
            viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <div className="flex flex-col ml-3">
            <div className="font-medium leading-none text-black"> {console.log('The type', request[1]?.type)}  { request[1]?.type }</div>
            <p className="text-sm text-gray-500 leading-none mt-1">{ request[1]?.type } 
            </p>
          </div>
        </div>
        <div>
        <button  className="flex-no-shrink bg-green-500 px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-green-500 text-white rounded-full">
          Accept
          </button>
        <button  className="flex-no-shrink bg-red-500 px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-red-400 text-white rounded-full">
          Reject
          </button>
        </div>
      </div>
    </div>
        ))
      }
  
    </div>
  )
 }

export default Requests;