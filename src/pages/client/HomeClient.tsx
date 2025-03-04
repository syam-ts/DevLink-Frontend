import LinkAttribute from "../../components/nextUi/Link";
import { Card, CardHeader } from "@heroui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { signOutClient } from "../../redux/slices/clientSlice";
import { apiClientInstance } from "../../api/axiosInstance/axiosClientRequest";
import { JobPostCard } from "../../components/common/JobPostCard";
import { ClientState } from "../../config/state/allState";

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

interface User {
  _id: string;
  name: string;
  email: string;
  domain: string;
  profilePicture: string;
}

const HomeClient = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [users, setUsers] = useState<User>({
    _id: "",
    name: "",
    email: "",
    domain: "",
    profilePicture: "",
  });
  const [trendingJobs, setTrendingJobs] = useState<Jobs>({
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
  const isVerified = useSelector(
    (state: ClientState) => state.client.currentClient.isVerified
  );

  useEffect(() => {
    const findAllUsers = async () => {
      try {
        const response = await apiClientInstance.get("/getHome", {
          withCredentials: true,
        });

        setUsers(response.data.data);
      } catch (error: unknown) {
        const err = error as { response: { data: { message?: string } } };
        if (err.response.data.message === "Invalid Token") {
          dispatch(signOutClient());
          navigate("/client/login");
        }
        toast.error(err.response.data.message);
      }
    };

    findAllUsers();
  }, []);

  useEffect(() => {
    try {
      (async () => {
        const { data } = await apiClientInstance.get("/trendingJobs");
        console.log("The data: ", data);

        setTrendingJobs(data.data);
      })();
    } catch (error: unknown) {
      const err = error as { message: string };
      toast.error(err.message);
    }
  }, []);

  useEffect(() => {
    const carouselItems = document.querySelectorAll("[data-carousel-item]");
    const totalItems = carouselItems.length;
    let currentIndex = 0;

    const showSlide = (index: number) => {
      carouselItems.forEach((item, i) => {
        item.classList.toggle("hidden", i !== index);
      });
    };

    const autoSlide = setInterval(() => {
      currentIndex = (currentIndex + 1) % totalItems;
      showSlide(currentIndex);
    }, 3000);
    return () => clearInterval(autoSlide);
  }, []);

  return (
    <main className="arsenal-sc-regular">
      <section className="bg-rose-100 ">
        <figure className="relative transition-all duration-300 cursor-pointer  hover:grayscale-0">
          <a href="#">
            <img
              className="object-fill ml-auto"
              src="/public/client_home-1.png"
              alt="image description"
            />
          </a>
          <figcaption className="absolute text-lg text-white bottom-6 ">
            <div className="mb-44 ml-20">
              <div>
                <span className="text-black  text-3xl">
                  Thrive the World of Freelance
                  <br /> Excellence Marketplace
                </span>
              </div>
              <div>
                <span className="text-black  text-xl">
                  TFlourish in a thriving freelance ecosystem dedicated to
                  <br /> excellence and limitless opportunities.
                </span>
              </div>
              <label className="mx-auto mt-40 relative bg-white min-w-sm max-w-2xl flex flex-col md:flex-row items-center justify-center border py-2 px-2 rounded-2xl gap-2 shadow-2xl focus-within:border-gray-300">
                <input
                  id="search-bar"
                  placeholder="Search for freelancers..."
                  className="px-6 py-2 w-full text-black rounded-md flex-1 outline-none  bg-white"
                />
                <button className="w-full md:w-auto px-6 py-3 bg-black border-black text-white fill-white active:scale-95 duration-100 border will-change-transform overflow-hidden relative rounded-xl transition-all disabled:opacity-70">
                  <div className="relative">
                    <div className="flex items-center justify-center h-3 w-3 absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 transition-all">
                      <svg
                        className="opacity-0 animate-spin w-full h-full"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          stroke-width="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    </div>

                    <div className="flex items-center transition-all opacity-1 valid:">
                      <span className="text-sm  whitespace-nowrap truncate mx-auto">
                        Search
                      </span>
                    </div>
                  </div>
                </button>
              </label>
            </div>
          </figcaption>
        </figure>
      </section>

      <section className="flex bg-stone-300 h-auto text-center  p-16 gap-48">
        <div>
          <span>
            Flourish in a thriving freelance ecosystem dedicated to
            <br /> excellence and limitless opportunities.
          </span>
        </div>
        <div>
          <span>
            4.91/5
            <br /> Average rating for work with tech
            <br /> talent.
          </span>
        </div>
        <div>
          <span>
            211K+ contracts
            <br /> Engaged in development & IT work in
            <br /> the past year.
          </span>
        </div>
        <div>
          <span>
            1,665 skills
            <br /> Backed by talent on Workreap.
          </span>
        </div>
      </section>
      <section className="text-center my-12 mt-44">
        <span className="text-3xl">Top Rated Freelancers</span> <br />
        <span>Browse talent for your projects</span>
        <hr className="border-gray-400 mt-12 w-2/4 mx-auto" />
        <div className="text-end px-96">
          <span className="arsenal-sc-regular">
            <Link to="/client/developers">
              <LinkAttribute text="More Users" />
            </Link>
          </span>
        </div>
      </section>

      {/* cards */}
      <section className="grid gap-7 lg:grid-cols-4 sm:grid-cols-2 px-96 my-28">
        {Object.entries(users).map((user: User[]) => (
          <div className="max-w-[900px] flex gap-12 ">
            <Card className="col-span-12 sm:col-span-4 h-[250px]">
              <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                <p className="text-tiny text-white ">{user?.[1]?.email}</p>
              </CardHeader>
              {isVerified ? (
                <div>
                  <Link to={`/client/userProfile/client-view/${user?.[1]._id}`}>
                    <img
                      alt="developer-image"
                      className="z-0 w-64 h-80 object-cover cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110"
                      src={
                        user?.[1]?.profilePicture ||
                        "https://img.freepik.com/premium-vector/professional-grey-default-avatar-profile-icon-placeholder_1147429-12635.jpg"
                      }
                    />
                  </Link>
                </div>
              ) : (
                <div>
                  <img
                    alt="developer-image"
                    className="z-0 w-64 h-80 object-cover transition-transform duration-300 ease-in-out hover:scale-110"
                    src={
                      user?.[1]?.profilePicture ||
                      "https://img.freepik.com/premium-vector/professional-grey-default-avatar-profile-icon-placeholder_1147429-12635.jpg"
                    }
                  />
                </div>
              )}
            </Card>
            <div className="absolute pt-72 pl-4 grid">
              <span>{user?.[1]?.name}</span>
              <span className="text-sm">{user?.[1]?.domain}</span>
            </div>
          </div>
        ))}
      </section>

      <section className="mt-64 bg-black">
        <div
          id="default-carousel"
          className="relative w-full h-[600px]"
          data-carousel="slide"
        >
          <div className="relative h-[600px] overflow-hidden rounded-lg ">
            <div className="duration-700 ease-in-out" data-carousel-item>
              <img
                src="https://cdn-employer-wp.arc.dev/wp-content/uploads/2022/04/how-to-hire-a-freelance-developer-1128x635.jpg"
                className="absolute object-cover  block w-full h-[800px] -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                alt="..."
              />
            </div>
            <div className="  duration-700 ease-in-out" data-carousel-item>
              <img
                src="https://media.licdn.com/dms/image/D5612AQEQmeY5e7W8sQ/article-cover_image-shrink_720_1280/0/1719068700883?e=2147483647&v=beta&t=GvjM15rQJJmonr2t4lx28pBdOm82aAexL-Fmwb7PQ5Y"
                className="absolute object-cover block w-full h-[800px] -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                alt="..."
              />
            </div>
            <div className="duration-700 ease-in-out" data-carousel-item>
              <img
                src="https://www.elevatus.io/wp-content/uploads/2022/04/Full-Stack-Developer.jpg"
                className="absolute object-cover block w-full h-[800px] -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                alt="..."
              />
            </div>
          </div>
          <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
            <button
              type="button"
              className="w-3 h-3 rounded-full"
              aria-current="true"
              aria-label="Slide 1"
              data-carousel-slide-to="0"
            ></button>
            <button
              type="button"
              className="w-3 h-3 rounded-full"
              aria-current="false"
              aria-label="Slide 2"
              data-carousel-slide-to="1"
            ></button>
            <button
              type="button"
              className="w-3 h-3 rounded-full"
              aria-current="false"
              aria-label="Slide 3"
              data-carousel-slide-to="2"
            ></button>
            <button
              type="button"
              className="w-3 h-3 rounded-full"
              aria-current="false"
              aria-label="Slide 4"
              data-carousel-slide-to="3"
            ></button>
            <button
              type="button"
              className="w-3 h-3 rounded-full"
              aria-current="false"
              aria-label="Slide 5"
              data-carousel-slide-to="4"
            ></button>
          </div>
          <button
            type="button"
            className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
            data-carousel-prev
          >
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
              <svg
                className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 1 1 5l4 4"
                />
              </svg>
              <span className="sr-only">Previous</span>
            </span>
          </button>
          <button
            type="button"
            className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
            data-carousel-next
          >
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
              <svg
                className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
              <span className="sr-only">Next</span>
            </span>
          </button>
        </div>
      </section>

      <section className="text-center my-12 mt-44">
        <span className="arsenal-sc-regular text-4xl">Top Jobs</span>
        <hr className="border-black mt-12 w-2/4 mx-auto" />
      </section>

      <section>
        <JobPostCard jobs={trendingJobs} role="client" type="client-view" />
      </section>
    </main>
  );
};

export default HomeClient;
