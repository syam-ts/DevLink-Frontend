import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  Button,
  useDisclosure,
} from "@heroui/react";
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
    <>
      <div className="flex flex-wrap gap-3">
        <Button
          className="flex-no-shrink bg-yellow-600 px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 text-white rounded-full"
          key={size}
          onPress={() => handleOpen(size)}
        >
          Rate User
        </Button>
      </div>
      <Modal isOpen={isOpen} size={"5xl"} backdrop="blur" onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <div className="h-full flex flex-col justify-center arsenal-sc-regular">
                  <div className="flex flex-col items-center">
                    <div className="flex flex-col items-center py-6 space-y-3">
                      <span className="text-2xl text-black font-bold">
                        How was the user performance?
                      </span>

                      <section>
                        <Box sx={{ "& > legend": { mt: 2 } }}>
                          <Rating
                            name="simple-controlled"
                            value={value}
                            onChange={(event, newValue) => {
                              setValue(newValue);
                            }}
                            sx={{ fontSize: "2.3rem" }}
                          />
                        </Box>
                      </section>
                    </div>
                  </div>
                  <div className="text-center">
                    <span className="font-bold text-2xl text-center">Review</span>
                    <section> 
                        <div className="relative w-full mt-3 p-10">
                          <textarea
                            className="peer p-5 h-full min-h-[200px] w-full resize-none rounded-2xl border border-black  font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0"
                            placeholder="Your review goes here...."
                          ></textarea>
                    
                        </div> 
                    </section>
                  </div>
                  
                  <button
                    onClick={submitRating}
                    className="py-3 mb-6 w-1/3 mx-auto text-lg bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl text-white"
                  >
                    Rate now
                  </button>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
