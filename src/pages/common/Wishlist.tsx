import { toast } from "sonner";
import React, { useEffect, useState } from "react";
import { Sonner } from "../../components/sonner/Toaster";
import { apiUserInstance } from "../../api/axiosInstance/axiosUserInstance";

interface Jobs {
  _id: string
  title: string
  description: string
  expertLevel: string
  location: string
  requiredSkills: string[]
  paymentType: string
  amount: number
  estimateTimeinHours: number
  projectType: string
};

const Wishlist: React.FC = () => {
  const [jobs, setJobs] = useState<Jobs>({
    _id: "",
    title: "",
    description: "",
    expertLevel: "",
    location: "",
    requiredSkills: [""],
    paymentType: "",
    amount: 0,
    estimateTimeinHours: 0,
    projectType: "",
  });
  const [wishlistId, setWishlistId] = useState<string>("");
  const [removeFlag, setRemoveFlag] = useState<boolean>(false);

  useEffect(() => {
    try {
      const fetchJobs = async () => {
        const { data } = await apiUserInstance.get("/wishlist");
        setJobs(data.wishlist.jobPostData);
        setWishlistId(data.wishlist._id);
      }
      fetchJobs();
      setRemoveFlag(false);
    } catch (err) {
      console.log("ERROR: ", err.message);
    }
  }, [removeFlag]);

  const removeFromWishlist = async (wishlistId: string, jobPostId: string) => {
    try {
      const { data } = await apiUserInstance.patch(
        `/removeFromWishlist/${wishlistId}`,
        {
          jobPostId,
        }
      );

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
    } catch (err) {
      console.log("ERROR: ", err.message);
    }
  };


  return (
    <div className="w-full px-4 sm:px-6 md:px-8">
      <Sonner />

      {/* Header Section */}
      <section>
        <div className="flex justify-center pt-12 sm:pt-16 md:pt-20 lg:pt-24">
          <span className="arsenal-sc-regular text-2xl sm:text-3xl">
            Wishlist
          </span>
        </div>
        <hr className="w-4/5 sm:w-2/3 mx-auto mt-2" />
      </section>

      {/* Wishlist Content */}
      {jobs._id != "" ? (
        <div className="mt-8 sm:mt-12 md:mt-16 space-y-6 sm:space-y-8 md:space-y-10">
          {Object.entries(jobs)?.map(([key, job]: [string, Jobs]) => (
            <div
              key={key}
              className="w-full sm:w-11/12 md:w-5/6 lg:w-2/3 transform relative transition duration-500 hover:shadow-xl border-gray-100 shadow-lg rounded-2xl border mx-auto px-5 py-4 sm:p-6 md:p-8 lg:p-12 arsenal-sc-regular"
            >
              <div className="flex flex-col lg:flex-row lg:justify-between gap-6">
                <div className="flex-1">
                  <span className="text-xl sm:text-2xl mb-2 line-clamp-1">
                    {job?.title}
                  </span>
                  <span className="text-sm mb-4 line-clamp-3">
                    {job?.description}
                  </span>

                  <div className="grid gap-1 sm:gap-2 mb-4">
                    <span className="text-sm">{job?.expertLevel}</span>
                    <span className="text-sm">{job?.location}</span>
                  </div>

                  <div className="flex flex-wrap gap-2 my-3">
                    {job?.requiredSkills?.map(
                      (skill: string, index: number) => (
                        <span
                          key={index}
                          className="rounded-full border border-transparent py-1 px-3 sm:px-4 text-center text-xs sm:text-sm text-white bg-[#0000ff]"
                        >
                          {skill}
                        </span>
                      )
                    )}
                  </div>
                </div>

                <div className="flex flex-row lg:flex-col justify-between lg:text-end lg:min-w-40">
                  <div className="grid gap-1">
                    <span className="text-sm">{job?.amount}.00₹</span>
                    <span className="text-sm">{job?.paymentType}</span>
                    <span className="text-sm">
                      {job?.estimateTimeinHours}/hr
                    </span>
                    <span className="text-sm text-green-500">
                      {job?.projectType}
                    </span>
                  </div>

                  <div className="self-end lg:mt-4">
                    <button
                      onClick={() => removeFromWishlist(wishlistId, job?._id)}
                      className="rounded-small bg-black px-4 sm:px-6 py-2 border border-transparent text-center text-xs sm:text-sm text-white shadow-md hover:shadow-lg transition-all hover:bg-gray-800"
                      type="button"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-56 sm:h-64 md:h-80 lg:h-96">
          <p className="arsenal-sc-regular text-xl sm:text-2xl">
            Your Wishlist is Empty
          </p>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
