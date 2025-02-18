import React, { useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  useDraggable,
} from "@nextui-org/react";

interface SmallModalProps {
  showModals: string | boolean;
}

export const SmallModal: React.FC<SmallModalProps> = ({ showModals }) => {
  const targetRef = React.useRef<null>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { moveProps } = useDraggable({ targetRef, isDisabled: !isOpen });

  useEffect(() => {
    if (showModals) {
      onOpen();
      showModals = false;
    }
  }, [showModals, onOpen]);

  return (
    <>
      <Button className="hidden" onPress={onOpen}>
        Open Modal
      </Button>
      <Modal ref={targetRef} isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader {...moveProps} className="flex flex-col gap-1">
                Join Us Here
              </ModalHeader>
              <ModalBody>
                <p className="comfortaa-regular ">Please Chose one Role</p>
              </ModalBody>
              <ModalFooter>
                <Button
                  className="text-white font-bold"
                  color="success"
                  onPress={onClose}
                >
                  Okay
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
