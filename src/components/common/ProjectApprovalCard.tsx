import { toast } from "sonner";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Sonner } from "../sonner/Toaster";
import { addNotification } from "../../redux/slices/userSlice";
import { apiClientInstance } from "../../api/axiosInstance/axiosClientRequest";
import { ProjectSubmissionViewDrawer } from "../shadcn/drawer/ProjectSubmitView"; 

interface ProjectApprovalCardProps {
    
}

export const ProjectApprovalCard = ({ pendingApprovals }: any) => {
  const dispatch = useDispatch();

  const approveAndCloseContract = async (
    contractId: string,
    progress: number
  ) => {
    try {
      const { data } = await apiClientInstance.post(
        `/project/submit/approval`,
        {
          contractId,
          progress,
        },
        {
          withCredentials: true,
        }
      );
 

      if (data.success) {
        const notificationClient: any = JSON.stringify([
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
          window.location.href =
            "http://localhost:5173/client/contracts/approvals";
        }, 1000);
      }
    } catch (err: any) {
      console.error("ERROR: ", err.message);
    }
  };

  return (
    <div>
      <Sonner />
      {Object.entries(pendingApprovals).map((pendingApproval: any) => (
        <div className="w-2/3 grid gap-2 border-gray-100 shadow-xl rounded-xl h-[200px] border mx-auto my-20 p-4 arsenal-sc-regular">
          <div>
            <ul className="flex gap-20">
              <li>
                <p>Title</p>
                <p>{pendingApproval[1]?.jobPostData?.title}</p>
              </li>
              <li>
                <p>Amount</p>
                <p>{pendingApproval[1]?.jobPostData?.amount}</p>
              </li>
              <li>
                <p>Status</p>
                <p>{pendingApproval[1]?.status || "status"}</p>
              </li>
              <li>
                <p>Created on</p>
                <p>{pendingApproval[1]?.createdAt}</p>
              </li>
            </ul>
          </div>
          <div className="text-end">
            <button
              className="rounded-full bg-[#0000ff] px-3 py-1 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
              type="button"
            >
              <Link
                to={`/client/contract/${pendingApproval[1]?.contractId}/client`}
                className="no-underline text-white"
              >
                View Contract
              </Link>
            </button>
            <button
              className="rounded-full bg-[#0000ff] px-3 py-1 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
              type="button"
            >
              <ProjectSubmissionViewDrawer
                title={pendingApproval[1]?.jobPostData?.title}
                description={pendingApproval[1]?.description}
                progress={pendingApproval[1]?.progress}
                attachedFile={pendingApproval[1]?.attachedFile}
              />
            </button>
            {/* <button
                            className="rounded-full bg-[#ff2453] px-3 py-1 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
                            type="button" >
                            Reject Approval
                        </button> */}
            <button
              onClick={() =>
                approveAndCloseContract(
                  pendingApproval[1]?.contractId,
                  pendingApproval[1]?.progress
                )
              }
              className="rounded-full bg-[#0000ff] px-3 py-1 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
              type="button"
            >
              Approve Contract
            </button>
          </div>
          <div></div>
        </div>
      ))}
    </div>
  );
};
