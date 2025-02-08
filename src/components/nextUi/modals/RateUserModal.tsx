import React, { useState } from "react";
import {
  Modal,
  ModalContent, 
  ModalBody,
  Button,
  useDisclosure,
} from "@heroui/react";
import axios from "axios";

export const RateUserModal = ({ notificationId, userId }: any) => {
  const [rating, setRating]: any = useState(0);
  const [review, setReview]: any = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [size, setSize] = React.useState("2xl");

  const handleOpen = (size: string) => {
    setSize(size);
    onOpen();
  };

  const submitRating = async () => {
    try {
      const body = {
        rating,
        userId,
        review
      };
console.log('the body', body, notificationId)
      const { data } = await axios.post(
        `http://localhost:3000/client/rate/user/${notificationId}`,
        {
          body,
        }
      );
      console.log("THE RESPONSE FROM RATE SUBMIT : ", data);

      if(data.success) {
         window.location.href = `http://localhost:5173/client/home`
      }
    } catch (err: any) {
      console.error("ERROR: ", err.message);
    }
  };


console.log(rating, userId)

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
                      <div className="flex space-x-3">
                        <svg
                          onClick={() => setRating(1)}
                          className={`w-12 h-12 cursor-pointer ${
                            rating === 1 && "text-yellow-500"
                          }`}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <svg
                          onClick={() => setRating(2)}
                          className={`w-12 h-12 cursor-pointer ${
                            rating === 2 && "text-yellow-500"
                          }`}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <svg
                          onClick={() => setRating(3)}
                          className={`w-12 h-12 cursor-pointer ${
                            rating === 3 && "text-yellow-500"
                          }`}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <svg
                          onClick={() => setRating(4)}
                          className={`w-12 h-12 cursor-pointer ${
                            rating === 4 && "text-yellow-500"
                          }`}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <svg
                          onClick={() => setRating(5)}
                          className={`w-12 h-12 cursor-pointer ${
                            rating === 5 && "text-yellow-500"
                          }`}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>
                    </div>
                    {/* <div className="w-3/4 flex flex-col">
                      <textarea className="p-4 border text-gray-500 rounded-xl resize-none">Leave a message, if you want</textarea>
                     </div> */}
                   </div>
                   <div className='my-4 grid'>
                    <span className='font-bold text-lg '>
                       Review
                    </span>
                     <textarea onChange={(e: any) => setReview(e.target.value)} className='border rounded-lg h-44 p-10' placeholder='review goes here'>

                     </textarea>
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
