import { toast } from "sonner";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import config from "../../../config/helper/config";
import { UserState } from "../../../config/state/allState";
import { apiUserInstance } from "../../../api/axiosInstance/axiosUserInstance";
import { projectSubmissionSchema } from "../../../utils/validation/projectSubmitSchema";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";

interface SubmitProjectProps {
  contractId: string | undefined;
  jobTitle: string;
}

interface FormData {
  description: string;
  progress: number;
  attachedFile: string;
}

export const SubmitProject: React.FC<SubmitProjectProps> = ({
  contractId,
  jobTitle,
}) => {

  const [formData, setFormData] = useState<FormData>({
    description: "",
    progress: 0,
    attachedFile: "",
  });
  const [progress, setProgress] = useState<string>("completed");
  const [error, setError] = useState<string[]>([]);
  const [size, setSize] = useState<string>("md");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const userId: string = useSelector((state: UserState) => state.user.currentUser._id);

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleOpen = (size: string) => {
    setSize(size);
    onOpen();
  };

  const handleComplete = () => {
    formData.progress = 100;
  };

  const submitProject = async () => {
    try {
      const validForm = await projectSubmissionSchema.validate(formData, {
        abortEarly: false,
      });

      if (validForm) {
        try {
          const { data } = await apiUserInstance.post(
            `/project/submit/${contractId}`,
            { formData }
          );

          data.success
            ? (window.location.href = `${config.BASE_URL}/user/contracts/user`)
            : toast.error(data.message);
        } catch (err) {
          console.log(err.message);
        }
      }
    } catch (err) {
      setError(err.errors);
    }
  };

  // console.log('ERRORS: ', error);

  return (
    <>
      <div>
        <Button
          className="py-2 px-4 mt-8 bg-[#0000ff] text-white rounded-small shadow-xl"
          key="5xl"
          onPress={() => handleOpen(size)}
        >
          Submit Project
        </Button>
      </div>
      <Modal isOpen={isOpen} size="5xl" backdrop="blur" onClose={onClose}>
        <ModalContent className="belleza-regular px-5 py-2">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col text-xl gap-1 text-center">
                Project Submit: {jobTitle}
              </ModalHeader>
              <ModalBody>
                <label>Description About The Contract</label>
                <textarea
                  onChange={handleOnChange}
                  className="border-1 border-gray-400 rounded-small h-44 p-10 outline-none"
                  name="description"
                  placeholder="Description goes here...."
                />
                {error?.some((err: string) =>
                  err.includes("Description is required")
                )
                  ? error.map((err: string, index: number) => {
                      if (err.includes("Description is required")) {
                        return (
                          <div key={index} className="text-start">
                            <span className="text-red-400 text-sm">{err}</span>
                          </div>
                        );
                      }
                      return null;
                    })
                  : error.map((err: string, index: number) => {
                      if (
                        err.includes("Description is required") ||
                        err.includes(
                          "Description should have atleast 20 - 200 characters"
                        ) ||
                        err.includes("Maximum characters are 200")
                      ) {
                        return (
                          <div key={index} className="text-start">
                            <span className="text-red-400 text-sm">{err}</span>
                          </div>
                        );
                      }
                      return null;
                    })}
                <div className="flex gap-6 mt-7">
                  <label> Progress Of Project: </label>
                  <div className="flex gap-3">
                    <div className="flex items-center  ">
                      <input
                        type="radio"
                        onChange={handleComplete}
                        value="100"
                        onClick={() => setProgress("completed")}
                        name="default-radio"
                        className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 "
                      />
                      <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        completed
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        onClick={() => setProgress("incomplete")}
                        name="default-radio"
                        className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300"
                      />
                      <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        incomplete
                      </label>
                    </div>
                  </div>
                  <div>
                    {progress === "incomplete" ? (
                      <input
                        onChange={handleOnChange}
                        className="border-gray-400 border-1 px-2 py-2 rounded-small outline-none w-12 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                        name="progress"
                        type="number"
                        placeholder="70"
                      />
                    ) : (
                      <div className="w-12"></div>
                    )}
                  </div>

                  <div>
                    <label> Attach Github: </label>
                    <input
                      onChange={handleOnChange}
                      className="border-1 border-gray-400 rounded-small py-2 p-3 outline-none"
                      type="url"
                      name="attachedFile"
                      placeholder="Attach Github link"
                    />
                    {error?.some((err: string) =>
                      err.includes("Attachment required")
                    )
                      ? error.map((err: string, index: number) => {
                          if (err.includes("Attachment required")) {
                            return (
                              <div key={index} className="text-start">
                                <span className="text-red-400 text-sm">
                                  {err}
                                </span>
                              </div>
                            );
                          }
                          return null;
                        })
                      : error.map((err: string, index: number) => {
                          if (
                            err.includes("Attachment required") ||
                            err.includes("Must be at least 10 characters") ||
                            err.includes("Must be under 20 characters")
                          ) {
                            return (
                              <div key={index} className="text-start">
                                <span className="text-red-400 text-sm">
                                  {err}
                                </span>
                              </div>
                            );
                          }
                          return null;
                        })}
                  </div>
                </div>{" "}
                {error?.some((err: string) => err.includes("Progress required"))
                  ? error.map((err: string, index: number) => {
                      if (err.includes("Progress required")) {
                        return (
                          <div key={index} className="text-start">
                            <span className="text-red-400 text-sm">{err}</span>
                          </div>
                        );
                      }
                      return null;
                    })
                  : error.map((err: string, index: number) => {
                      if (
                        err.includes(
                          "Progress reProgress need to be under 100%Progress need to be under 100%uired"
                        ) ||
                        err.includes("Progress should atlest 10%") ||
                        err.includes("Progress need to be under 100%")
                      ) {
                        return (
                          <div key={index} className="text-start">
                            <span className="text-red-400 text-sm">{err}</span>
                          </div>
                        );
                      }
                      return null;
                    })}
              </ModalBody>
              <ModalFooter> 
                <button
                  onClick={onClose}
                  className="py-2 px-4 bg-[#ff0000] text-white rounded-small shadow-xl"
                  key="5xl"
                >
                  Close
                </button>
                <button
                  onClick={submitProject}
                  className="py-2 px-4 bg-[#0000ff] text-white rounded-small shadow-xl"
                  key="5xl"
                >
                  Submit
                </button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
