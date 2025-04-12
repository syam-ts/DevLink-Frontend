import { useSelector } from "react-redux";
import { Link } from "react-router-dom"; 
import { Card, CardHeader, CardBody } from "@heroui/react";
import { ClientState } from "../../../config/state/allState";

interface Developer {
  _id: string
  domain: string;
  location?: string;
  rating: {
    avgRating: number;
  };
  name: string;
  profilePicture: string;
}

interface UserProfileCardProps { 
  developer: Developer
};

export const UserProfileCard: React.FC<UserProfileCardProps> = ({ developer }) => { 
    const isVerified = useSelector((state: ClientState) => state.client.currentClient.isVerified);
 
  return (
    <Card className="py-3 w-80">
      <CardHeader className="pb-0 px-4">
        <div className='grid'>
          <span className="text-tiny font-bold">{developer.domain}</span>
          <span className="text-default-500">{developer[1]?.location}</span> 
          <span className="text-default-500 ">
            {developer[1]?.rating.avgRating} stars
          </span> 
          <h4 className="font-bold text-large">{developer.name}</h4>
        </div>
      </CardHeader>
      {
        isVerified ? (
          <Link to={`/client/userProfile/client-view/${developer._id}`} >
          <CardBody className="overflow-hidden py-2">
            <img
              alt="Card background"
              className="object-contain rounded-xl h-[300px] "
              src={developer.profilePicture}
              width={270} 
            />
          </CardBody>
          </Link>
        ) : (
          <CardBody className="overflow-hidden py-2">
          <img
            alt="Card background"
            className="object-contain rounded-xl h-[300px]"
            src={developer.profilePicture}
            width={270}
          />
        </CardBody>
        )
      }
   
    </Card>
  );
};
