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
    <div className="container mx-auto px-4 md:px-8 lg:px-12">
      {Object.entries(jobs).map((job: JobsParams[], index: number) => (
        <div
          key={index}
          className="w-full transform relative transition duration-500 hover:scale-105 border-gray-100 shadow-lg hover:shadow-xl rounded-2xl border mx-auto my-6 p-10 md:p-10 arsenal-sc-regular"
        >
          <div className="flex flex-col lg:flex-row justify-between gap-4 md:gap-6">
            <div className="flex-1">
              <h3 className="text-lg md:text-xl lg:text-2xl font-medium">
                {job[1]?.title}
              </h3>
              <p className="text-sm md:text-base mt-2 text-gray-700 line-clamp-3">
                {job[1]?.description}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 text-sm text-gray-600">
                <span>{job[1]?.expertLevel}</span>
                <span>{job[1]?.location}</span>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {job[1]?.requiredSkills?.map((skill: string, i: number) => (
                  <span
                    key={i}
                    className="rounded-full border border-transparent py-1 px-3 text-center text-xs md:text-sm transition-all text-white bg-[#0000ff]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-4 lg:mt-0 flex flex-col lg:items-end">
              <div className="grid grid-cols-3 lg:grid-cols-1 gap-2 text-sm md:text-base">
                <span className="lg:text-right">{job[1]?.amount}.00₹</span>
                <span className="lg:text-right">{job[1]?.paymentType}</span>
                <span className="lg:text-right">
                  {job[1]?.estimateTimeinHours}/hr
                </span>
              </div>
              <span className="text-sm text-green-400 underline mt-1">
                {job[1]?.projectType}
              </span>
              <button
                className="rounded-small transform relative transition duration-500 hover:scale-110 bg-black px-5 py-2 md:px-6 border border-transparent text-center text-sm md:text-base text-white shadow-md hover:shadow-lg mt-3 w-full lg:w-auto"
                type="button"
              >
                <Link
                  to={`/${role}/job/${job[1]?._id}/${type}`}
                  className="no-underline text-white block w-full"
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
