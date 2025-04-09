import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { Sonner } from "../../components/sonner/Toaster";
import useUserVerified from "../../hooks/userUserVerified";
import { apiClientInstance } from ".././../api/axiosInstance/axiosClientRequest";
import { apiUserInstance } from ".././../api/axiosInstance/axiosUserInstance";
import { JobProposalModal } from "../../components/shadcn/modal/JobProposalModal";
import config from "../../config/helper/config";
import { useSelector } from "react-redux";
import { UserState } from "../../config/state/allState";

type Id = string;

interface JobPost {
  _id: Id;
  title: string;
  amount: number;
  clientId: Id;
  estimateTime: string;
  description: string;
  estimateTimeinHours: number;
  keyResponsiblities: string[];
  requiredSkills: string[];
  location: string;
  domain: string;
  expertLevel: string;
  maxProposals: number;
  proposalCount: number;
  projectType: string;
  paymentType: string;
  isPayment: boolean;
  status: string;
  createdAt: string;
  aboutClient: {
    location: string;
    totalSpend: number;
    totalHours: number;
    domain: string;
    numberOfEmployees: number;
    companyName: string;
  };
}

interface FormData {
  bidAmount: number;
  bidDeadline: number;
  description: string;
  paymentType: string;
}

const MonoJobPost = () => {

  const [jobPost, setJobPost] = useState<JobPost>({
    _id: "",
    title: "",
    amount: 0,
    clientId: "",
    estimateTime: "",
    description: "",
    estimateTimeinHours: 0,
    keyResponsiblities: [],
    requiredSkills: [],
    location: "",
    domain: "",
    expertLevel: "",
    maxProposals: 0,
    proposalCount: 0,
    projectType: "",
    paymentType: "",
    isPayment: false,
    status: "",
    createdAt: "",
    aboutClient: {
      location: "",
      totalSpend: 0,
      totalHours: 0,
      domain: "",
      numberOfEmployees: 0,
      companyName: "",
    },
  });

  const [formData, setFormData] = useState<FormData>({
    bidAmount: 0,
    bidDeadline: 0,
    description: "",
    paymentType: "",
  });
  const { jobPostId, viewType } = useParams<{
    jobPostId: Id,
    viewType: 'user-view' | 'client-view' | 'proposal-view' | 'invite-view'
  }>();
  const navigate = useNavigate();

  let userVerified, userId;
  if (viewType === "user-view") {
    userVerified = useUserVerified();
    userId = useSelector((state: UserState) => state.user.currentUser._id);
  };

  useEffect(() => {
    try {
      (async () => {
        let response;
        if (viewType === 'user-view' || viewType === 'proposal-view' || viewType === 'invite-view') {
          response = await apiUserInstance.get(`/job/${jobPostId}`);
          setJobPost(response?.data?.jobPost);



        } else if (viewType === 'client-view') {
          response = await apiClientInstance.get(`/job/${jobPostId}`);
          setJobPost(response?.data?.jobPost);
        }
      })();
    } catch (error: unknown) {
      const err = error as { message: string }
      toast.error(err.message);
    }
  }, []);


  useEffect(() => {
    setFormData({
      bidAmount: Math.floor(jobPost.amount / jobPost.estimateTimeinHours),
      bidDeadline: jobPost?.estimateTimeinHours,
      description: "",
      paymentType: jobPost?.paymentType,
    });
  }, [jobPost]);

  const addToWishlist = async (jobPostId: Id) => {
    try {
      const { data } = await apiUserInstance.post("/addToWishlist", {
        jobPostId,
      });

      if (!data.success) {
        toast.error(data.message);
      } else {
        toast.success("Post added to wishlist", {
          style: {
            backgroundColor: "#28bd26",
            color: "white",
            width: "12rem",
            height: "2.9rem",
          },
          position: "top-center",
        });
      }
    } catch (error: unknown) {
      const err = error as { response: { data: { message?: string } } }
      toast.error(err.response.data.message, {
        style: {
          backgroundColor: "yellow",
          color: "Black",
          width: "12rem",
          height: "2.9rem",
        },
        position: "top-center",
      });
    }
  };

  const fetchChatMessages = async (
    roleType: string,
    roleId: string,
    targetId: string
  ) => {
    const { data } = await apiUserInstance.get(
      `${config.VITE_SERVER_URL}/${roleType}/chat/view/${roleType}/${roleId}/${targetId}`,
      {
        withCredentials: true,
      }
    );
    if (data.success) {
      navigate(`/user/allChats/user/${userId}?targetId=${targetId}`);
    }
  };

  return (
    <div className='pt-20 arsenal-sc-regular'>
      <Sonner />
      <div className="w-full px-4 md:w-2/3 md:mx-auto py-6 md:py-12 lg:py-16 comfortaa-regular">
  {/* Job Title and Overview */}
  <section>
    <h1 className="text-xl md:text-2xl font-medium line-clamp-1">{jobPost?.title}</h1>
    <div className="flex flex-col sm:flex-row sm:gap-8 py-3 text-xs">
      <span className="mb-2 sm:mb-0">Posted {jobPost?.estimateTimeinHours} hours ago</span>
      <div className="flex items-center">
        <img
          className="w-4 h-4 mr-2"
          src="https://cdn-icons-png.flaticon.com/128/927/927667.png"
          alt="location"
        />
        <span>{jobPost?.location}</span>
      </div>
    </div>
  </section>

  {/* Description section */}
  <section className="py-4 md:py-6">
    <p className="text-sm ">{jobPost?.description}</p>
  </section>

  {/* Job Details Grid */}
  <section className="py-6 md:py-10">
    <div className="max-md:flex max-md:flex-wrap max-lg:flex max-lg:flex-wrap grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
      {/* Payment */}
      <div className="text-xs">
        <div className="flex items-center gap-2 pb-2">
          <img
            className="w-4 h-4"
            src="https://cdn-icons-png.flaticon.com/128/5579/5579107.png"
            alt="price"
          />
          <span>₹{jobPost?.amount}.00</span>
        </div>
        <span className="pl-6">{jobPost?.paymentType} Price</span>
      </div>

      {/* Estimated Time */}
      <div className="text-xs">
        <div className="flex items-center gap-2 pb-2">
          <img
            className="w-4 h-4"
            src="https://cdn-icons-png.flaticon.com/128/1491/1491165.png"
            alt="time"
          />
          <span>Estimate Time</span>
        </div>
        <span className="pl-6">{jobPost?.estimateTimeinHours}/hr</span>
      </div>

      {/* Expertise */}
      <div className="text-xs">
        <div className="flex items-center gap-2 pb-2">
          <img
            className="w-4 h-4"
            src="https://cdn-icons-png.flaticon.com/128/1491/1491165.png"
            alt="expertise"
          />
          <span>Expertise</span>
        </div>
        <span className="pl-6">{jobPost?.expertLevel}</span>
      </div>

      {/* Location */}
      <div className="text-xs">
        <div className="flex items-center gap-2 pb-2">
          <img
            className="w-4 h-4"
            src="https://cdn-icons-png.flaticon.com/128/927/927667.png"
            alt="location"
          />
          <span>Location</span>
        </div>
        <span className="pl-6">{jobPost?.location}</span>
      </div>

      {/* Project Type */}
      <div className="text-xs">
        <div className="flex items-center gap-2 pb-2">
          <img
            className="w-4 h-4"
            src="https://cdn-icons-png.flaticon.com/128/5530/5530083.png"
            alt="project-type"
          />
          <span>{jobPost?.projectType}</span>
        </div>
        <span className="pl-6">Project Type</span>
      </div>

      {/* Tech Stack */}
      <div className="text-xs">
        <div className="flex items-center gap-2 pb-2">
          <img
            className="w-4 h-4"
            src="https://cdn-icons-png.flaticon.com/128/18510/18510347.png"
            alt="tech-stack"
          />
          <span>Tech Stack</span>
        </div>
        <span className="pl-6">{jobPost?.domain || "........."}</span>
      </div>
    </div>
  </section>

  {/* Skills section */}
  <section className="pt-6 md:pt-10">
    <h2 className="text-base md:text-lg font-medium mb-2">Skills and Expertise</h2>
    <div className="flex flex-wrap gap-2 md:gap-4">
      {jobPost?.requiredSkills?.map((skill: string) => (
        <span className="rounded-full border border-transparent my-2 py-1 px-4 text-center text-xs md:text-sm text-slate-900 bg-slate-300">
          {skill}
        </span>
      ))}
    </div>
    <div className="text-xs mt-3">{jobPost?.keyResponsiblities}</div>
  </section>

  {/* Activity section */}
  <section className="pt-6 md:pt-10">
    <h2 className="text-base md:text-lg font-medium mb-2">Activity on this job</h2>
    <div className="text-xs flex flex-col sm:flex-row sm:gap-10 pt-2">
      <div className="flex items-center gap-2 mb-2 sm:mb-0">
        <span>Proposals:</span>
        <img
          className="w-4 h-4"
          src="https://cdn-icons-png.flaticon.com/128/10995/10995709.png"
          alt="proposals"
        />
        <span>{jobPost?.proposalCount} of 10</span>
      </div>
      <div className="flex items-center gap-2">
        <span>Boosted Proposals:</span>
        <img
          className="w-4 h-4"
          src="https://cdn-icons-png.flaticon.com/128/10995/10995709.png"
          alt="boosted"
        />
        <span>3</span>
      </div>
    </div>
  </section>

  {/* About Client */}
  <section className="pt-6 md:pt-10">
    <h2 className="text-base md:text-lg font-medium mb-1">About The Client</h2>
    <p className="text-xs mb-2">Member since May 23, 2024</p>
    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs">
      <span>{jobPost?.aboutClient?.location}</span>
      <span>₹{jobPost?.aboutClient?.totalSpend}.00 total spend</span>
      <span>{jobPost?.aboutClient?.totalHours} hours</span>
      <span>{jobPost?.aboutClient?.domain}</span>
      <span>Large Company ({jobPost?.aboutClient?.numberOfEmployees} people)</span>
    </div>
    <div className="pt-4 flex flex-wrap items-center gap-3">
      <span className="text-sm font-medium">{jobPost?.aboutClient?.companyName} Inc.</span>
      <button
        onClick={() => fetchChatMessages("user", userId, jobPost.clientId)}
        className="bg-[#2ffe2b] py-1 px-3 text-gray-700 rounded-small text-xs sm:text-sm font-bold shadow-lg"
      >
        Chat
      </button>
    </div>
  </section>

  {/* Job apply section */}
  <section className="mt-8 md:mt-10">
    <hr className="mb-4" />
    <p className="text-sm font-medium mb-3">Interested</p>
    
    {userVerified && (
      <div className="flex flex-wrap gap-2">
        <button className="w-full sm:w-auto" type="button">
          <JobProposalModal
            jobPostId={jobPost?._id}
            formData={formData}
            setFormData={setFormData}
            paymentType={jobPost?.paymentType}
            viewType=""
          />
        </button>

        <button
          onClick={() => addToWishlist(jobPost?._id)}
          className="w-full sm:w-auto rounded-small bg-[#0000ff] py-2 px-4 font-bold border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-blue-700 focus:shadow-none active:bg-blue-700 active:shadow-none"
          type="button"
        >
          Save for later
        </button>
      </div>
    )}
    
    {viewType === 'invite-view' && (
      <div>
        <button className="w-full sm:w-auto" type="button">
          <JobProposalModal
            jobPostId={jobPost?._id}
            formData={formData}
            setFormData={setFormData}
            paymentType={jobPost?.paymentType}
            viewType=""
          />
        </button>
      </div>
    )}
  </section>
</div>
    </div>
  );
};

export default MonoJobPost;
