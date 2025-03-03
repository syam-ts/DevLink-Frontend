import { Button } from "../../../components/shadcn/ui/button.tsx";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { Input } from "../../../components/shadcn/ui/input.tsx";
import { Label } from "../../../components/ui/label.tsx";
import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import { toast } from "sonner";
import { addNotification } from "../../../redux/slices/userSlice.ts";
import { Sonner } from "../../../components/sonner/Toaster.tsx";
import { apiUserInstance } from "../../../api/axiosInstance/axiosUserInstance.ts";
import { proposalSchema } from "../../../utils/validation/proposalValidaiton.ts";

interface FormData {
  bidAmount: number;
  bidDeadline: number;
  description: string;
  paymentType: string;
}

interface ProposalModalProps {
  jobPostId: string;
  formData: FormData;
  setFormData: any;
  paymentType: string;
}

export const JobProposalModal: React.FC<ProposalModalProps> = ({
  jobPostId,
  formData,
  setFormData,
  paymentType,
}) => {
  const [isAgreedTerms, setiSAgreedTerms] = useState<boolean>(false);
  const [error, setError] = useState<string[]>([]);
  const dispatch = useDispatch();

  const userId: string = useSelector(
    (state: any) => state?.user?.currentUser?._id
  );

  const handleOnChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData: FormData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submitProposal = async () => {
    try {
      const validForm = await proposalSchema.validate(formData, {
        abortEarly: false,
      });
      if (validForm) {
        try {
          const body = {
            userId,
            jobPostId,
            description: formData.description,
            bidAmount: formData.bidAmount,
            bidDeadline: formData.bidDeadline,
          };

          const { data } = await apiUserInstance.post(
            "/createProposal",
            {
              body,
            }
          );
         

          if (!data.success) { 
            toast.error(data.message, {
              style: {
                backgroundColor: "yellow",
                color: "black",
              },
            });
          } else {
            const notifications: any = JSON.stringify([
              data?.data?.notification,
            ]);
            dispatch(addNotification(notifications));
            toast.success("Proposal successfully sended");

            setTimeout(() => {
              window.location.href = `http://localhost:5173/user/proposals`;
            }, 500);
          }
        } catch (err: any) { 
          toast.error(err.response.data.message, {
            style: {
              backgroundColor: "#f5e905",
              color: "black",
              border: "none",
              width: "14rem",
              height: "3rem",
            },
            position: "top-center"
          });
        }
      }
    } catch (err: any) {
      console.log("ERROR: ", err);
      setError(err.errors);
      toast.error(err.message.response.data.message);
    }
  };

  return (
    <Dialog >
      <Sonner />
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-[#0000ff] text-white hover:bg-gray-400 rounded-full px-5 py-4"
        >
          Apply
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[900px] sm:min-h-[400px] arsenal-sc-regular bg-white">
        <DialogHeader>
          <DialogDescription>Draft Job Proposal</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right text-sm">Bid Amount</Label>
            <Input
              onChange={handleOnChange}
              name="bidAmount"
              value={formData.bidAmount}
              className="col-span-3"
            />
          </div>

          {paymentType === "hourly" ? (
            <div>
              {error.some((err: any) => err.includes("Bid Amount is required"))
                ? error
                    .filter((err: any) =>
                      err.includes("Bid Amount is required")
                    )
                    .map((err: any, index: number) => (
                      <div key={index} className="text-center">
                        <span className="text-red-400 text-sm">{err}</span>
                      </div>
                    ))
                : error
                    .filter((err: any) =>
                      [
                        "Bid Amount must be at least 100rs",
                        "Bid Amount must be at most 1500rs",
                      ].some((msg) => err.includes(msg))
                    )
                    .map((err: any, index: number) => (
                      <div key={index} className="text-center">
                        <span className="text-red-400 text-sm">{err}</span>
                      </div>
                    ))}
            </div>
          ) : (
            <div>
              {error.some((err: any) => err.includes("Bid Amount is required"))
                ? error
                    .filter((err: any) =>
                      err.includes("Bid Amount is required")
                    )
                    .map((err: any, index: number) => (
                      <div key={index} className="text-center">
                        <span className="text-red-400 text-sm">{err}</span>
                      </div>
                    ))
                : error
                    .filter((err: any) =>
                      [
                        "Bid Amount must be at least 2000rs",
                        "Bid Amount must be at most 70000rs",
                      ].some((msg) => err.includes(msg))
                    )
                    .map((err: any, index: number) => (
                      <div key={index} className="text-center">
                        <span className="text-red-400 text-sm">{err}</span>
                      </div>
                    ))}
            </div>
          )}

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right text-sm">Bid Deadline</Label>
            <Input
              onChange={handleOnChange}
              name="bidDeadline"
              value={formData.bidDeadline}
              className="col-span-3"
            />
          </div>

          {paymentType === "hourly" ? (
            <div>
              {error.some((err: any) =>
                err.includes("Estimate time is required")
              )
                ? error
                    .filter((err: any) =>
                      err.includes("Estimate time is required")
                    )
                    .map((err: any, index: number) => (
                      <div key={index} className="text-center">
                        <span className="text-red-400 text-sm">{err}</span>
                      </div>
                    ))
                : error
                    .filter((err: any) =>
                      [
                        "Estimate deadline must be at least 5hr",
                        "Estimate deadline must be at most 48hrs",
                      ].some((msg) => err.includes(msg))
                    )
                    .map((err: any, index: number) => (
                      <div key={index} className="text-center">
                        <span className="text-red-400 text-sm">{err}</span>
                      </div>
                    ))}
            </div>
          ) : (
            <div>
              {error.some((err: any) =>
                err.includes("Bid Deadline is required")
              )
                ? error
                    .filter((err: any) =>
                      err.includes("Bid Deadline is required")
                    )
                    .map((err: any, index: number) => (
                      <div key={index} className="text-center">
                        <span className="text-red-400 text-sm">{err}</span>
                      </div>
                    ))
                : error
                    .filter((err: any) =>
                      [
                        "Estimate deadline must be at least 10hr",
                        "Estimate deadline must be at most 120hrs",
                      ].some((msg) => err.includes(msg))
                    )
                    .map((err: any, index: number) => (
                      <div key={index} className="text-center">
                        <span className="text-red-400 text-sm">{err}</span>
                      </div>
                    ))}
            </div>
          )}

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right text-sm">Description</Label>
            <Input
              onChange={handleOnChange}
              name="description"
              value={formData.description}
              className="col-span-3 h-44"
            />
          </div>

          {error?.some((err: any) => err.includes("Description is required"))
            ? error.map((err: any, index: number) => {
                if (err.includes("Description is required")) {
                  return (
                    <div key={index} className="text-center">
                      <span className="text-red-400 text-sm">{err}</span>
                    </div>
                  );
                }
                return null;
              })
            : error.map((err: any, index: number) => {
                if (
                  err.includes("Description is required") ||
                  err.includes(
                    "Description should have atleast 20 200 characters"
                  ) ||
                  err.includes("Maximum characters are 200")
                ) {
                  return (
                    <div key={index} className="text-center">
                      <span className="text-red-400 text-sm">{err}</span>
                    </div>
                  );
                }
                return null;
              })}

          <div className="flex gap-3">
            <input
              type="checkbox"
              onClick={() => setiSAgreedTerms((prev) => !prev)}
              className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded-sm "
            />
            <span className="text-xs ">
              {" "}
              I agree with the terms and conditions that, You are requesting for
              a jobpost proposal which cannot be cancelled later. if you aggreed
              on the condition click submit
            </span>
          </div>
        </div>
        <DialogFooter>
          {!isAgreedTerms ? (
            <Button
              type="submit"
              className="bg-gray-300 px-9 hover:bg-gray-300"
            >
              <img
                className="w-5 h-5 "
                src="https://cdn-icons-png.flaticon.com/128/2500/2500762.png"
              />
            </Button>
          ) : (
            <Button onClick={submitProposal} className="bg-[#0000ff] px-4 py-2">
              Submit
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
