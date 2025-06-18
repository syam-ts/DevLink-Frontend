import { toast } from "sonner";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader } from "@heroui/react";
import { useDispatch, useSelector } from "react-redux";
import LinkAttribute from "../../components/nextUi/Link";
import { ClientState } from "../../config/state/allState";
import { signOutClient } from "../../redux/slices/clientSlice";
import { JobPostCard } from "../../components/common/JobPostCard";
import { apiClientInstance } from "../../api/axiosInstance/axiosClientRequest";

interface Jobs {
  jobs: {
    _id: string
    title: string
    description: string
    expertLevel: string
    location: string
    amount: number
    paymentType: string
    estimateTimeinHours: string
    projectType: string
  }
};

interface User {
  _id: string
  name: string
  email: string
  domain: string
  profilePicture: string
};

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
    <main className="arsenal-sc-regular pt-16">
      <section className="bg-rose-200">
        <figure className="relative transition-all duration-300 cursor-pointer hover:grayscale-0">
          <a href="#">
            <img
              className="object-contain w-full max-h-96 sm:max-h-128 md:max-h-[500px] lg:max-h-[600px]"
              src="/client_home-1.png"
              alt="image description"
            />
          </a>
          <figcaption className="absolute text-lg text-white bottom-6 left-6 right-6 md:left-20 md:right-20">
            <div className="mb-24 md:mb-44">
              <div>
                <span className="text-black text-2xl sm:text-3xl md:text-4xl max-md:hidden">
                  Thrive the World of Freelance
                  <br /> Excellence Marketplace
                </span>
              </div>
              <div>
                <span className="text-black text-lg sm:text-xl md:text-2xl max-md:hidden">
                  Flourish in a thriving freelance ecosystem dedicated to
                  <br /> excellence and limitless opportunities.
                </span>
              </div>
       
            </div>
          </figcaption>
        </figure>
      </section>

      <section className="bg-stone-300 p-4 sm:p-6 md:p-10 lg:p-16">
        <div className="flex flex-col md:flex-row md:justify-between gap-8 md:gap-4 lg:gap-8 max-w-7xl mx-auto text-center">
          <div className="flex-1 p-2">
            <span className="text-sm sm:text-base md:text-lg">
              Flourish in a thriving freelance ecosystem dedicated to
              <br className="hidden sm:block" /> excellence and limitless
              opportunities.
            </span>
          </div>

          <div className="flex-1 p-2">
            <span className="font-medium text-lg sm:text-xl md:text-2xl">
              4.91/5
            </span>
            <br />
            <span className="text-sm sm:text-base">
              Average rating for work with tech
              <br className="hidden sm:block" /> talent.
            </span>
          </div>

          <div className="flex-1 p-2">
            <span className="font-medium text-lg sm:text-xl md:text-2xl">
              211K+ contracts
            </span>
            <br />
            <span className="text-sm sm:text-base">
              Engaged in development & IT work in
              <br className="hidden sm:block" /> the past year.
            </span>
          </div>

          <div className="flex-1 p-2">
            <span className="font-medium text-lg sm:text-xl md:text-2xl">
              1,665 skills
            </span>
            <br />
            <span className="text-sm sm:text-base">
              Backed by talent on Workreap.
            </span>
          </div>
        </div>
      </section>

      <section className="text-center my-12 mt-44 px-4 sm:px-8">
        <span className="text-2xl sm:text-3xl font-semibold">
          Top Rated Freelancers
        </span>{" "}
        <br />
        <span className="text-base sm:text-lg text-gray-600">
          Browse talent for your projects
        </span>
        <hr className="border-gray-400 mt-8 w-3/4 sm:w-2/4 mx-auto" />
        <div className="flex justify-end mt-6 sm:mt-8 px-4 sm:px-12 md:px-20 lg:px-36 xl:px-72">
          <span className="arsenal-sc-regular text-sm sm:text-base">
            <Link to="/client/developers">
              <LinkAttribute text="More Users" />
            </Link>
          </span>
        </div>
      </section>

      {/* cards */}
      <section className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 2xl:px-64 my-28">
        {Object.entries(users).map(([_, user]) => (
          <div key={user._id} className="flex flex-col items-center">
            <Card className="relative w-2/3 max-w-xs sm:max-w-sm h-[300px]">
              <CardHeader className="absolute z-10 top-2 left-2 flex-col items-start">
                <p className="text-xs text-white bg-black bg-opacity-50 px-2 py-1 rounded">
                  {user?.email}
                </p>
              </CardHeader>

              {isVerified ? (
                <Link to={`/client/userProfile/client-view/${user?._id}`}>
                  <img
                    alt="developer-image"
                    className="z-0 w-full h-[300px] object-cover rounded cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105"
                    src={
                      user?.profilePicture ||
                      "https://img.freepik.com/premium-vector/professional-grey-default-avatar-profile-icon-placeholder_1147429-12635.jpg"
                    }
                  />
                </Link>
              ) : (
                <img
                  alt="developer-image"
                  className="z-0 w-full h-[300px] object-cover rounded transition-transform duration-300 ease-in-out hover:scale-105"
                  src={
                    user?.profilePicture ||
                    "https://img.freepik.com/premium-vector/professional-grey-default-avatar-profile-icon-placeholder_1147429-12635.jpg"
                  }
                />
              )}
            </Card>

            <div className="mt-4 text-center">
              <span className="block font-medium">{user?.name}</span>
              <span className="block text-sm text-gray-600">
                {user?.domain}
              </span>
            </div>
          </div>
        ))}
      </section>

      <section className="mt-32 sm:mt-48 bg-black">
        <div
          id="default-carousel"
          className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]"
          data-carousel="slide"
        >
          {/* Slides */}
          <div className="relative h-full overflow-hidden rounded-lg">
            <div className="duration-700 ease-in-out" data-carousel-item>
              <img
                src="https://cdn-employer-wp.arc.dev/wp-content/uploads/2022/04/how-to-hire-a-freelance-developer-1128x635.jpg"
                className="absolute object-cover block w-full h-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                alt="Slide 1"
              />
            </div>
            <div className="duration-700 ease-in-out" data-carousel-item>
              <img
                src="https://media.licdn.com/dms/image/D5612AQEQmeY5e7W8sQ/article-cover_image-shrink_720_1280/0/1719068700883?e=2147483647&v=beta&t=GvjM15rQJJmonr2t4lx28pBdOm82aAexL-Fmwb7PQ5Y"
                className="absolute object-cover block w-full h-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                alt="Slide 2"
              />
            </div>
            <div className="duration-700 ease-in-out" data-carousel-item>
              <img
                src="https://www.elevatus.io/wp-content/uploads/2022/04/Full-Stack-Developer.jpg"
                className="absolute object-cover block w-full h-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                alt="Slide 3"
              />
            </div>
          </div>

          {/* Carousel Section */}
          <div className="absolute z-30 flex -translate-x-1/2 bottom-4 left-1/2 space-x-2">
            {[...Array(3)].map((_, idx) => (
              <button
                key={idx}
                type="button"
                className="w-2.5 h-2.5 rounded-full bg-white/50 hover:bg-white"
                aria-label={`Slide ${idx + 1}`}
                data-carousel-slide-to={idx}
              ></button>
            ))}
          </div>

          {/* Prev Button */}
          <button
            type="button"
            className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-3 sm:px-4 cursor-pointer group focus:outline-none"
            data-carousel-prev
          >
            <span className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                viewBox="0 0 6 10"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 1 1 5l4 4"
                />
              </svg>
              <span className="sr-only">Previous</span>
            </span>
          </button>

          {/* Next Button */}
          <button
            type="button"
            className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-3 sm:px-4 cursor-pointer group focus:outline-none"
            data-carousel-next
          >
            <span className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                viewBox="0 0 6 10"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
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
