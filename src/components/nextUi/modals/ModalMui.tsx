import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  Button,
  useDisclosure,
} from "@heroui/react";
import axios from "axios";

interface RateUserProps {
  notificationId: string;
  userId: string;
}

export const ModalMui: React.FC<RateUserProps> = ({
  notificationId,
  userId,
}) => {
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
      <Modal isOpen={isOpen} size={"xl"} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <div className="h-full flex flex-col justify-center ">
                  <div className="   flex flex-col items-center">
                    <div className="flex flex-col items-center py-6 space-y-3">
                      <span className="text-lg text-gray-800">
                        How was the user performance?
                      </span>
               
                    </div>
                    {/* <div className="w-3/4 flex flex-col">
                      <textarea className="p-4 border text-gray-500 rounded-xl resize-none">Leave a message, if you want</textarea>
                     </div> */}
                  </div>
                  <div className="my-4 grid">
                    <span className="font-bold text-lg ">Review</span>
                  
                  </div>
                  <button
                    onClick={submitRating}
                    className="py-3 my-8 w-full mx-auto text-lg bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl text-white"
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