import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../../ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import React, { useState } from "react";
import { Modal, ModalContent, ModalBody, useDisclosure } from "@heroui/react";
import axios from "axios";

import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";

interface RateUserProps {
  notificationId: string;
  userId: string;
}

export const RateUserModal: React.FC<RateUserProps> = ({
  notificationId,
  userId,
}) => {
  const [value, setValue] = React.useState<number | null>(2);
  const [rating, setRating] = useState<number | null>(0);
  const [review, setReview] = useState<string>("");
  const [size, setSize] = useState<string>("2xl");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleOpen = (size: string) => {
    setSize(size);
    onOpen();
  };

  const submitRating = async () => {
    try {
      const body = {
        rating,
        userId,
        review,
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
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
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
                className="peer p-3 h-full min-h-[150px] w-full rounded-2xl border-2 border-gray-400  text-sm  "
                placeholder="Your review goes here...."
              ></textarea>
            </div>
          </section>

          <section className="w-full text-center">
            <button
              onClick={submitRating}
              className="py-2 mb-6 w-1/4 mx-auto text-lg bg-[#0000ff] font-bold  rounded-xl text-white"
            >
              Rate now
            </button>
          </section>
        </div>
      </SheetContent>
    </Sheet>
  );
};
