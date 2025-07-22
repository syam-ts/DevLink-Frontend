import { toast } from "sonner";
import { useState } from "react";
import { Label } from "../../ui/label";
import config from "../../../helper/config";
import { Sonner } from "../../../components/sonner/Toaster";
import { withdrasSchema } from "../../../utils/validation/withdrawSchema";
import { apiUserInstance } from "../../../api/axiosInstance/axiosUserInstance";
import { apiClientInstance } from "../../../api/axiosInstance/axiosClientRequest";
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

interface WithdrawMoneyModalProps {
  balance: number;
  roleType: string;
}

export const WithdrawMoneyModal: React.FC<WithdrawMoneyModalProps> = ({
  balance,
  roleType,
}) => {
  const [amount, setAmount] = useState<number | string>(0);
  const [accountNumber, setAccountNumber] = useState<number | string>(0);
  const [error, setError] = useState<string[]>();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
 
  const sendRequest = async () => {
    try {
      const dataSet = {
        accountNumber: Number(accountNumber),
        amount: Number(amount),
        balance: Number(balance),
      }; 
      const isValid = await withdrasSchema.validate(dataSet, {
        abortEarly: false,
      });
      if (isValid) { 
        if(roleType === 'user') {
          const { data } = await apiUserInstance.post("/withdrawMoney", {
            amount,
            accountNumber,
            balance
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
                border: "none",
              },
            });
          }
        } else {
          const { data } = await apiClientInstance.post("/withdrawMoney", {
            amount,
            accountNumber,
            balance
          });
          if (data.success) {
            setTimeout(() => {
              window.location.href = `${config.BASE_URL}/client/wallet`;
            }, 500);
  
            toast.success("Sended Request", {
              position: "top-center",
              style: {
                width: "11rem",
                height: "3rem",
                justifyContent: "center",
                backgroundColor: "#03C03C",
                color: "white",
                border: "none",
              },
            });
          }
        }
        
      } else {
        await withdrasSchema.validate(dataSet, { abortEarly: false });
      }
    } catch (error: unknown) {
      const err = error as { errors: string[] };
      setError(err.errors);
    }
  };

  console.log("The err: ", error);

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
              {onClose}
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
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setAccountNumber(e.target.value)
                  }
                  placeholder="Enter your Account Number"
                  type="number"
                  variant="bordered"
                  name="accountNumber"
                />

                {error?.some((err: string) =>
                  err.includes("account number is required...")
                )
                  ? error?.map((err: string, index: number) => {
                    if (err.includes("account number is required...")) {
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
                      err.includes("account number is required...") ||
                      err.includes(
                        "The account number need to be minimum 13 digits"
                      ) ||
                      err.includes(
                        "The account number need to be maximum of 14 digits"
                      )
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
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setAmount(e.target.value)
                  }
                  placeholder="Enter the Amount"
                  type="number"
                  variant="bordered"
                  name="amount"
                />

                {error?.some((err: string) =>
                  err.includes("amount is required")
                )
                  ? error?.map((err: string, index: number) => {
                    if (err.includes("amount is required")) {
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
                      err.includes("amount is required") ||
                      err.includes(
                        "Amount should be below the existing balance"
                      ) ||
                      err.includes("Amount need to valid")
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
