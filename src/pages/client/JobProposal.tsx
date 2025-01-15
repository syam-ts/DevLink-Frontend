import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import apiInstance from '../../api/axiosInstance'




const JobProposals = () => {

  interface Proposals {
    type: string;
    description: string;
    userId: number;
  }
  

    const [data, setData]: any = useState<Proposals>({
      type: "",
      description: "",
      userId: 0
    });

    const clientId = useSelector((state: any) => state?.client?.currentClient?._id);


    useEffect(() => {
         (async() => {
            try{
              const {data} = await apiInstance.axiosInstanceClient.get(`http://localhost:3000/client/job/proposals/${clientId}`);
                 console.log('THE REPONSE OF USEEFFECT :', data?.data)
                setData(data?.data);
            }catch(err: any) {
                console.log('ERROR: ',err.message);
            }

         })();
    }, []);
   


    const acceptProposal = async (userId: string, jobPostId: string) => {
        try{
          const body = {
            userId: userId,
            clientId: clientId,
            jobPostId: jobPostId
          }
            const { data } = await apiInstance.axiosInstanceClient.post('http://localhost:3000/client/job/createContract', body);

            console.log('THE REPONSE OF ACCEPT PROPOSAL: ', data);
        }catch(err: any) {
          console.error('ERROR: ', err.message);
        }
    };
console.log('THE PROPOSAL S: ', data)

  return (
    <main>
 
        
        <section className='text-center my-12'>
            <span className='comfortaa-regular text-3xl'> Proposals </span>
            <hr className='border-gray-400 mt-12 w-2/4 mx-auto' />
      </section>
        <section className='pt-20'>
          {
            Object.entries(data).map((proposal: any) => (

              <div className='w-2/3 border grid border-gray-100 shadow-xl rounded-xl h-[220px] mx-auto my-12 '>
                
              <div className='grid px-12 py-2'>
         
                   <div>
                        <img className='w-16 h-16 rounded-full object-cover' src={proposal[1]?.userData?.profilePicture} alt='user-profile' />
                   </div>
                   <div>
                      <span className='font-semibold text-lg'> {proposal[1]?.userData?.name}</span>
                   </div>
                   <div>
                      <span className='font-semibold text-lg'>Job :  {proposal[1]?.jobPostInfo}</span>
                   </div>
                   <div>
                    
                      <span> {proposal[1]?.description} 
                      </span>
                   </div>
                          
              </div>
                  <div className='flex justify-end pr-12 gap-5'>
                    <div>
                    <button className="rounded-md border border-slate-300 py-2 px-12 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                    <Link to={`/client/userProfile/${proposal[1]?.userId}`}> View </Link>
                    </button>
                    </div>
                    <div>
                    <button onClick={() => acceptProposal(proposal[1]?.userId, proposal[1]?.jobPostId)} className="rounded-md bg-slate-800 py-2 px-12 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2" type="button">
                     Accept
                    </button>
                    </div>
                  </div>
              </div>
            ))
          }
         
        </section>
    </main>
  )
}

export default JobProposals;