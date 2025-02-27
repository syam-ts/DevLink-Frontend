import { Link } from "react-router-dom";
import { toast } from "sonner";
import { addNotification } from "../../redux/slices/userSlice";
import { useDispatch } from "react-redux";
import { apiClientInstance } from "../../api/axiosInstance/axiosClientRequest";
import config from "../../config/helper/config";
import { Sonner } from "../sonner/Toaster";

type Id = string;
interface ProposalCardProps {
  proposals: string[] | [];
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
        "/job/createContract",
        body
      );

      if (data.success) {
        const notifications: any = JSON.stringify([
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
        clientId: roleId,
        jobPostId: jobPostId,
      };
      const { data } = await apiClientInstance.put(
        "/job/proposal/reject",
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
          window.location.href = `${config.BASE_URL}/client/jobs/proposals`;
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
      {Object.entries(proposals).map((proposal: any) => (
        <div className="w-2/3 border border-gray-100 shadow-xl rounded-xl h-full mx-auto my-12 p-3">
          <div className="h-16 w-16 ">
            <img
              className="w-12 h-12 rounded-full object-cover"
              src={proposal[1]?.userData?.profilePicture}
              alt="user-profile"
            />
          </div>
          <div className="grid gap-2 px-3 ">
            <div className="grid justify-start mx-10">
              <span className="font-semibold text-lg">
                Job Title: {" _"} {proposal[1]?.jobPostInfo}
              </span>
              <p className="text-sm"> {proposal[1]?.description} </p>
            </div>
            <div className="flex gap-5">
              <span className="font-semibold text-xs">
                Proposal Amount: {" _"} {proposal[1]?.bidAmount}.00₹/hr
              </span>
              <span className="font-semibold text-xs">
                Propposal DeadLine: {" _"} {proposal[1]?.bidDeadline}hrs
              </span>
            </div>
            <div>
              <span className="font-semibold text-xs">
                Propposal Description: {" _"} {proposal[1]?.description}hrs
              </span>
            </div>
          </div>

          <div className="flex justify-end pr-12 gap-3">
            {roleType === "user" && (
              <div>
                <button
                  className="rounded-full border bg-black text-white  border-slate-300  py-2 px-12 text-center text-sm transition-all shadow-sm"
                  type="button"
                >
                  <Link
                    to={`/${roleType}/job/${proposal[1]?.jobPostId}/proposal-view`}
                    className="no-underline text-white font-bold "
                  >
                    View
                  </Link>
                </button>
              </div>
            )}
            {roleType === "client" && (
              <div className="flex gap-3">
                <button
                  className="rounded-full border bg-black text-white  border-slate-300  py-2 px-12 text-center text-sm transition-all shadow-sm"
                  type="button"
                >
                  <Link
                    to={`/${roleType}/userProfile/view/${proposal[1]?.userId}/client-proposal-view`}
                    className="no-underline text-white font-bold "
                  >
                    View
                  </Link>
                </button>

                {proposal[1]?.status === "pending" && (
                  <div>
                    <button
                      onClick={() =>
                        rejectProposal(
                          proposal[1]?.userId,
                          proposal[1]?.clientId
                        )
                      }
                      className="rounded-full mr-2 bg-[#fd2b2b] py-2 px-12 border border-transparent text-center text-sm text-white transition-all shadow-md font-bold hover:bg-slate-700"
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
                      className="rounded-full bg-[#0000ff] py-2 px-12 border border-transparent text-center text-sm text-white transition-all shadow-md font-bold hover:bg-slate-700"
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
