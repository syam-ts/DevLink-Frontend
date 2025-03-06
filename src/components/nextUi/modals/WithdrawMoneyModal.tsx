import { useState } from "react";
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
import { Label } from "../../ui/label";
import { apiUserInstance } from "../../../api/axiosInstance/axiosUserInstance";
import config from "../../../config/helper/config";
import { toast } from "sonner";
import { Sonner } from "../../../components/sonner/Toaster";

export const WithdrawMoneyModal = () => {
  const [amount, setAmount] = useState<number>(0);
  const [accountNumber, setAccountNumber] = useState<number>(0);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const sendRequest = async (e: any) => {
    try {
      const { data } = await apiUserInstance.post("/withdrawMoney", {
        amount,
        accountNumber,
      });

      if (data.success) {
        setTimeout(() => {
          window.location.href = `${config.BASE_URL}/user/wallet`;
        }, 500);

        toast.success("Sended Request", {
          position: "top-center",
          style: {
            width: "11rem",
            height: "3rem",
            justifyContent: "center",
            backgroundColor: "#03C03C",
            color: "white",
            border: "none"
          },
        });
      }
    } catch (error: unknown) {
      const err = error as { message: string };
      toast.error(err.message);
    }
  };

  return (
    <>
    <Sonner />
      <Button
        className="bg-transparent font-bold"
        color="primary"
        onPress={onOpen}
      >
        Withdraw
      </Button>
      <Modal
        className="arsenal-sc-regular p-4 px-2"
        size="lg"
        isOpen={isOpen}
        backdrop="blur"
        placement="top-center"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Withdraw Money
                <br />
                <p className="text-xs">
                  Transfer your available balance amount to bank account
                </p>
              </ModalHeader>
              <ModalBody>
                <Label>Account Number</Label>
                <Input
                  onChange={(e: any) => setAccountNumber(e.target.value)}
                  placeholder="Enter your Account Number"
                  type="number"
                  variant="bordered"
                  name="accountNumber"
                />
                <Label>Amount</Label>
                <Input
                  onChange={(e: any) => setAmount(e.target.value)}
                  placeholder="Enter the Amount"
                  type="number"
                  variant="bordered"
                  name="amount"
                />
              </ModalBody>
              <ModalFooter>
                <button
                  onClick={sendRequest}
                  className="text-white text-sm font-bold bg-red-700 rounded-small py-2 px-3"
                >
                  Close
                </button>
                <button
                  onClick={sendRequest}
                  className="text-white text-sm font-bold bg-blue-700 rounded-small py-2 px-3"
                >
                  Send Request
                </button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
