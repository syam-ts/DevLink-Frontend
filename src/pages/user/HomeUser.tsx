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
  }
};

interface Client {
  companyName: string;
  location: string;
  domain: string;
  since: number;
};

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
    }
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
    }
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
      setLatestJobs(data?.data);
    })();
  }, []);

  return (
    <div className="arsenal-sc-regular pt-16">
      <Sonner />
      <div className="hidden">
        <ProfileNotFilledModal
          isProfileFilled={user.isProfileFilled}
          roleType="user"
          roleId={userId}
        />
      </div>

      <section>
        <div className="arsenal-sc-regular">
          <figure className="relative transition-all duration-300 cursor-pointer  hover:grayscale-0">
            <a href="#">
              <img
                className=" w-full h-[700px] object-cover"
                src="/public/user_home-1.png"
                alt="image description"
              />
            </a>
            <figcaption className="absolute text-lg text-white bottom-6">
              <div className="pb-60 px-56">
                <div className="font-extrabold text-4xl">
                  <span>Find Your Desired Job Here</span>
                </div>

                <div className="font-extrabold text-4xl">
                  <span>Over 1200+ stunnig projects are waiting for you</span>
                </div>

                {/* ------Serach------- */}
                <div>
                  <label className="mb-2 text-sm font-medium sr-only text-white">
                    Search
                  </label>
                  <div className="relative">
                    <input
                      type="search"
                      id="default-search"
                      className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50   "
                      placeholder="Search your desire Jobs..."
                      required
                    />
                    <button
                      type="submit"
                      className="text-white h-full w-22 absolute end-0 bottom-0 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-md px-4  "
                    >
                      Search
                    </button>
                  </div>
                </div>
                <div>
                  <span>
                    Popular search : Full Stack development, php development
                  </span>
                </div>
              </div>
            </figcaption>
          </figure>
        </div>
      </section>

      <section>
        <Chatbot />
      </section>

      <section className="text-center my-12">
        <span className="arsenal-sc-regular text-3xl">Top Clients</span>
        <hr className="border-gray-700 mt-12 w-2/4 mx-auto" />
      </section>

      {/* cards */}
      <section>
        <div className="max-w-[1400px] h-[750px] gap-20 grid grid-cols-12 grid-rows-2 mx-auto my-24">
          {Object.values(clients).map((client: Client, index: number) => (
            <Card
              key={index}
              className="col-span-12 sm:col-span-4 rounded-none h-[700px]"
            >
              <img
                className="h-full"
                src="https://media.istockphoto.com/id/622925970/photo/clouds-reflected-in-windows-of-modern-office-building.jpg?s=612x612&w=0&k=20&c=qcJr4d4hd0NDTY6v8LZLO6TFR7WdHBKdf39g08RggQY="
              />
              <div className="absolute top-96 grid w-full justify-center">
                <span className="px-3 text-2xl text-white flex font-bold">
                  {client.companyName || "devlink-certified client"}
                  <img
                    className="w-5 h-5"
                    src="https://cdn-icons-png.flaticon.com/128/12559/12559876.png"
                    alt="verified-icon"
                  />
                </span>

                <span className="px-3 text-md font-bold text-white mx-auto">
                  {client?.location || "...."}
                </span>
                <span className="px-3 text-md font-bold text-white mx-auto">
                  {client?.domain || "...."}
                </span>
                <span className="px-3 text-md font-bold text-white mx-auto">
                  Since {client?.since || "...."}
                </span>
                <hr className="text-white border-2 " />
              </div>
            </Card>
          ))}
        </div>
      </section>

      <hr className="border-gray-700 mt-20 w-2/4 mx-auto" />
      <section>
        <div className="relative max-w-full mt-44 z-0">
          <img
            className="h-[600px] w-full object-cover "
            src="/public/user-home-img-2.png"
            alt="start-freelaner-image"
          />
          <div className="  inset-0 rounded-md"></div>
          <div className="absolute grid inset-0 items-start justify-start my-56 mx-72">
            <h2 className="text-white text-4xl font-bold ">
              Start as a Freelancer
            </h2>
            <span className="text-white">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.{" "}
            </span>
            <button
              className="rounded-md w-52 border border-transparent bg-[#0000ff] hover:bg-black py-3 px-4 flex font-bold items-center text-center text-md transition-all text-white "
              type="button"
            >
              <Link className="no-underline text-white " to="/user/jobs">
                Find Jobs
              </Link>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4 ml-1.5"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.72 7.72a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 0 1 0 1.06l-3.75 3.75a.75.75 0 1 1-1.06-1.06l2.47-2.47H3a.75.75 0 0 1 0-1.5h16.19l-2.47-2.47a.75.75 0 0 1 0-1.06Z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>

      <section className="text-center my-12 mt-44">
        <span className="arsenal-sc-regular text-4xl">Top Jobs</span>

        <hr className="border-gray-400 mt-12 w-2/4 mx-auto" />

        <div className="text-end px-96">
          <span className="arsenal-sc-regular">
            <Link to="/user/jobs">
              <LinkAttribute text="More Jobs" />
            </Link>
          </span>
        </div>
      </section>

      {/*top jobs jobpost card section */}
      <section>
        <JobPostCard jobs={jobs} role="user" type="user-view" />
      </section>

      <section className="pt-20 ">
        <div className="bg-[#bfbabb] py-20 ">
          <ul className="flex justify-evenly text-2xl">
            <li>
              Total Jobs
              <p className="text-center">{totalJobs}</p>
            </li>
            <li>
              Total Hours
              <p className="text-center">{totalHours}/hr</p>
            </li>
            <li>
              Verified Accounts
              <p className="text-center">{verifiedAccounts}</p>{" "}
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
