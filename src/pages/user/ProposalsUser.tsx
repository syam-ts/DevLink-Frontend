import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import apiInstance from "../../api/axiosInstance";
import { ProposalCard } from "../../components/common/ProposalCard";
import { ProposalCardShimmer } from "../../components/shimmer/ProposalCardShimmer";

const JobProposals = () => {
  interface Proposals {
    type: string;
    description: string;
    userId: number;
  }

  const [data, setData]: any = useState<Proposals>({
    type: "",
    description: "",
    userId: 0,
  });

  const userId = useSelector(
    (state: any) => state?.user?.currentUser?._id
  );

  useEffect(() => {
    (async () => {
      try {
        const { data } = await apiInstance.axiosInstanceUser.get(
          `http://localhost:3000/user/job/proposals/${userId}`
        );
        setData(data?.data);
      } catch (err: any) {
        console.log("ERROR: ", err.message);
      }
    })();
  }, []);

 console.log('THE DATA ', data)

  return (
    <main>
      <section className="text-center mt-16 arsenal-sc-regular">
        <span className="text-3xl"> Proposals </span>
        <hr className="border-gray-400 mt-12 w-2/4 mx-auto" />
      </section>
      <section className="pt-5 arsenal-sc-regular">
        {
          data.type == "" ? (
            <ProposalCardShimmer size='10' />
          ) : (
            <ProposalCard proposals={data} clientId={userId} />
          )
        }
      </section>
    </main>
  );
};

export default JobProposals;
