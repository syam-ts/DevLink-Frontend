import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import apiInstance from "../../api/axiosInstance";
import { ProposalCard } from "../../components/common/ProposalCard";

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

  const clientId = useSelector(
    (state: any) => state?.client?.currentClient?._id
  );

  useEffect(() => {
    (async () => {
      try {
        const { data } = await apiInstance.axiosInstanceClient.get(
          `http://localhost:3000/client/job/proposals/${clientId}`
        );
        setData(data?.data);
      } catch (err: any) {
        console.log("ERROR: ", err.message);
      }
    })();
  }, []);

  return (
    <main>
      <section className="text-center mt-16 arsenal-sc-regular">
        <span className="text-3xl"> Proposals </span>
        <hr className="border-gray-400 mt-12 w-2/4 mx-auto" />
      </section>
      <section className="pt-20 arsenal-sc-regular">
        <ProposalCard proposals={data} clientId={clientId} />
      </section>
    </main>
  );
};

export default JobProposals;
