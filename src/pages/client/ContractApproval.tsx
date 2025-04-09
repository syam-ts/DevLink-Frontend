import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Sonner } from "../../components/sonner/Toaster";
import { apiClientInstance } from "../../api/axiosInstance/axiosClientRequest";
import { ProjectApprovalCard } from "../../components/common/ProjectApprovalCard";

interface PendigApprovals {
  jobPostData: {
    title: string
    amount: number
    status: string
  }
  status: string
  createdAt: string
  contractId: string
  description: string
  attachedFile: string
  progress: number
};

const ContractApproval = () => {
  const [pendingApprovals, setPendingApprovals] = useState<PendigApprovals>({
    jobPostData: {
      title: "",
      amount: 0,
      status: "",
    },
    status: "",
    createdAt: "",
    contractId: "",
    description: "",
    attachedFile: "",
    progress: 0
  });

  useEffect(() => {
    try {
      const fetchData = async () => {
        const { data } = await apiClientInstance.get(`/contractsSubmissions`);
        setPendingApprovals(data?.data);
      };
      fetchData();
    } catch (error: unknown) {
      const err = error as { message: string };
      toast.error(err.message);
    }
  }, []);

  return (
    <div>
      <Sonner />
      <div className="text-center pt-44">
        <span className="text-xl arsenal-sc-regular ">Pending Approvals</span>
      </div>
      {Object.entries(pendingApprovals).length === 0 ? (
        <div className="flex justify-center my-44">
          <span> No Approvals To Show </span>
        </div>
      ) : (
        <ProjectApprovalCard pendingApprovals={pendingApprovals} />
      )}
    </div>
  );
}

export default ContractApproval;
