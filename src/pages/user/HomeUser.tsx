import React, { useEffect, useState } from "react";
import { Card } from "@heroui/react";
import { Link } from "react-router-dom";
import LinkAttribute from "../../components/nextUi/Link";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { Sonner } from "../../components/sonner/Toaster";
import { apiUserInstance } from "../../api/axiosInstance/axiosUserInstance";
import { UserState } from "../../config/state/allState";
import { Chatbot } from "./ChatBot";
import { JobPostCard } from "../../components/common/JobPostCard";
import { ProfileNotFilledModal } from "../../components/nextUi/modals/ProfileNotFilledModal";

interface Jobs {
  jobs: {
    _id: string;
    title: string;
    description: string;
    expertLevel: string;
    location: string;
    amount: number;
    paymentType: string;
    estimateTimeinHours: string;
    projectType: string;
  };
}

interface Client {
  companyName: string;
  location: string;
  domain: string;
  since: number;
}

const HomeUser: React.FC = () => {
  const [clients, setClients] = useState<Client>({
    companyName: "",
    location: "",
    domain: "",
    since: 0,
  });

  const [jobs, setJobs] = useState<Jobs>({
    jobs: {
      _id: "",
      title: "",
      description: "",
      expertLevel: "",
      location: "",
      amount: 0,
      paymentType: "",
      estimateTimeinHours: "",
      projectType: "",
    },
  });
  const [latestJobs, setLatestJobs] = useState<Jobs>({
    jobs: {
      _id: "",
      title: "",
      description: "",
      expertLevel: "",
      location: "",
      amount: 0,
      paymentType: "",
      estimateTimeinHours: "",
      projectType: "",
    },
  });
  const [totalJobs, setTotalJobs] = useState<string>("");
  const [totalHours, setTotalHours] = useState<string>("{}");
  const [verifiedAccounts, setVerifiedAccounts] = useState<string>("{}");
  const [showModal, setShowModal] = useState<boolean>(false);
  const userId = useSelector(
    (state: UserState) => state?.user?.currentUser?._id
  );
  const user = useSelector((state: UserState) => state?.user?.currentUser);


  useEffect(() => {
    if (user.isProfileFilled) {
      setShowModal(true);
      console.log(showModal);
    }
  }, [user.isProfileFilled]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await apiUserInstance.get("/getHome", {
          withCredentials: true,
        });

        setClients(data?.data || []);
      } catch (error: unknown) {
        const err = error as {
          response?: { data?: { message?: string } };
          message?: string;
        };
        toast.error(err?.response?.data?.message || err.message);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const { data } = await apiUserInstance.get(`/home/listAllJobs`);
      setJobs(data?.data?.allJobs);
      setTotalJobs(data?.data?.totalJobs);
      setTotalHours(data?.data?.totalHours[0]?.sum);
      setVerifiedAccounts(data?.data?.verifiedAccounts);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const { data } = await apiUserInstance.get(`/home/latestJobs`); 
      setLatestJobs(data?.data.latestJobs);
    })();
  }, []);

  return (
    <div className="arsenal-sc-regular pt-16 overflow-x-hidden">
      <Sonner />
      <div className="hidden">
        <ProfileNotFilledModal
          isProfileFilled={user.isProfileFilled}
          roleType="user"
          roleId={userId}
        />
      </div>

      <section className="w-full px-1 sm:px-6 lg:px-8 ">
        <div className="arsenal-sc-regular">
          <figure className="relative transition-all duration-300 bg-black cursor-pointer hover:grayscale-0">
            <img
              className="w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] xl:h-[700px] object-cover"
              src="/user_home-1.png"
              alt="image description"
            />
            <figcaption className="absolute bottom-16 left-4 sm:left-10 md:left-16 text-white text-center sm:text-left">
              <div className="pb-10 sm:pb-20 px-4 sm:px-8 md:px-12 lg:px-16">
                <div className="font-extrabold text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                  <span>Find Your Desired Job Here</span>
                </div>
                <div className="font-extrabold text-lg sm:text-xl md:text-2xl lg:text-3xl">
                  <span>Over 1200+ stunning projects are waiting for you</span>
                </div>


                <div className="mt-4">
                  <label className="mb-2 text-sm font-medium sr-only text-white">Search</label>
                  <div className="relative w-full max-w-md mx-auto sm:mx-0">
                    <input
                      type="search"
                      id="default-search"
                      className="block w-full p-3 ps-10 text-sm text-gray-900 outline-none border border-gray-300 rounded-small bg-gray-50"
                      placeholder="Search your desired Jobs..."
                      required
                    />
                    <button
                      type="submit"
                      className="text-white h-full absolute right-0 top-0 bottom-0 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-small text-sm px-4"
                    >
                      Search
                    </button>
                  </div>
                </div>
                <div className="mt-2 text-sm text-gray-300">
                  <span>Popular search: Full Stack development, PHP development</span>
                </div>
              </div>
            </figcaption>
          </figure>
        </div>
      </section>


      <section className='max-sm:hidden'>
        <Chatbot />
      </section>

      <section>
        <div className='flex justify-center'>
          <span className="arsenal-sc-regular text-xl sm:text-2xl md:text-3xl font-semibold">
            Top Clients
          </span>
        </div>

        <hr className="border-gray-700 mt-6 sm:mt-8 md:mt-12 w-full sm:w-3/4 md:w-2/4 mx-auto" />
      </section>

      <section className="w-full overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {Object.values(clients).map((client: Client, index: number) => (
              <Card
                key={index}
                className="relative rounded-lg overflow-hidden shadow-lg h-full"
              >
                <img
                  className="h-64 sm:h-80 w-full object-cover"
                  src="https://media.istockphoto.com/id/622925970/photo/clouds-reflected-in-windows-of-modern-office-building.jpg?s=612x612&w=0&k=20&c=qcJr4d4hd0NDTY6v8LZLO6TFR7WdHBKdf39g08RggQY="
                  alt="Client Image"
                />
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 to-black/30 p-4 sm:p-6">
                  <span className="text-lg sm:text-xl md:text-2xl text-white flex font-bold items-center mb-1">
                    {client.companyName || "devlink-certified client"}
                    <img
                      className="w-4 h-4 sm:w-5 sm:h-5 ml-2"
                      src="https://cdn-icons-png.flaticon.com/128/12559/12559876.png"
                      alt="verified-icon"
                    />
                  </span>
                  <span className="text-sm sm:text-md font-bold text-white">
                    {client?.location || "...."}
                  </span>
                  <span className="text-sm sm:text-md font-bold text-white">
                    {client?.domain || "...."}
                  </span>
                  <span className="text-sm sm:text-md font-bold text-white">
                    Since {client?.since || "...."}
                  </span>
                  <hr className="border-white mt-2" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <hr className="border-gray-700 mt-20 w-2/4 mx-auto" />


      <section className="w-full overflow-hidden">
        <div className="relative w-full mx-auto my-12 sm:my-16 lg:my-24">
          <img
            className="h-[400px] sm:h-[500px] lg:h-[600px] w-full object-cover"
            src="/user-home-img-2.png"
            alt="start-freelancer-image"
          />
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute inset-0 flex flex-col items-center sm:items-start justify-center text-center sm:text-left px-4 sm:px-12 md:px-16 lg:px-24 xl:px-32 2xl:mx-44">
            <h2 className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold">
              Start as a Freelancer
            </h2>
            <span className="text-white text-sm sm:text-base mt-2 max-w-md">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </span>
            <button
              className="mt-4 sm:mt-6 rounded-small w-44 sm:w-52 border border-transparent bg-[#0000ff] hover:bg-black py-2 sm:py-3 px-4 flex items-center justify-center text-sm sm:text-base font-bold transition-all text-white"
              type="button"
            >
              <Link className="no-underline text-white" to="/user/jobs">
                Find Jobs
              </Link>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4 ml-1.5"
              >
                <path
                  fillRule="evenodd"
                  d="M16.72 7.72a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 0 1 0 1.06l-3.75 3.75a.75.75 0 1 1-1.06-1.06l2.47-2.47H3a.75.75 0 0 1 0-1.5h16.19l-2.47-2.47a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>


      <section className="text-center my-12 px-4 sm:text-center sm:w-[1500px] max-sm:w-[1500px] 2xl:w-screen">
        <span className="arsenal-sc-regular text-xl sm:text-2xl md:text-3xl font-semibold">
          Top Jobs
        </span>
        <div className="text-end px-96">
          <span className="arsenal-sc-regular">
            <Link to="/user/jobs">
              <LinkAttribute text="More Jobs" />
            </Link>
          </span>
        </div>
        <hr className="border-gray-700 mt-6 sm:mt-8 md:mt-12 w-full sm:w-3/4 md:w-2/4 mx-auto" />
      </section>

      {/*top jobs jobpost card section */}
      <section>
        <JobPostCard jobs={jobs} role="user" type="user-view" />
      </section>

      
      <section className="pt-10 sm:pt-16 lg:pt-20">
        <div className="bg-[#bfbabb] py-10 sm:py-16 lg:py-20 px-4">
          <ul className="flex flex-col sm:flex-row justify-evenly items-center gap-8 sm:gap-4">
            <li className="text-xl sm:text-2xl font-medium text-center">
              Total Jobs
              <p className="text-center font-bold mt-2">{totalJobs}</p>
            </li>
            <li className="text-xl sm:text-2xl font-medium text-center">
              Total Hours
              <p className="text-center font-bold mt-2">{totalHours}/hr</p>
            </li>
            <li className="text-xl sm:text-2xl font-medium text-center">
              Verified Accounts
              <p className="text-center font-bold mt-2">{verifiedAccounts}</p>
            </li>
          </ul>
        </div>
      </section>

      <section className="text-center my-12 mt-44">
        <span className="arsenal-sc-regular text-4xl">Latest Jobs</span>
        <hr className="border-gray-400 mt-12 w-2/4 mx-auto" />
        <div className="text-end px-96">
          <span className="arsenal-sc-regular">
            <Link to="/user/jobs">
              <LinkAttribute text="More Jobs" />
            </Link>
          </span>
        </div>
      </section>

      <section>
        <JobPostCard jobs={latestJobs} role="user" type="user-view" />
      </section>
    </div>
  );
};

export default HomeUser;
