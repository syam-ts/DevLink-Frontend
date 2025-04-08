import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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

const InviteComponent = () => {
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

    return (
        <div className="w-full py-20">
            <section className="text-center">
                <span className="font-bold text-2xl arsenal-sc-regular"> Invites </span>
                <hr />
            </section>
            <section>
                

            <div className="w-full max-w-4xl mx-auto py-6">
  {Object.entries(invites).map((invite, index) => (
    <div key={index} className="mb-6 overflow-hidden bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
      <div className="flex flex-col md:flex-row">
        {/* Left side with color accent */}
        <div className="w-full md:w-2 bg-blue-600"></div>
        
        {/* Content container */}
        <div className="flex flex-col md:flex-row w-full p-5">
          {/* Job information */}
          <div className="flex-1 pr-4">
            <div className="flex items-center mb-2">
              <span className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                {invite[1]?.jobPostData?.expertLevel}
              </span>
            </div>
            
            <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">
              {invite[1]?.jobPostData?.title}
            </h3>
            
            <p className="text-sm text-gray-600 mb-4 line-clamp-2">
              {invite[1]?.description}
            </p>
            
            <div className="flex items-center text-xs text-gray-500">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span>Invited recently</span>
            </div>
          </div>
          
          {/* Action buttons */}
          <div className="flex flex-row md:flex-col justify-center items-center mt-4 md:mt-0 space-x-3 md:space-x-0 md:space-y-3">
            <button
              className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              type="button"
            >
              Reject
            </button>
            
            <Link
              to={`/user/job/${invite[1]?.jobPostData?._id}/invite-view`}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 no-underline text-center md:w-full"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  ))}
</div>
                
            </section>
        </div>
    );
};

export default InviteComponent;
