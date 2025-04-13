import { toast } from "sonner";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Sonner } from "../sonner/Toaster";
import config from "../../config/helper/config";
import { addNotification } from "../../redux/slices/userSlice";
import { apiClientInstance } from "../../api/axiosInstance/axiosClientRequest";
import { ProjectSubmissionViewDrawer } from "../shadcn/drawer/ProjectSubmitView";

interface PendingApproval {
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

interface ProjectApprovalCardProps {
  pendingApprovals: PendingApproval
};

export const ProjectApprovalCard: React.FC<ProjectApprovalCardProps> = ({
  pendingApprovals,
}) => {
  const dispatch = useDispatch();

  const approveAndCloseContract = async (
    contractId: string,
    progress: number
  ) => {
    try {
      const { data } = await apiClientInstance.post(
        `/projectApprove`,
        {
          contractId,
          progress,
        },
        {
          withCredentials: true,
        }
      );

      if (data.success) {
        const notificationClient = JSON.stringify([
          data.data.newNotificationClient,
        ]);
        dispatch(addNotification(notificationClient));
        toast.success("Contract closed succssfully", {
          style: {
            backgroundColor: "#15E029",
            color: "white",
          },
        });
        setTimeout(() => {
          window.location.href = `${config.BASE_URL}/client/contractsApprovals`;
        }, 1000);
      }
    } catch (error: unknown) {
      const err = error as { message: string };
      toast.error(err.message);
    }
  };

  const rejectContractApproval = async (contractId: string) => {
    try {
      const { data } = await apiClientInstance.post('/contractSubmitReject', {
        contractId: contractId
      });
      console.log('The result: ', data);
      if(data.success) {
        toast.success("Contract closed succssfully", {
          style: {
            backgroundColor: "#15E029",
            color: "white",
          },
        });
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
      
    } catch (error: unknown) {
      const err = error as { message: string };
      console.log('ERROR: ', err.message);
    }
  }



  return (
    <div>
      <Sonner />
      {Object.entries(pendingApprovals).map(
        ([key, pendingApproval]: [string, PendingApproval]) => (
          <div
            key={key}
            className="w-11/12 md:w-2/3 grid gap-4 border border-gray-100 shadow-xl rounded-xl mx-auto my-10 p-6 arsenal-sc-regular"
          >
            {/* Job Info */}
            <ul className="flex flex-wrap gap-10 text-sm text-gray-800">
              <li>
                <p className="font-semibold">Title</p>
                <p>{pendingApproval?.jobPostData?.title || "N/A"}</p>
              </li>
              <li>
                <p className="font-semibold">Amount</p>
                <p>₹{pendingApproval?.jobPostData?.amount || "N/A"}</p>
              </li>
              <li>
                <p className="font-semibold">Status</p>
                <p>{pendingApproval?.status || "Pending"}</p>
              </li>
              <li>
                <p className="font-semibold">Created On</p>
                <p>
                  {pendingApproval?.createdAt
                    ? new Date(pendingApproval.createdAt).toLocaleDateString()
                    : "N/A"}
                </p>
              </li>
            </ul>

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-end gap-3">
              <Link
                to={`/client/contract/${pendingApproval?.contractId}/client`}
                className="rounded-full bg-[#0000ff] no-underline px-4 py-1.5 text-sm text-white shadow-md hover:bg-blue-700 transition"
              >
                View Contract
              </Link>

              <ProjectSubmissionViewDrawer
                title={pendingApproval?.jobPostData?.title}
                description={pendingApproval?.description}
                progress={pendingApproval?.progress}
                attachedFile={pendingApproval?.attachedFile}
              />

              <button
                onClick={() => rejectContractApproval(pendingApproval?.contractId)}
                className="rounded-full bg-[#ff0000] px-4 py-1.5 text-sm text-white shadow-md hover:bg-red-600 transition"
              >
                Reject Submission
              </button>

              <button
                onClick={() =>
                  approveAndCloseContract(
                    pendingApproval?.contractId,
                    pendingApproval?.progress
                  )
                }
                className="rounded-full bg-green-500 px-4 py-1.5 text-sm text-white shadow-md hover:bg-green-700 transition"
              >
                Approve Contract
              </button>
            </div>
          </div>
        )
      )}
    </div>

  );
};
