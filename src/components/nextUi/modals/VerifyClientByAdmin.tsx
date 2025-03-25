import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
} from "@heroui/react";

interface UnChangedData {
    companyName: string
    description: string
    location: string
    numberOfEmployees: number
    since: number
};

interface VerifyClientViewByAdminProps {
    unChangedData: UnChangedData;
}

export const VerifyClientViewByAdmin: React.FC<
    VerifyClientViewByAdminProps
> = ({ unChangedData }) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <Button
                className="bg-transparent rounded-small bg-slate-800 py-2 px-4 text-center text-sm text-white shadow-md hover:shadow-lg  hover:bg-slate-700 ml-2"
                onPress={onOpen}
            > 
                View
            </Button>
            <Modal isOpen={isOpen} size={"2xl"} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-center">
                                Data Need To Verify
                            </ModalHeader>
                            <ModalBody>
                                <ul>
                                    {unChangedData.companyName && (
                                        <li>ClientName: {unChangedData.companyName} </li>
                                    )}
                                    {unChangedData.description && (
                                        <li>Description: {unChangedData.description}</li>
                                    )}
                                    {unChangedData.location && (
                                        <li>Location: {unChangedData.location} </li>
                                    )}
                                    {unChangedData.numberOfEmployees && (
                                        <li>
                                            NumberOfEmployees: {unChangedData.numberOfEmployees}
                                        </li>
                                    )}
                                    {unChangedData.since !== 0 && (
                                        <li>Since: {unChangedData.since}</li>
                                    )}
                                </ul>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" onPress={onClose}>
                                    Close
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};
