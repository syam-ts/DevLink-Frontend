import { toast, Toaster } from "sonner";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiUserInstance } from "../../api/axiosInstance/axiosUserInstance";

interface Invite {
  _id: string
  clientId?: String
  userId?: String
  description: String
  jobPostData?: {
    _id: string
    title: string
    description: string
    expertLevel: String
    location: string
    requiredSkills: string[]
    amount: number
    paymentType: String
    estimateTimeinHours: Number
    projectType: String
  }
  status: String
  createdAt: String
};

const InviteComponent: React.FC = () => {
  const [invites, setInvites] = useState<Invite>({
    _id: "",
    clientId: "",
    userId: "",
    description: "",
    jobPostData: {
      _id: "",
      title: "",
      description: "",
      expertLevel: "",
      location: "",
      requiredSkills: [],
      amount: 0,
      paymentType: "",
      estimateTimeinHours: 0,
      projectType: "",
    },
    status: "",
    createdAt: "",
  });

  useEffect(() => {
    try {
      const fetchInvites = async () => {
        const { data } = await apiUserInstance.get(`/invites`);
        setInvites(data.invites);
      };
      fetchInvites();
    } catch (error: unknown) {
      const err = error as { message: string };
      console.log("ERROR: ", err.message);
    }
  }, []);

  const rejectInvite = async (inviteId: string) => {
    try{

      const {data} = await apiUserInstance.patch(`/invite-reject/${inviteId}`);

      console.log('The result: ',data)
      if(data.success) {
        toast.warning('Invite declined successfully', {
          position: "top-center",
          style: {
            backgroundColor: "green",
            color: "white",
            width: "full",
            height: "3rem",
            justifyContent: "center",
            border: "none",
          },
        });
        setTimeout(() => {
          window.location.reload();
        }, 300);
      }
    }catch(err: unknown) {
      console.log(err)
    }
  };

  console.log('invites:',invites)

  return (
    <div className="w-full pt-44">
      <Toaster />
      <section className="text-center">
        <span className="font-bold text-2xl arsenal-sc-regular"> Invites </span>
        <hr />
      </section>
      <section>
       {
        Object.entries(invites).length !== 0 ? (
          <div className="w-full max-w-4xl mx-auto py-8 px-4">
          {Object.entries(invites).map((invite, index) => (
            <div
              key={index}
              className="mb-6 overflow-hidden bg-white rounded-2xl shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300 ease-in-out"
            >
              <div className="p-4">
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1.5 text-xs font-medium bg-blue-50 text-blue-700 rounded-full">
                      {invite[1]?.jobPostData?.expertLevel}
                    </span>
                    <div className="flex items-center text-xs text-gray-500">
                      <svg
                        className="w-4 h-4 mr-1.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                      <span>Invited recently</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
                      {invite[1]?.jobPostData?.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {invite[1]?.description}
                    </p>
                  </div>

                  <div className="flex flex-row justify-end gap-3 pt-2">
                    <button
                    onClick={() => rejectInvite(invite[1]._id)}
                      className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-small hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
                      type="button"
                    >
                      Decline
                    </button>

                    <Link
                      to={`/user/job/${invite[1]?.jobPostData?._id}/invite-view`}
                      className="px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-small hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 no-underline text-center flex items-center justify-center"
                    >
                      View Details
                      <svg
                        className="w-4 h-4 ml-1.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        ></path>
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        ) : (
          <div className='flex justify-center pt-44'> 
            <p className='arsenal-sc-regular'>No invites Found </p>
          </div>
        )
       }
      </section>
    </div>
  );
};

export default InviteComponent;
