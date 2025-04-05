import {
    Modal,
    ModalContent,
    ModalBody,
    Button,
    useDisclosure,
} from "@heroui/react";

interface ImageZoomProps {
    image: string
};

export const ImageZoom: React.FC<ImageZoomProps> = ({ image }) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <Button className="bg-transparent" onPress={onOpen}>
                <img
                    src={image}
                    className="h-[3rem] w-[5rem] bg-transparent rounded-large"
                />
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {() => (
                        <>
                            <ModalBody className="w-full h-full">
                                <img src={image} />
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};
