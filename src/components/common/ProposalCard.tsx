import { Link } from "react-router-dom";
import { toast } from "sonner";
import { addNotification } from "../../redux/slices/userSlice";
import { useDispatch } from "react-redux";
import { apiClientInstance } from "../../api/axiosInstance/axiosClientRequest";
import config from "../../config/helper/config";
import { Sonner } from "../sonner/Toaster";
import {Proposals} from '../../pages/user/Proposals'

type Id = string;
interface ProposalCardProps {
  proposals: string[] | Proposals[];
  roleType: string;
  roleId: Id;
}
 
export const ProposalCard: React.FC<ProposalCardProps> = ({
  proposals,
  roleType,
  roleId,
}) => {
  const dispatch = useDispatch();

  const acceptProposal = async (
    userId: Id,
    clientId: Id,
    jobPostId: Id,
    bidAmount: number,
    bidDeadline: number
  ) => {
    try {
      const body = {
        userId: userId,
        clientId: clientId,
        jobPostId: jobPostId,
        bidAmount: bidAmount,
        bidDeadline: bidDeadline,
      };
      const { data } = await apiClientInstance.post(
        "/createContract",
        body
      );

      if (data.success) {
        const notifications: string = JSON.stringify([
          data?.data?.newNotificationUser,
        ]);
        dispatch(addNotification(notifications));
        toast.success(data.message, {
          style: {
            backgroundColor: "#00ff00",
            color: "white",
          },
        });

        setTimeout(() => {
          window.location.href = `${config.BASE_URL}/client/jobs/proposals`;
        }, 500);
      }
    } catch (error: unknown) {
      const err = error as {message: string};
      toast.error(err.message);
    }
  };
 

  const rejectProposal = async (userId: Id, jobPostId: Id) => {
    try {
       
      const body = {
        userId: userId,
        jobPostId: jobPostId,
      };
      const { data } = await apiClientInstance.put(
        "/proposalReject",
        body
      );

      if (data.success) {
        toast.success("Proposal Rejected", {
          style: {
            backgroundColor: "#35f505",
            color: "white",
          },
        });
        setTimeout(() => {
           window.location.href = `${config.BASE_URL}/client/proposals`;
        }, 500);
      } else {
        toast.error(data.message, {
          style: {
            backgroundColor: "red",
            color: "white",
          },
        });
      }
    } catch (error: unknown) {
      const err = error as {message: string};
      toast.error(err.message);
    }
  };

  return (
    <div>
      <Sonner />
      {Object.entries(proposals).map((proposal: Proposals[]) => (
        <div className="w-full sm:w-4/5 lg:w-2/3 max-sm:w-[400px] border border-gray-100 shadow-xl rounded-xl h-full mx-auto my-8 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          {/* Profile Picture */}
          <div className="h-16 w-16">
            <img
              className="w-12 h-12 rounded-full object-cover"
              src={proposal[1]?.userData?.profilePicture}
              alt="user-profile"
            />
          </div>
      
          {/* Job Info */}
          <div className="grid gap-2 w-full">
            <div className="grid justify-start">
              <span className="font-semibold text-base sm:text-lg">
                Job Title: {proposal[1]?.jobPostInfo}
              </span>
              <p className="text-sm">{proposal[1]?.description}</p>
            </div>
      
            <div className="flex flex-col sm:flex-row gap-3">
              <span className="font-semibold text-xs">
                Proposal Amount: {proposal[1]?.bidAmount}.00₹/hr
              </span>
              <span className="font-semibold text-xs">
                Proposal Deadline: {proposal[1]?.bidDeadline}hrs
              </span>
            </div>
      
            <div>
              <span className="font-semibold text-xs">
                Proposal Description: {proposal[1]?.description}
              </span>
            </div>
          </div>
        </div>
      
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-end mt-4 gap-3">
          {roleType === "user" && (
            <button
              className="rounded-full border bg-black text-white py-2 px-8 sm:px-12 text-center text-sm font-bold transition-all shadow-sm"
              type="button"
            >
              <Link
                to={`/${roleType}/job/${proposal[1]?.jobPostId}/proposal-view`}
                className="no-underline text-white"
              >
                View
              </Link>
            </button>
          )}
      
          {roleType === "client" && (
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                className="rounded-full border bg-black text-white py-2 px-8 sm:px-12 text-center text-sm font-bold transition-all shadow-sm"
                type="button"
              >
                <Link
                  to={`/${roleType}/userProfile/view/${proposal[1]?.userId}/client-proposal-view`}
                  className="no-underline text-white"
                >
                  View
                </Link>
              </button>
      
              {proposal[1]?.status === "pending" && (
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() =>
                      rejectProposal(proposal[1]?.userId, proposal[1]?.jobPostId)
                    }
                    className="rounded-full bg-[#fd2b2b] py-2 px-8 sm:px-12 text-center text-sm text-white transition-all shadow-md font-bold hover:bg-slate-700"
                    type="button"
                  >
                    Reject
                  </button>
      
                  <button
                    onClick={() =>
                      acceptProposal(
                        proposal[1]?.userId,
                        roleId,
                        proposal[1]?.jobPostId,
                        proposal[1]?.bidAmount,
                        proposal[1]?.bidDeadline
                      )
                    }
                    className="rounded-full bg-[#0000ff] py-2 px-8 sm:px-12 text-center text-sm text-white transition-all shadow-md font-bold hover:bg-slate-700"
                    type="button"
                  >
                    Accept
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      ))}
    </div>
  );
};
