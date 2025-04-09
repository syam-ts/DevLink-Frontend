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
                <p className='text-white font-extrabold rounded-small py-2 px-4 bg-gray-600'>View</p>
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
