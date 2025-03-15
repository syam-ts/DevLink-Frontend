import React from "react";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";

const UserProfile1: React.FC = () => {
  return (
    <section className="container mx-auto px-8 py-10 arsenal-sc-regular">
      <Card
        shadow={false}
        className="border border-gray-300 rounded-2xl"
        placeholder=""
        onPointerEnterCapture={() => {}}
        onPointerLeaveCapture={() => {}}
      >
        <CardHeader
                  shadow={false}
                  className="h-60 !rounded-large bg-black"
                  placeholder=""
                  onPointerEnterCapture={() => { } }
                  onPointerLeaveCapture={() => { } } children={""}        > 
        </CardHeader>
        <CardBody placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          <div className="flex lg:gap-0 gap-6 flex-wrap justify-between items-center arsenal-sc-regular ">
            <div className="flex items-center gap-3">
              <Avatar src="/img/avatar1.jpg" alt="avatar" variant="rounded" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
              <div>
                <Typography color="blue-gray" variant="h6" className='arsenal-sc-regular' placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                  Emma Roberts
                </Typography>
                <Typography variant="small" className="text-gray-600 arsenal-sc-regular" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                  emma.roberts@mail.com
                </Typography>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Button
                variant="outlined"
                className="border-gray-300 flex items-center gap-2"
                placeholder=""
                onPointerEnterCapture={() => {}}
                onPointerLeaveCapture={() => {}}
              >
                <i className="fa fa-github text-base" />
                Github
              </Button>
              <Button
                variant="outlined"
                className="border-gray-300 flex items-center gap-2"
                placeholder=""
                onPointerEnterCapture={() => {}}
                onPointerLeaveCapture={() => {}}
              >
                <i className="fa-brands fa-twitter" />
                Twitter
              </Button>
              <Button
                variant="outlined"
                className="border-gray-300 flex items-center gap-2"
                placeholder=""
                onPointerEnterCapture={() => {}}
                onPointerLeaveCapture={() => {}}
              >
                <i className="fa-brands fa-medium" />
                Medium
              </Button>
            </div>
          </div>
          <Typography variant="small" className=" text-gray-600 mt-6 arsenal-sc-regular" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            Passionate UI/UX designer focused on creating intuitive and engaging digital experiences. <br />
            Driven by design thinking, creativity, and a love for problem-solving.
          </Typography>
          <Typography variant="small" className=" text-gray-600 mt-6 arsenal-sc-regular" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            Cloud Based Data System.
          </Typography>
          <Typography variant="small" className=" text-gray-600 mt-6 arsenal-sc-regular" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
           Bangalore
          </Typography>
          <Typography variant="small" className=" text-gray-600 mt-6 arsenal-sc-regular" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
           Since 2013
          </Typography>
        </CardBody>
      </Card>
    </section>
  );
};

export default UserProfile1;
