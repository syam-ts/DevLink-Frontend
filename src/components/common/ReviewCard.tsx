import React from "react";

interface Review {
  theReview: string
  rating: number
  companyName: string
};

interface ReviewCardProps {
  review: [Review]
};

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <div className="flex flex-wrap justify-center">
      {review?.map((re: Review) => (
        <div className="p-4 w-[35rem] rounded-small shadow-sm border border-slate-200 m-3">
          <div className="flex justify-between gap-4 text-slate-800">
            <div>
              <p className="text-xs uppercase font-bold text-black mt-0.5">
                {re.companyName}
              </p>
            </div>

            <div className="flex items-center gap-0 ">
              {[...Array(re.rating)].map((_) => (
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-[1.3rem] h-[1.3rem] text-yellow-600"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-2">
            <p className="text-base text-slate-600 font-light leading-normal">
              " {re.theReview} ""
            </p>
          </div>
        </div>
      ))}
    </div>
  )
};

export default ReviewCard;
