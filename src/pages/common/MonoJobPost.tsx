import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { Sonner } from "../../components/sonner/Toaster";
import useUserVerified from "../../hooks/userUserVerified";
import { apiClientInstance } from ".././../api/axiosInstance/axiosClientRequest";
import { apiUserInstance } from ".././../api/axiosInstance/axiosUserInstance";
import { JobProposalModal } from "../../components/shadcn/modal/JobProposalModal";

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

  let userVerified;
  if (viewType === "user-view") {
    userVerified = useUserVerified();
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
      bidAmount: jobPost?.amount,
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

  return (
    <>
      <Sonner />
      <div className="h-screen py-44 mx-auto w-2/3 comfortaa-regular">
        <section>
          <span className="text-2xl">{jobPost?.title}</span>
          <div className="flex gap-20 py-4 text-xs">
            <span>Posted {jobPost?.estimateTimeinHours} hours ago</span>
            <div className="flex ">
              <img
                className="w-5 h-5 mx-2"
                src="https://cdn-icons-png.flaticon.com/128/927/927667.png"
              />
              <span>{jobPost?.location}</span>
            </div>
          </div>
        </section>

        {/* Desctipion section */}
        <section className="py-6">
          <span className="text-sm">{jobPost?.description}</span>
        </section>

        <section>
          <div className="py-10 flex flex-wrap w-2/3 gap-x-64 gap-y-20 ">
            <div className="text-xs">
              <div className="flex gap-3 pb-2">
                <img
                  className="w-5 h-5"
                  src="https://cdn-icons-png.flaticon.com/128/5579/5579107.png"
                  alt="price-image"
                />
                <span> ₹{jobPost?.amount}.00 </span>
              </div>
              <span className="px-4"> {jobPost?.paymentType} Price </span>
            </div>

            <div className="text-xs">
              <div className="flex gap-3 pb-2">
                <img
                  className="w-5 h-5"
                  src="https://cdn-icons-png.flaticon.com/128/1491/1491165.png"
                  alt="price-image"
                />
                <span> Estimate Time </span>
              </div>
              <span className="px-4"> {jobPost?.estimateTimeinHours}/hr </span>
            </div>

            <div className="text-xs">
              <div className="flex gap-3 pb-2">
                <img
                  className="w-5 h-5"
                  src="https://cdn-icons-png.flaticon.com/128/1491/1491165.png"
                  alt="price-image"
                />
                <span> Expertise </span>
              </div>
              <span className="px-4"> {jobPost?.expertLevel} </span>
            </div>

            <div className="text-xs">
              <div className="flex gap-3 pb-2">
                <img
                  className="w-5 h-5"
                  src="https://cdn-icons-png.flaticon.com/128/927/927667.png"
                  alt="price-image"
                />
                <span> Location </span>
              </div>
              <span className="px-4"> {jobPost?.location} </span>
            </div>

            <div className="text-xs">
              <div className="flex gap-3 pb-2">
                <img
                  className="w-5 h-5"
                  src="https://cdn-icons-png.flaticon.com/128/5530/5530083.png"
                  alt="price-image"
                />
                <span> {jobPost?.projectType} </span>
              </div>
              <span className="px-4"> Project Type </span>
            </div>

            <div className="text-xs">
              <div className="flex gap-3 pb-2">
                <img
                  className="w-5 h-5"
                  src="https://cdn-icons-png.flaticon.com/128/18510/18510347.png"
                  alt="price-image"
                />
                <span> Teah Stack </span>
              </div>
              <span className="px-4"> {jobPost?.domain || "........."} </span>
            </div>
          </div>
        </section>

        {/* Skills section */}
        <section className="pt-10">
          <span>Skills and Expertise</span>
          <div className="flex gap-4">
            {jobPost?.requiredSkills?.map((skill: string) => (
              <span className="rounded-full border border-transparent my-4 py-2 px-8  text-center text-sm transition-all text-slate-900  bg-slate-300 focus:bg-slate-100 active:bg-slate-100 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                {skill}
              </span>
            ))}
          </div>
          <div className="text-xs mt-3">{jobPost?.keyResponsiblities}</div>
        </section>

        <section className="pt-10">
          <span>Activity on this job</span>
          <div className="text-xs flex gap-10 pt-3">
            <div className="flex gap-3">
              <span>Proposals:</span>
              <img
                className="w-5 h-5"
                src="https://cdn-icons-png.flaticon.com/128/10995/10995709.png"
                alt="question-image"
              />
              <span>{jobPost?.proposalCount} of 10</span>
            </div>
            <div className="flex gap-3">
              <span>Boosted Proposals:</span>
              <img
                className="w-5 h-5"
                src="https://cdn-icons-png.flaticon.com/128/10995/10995709.png"
                alt="question-image"
              />
              <span>3</span>
            </div>
          </div>
        </section>

        {/* About Client */}
        <section className="pt-10">
          <span>About The Client</span>
          <p className="text-xs">Member since may 23 2024</p>
          <div className="flex gap-10 text-xs ">
            <span>{jobPost?.aboutClient?.location}</span>
            <span>₹{jobPost?.aboutClient?.totalSpend}.00 total spend</span>
            <span>{jobPost?.aboutClient?.totalHours} hours</span>
            <span>{jobPost?.aboutClient?.domain}</span>
            <span>
              Large Company({jobPost?.aboutClient?.numberOfEmployees} people)
            </span>
          </div>
          <div className="pt-4">
            <span className="text-sm">
              {jobPost?.aboutClient?.companyName} Inc.
            </span>
          </div>
        </section>

        {/* job apply section */}
        <section className="mt-10">
          <hr />
          <div>
            <p className="text-sm"> Intrested </p>
          </div>
          {userVerified && (
            <div className="flex ">
              <button className="" type="button">
                <JobProposalModal
                  jobPostId={jobPost?._id}
                  formData={formData}
                  setFormData={setFormData}
                  paymentType={jobPost?.paymentType}
                />
              </button>

              <button
                onClick={() => addToWishlist(jobPost?._id)}
                className="rounded-small bg-[#0000ff] py-[.6rem] px-4 font-extrabold border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
                type="button"
              >
                Save for later
              </button>
            </div>
          )}
          {
            viewType === 'invite-view' && (
              <div>
                <button className="" type="button">
                  <JobProposalModal
                    jobPostId={jobPost?._id}
                    formData={formData}
                    setFormData={setFormData}
                    paymentType={jobPost?.paymentType}
                  />
                </button>
              </div>
            )
          }
        </section>

        {/* Similar Jobs */}
        {/* <section className="my-20 ">
          <div>
            <span className="text-2xl">Related Job Posts</span>
          </div>
        </section> */}
      </div>
    </>
  );
};

export default MonoJobPost;
