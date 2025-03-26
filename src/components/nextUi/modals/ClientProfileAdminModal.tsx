import React from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  Button,
  useDisclosure,
} from "@heroui/react";

interface Client {
  _id: string
  companyName: string
  email: string
  isBlocked: boolean
  view: string
  totalJobs: number
  totalHours: number
  domain?: string
  location?: string
  since?: number
  numberOfEmployees?: number
};

interface ClientProfileModalProps {
  clientData: Client
};

export const ClientProfileModal: React.FC<ClientProfileModalProps> = ({
  clientData,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [backdrop, setBackdrop] = React.useState<string>("blur");

  const backdrops: string[] = ["blur"];
  const handleOpen = (backdrop) => {
    setBackdrop(backdrop);
    onOpen();
  };

  console.log(backdrop);
  // const Stars = ({ number }) => {
  //   return (
  //     <div className="flex">
  //       {Array.from({ length: number }, (_, i) => (
  //         <span key={i}>
  //           <img
  //             className="w-5 h-5"
  //             alt="star"
  //             src="data:image/jpeg;base64,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"
  //           />
  //         </span>
  //       ))}
  //     </div>
  //   );
  // };

  return (
    <>
      <div className="flex flex-wrap gap-3">
        {backdrops.map((b) => (
          <Button
            key={b}
            className="bg-transparent"
            color="warning"
            variant="flat"
            onPress={() => handleOpen(b)}
          >
            <img
              className="w-5 h-5"
              src="/public/view-user.png"
              alt="view-image"
            />
          </Button>
        ))}
      </div>
      <Modal backdrop="blur" size="2xl" isOpen={isOpen} onClose={onClose}>
        <ModalContent className="py-3 arsenal-sc-regular p-0 m-0 ">
          {() => (
            <>
              <ModalBody className="p-0 m-0">
                <div className="flex">
                  <div className=" w-full shadow-xl rounded-2xl p-10 border h-[25rem]">
                    <div className="grid gap-10">
                      <div className="flex justify-between text-center">
                        <div className="w-full grid gap-3">
                          <h1 className=" font-extrabold text-3xl">
                            {clientData.email}
                          </h1>
                          <span className=" font-semibold text-md">
                            Domain: {clientData.domain}
                          </span>
                          <span className=" font-semibold text-md">
                            Location: {clientData.location}
                          </span>
                          <span className=" font-semibold text-md">
                            Since: {clientData.since}
                          </span>
                          <span className=" font-semibold text-md">
                            Total Jobs: {clientData.totalJobs}
                          </span>
                          <span className=" font-semibold text-md">
                            No. of Employees : {clientData.numberOfEmployees}
                          </span>
                        </div> 
                      </div>
                    </div>
                  </div>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
