import { useEffect, useState } from "react";
import { useSelector } from "react-redux"; 
import { apiUserInstance } from '../../api/axiosInstance/axiosUserInstance';
import { ProposalCard } from "../../components/common/ProposalCard";
// import { ProposalCardShimmer } from "../../components/shimmer/ProposalCardShimmer";

const JobProposals = () => {


  interface Proposals {
    type: string
    userId: string
    jobPostId: string
    jobPostInfo: string
    userdData: {
      "profilePicture": string
    }
    description: string
    status: string
    bidAmount: number
    bidDeadline: number
    _id: string
  };


  const [data, setData]: any = useState<Proposals[]>([]);
  const [proposalLoadType, setProposalLoadType] = useState("pending");

  const userId = useSelector(
    (state: any) => state?.user?.currentUser?._id
  );

  useEffect(() => {
    (async () => {
      try {
        const { data } = await apiUserInstance.get(
          `http://localhost:3000/user/job/proposals/${userId}`
        );
        // console.log('Data fro m', data?.proposals)
        setData(data?.proposals);
      } catch (err: any) {
        console.log("ERROR: ", err.message);
      }
    })();
  }, []);


  // setProposalLoadType("rejected")



  return (
    <main>

      <section className="pt-5 arsenal-sc-regular">
        {
          data?.type == "" ? (
            <div className='flex my-64'>
              <span className='mx-auto text-2xl '> Proposals Not Found </span>
            </div>
          ) : (
            <div>
              <section className="text-center mt-16 arsenal-sc-regular">
                {
                  proposalLoadType === 'pending' ? (
                    <span className="text-3xl">Pending Proposals </span>
                  ) : (
                    <span className="text-3xl"> Rejected Proposals </span>
                  )
                }
                <hr className="border-gray-400 mt-12 w-2/4 mx-auto" />
                <div className='arsenal-sc-regular  flex justify-end px-20'>
                  <form className="w-60">
                    <select id="countries" onChange={(e) => setProposalLoadType(e.target.value)} className="bg-gray-50 shadow-lg border border-gray-800 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                      <option selected value='pending' >Pending</option>
                      <option value="rejected" >Rejected</option>
                    </select>
                  </form>
                </div>
          
                {data
                  .filter((pro: any) => pro.status === proposalLoadType)
                  .map((pro: any) => (
                    <ProposalCard key={pro._id} proposals={[pro]} clientId={userId} />
                  ))
                }

                  
              



              </section>




            </div>
          )
        }
      </section>
    </main>
  );
};

export default JobProposals;
