import { useEffect, useState } from "react";
import { useSelector } from "react-redux"; 
import { apiClientInstance } from "../../api/axiosInstance/axiosClientRequest";
import { ClientState } from "../../config/state/allState";
import { ProposalCard } from "../../components/common/ProposalCard"; 

interface Proposals {
  type: string
  userId: string
  jobPostId: string
  jobPostInfo: string
  userdData: {
    profilePicture: string
  }
  description: string
  status: string
  bidAmount: number
  bidDeadline: number
  _id: string
};

const JobProposals = () => {
  const [proposals, setProposals] = useState<Proposals[]>([]);
  const [data, setData] = useState<Proposals[]>([]);
  const [proposalType, setProposalType] = useState<string>("pending");  
  const clientId: string = useSelector(
    (state: ClientState) => state?.client?.currentClient?._id
  );

  useEffect(() => {
    (async () => {
      try {
        const { data } = await apiClientInstance.get(
          `/proposals/${proposalType}`
        ); 
        console.log('The dat: ', data.data)
        setProposals(data?.data || []); 
        
      } catch (err) {
        console.log("ERROR: ", err.message);
      }
    })();
  }, [proposalType]);

   

  useEffect(() => {
    if (proposalType === "pending") {
      setData(proposals.filter((props) => props.status === "pending"));
    } else {
      setData(proposals.filter((props) => props.status === "rejected"));
    }
  }, [proposals,proposalType]);

 

  return (
    <main>
      <section className="pt-5 arsenal-sc-regular">
        {
          <div>
            <section className="text-center mt-16 arsenal-sc-regular">
              {proposalType === "pending" ? (
                <span className="text-3xl">Pending Proposals </span>
              ) : (
                <span className="text-3xl"> Rejected Proposals </span>
              )}
              <hr className="border-gray-400 mt-12 w-2/4 mx-auto" />
              <div className="arsenal-sc-regular  flex justify-end px-20">
                <form className="w-60">
                  <select
                    id="countries"
                    onChange={(e) => setProposalType(e.target.value)}
                    className="bg-gray-50 shadow-lg border border-gray-800 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  >
                    <option selected value="pending">
                      Pending
                    </option>
                    <option value="rejected">Rejected</option>
                  </select>
                </form>
              </div>
              {data.length === 0 ? (
                <div className="flex my-64">
                  <span className="mx-auto text-2xl ">
                    Proposals Not Found
                  </span>
                </div>
              ) : (
                <div>
                  <div>
                    {proposalType === "pending" ? (
                      <ProposalCard
                        proposals={data}
                        roleId={clientId}
                        roleType="client"
                      />
                    ) : (
                      <ProposalCard
                        proposals={data}
                        roleId={clientId}
                        roleType="client"
                      />
                    )}
                  </div>
                </div>
              )}
            </section>
          </div>
        }
      </section>
 
    </main>
  );
};

export default JobProposals;
