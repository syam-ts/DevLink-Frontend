import { Link } from "react-router-dom";

interface Jobs {
  jobs: {
    _id: string
    title: string
    description: string
    expertLevel: string
    location: string
    amount: number
    paymentType: string
    estimateTimeinHours: string
    projectType: string
  }
};

interface JobsParams {
  _id: string
  title: string
  description: string
  expertLevel: string
  location: string
  requiredSkills: string[]
  amount: number
  paymentType: string
  estimateTimeinHours: string
  projectType: string
};

export const JobPostCard = ({
  jobs,
  role,
  type,
}: {
  jobs: Jobs;
  role: string;
  type: string;
}) => {
  return (
    <div className="px-12">
      {Object.entries(jobs).map((job: JobsParams[], index: number) => (
        <div
          key={index}
          className="w-full max-sm:w-[1450px] sm:w-[1400px] lg:w-[1450px] transform relative transition duration-500 hover:scale-105 border-gray-100 shadow-2xl hover:shadow-slate-300 rounded-xl h-auto sm:h-[300px] border mx-auto my-10 sm:my-16 p-6 sm:p-12 arsenal-sc-regular"
        >
          <div className="flex flex-col sm:flex-row justify-between gap-6">
            {/* Left Side (Job Details) */}
            <div className="grid">
              <span className="text-lg sm:text-2xl text-start">
                {job[1]?.title}
              </span>
              <span className="text-sm mt-2">{job[1]?.description}</span>
              <div className="grid justify-start gap-3 mt-3">
                <span className="text-sm">{job[1]?.expertLevel}</span>
                <span className="text-sm">{job[1]?.location}</span>
              </div>
              <div className="flex flex-wrap gap-3">
                {job[1]?.requiredSkills?.map((skill: string, i: number) => (
                  <span
                    key={i}
                    className="rounded-full border border-transparent my-2 py-1.5 px-4 sm:px-8 text-center text-xs sm:text-sm transition-all text-white bg-[#0000ff]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Side (Pricing & Actions) */}
            <div className="grid text-start sm:text-end py-3">
              <span className="text-sm sm:text-base">{job[1]?.amount}.00₹</span>
              <span className="text-sm sm:text-base">
                {job[1]?.paymentType}
              </span>
              <span className="text-sm sm:text-base">
                {job[1]?.estimateTimeinHours}/hr
              </span>
              <span className="text-sm text-green-400 underline">
                {job[1]?.projectType}
              </span>
              <button
                className="rounded-small transform relative transition duration-500 hover:scale-110 bg-black px-6 sm:px-12 border border-transparent text-center text-sm sm:text-base text-white shadow-md hover:shadow-lg mt-3 sm:mt-5"
                type="button"
              >
                <Link
                  to={`/${role}/job/${job[1]?._id}/${type}`}
                  className="no-underline text-white"
                >
                  View
                </Link>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
