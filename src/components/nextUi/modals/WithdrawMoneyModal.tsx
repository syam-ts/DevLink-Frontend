import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure, 
  Input
} from "@heroui/react";
import { Label } from "../../ui/label";
import { apiUserInstance } from "../../../api/axiosInstance/axiosUserInstance";

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

      console.log("The response: ", data);
    } catch (error: unknown) {
      const err = error as { message: string };
      console.error(err.message);
    }
  };


  return (
    <>
      <Button color="primary" onPress={onOpen}>
        Open Modal
      </Button>
      <Modal
        className="arsenal-sc-regular"
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
                onChange={(e: any) =>setAccountNumber(e.target.value)}
                  placeholder="Enter your Account Number"
                  type="number"
                  variant="bordered"
                  name="accountNumber"
                />
                <Label>Amount</Label>
                <Input
                onChange={(e: any) =>setAmount(e.target.value)}
                  placeholder="Enter the Amount"
                  type="number"
                  variant="bordered"
                  name="amount"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <button
                 onClick={sendRequest}
                className="text-white text-sm font-bold bg-blue-700 rounded-small py-1 px-2.5">
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
