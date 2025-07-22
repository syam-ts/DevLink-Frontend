import { toast } from "sonner";
import { Label } from "flowbite-react";
import { useEffect, useState } from "react";
import config from "../../../helper/config";
import { Sonner } from "../../../components/sonner/Toaster";
import { apiAdminInstance } from "../../../api/axiosInstance/axiosAdminInstance";
import { imageValidationSchema } from "../../../utils/validation/userProfileSchema";
import { transferMoneySchema } from "../../../utils/validation/TransferMoneySchema";
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
import axios from "axios";

interface SuccessTransferMoneyModalProps {
    roleType: string;
    userId: string;
    requestId: string;
    requestedAmount: number;
}

interface FormData {
    paymentScreenshot: string;
    amount: number;
    upiId: number;
}

export const SuccessTransferMoneyModal: React.FC<
    SuccessTransferMoneyModalProps
> = ({ roleType, userId, requestId, requestedAmount }) => {
    const [formData, setFormData] = useState<FormData>({
        paymentScreenshot: "",
        amount: requestedAmount,
        upiId: 0,
    });
    const [image, setImage] = useState<string>("");
    const [error, setError] = useState<string[]>();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    useEffect(() => {
        formData.paymentScreenshot = image;
    }, [image]);

    const cloudinaryInstance = axios.create({
        baseURL: `${config.CLOUDINARY_URL}`,
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    const handleFileUpload = async (e) => {
        try {
            let validForm = await imageValidationSchema.validate(
                { profilePicture: e.target.files[0] },
                {
                    abortEarly: false,
                }
            );

            if (validForm) {
                const file = e.target.files[0];
                if (!file) return;

                const data = new FormData();
                data.append("file", file);
                data.append("upload_preset", "devlink-userProfle"),
                    data.append("cloud_name", "dusbc29s2");

                console.log("file", [...data.entries()]);
                const response = await cloudinaryInstance.post("", data);
                setImage(response.data?.url);
                console.log("The image url: ", response.data?.url);
                setError([]);
            }
        } catch (err) {
            setError(err.errors);
            console.log(err.message);
        }
    };

    const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const successMoneyTransfer = async () => {
        try {
            const dataSet = {
                paymentScreenshot: image,
                amount: Number(formData.amount),
                upiId: formData.upiId,
                requestedAmount: requestedAmount,
            };
            console.log(dataSet);
            const isValid = await transferMoneySchema.validate(dataSet, {
                abortEarly: false,
            });

            if (isValid) {
                console.log('amoutnnnt; ', formData.amount)
                const body = {
                    roleType: roleType,
                    paymentScreenshot: formData.paymentScreenshot,
                    amount: requestedAmount,
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
            } else {
                await transferMoneySchema.validate(dataSet, { abortEarly: false });
            }
        } catch (error: unknown) {
            const err = error as { errors: string[] };
            setError(err.errors);
        }
    };

    console.log("ERRORS: ", error);

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
                                <input
                                    onChange={handleFileUpload}
                                    placeholder="Upload screenshot"
                                    type="file"
                                    accept="image/*"
                                    name="paymentScreenshot"
                                />

                                {error?.some((err: string) =>
                                    err.includes("paymentScreenshot is required")
                                )
                                    ? error?.map((err: string, index: number) => {
                                        if (err.includes("paymentScreenshot is required")) {
                                            return (
                                                <div key={index} className="text-start">
                                                    <span className="text-red-400 text-sm">{err}</span>
                                                </div>
                                            );
                                        }
                                        return null;
                                    })
                                    : error?.map((err: string, index: number) => {
                                        if (
                                            err.includes("paymentScreenshot is required") ||
                                            err.includes(
                                                "Not a valid image type. Only JPG, JPEG, and PNG are allowed"
                                            ) ||
                                            err.includes("Max allowed size is 2mb")
                                        ) {
                                            return (
                                                <div key={index} className="text-start">
                                                    <span className="text-red-400 text-sm">{err}</span>
                                                </div>
                                            );
                                        }
                                        return null;
                                    })}

                                <Label>Amount</Label>
                                <Input
                                    onChange={handleChanges}
                                    placeholder="Enter the amount"
                                    type="number"
                                    variant="bordered"
                                    name="amount"
                                    value={requestedAmount.toString()}
                                />


                                <Label>Upi Id</Label>
                                <Input
                                    onChange={handleChanges}
                                    placeholder="Enter the Upi Id"
                                    type="number"
                                    variant="bordered"
                                    name="upiId"
                                />

                                {error?.some((err: string) => err.includes("upi id required.."))
                                    ? error?.map((err: string, index: number) => {
                                        if (err.includes("upi id required..")) {
                                            return (
                                                <div key={index} className="text-start">
                                                    <span className="text-red-400 text-sm">{err}</span>
                                                </div>
                                            );
                                        }
                                        return null;
                                    })
                                    : error?.map((err: string, index: number) => {
                                        if (
                                            err.includes("upi id required..") ||
                                            err.includes(
                                                "upi id need to be between 7 - 15 digits"
                                            ) ||
                                            err.includes("upi id need to be atlest 7 digits")
                                        ) {
                                            return (
                                                <div key={index} className="text-start">
                                                    <span className="text-red-400 text-sm">{err}</span>
                                                </div>
                                            );
                                        }
                                        return null;
                                    })}
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
