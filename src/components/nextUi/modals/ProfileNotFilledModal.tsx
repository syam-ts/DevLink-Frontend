import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface ProfileNotFilledModalProps {
  isProfileFilled: boolean;
  roleType: string;
  roleId: string;
}

export const ProfileNotFilledModal: React.FC<ProfileNotFilledModalProps> = ({
  isProfileFilled,
  roleType,
  roleId,
}) => {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [size, setSize] = useState<string>("md");

  useEffect(() => {
    if (!isProfileFilled) {
      onOpen();
    }
  }, [isProfileFilled, onOpen]);

  const handleOpen = (size: string) => {
    setSize(size);
    onOpen();
  };

  return (
    <>
      <div className="flex flex-wrap gap-3">
        <Button
          className="bg-transparent"
          key={size}
          onPress={() => handleOpen(size)}
        ></Button>
      </div>
      <Modal
        isOpen={isOpen}
        size={"5xl"}
        backdrop="opaque"
        onClose={onClose}
        className="nunito-regular"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <div className="flex gap-2">
                  <img
                    className="w-6 h-6"
                    src="https://cdn-icons-png.flaticon.com/128/4539/4539472.png"
                    alt="warning-not-filled"
                  />
                  <span> Profile Not filled</span>
                </div>
              </ModalHeader>
              <ModalBody>
                {roleType === "user" ? (
                  <p className="text-sm px-5">
                    Your profile details are not completly filled. Becuase of
                    that your activities on Devlink would be very limitted. If
                    you want get more access and get jobs by the filter
                    criterias which devlink provides , please fill you profile
                    info completly and also you can boost your profile to unlock
                    and become a premium member in Devlink....
                  </p>
                ) : (
                  <p className="text-sm px-5">
                    Your profile details are not completly filled. Becuase of
                    that your activities on Devlink would be very limitted.You
                    are not eligible to create job posts and view more
                    confidential datas about freelance developers. It is best to
                    fill your profile and get verified as soon as fast....
                  </p>
                )}
              </ModalBody>
              <ModalFooter className="flex gap-4">
                <Button
                  className="bg-[#ff2929] rounded-full text-white font-bold"
                  onPress={onClose}
                >
                  Fill Later
                </Button>

                <Button className="bg-[#0000ff] rounded-full" onPress={onClose}>
                  <Link
                    className="no-underline text-white font-bold"
                    to={`/${roleType}/profile/${roleType}-view`}
                  >
                    Fill Now
                  </Link>
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
