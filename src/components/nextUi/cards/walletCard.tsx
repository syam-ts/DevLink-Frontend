import {Card, CardBody} from "@heroui/react";

interface WalletProps {
  amount: number
};

export const WalletCard: React.FC<WalletProps> = ({amount}) => {
  return (
    <Card>
      <CardBody>
        <div className='text-center'>
        <p className='text-lg font-bolder comfortaa-regular'> Balance - {amount} </p>
        </div>
      </CardBody>
    </Card>
  );
}
