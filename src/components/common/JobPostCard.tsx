import { Link } from "react-router-dom";

interface Jobs {
  jobs: {
    _id: string;
    title: string;
    description: string;
    expertLevel: string;
    location: string;
    amount: number;
    paymentType: string;
    estimateTimeinHours: string;
    projectType: string;
  };
}

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
    <div>
      {Object.entries(jobs).map((job: any) => (
        <div className="w-2/3 transform relative transition duration-500 hover:scale-105 border-gray-100 shadow-2xl hover:shadow-slate-300 rounded-xl h-[300px] border mx-auto my-20 p-12 arsenal-sc-regular">
          <div className="flex justify-between ">
            <div className="grid">
              <span className="text-2xl text-start">{job[1]?.title}</span>
              <span className="text-sm mt-2">{job[1]?.description}</span>
              <div className="grid justify-start gap-3 mt-3">
                <span className="text-sm">{job[1]?.expertLevel}</span>
                <span className="text-sm">{job[1]?.location}</span>
              </div>
              <span className="flex gap-3">
                {job[1]?.requiredSkills?.map((skill: string) => (
                  <span className="rounded-full border border-transparent my-4 py-1.5 px-8  text-center text-sm transition-all text-white bg-[#0000ff] focus:bg-slate-100 active:bg-slate-100 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                    {skill}
                  </span>
                ))}
              </span>
            </div>

            <div className="grid text-end py-3">
              <span className="text-sm">{job[1]?.amount}.00₹</span>
              <span className="text-sm">{job[1]?.paymentType}</span>
              <span className="text-sm">{job[1]?.estimateTimeinHours}/hr</span>
              <span className="text-sm text-green-400 underline">
                {job[1]?.projectType}
              </span>
              <button
                className="rounded-small transform relative transition duration-500 hover:scale-110 bg-black px-12 border border-transparent text-center text-sm text-white shadow-md hover:shadow-lg ml-2"
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
