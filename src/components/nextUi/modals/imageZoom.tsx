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
                <p
                    className="rounded bg-gray-600 hover:bg-slate-700 py-1.5 px-5 text-sm text-white shadow-md transition"
                >View</p>
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
