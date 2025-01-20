import axios from "axios";
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom";

 

function AllContract() {


  const [contracts, setContracts] = useState({});
  const { roleId, roleType } = useParams();
  console.log('ROLE : ', roleType)

  useEffect(() => {
    try{
       (async () => {
        const { data } = await axios.get(`http://localhost:3000/${roleType}/job/myContracts/${roleId}`);

        console.log('THE RESPONSE FROM MY-CONTRRAC ',data);
        setContracts(data?.data);
       })();
    }catch(err: any) {
      console.error('ERROR: ', err.message);
    }
  }, []);

  


  return (
    <div className='bg-gray-100 h-screen w-full'>
    <div className=' text-center pt-5'>
      <span className='arsenal-sc-regular text-center mx-auto text-2xl '>My Proposals</span>
      <hr className='w-2/3 mx-auto' />
    </div>
<div className=" mt-44 mx-auto flex items-center justify-center arsenal-sc-regular">
  {
    Object.entries(contracts).map((contract: any) => (

      <div className="containter mx-auto ">
        <div className="bg-white p-8 rounded-lg shadow-lg relative hover:shadow-2xl transition duration-500">
          <h1 className="text-2xl text-gray-800 font-semibold mb-3">{ contract[1]?.jobPostData?.title } </h1>  
          <p className="text-gray-600 leading-6 tracking-normal"> { contract[1]?.jobPostData?.description } </p>
          <div className='grid'>
            <span className='text-xs'>Contract Amount: {contract[1]?.amount}.00₹</span>
            <span className='text-xs'>Contract Amount Deadline: {contract[1]?.deadline}</span>
          </div>
           <button className="py-2 px-4 mt-8 bg-indigo-600 text-white rounded-md shadow-xl">
            <Link to={`/${roleType}/contract/view/${contract[1]?._id}`} className='no-underline text-white'>
              View Contract 
            </Link>
             </button>
          <div>
            <span className="absolute py-2 px-8 text-sm text-white top-0 right-0 bg-indigo-600 rounded-md transform translate-x-2 -translate-y-3 shadow-xl">New</span>
          </div>
        </div>
      </div>
    ))
  }
  </div>
    </div>
  )
}

export default AllContract