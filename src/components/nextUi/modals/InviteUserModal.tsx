import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import config from "../../../helper/config";
import { Sonner } from "../../../components/sonner/Toaster";
import { apiClientInstance } from "../../../api/axiosInstance/axiosClientRequest";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";

interface InviteModalProps {
  userId: string;
}

export const InviteModal: React.FC<InviteModalProps> = ({ userId }) => {
  const [jobs, setJobs] = useState({});
  const [selectJobId, setSelectJobId] = useState<string>("");
  const [description, setDescripton] = useState<string>("");
  const [size, setSize] = useState<string>("4xl");
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    try {
      const fetchJobTitle = async () => {
        const { data } = await apiClientInstance.get("/inviteJobsList");
        setJobs(data.response);
      };
      fetchJobTitle();
    } catch (error: unknown) {
      const err = error as { message: string };
      console.log("ERROR: ", err);
    }
  }, []);

  const handleOpen = (size: string) => {
    setSize(size);
    onOpen();
  };



  const inviteUser = async () => {
    try {
      const { data } = await apiClientInstance.post("/inviteUser", {
        userId,
        selectJobId,
        description,
      });

      console.log("The resposnse from inviteUser: ", data.success);
      if (data.success) {
        toast.success("invite send successfully", {
          position: "top-center",
          style: {
            backgroundColor: "#3bd940",
            color: "white",
            width: "13rem",
            height: "3rem",
            justifyContent: "center",
            border: "none",
          },
        });

        setTimeout(() => {
          window.location.href = `${config.BASE_URL}/client/invites`;
        }, 800);
      }
    } catch (error: unknown) {
      const err = error as { response: { data: { message: string } } };

      toast.warning(err.response.data.message, {
        position: "top-center",
        style: {
          backgroundColor: "yellow",
          color: "black",
          width: "full",
          height: "3rem",
          justifyContent: "center",
          border: "none",
        },
      });
    }
  };

  return (
    <>
      <div className="">
        <Sonner />
        <Button
          className="bg-sky-400 text-white px-5 font-extrabold py-2 rounded-small"
          key={size}
          onPress={() => handleOpen(size)}
        >
          Invite
        </Button>
      </div>
      <Modal
        isOpen={isOpen}
        size={"xl"}
        backdrop="blur"
        onClose={onClose}
        className="h-[30rem]"
      >
        <ModalContent className="arsenal-sc-regular w-full">
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-center text-xl">
                Invite User
              </ModalHeader>
              <ModalBody>
                <div className="mx-auto">
                  <div className="w-[500px] ">
                    <label className="block mb-1 text-sm text-slate-800">
                      Select A Job
                    </label>

                    <div className="relative">
                      <select
                        onChange={(e) => setSelectJobId(e.target.value)}
                        className="w-fullo bg-transparent outline-none placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease shadow-sm appearance-none cursor-pointer"
                      >  <option>Select a JobPost</option>
                        {Object.entries(jobs).map((job: {}) => (

                          <option value={job[1]._id}>{job[1].title}</option>
                        ))}
                      </select>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.2"
                        stroke="currentColor"
                        className="h-5 w-5 ml-1 absolute top-2.5 right-2.5 text-slate-700"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                        />
                      </svg>
                    </div>
                    <p className="flex items-center mt-2 text-xs text-slate-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5 mr-2"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                      Once you send an invitation , you cannot delete or undo it.
                    </p>
                  </div>
                </div>
                <div className="mx-auto">
                  <div className="w-[500px]">
                    <div className="relative w-full min-w-[200px] border rounded-small">
                      <textarea
                        onChange={(e) => setDescripton(e.target.value)}
                        className="peer h-full p-4 min-h-[11rem] outline-none w-full resize-none rounded-[7px] px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700    "
                        placeholder="Your profile looks fit for this particular job, Just give it a try"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                {/* <Button className='bg-[#ff0004] text-white font-bold' variant="light" onPress={onClose}>
                                    Close
                                </Button> */}
                <Button
                  className="bg-[#0000ff] text-white font-bold"
                  onPress={inviteUser}
                >
                  Send Invite
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
