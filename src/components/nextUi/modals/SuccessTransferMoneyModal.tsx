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
import { toast } from "sonner"; 
import { useState } from "react";
import { Sonner } from "../../../components/sonner/Toaster";
import { apiAdminInstance } from "../../../api/axiosInstance/axiosAdminInstance";

interface SuccessTransferMoneyModalProps {
    userId: string
    requestId: string
    requestedAmount: number
};

interface FormData {
    paymentScreenshot: string
    amount: number
    upiId: number
};

export const SuccessTransferMoneyModal: React.FC<
    SuccessTransferMoneyModalProps
> = ({ userId, requestId, requestedAmount }) => {
    const [formData, setFormData] = useState<FormData>({
        paymentScreenshot: "",
        amount: 0,
        upiId: 0,
    });
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const successMoneyTransfer = async () => {
        try {
            const body = {
                paymentScreenshot: formData.paymentScreenshot,
                amount: formData.amount,
                upiId: formData.upiId,
                userId: userId,
                requestId: requestId,
                requestedAmount: requestedAmount,
            };

            const { data } = await apiAdminInstance.post("/successMoneyTransfer", {
                body,
            });

            if (data.success) {
                setTimeout(() => {
                    window.location.reload();
                }, 500);

                toast.success("Successfully sended", {
                    position: "top-center",
                    style: {
                        width: "11rem",
                        height: "3rem",
                        justifyContent: "center",
                        backgroundColor: "#32a852",
                        color: "white",
                        border: "none",
                    },
                });
            }
        } catch (error: unknown) {
            const err = error as { response: { data: { message: string } } };
            console.log("ERROR: ", err.response.data.message);
            toast.error(err.response.data.message, {
                position: "top-center",
                style: {
                    width: "full",
                    height: "3rem",
                    justifyContent: "center",
                    backgroundColor: "red",
                    color: "white",
                    border: "none",
                },
            });
        }
    };
 

    return (
        <>
            <Sonner />
            <Button
                className="bg-transparent text-white font-bold"
                color="primary"
                onPress={onOpen}
            >
                Send Success Transfer
            </Button>
            <Modal
                size="xl"
                isOpen={isOpen}
                placement="top-center"
                onOpenChange={onOpenChange}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Payment Success Form
                            </ModalHeader>
                            <ModalBody>
                                <Label>Payment Success Screenshot</Label>
                                <Input
                                    onChange={handleChanges}
                                    placeholder="Upload screenshot"
                                    variant="bordered"
                                    type="file"
                                    name="paymentScreenshot"
                                />
                                <Label>Amount</Label>
                                <Input
                                    onChange={handleChanges}
                                    placeholder="Enter the amount"
                                    type="number"
                                    variant="bordered"
                                    name="amount"
                                />
                                <Label>Upi Id</Label>
                                <Input
                                    onChange={handleChanges}
                                    placeholder="Enter the Upi Id"
                                    type="number"
                                    variant="bordered"
                                    name="upiId"
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onClick={successMoneyTransfer}>
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


