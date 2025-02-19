import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import React, { useState } from "react";
import { useDisclosure } from "@heroui/react";
import axios from "axios";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";

interface RateUserProps {
  notificationId: string;
  userId: string;
}

interface FormData {
  rating: number;
  review: string | null;
}

export const RateUserModal: React.FC<RateUserProps> = ({
  notificationId,
  userId,
}) => {
  const [formData, setFormData] = useState<FormData>({
    rating: 0,
    review: null,
  });


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value }: { name: string; value: string | number } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  console.log("The form data: ", formData);

  const submitRating = async () => {
    try {
      const body = {
       
        userId,
       
      };
      console.log("the body", body, notificationId);
      const { data } = await axios.post(
        `http://localhost:3000/client/rate/user/${notificationId}`,
        {
          body,
        }
      );
      console.log("THE RESPONSE FROM RATE SUBMIT : ", data);

      if (data.success) {
        //   window.location.href = `http://localhost:5173/client/home`
      }
    } catch (err: any) {
      console.error("ERROR: ", err.message);
    }
  };


  console.log('The rating: ', formData.rating, 'The review: ', formData.review)


  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="outline">Rate User</Button>
      </SheetTrigger>

      <SheetContent className="sheet-content">
        <div className="h-full flex flex-col justify-center nunito-regular font-bold">
          <section className="w-full text-center">
            <span className="text-md text-black text">
              How was the user performance?
            </span>
          </section>

          <section className="mt-5 mx-auto ">
            <span className="text-center mx-12 ">Rate</span>
          </section>
          <hr />

          <section className="mt-3 mx-auto">
            <Box sx={{ "& > legend": { mt: 2 } }}>
              <Rating
                name="rating"
                onChange={(e: any) => handleChange(e)}
                sx={{ fontSize: "1.5rem" }}
              />
            </Box>
          </section>

          <section className="mt-5 mx-auto ">
            <span className="text-center mx-12 ">Review</span>
          </section>
          <hr />

          <section>
            <div className=" w-full p-10">
              <textarea
                onChange={handleChange}
                name="review"
                className="peer p-5 h-full min-h-[300px] w-full rounded-2xl border-2 border-gray-400  text-sm  outline-none"
                placeholder="Your review goes here...."
              ></textarea>
            </div>
          </section>

          <section className="w-full text-center">
          {
            formData.review && formData.rating !== 0 && (
              <button
              onClick={submitRating}
              className="py-1.5 mb-6 w-1/4 mx-auto text-md bg-[#0000ff] font-thin  rounded-xl text-white"
            >
              Rate User
            </button>
            )
          }
          </section>
        </div>
      </SheetContent>
    </Sheet>
  );
};
