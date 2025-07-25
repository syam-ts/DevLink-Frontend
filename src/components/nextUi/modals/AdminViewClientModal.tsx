import axios from "axios";
import React, { useEffect, useState } from "react";
import config from "../../../helper/config";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";

interface ViewClientProps {
  clientId: string
};

interface Data {
  companyName: string
  email: string
  location: string
  requiredSkills: string[]
  description: string
  totalEmployees: number
  since: number
};

export const ViewClient: React.FC<ViewClientProps> = ({ clientId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [size, setSize] = useState<string>("md");
  const [data, setData] = useState<Data>({
    companyName: "",
    email: "",
    location: "",
    requiredSkills: [""],
    description: "",
    totalEmployees: 0,
    since: 0,
  });

  useEffect(() => {
    (async () => {
      try {
        console.log(size);
        const response = await axios.get(
          `${config}/admin/request/getRequestedClient/${clientId}`
        );
        console.log("The response , ", response?.data?.data?.foundClient);
        setData(response?.data?.data?.foundClient);
      } catch (err) {
        console.log("ERROR : ", err.message);
      }
    })();
  }, []);

  const handleOpen = (size: string) => {
    setSize(size);
    onOpen();
  };

  return (
    <>
      <div className="flex flex-wrap gap-3">
        <Button
          className="bg-white"
          key={"3xl"}
          onPress={() => handleOpen("3xl")}
        >
          <img
            className="w-10 h-10 hover:bg-gray-200 cursor-pointer rounded-full"
            src="https://upload.wikimedia.org/wikipedia/commons/4/43/Minimalist_info_Icon.png"
          />
        </Button>
      </div>
      <Modal isOpen={isOpen} size="5xl" onClose={onClose} backdrop="opaque">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-wrap bellota-text-regular text-2xl gap-1">
                {" "}
                Client Information{" "}
              </ModalHeader>
              <ModalBody className="comfortaa-regular">
                <p> CompanyName -{data?.companyName}</p>
                <p> Email -{data?.email}</p>

                <p> Location -{data?.location}</p>

                <p> RequiredSkills -{data?.requiredSkills}</p>

                <p> Description -{data?.description}</p>

                <p> TotalEmployees -{data?.totalEmployees}</p>

                <p>
                  {" "}
                  Since -<span>{data?.since}</span>
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                {/* <Button color="primary" onPress={onClose}>
                  Accept
                </Button> */}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
