import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure, 
    Input, 
} from "@heroui/react";
import { Label } from "flowbite-react";
 

 

export const SuccessTransferMoneyModal = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    

    return (
        <>
            <Button className='bg-transparent text-white font-bold' color="primary" onPress={onOpen}>
            Send Success Transfer
            </Button>
            <Modal size='xl' isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Payment Success Form</ModalHeader>
                            <ModalBody>
                                <Label>Payment Success Screenshot</Label>
                                <Input 
                                    placeholder="Upload screenshot"
                                    variant="bordered"
                                    type='file' 
                                />
                                 <Label>Amount</Label>
                                <Input 
                                    placeholder="Enter the amount"
                                    type="number"
                                    variant="bordered"
                                />
                                 <Label>Upi Id</Label>
                                <Input 
                                    placeholder="Enter the Upi Id"
                                    type="number"
                                    variant="bordered"
                                /> 
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={onClose}>
                                    Send
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};
