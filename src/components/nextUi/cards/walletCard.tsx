import {Card, CardBody} from "@nextui-org/react";

export const WalletCard = ({amount}: any) => {
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
