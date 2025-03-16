import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Sonner } from "../../components/sonner/Toaster";
import { apiClientInstance } from "../../api/axiosInstance/axiosClientRequest";
import ClientProfileAlter from "../../components/shadcn/modal/clientProfileAlterModal";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";

interface Client {
  companyName: string
  email: string
  domain: string
  location: string
  description: string
  numberOfEmployees: number
  totalJobs: number
  totalSpends: number
  since: number
  isVerified: boolean
};

const UserProfile1: React.FC = () => {
  const [client, setClient] = useState<Client>({
    companyName: "",
    email: "",
    domain: "",
    location: "",
    description: "",
    numberOfEmployees: 0,
    totalJobs: 0,
    totalSpends: 0,
    since: 0,
    isVerified: false,
  });
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [time, setTime] = useState<Date>(new Date());

  useEffect(() => {
    (async () => {
      try {
        const response = await apiClientInstance.get(`/profile`, {
          withCredentials: true,
        });

        setIsVerified(response.data?.data?.isVerified);
        setClient(response.data?.data);
      } catch (error: unknown) {
        const err = error as { message: string };
        toast.error(err.message);
      }
    })();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const showTime: string = time.toLocaleTimeString();

  return (
    <section className="container mx-auto px-8 py-10 arsenal-sc-regular pt-28">
      <Sonner />
      <Card
        shadow={false}
        className="border border-gray-300 rounded-2xl"
        placeholder=""
        onPointerEnterCapture={() => { }}
        onPointerLeaveCapture={() => { }}
      >
        <CardHeader
          shadow={false}
          className="h-60 !rounded-large bg-black text-white"
          placeholder="Hello dsfsafj"
          onPointerEnterCapture={() => { }}
          onPointerLeaveCapture={() => { }}
        >
          <div className="flex justify-center my-20">
            <span className="text-white text-4xl text-center -tracking-tighter">
              DevLink
            </span>
          </div>
        </CardHeader>
        <CardBody
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <div className="flex lg:gap-0 gap-6 flex-wrap justify-between items-center arsenal-sc-regular ">
            <div className="flex items-center gap-3">
              <div>
                <Typography
                  color="blue-gray"
                  variant="h6"
                  className="arsenal-sc-regular"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  <div className="flex gap-2">
                    {client.companyName}

                    {isVerified ? (
                      <img
                        src="https://cdn-icons-png.flaticon.com/128/7641/7641727.png"
                        className="w-5 h-5 my-1"
                      />
                    ) : (
                      <span className="text-xs">Not verfied</span>
                    )}
                  </div>
                </Typography>
                <Typography
                  variant="small"
                  className="text-gray-600 arsenal-sc-regular"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  {client.email}
                </Typography>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-5">
              <div className="grid">
                <span>No. of Employees</span>
                <p>{client.numberOfEmployees}</p>
              </div>
              <div className="grid">
                <span>Total Jobs</span>
                <p>{client.totalJobs || 0}</p>
              </div>
              <div className="grid">
                <span>Total Spends</span>
                <p>{client.totalSpends || 0}</p>
              </div>
            </div>
          </div>
          <div className="flex mx-10 justify-between">
            <div>
              <Typography
                variant="small"
                className=" text-gray-600 mt-6 arsenal-sc-regular"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                {client.description}
              </Typography>
              <Typography
                variant="small"
                className=" text-gray-600 mt-6 arsenal-sc-regular"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                Domain: {client.domain}
              </Typography>
              <Typography
                variant="small"
                className=" text-gray-600 mt-6 arsenal-sc-regular"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                Location: {client.location}
              </Typography>
              <Typography
                variant="small"
                className=" text-gray-600 mt-6 arsenal-sc-regular"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                Since {client.since}
              </Typography>
              <Typography
                variant="small"
                className=" text-gray-600 mt-6 arsenal-sc-regular"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                {showTime}
              </Typography>
            </div>
            <div className="pt-28">
              {isVerified ? (
                <ClientProfileAlter type="edit" />
              ) : (
                <ClientProfileAlter type="verify" />
              )}
            </div>
          </div>
        </CardBody>
      </Card>
    </section>
  );
};

export default UserProfile1;
