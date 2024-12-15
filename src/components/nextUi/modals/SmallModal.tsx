import React, {useEffect } from "react";
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

export const SmallModal = ( {showModal}: any ) => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const targetRef = React.useRef(null);
  const {moveProps} = useDraggable({targetRef, isDisabled: !isOpen});

    useEffect(() => {
    if (showModal) {
      onOpen(); // Open the modal if `showModal` is true
    }
  }, [showModal, onOpen]);

  return (
    <>
      <Button className='hidden' onPress={onOpen}>Open Modal</Button>
      <Modal ref={targetRef} isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader {...moveProps} className="flex flex-col gap-1">
                Join Us Here
              </ModalHeader>
              <ModalBody>
                <p className='comfortaa-regular '>
                 Please Chose one Role
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button className='text-white font-bold' color="success" onPress={onClose}>
                  Done
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

