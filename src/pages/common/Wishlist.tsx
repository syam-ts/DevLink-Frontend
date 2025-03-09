import React, { useEffect, useState } from "react";
import { apiUserInstance } from "../../api/axiosInstance/axiosUserInstance";
import { toast } from "sonner";
import { Sonner } from "../../components/sonner/Toaster";

const Wishlist: React.FC = () => {
  const [jobs, setJobs] = useState({});
  const [wishlistId, setWishlistId] = useState<string>("");
  const [removeFlag, setRemoveFlag] = useState<boolean>(false);

  useEffect(() => {
    try {
      (async () => {
        const { data } = await apiUserInstance.get("/wishlist");
        setJobs(data.wishlist.jobPostData);
        console.log("twh: ", data.wishlist.jobPostData);
        setWishlistId(data.wishlist._id);
      })();
      setRemoveFlag(false);
    } catch (err: any) {
      console.log("ERROR: ", err.message);
    }
  }, [removeFlag]);

  const removeFromWishlist = async (wishlistId: string, jobPostId: string) => {
    try {
      const { data } = await apiUserInstance.patch("/removeFromWishlist", {
        wishlistId,
        jobPostId,
      });

      if (data.success) {
        setRemoveFlag(true);
        toast.success("Post removed", {
          style: {
            backgroundColor: "#28bd26",
            color: "white",
            width: "12rem",
            height: "2.9rem",
          },
          position: "top-center",
        });
      }
    } catch (err: any) {
      console.log("ERROR: ", err.message);
    }
  };

  return (
    <>
      <Sonner />
      <section>
        <div className="flex justify-center pt-44">
          <span className="arsenal-sc-regular text-3xl "> Wishlist </span>
        </div>
        <hr className="w-2/3 mx-auto" />
      </section>
      {Object.entries(jobs).length != 0 ? (
        <div>
          {Object.entries(jobs)?.map((job: any) => (
            <div className="w-2/3 transform relative transition duration-500 hover:scale-105 border-gray-100 shadow-xl rounded-xl h-[300px] border mx-auto my-20 p-12 arsenal-sc-regular">
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
                  <span className="text-sm">
                    {job[1]?.estimateTimeinHours}/hr
                  </span>
                  <span className="text-sm text-green-400 underline">
                    {job[1]?.projectType}
                  </span>
                  <button
                    onClick={() => removeFromWishlist(wishlistId, job[1]?._id)}
                    className="rounded-small transform relative transition duration-500 hover:scale-110 bg-black px-12 border border-transparent text-center text-sm text-white shadow-md hover:shadow-lg ml-2"
                    type="button"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center my-[15rem]">
          <p className="arsenal-sc-regular text-2xl ">Your Wishlist is Empty</p>
        </div>
      )}
    </>
  );
};

export default Wishlist;
