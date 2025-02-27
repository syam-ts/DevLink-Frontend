import { Card, CardHeader, CardBody, Image } from "@heroui/react";

export const UserProfileCard = ({ developer }: any) => {
  console.log("The dev: ", developer);

  return (
    <Card className="py-3 w-80 ">
      <CardHeader className="pb-0 px-4">
        <div className='grid'>
          <span className="text-tiny font-bold">{developer[1].domain}</span>
          <span className="text-default-500">{developer[1]?.location}</span> 
          <span className="text-default-500 ">
            {developer[1]?.rating.avgRating} stars
          </span> 
          <h4 className="font-bold text-large">{developer[1].name}</h4>
        </div>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <img
          alt="Card background"
          className="object-cover rounded-xl"
          src={developer[1].profilePicture}
          width={270}
        />
      </CardBody>
    </Card>
  );
};
