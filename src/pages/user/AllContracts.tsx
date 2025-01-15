import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ViewContract from '../../components/common/Contract-test'

 

const AllContract = () => {

    const [contracts, setContracts] = useState({})

    const user = useParams();

    console.log('THE PARAMS : ',user?.userId);

    useEffect(() => {

    (async() => {
        const { data } =await axios.get(`http://localhost:3000/user/all-contracts/${user?.userId}`);
 
        setContracts(data?.contracts); 
       })(); 
    }, []);



    return (
      <div> 
             <section className='text-center my-12'>
        <span className='font-sans text-3xl'> My Contracts </span>
        <hr className='border-gray-700 mt-12 w-3/4 mx-auto' />
      </section>

        {
            Object.entries(contracts).map((contract: any) => (
            <div className="items-center justify-center py-4 ">
                
                <div className="containter mx-96 px-20">
                <div className="bg-stone-200 p-6 h-full rounded-lg shadow-lg relative hover:shadow-2xl transition duration-500">
                    <h1 className="text-2xl text-gray-800 font-semibold mb-3">{contract[1]?.jobPostId}.</h1>
                    <span>Deadline : {contract[1]?.deadline}</span>
                    <p className="text-gray-600 leading-6 tracking-normal">Description : Lorem ipsum dolor sit amet consectetur adipisicing elite. Beatae itaque debitis saepe, eaque similique quo doloribus ducimus ex veniam accusamus aliquid esse, veritatis totam quia impedit tempore aperiam, doloremque eius.</p>
                    <p className="text-gray-600 leading-6 tracking-normal">Status : {contract[1]?.status} </p>
                <button className="py-2 px-4 mt-8 bg-indigo-600 text-white rounded-md shadow-xl">
                   <Link to={`/user/contract/${contract[1]?._id}`}>
                      View
                   </Link>
                 </button>
                  </div>
                </div>
            </div>
            ))
        }
        </div>
    )
  }
  
  export default AllContract