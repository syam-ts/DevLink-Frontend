import { useEffect, useState } from "react";
import { apiUserInstance } from "../../api/axiosInstance/axiosUserInstance";



const Wishlist = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    try {
      (async () => {
        const { data } = await apiUserInstance.get("/wishlist-view");
        setJobs(data.wishlist[0].jobPostData);
      })();
    } catch (err: any) {
      console.log("ERROR: ", err.message);
    }
  }, []); 

  const removeWishlistjob = async() => {
    try{

    }catch(err: any) {
      console.log('ERROR: ',err.message);
    }
  }

  return (
    <>
    <section>
      <div className='flex justify-center my-10'>
      <span className='arsenal-sc-regular text-3xl '> Wishlist </span>
      </div>
      <hr className='w-2/3 mx-auto' />
    </section>
      {jobs?.map((job: any) => (
        <div className="w-2/3 border-gray-100 shadow-xl rounded-xl h-[300px] border mx-auto my-20 p-12 arsenal-sc-regular">
          <div className="flex justify-between ">
            <div className="grid">
              <span className="text-2xl text-start">{job?.title}</span>
              <span className="text-sm mt-2">{job?.description}</span>
              <div className="grid justify-start gap-3 mt-3">
                <span className="text-sm">{job?.expertLevel}</span>
                <span className="text-sm">{job?.location}</span>
              </div>
              <span className="flex gap-3">
                {job?.requiredSkills?.map((skill: string) => (
                  <span className="rounded-full border border-transparent my-4 py-1.5 px-8  text-center text-sm transition-all text-white bg-[#0000ff] focus:bg-slate-100 active:bg-slate-100 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                    {skill}
                  </span>
                ))}
              </span>
            </div>

            <div className="grid text-end py-3">
              <span className="text-sm">{job?.amount}.00₹</span>
              <span className="text-sm">{job?.paymentType}</span>
              <span className="text-sm">{job?.estimateTimeinHours}/hr</span>
              <span className="text-sm text-green-400 underline">
                {job?.projectType}
              </span>
              <button
                className="rounded-md bg-black px-12 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
                type="button"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Wishlist;
