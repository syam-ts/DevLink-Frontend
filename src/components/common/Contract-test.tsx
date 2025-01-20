import axios from "axios";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";

 

const Contract = () => {

  const [myContract,setMyContract]: any = useState({})
  const contract = useParams()

useEffect(() => {
 
   (async () => {
    try{
      const { data } = await axios.get(`http://localhost:3000/user/contract/${contract.contractId}`);
      console.log('THE RESPONSE OF VIEW CONTRACT : ', data?.contract.clientId);

    setMyContract(data?.contract)
   }catch(err: any) {
     console.error('ERROR: ', err.message);
   }
   })();
 
}, []);


  return (
    <div>{
   
        <div className="max-w-[99rem] px-4 sm:px-6 lg:px-8 mx-auto my-4 sm:my-10 arsenal-sc-regular">
          <div className="sm:w-11/12 lg:w-3/5 mx-auto border-1 border-gray-300">
            <div className="flex flex-col p-4 sm:p-10 bg-white">
              <div className="flex justify-between">
                <div>
                
                    <img src='/public/devLink_logo.png' className='h-20 w-20' /> 

                  <h1 className="mt-2 text-lg md:text-xl font-semibold text-blue-600">DevLink Contract</h1>
                </div>

                <div className="text-end">
                  <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">Contract</h2>
                  <span className="mt-1 block text-gray-500">3682303</span>
                  {/* <address className="mt-4 not-italic text-gray-800">
                    45 Roker Terrace<br>
                    Latheronwheel<br>
                    KW5 8NW, London<br>
                    United Kingdom<br>
                  </address> */}
                </div>
              </div>

            <section>
            <div className="mt-8 grid gap-3">
              <div className='grid gap-3'>
                <div className='flex gap-3'>
                <h3 className="text-lg font-semibold text-gray-800">Contract by:  </h3> 
                  <h3 className="text-lg font-semibold text-gray-800">{myContract?.clientId}(client)
                 
                    </h3>
                  
                </div>
                <div className='flex gap-3'>
                <h3 className="text-lg font-semibold text-gray-800">Contract by:</h3>
                  <h3 className="text-lg font-semibold text-gray-800">{myContract?.userId}(freelancer)</h3>
                  
                </div> 
              </div>
                

                <div className="sm:text-end">
                  <div className="grid grid-cols-2 sm:grid-cols-1 gap-1 sm:gap-2">
                    <dl className="grid sm:grid-cols-5 gap-x-3">
                      <dt className="col-span-3 font-semibold text-gray-800">Contract id:</dt>
                      <dd className="col-span-2 text-gray-500">849234023jkdjfw</dd>
                    </dl>
              
                    <dl className="grid sm:grid-cols-5 gap-x-3">
                      <dt className="col-span-3 font-semibold text-gray-800">Created date:</dt>
                      <dd className="col-span-2 text-gray-500">03/10/2018</dd>
                    </dl>
                    <dl className="grid sm:grid-cols-5 gap-x-3">
                      <dt className="col-span-3 font-semibold text-gray-800">Due date:</dt>
                      <dd className="col-span-2 text-gray-500">03/11/2018</dd>
                    </dl>
                    <dl className="grid sm:grid-cols-5 gap-x-3">
                      <dt className="col-span-3 font-semibold text-gray-800">Amount:</dt>
                      <dd className="col-span-2 text-gray-500">400rs /hourly</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </section> 

            <section>
            <div className="mt-8 sm:justify-center">
              <div className='py-4'>
                <span className='text-3xl font-bold'>Parties Involved</span>
              </div>
            
              <div className='font-semibold'>
                <span>CLIENT</span>
                <hr className='bg-black '/>
                <div>
                    <ul>
                        <li>Company Name : sample</li>
                        <li>Location : sample</li>
                        <li>Email : sample</li> 
                    </ul>
                </div>
              </div>

              <hr className='bg-black '/>
              <div className='font-semibold'>
              <span>FREELANCER</span>
              <hr className='bg-black '/>
                <div>
                    <ul>
                        <li>Name : sample</li>
                        <li>Location : sample</li>
                        <li>Email : sample</li> 
                    </ul>
                </div>
              </div>
              <hr className='bg-black '/>
              <div className='font-semibold'>
              <span>JOB DETAILS</span>
              <hr className='bg-black '/>
                <div>
                    <ul>
                        <li>Title : sample</li>
                        <li>Description : sample</li>
                        <li>Expert Level : sample</li>
                        <li>Project Type : sample</li>
                        <li>Status: Sample</li>
                        <li>Payment: Sample</li>
                        <li>Payment Type: Sample</li>
                        <li>Deadline: Sample</li>
                    </ul>
                </div>
              </div>
              </div>
            </section>
        

            <section>
            <div className="mt-8 sm:mt-12">
                <p className='text-sm'>This contract will commence on (Date) according to the terms and condition. It wont valid after met with the deadline. </p>
                <p className="text-sm">If you have any questions concerning this contract, use the following contact information:</p>
                <div className="mt-2">
                  <p className="block text-sm font-medium text-gray-800">devlinkhelp@gmail.com</p>
                  <p className="block text-sm font-medium text-gray-800">+1 (062) 109-9222</p>
                </div>
              </div>
            </section>

              <p className="mt-5 text-sm text-gray-500">© 2025 Devlink.</p>
            </div>

            <div className="mt-6 flex justify-end gap-x-3">
              <a className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium   bg-white text-gray-800  hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50" href="#">
              <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
                Download Contract
              </a> 
            </div>
          </div>
        </div>
    

 
  } </div>
                 
  )
}

export default Contract