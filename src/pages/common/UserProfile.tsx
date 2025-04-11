import { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import BoostPopover from "../../components/nextUi/popover/BoostAcc-Popover";
import ReviewCard from "../../components/common/ReviewCard";
import config from "../../config/helper/config";
import { ProfileShimmer } from "../../components/shimmer/ProfileShimmer";
import { apiUserInstance } from "../../api/axiosInstance/axiosUserInstance";
import { useSelector } from "react-redux";
import { ClientState, UserState } from "../../config/state/allState";
import { apiClientInstance } from "../../api/axiosInstance/axiosClientRequest";
import { toast } from "sonner";
import { Sonner } from "../../components/sonner/Toaster";
import { InviteModal } from "../../components/nextUi/modals/InviteUserModal";
import {
  MDBCol,
  MDBContainer,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBTypography,
} from "mdb-react-ui-kit";

interface WorkHistory {
  _id: string;
  title: string;
  description: string;
  requiredSkills: string[];
  expertLevel: string;
  location: string;
  amount: number;
  paymentType: string;
  estimateTimeinHours: string;
  projectType: string;
}

interface User {
  _id: string;
  name: string;
  budget: number;
  location: string;
  email: string;
  mobile: number;
  skills: [string];
  profilePicture: string;
  domain: string;
  rating: {
    avgRating: number;
    noOfRating: number;
    ratingSum: number;
  };
  review: [
    {
      theReview: string;
      rating: number;
      companyName: string;
    }
  ];
  githugLink: string;
  description: string;
  whyHireMe: string;
  experience: string;
  education: [string];
  workHistory: [WorkHistory];
  isBoosted: boolean;
  isProfileFilled: boolean;
  totalJobs: number
  totalHours: number
}
const UserProfile: React.FC = () => {
  const [user, setUser] = useState<User>({
    _id: "",
    name: "",
    email: "",
    budget: 0,
    location: "",
    mobile: 0,
    skills: [""],
    profilePicture: "",
    domain: "",
    rating: {
      avgRating: 0,
      noOfRating: 0,
      ratingSum: 0,
    },
    review: [
      {
        theReview: "",
        rating: 0,
        companyName: "",
      },
    ],
    githugLink: "",
    description: "",
    whyHireMe: "",
    experience: "",
    education: [""],
    workHistory: [
      {
        _id: "",
        title: "",
        description: "",
        expertLevel: "",
        requiredSkills: [],
        location: "",
        amount: 0,
        paymentType: "",
        estimateTimeinHours: "",
        projectType: "",
      },
    ],
    isBoosted: false,
    isProfileFilled: false,
    totalJobs: 0,
    totalHours: 0
  });
  const { type } = useParams<{
    type: "user-view" | "client-view" | "proposal-view";
  }>();

  var userId: string;
  if (type === "user-view") {
    userId = useSelector((state: UserState) => state.user.currentUser._id);
  }

  let clientId: string;
  if (type === "client-view") {
    clientId = useSelector(
      (state: ClientState) => state.client.currentClient._id
    );
    var { userId } = useParams<{ userId: string }>();
  }

  const navigate = useNavigate();

  useEffect(() => {
    const getUserData = async () => {
      try {
        let response;
        if (type === "user-view" || type === "proposal-view") {
          response = await apiUserInstance.get(`/profile/user-view`, {
            withCredentials: true,
          });
          setUser(response.data.data);
        } else if (type === "client-view") {
          response = await apiClientInstance.get(`/userProfile/${userId}`, {
            withCredentials: true,
          });
          setUser(response.data.response);
        } else {
          toast.error("Wrong page selection");
        }
      } catch (error: unknown) {
        const err = error as { response: { data: { message: string } } };
        if (err.response.data.message == "No token provided") {
          navigate("/user/login");
        }
      }
    };

    getUserData();
  }, []);

  const fetchChatMessages = async (
    roleType: string,
    roleId: string,
    targetId: string
  ) => {
    const { data } = await apiUserInstance.get(
      `${config.VITE_SERVER_URL}/${roleType}/chat/view/${roleType}/${roleId}/${targetId}`,
      {
        withCredentials: true,
      }
    );
    if (data.success) {
      navigate(`/client/allChats/client/${clientId}?targetId=${user._id}`);
    }
  };
  console.log('The user: ', user)

  return (
    <>
      <Sonner />
      {Object.entries(user).length === 0 ? (
        <ProfileShimmer />
      ) : (
        <div className="gradient-custom-2 pt-20 max-sm:w-[660px]">
          <MDBContainer className="py-5 h-100">
            <div>
              <MDBCol>
                <MDBCard>
                  <section>
                    <div
                      className="text-white d-flex flex-row arsenal-sc-regular"
                      style={{ backgroundColor: "#cbd0d6", height: "250px" }}
                    >
                      <div
                        className="ms-4 mt-40 d-flex flex-column"
                        style={{ width: "150px" }}
                      >
                        <img
                          src={user?.profilePicture || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtNdYCHq-sbuOxKC47BIXtEPhO6_9RCMmDyw&s'}
                          alt="user-image"
                          className="mt-4 mb-2 object-fll img-thumbnail"
                          style={{
                            width: "150px",
                            height: "150px",
                            zIndex: "1",
                          }}
                        />
                      </div>
                      <div className="ms-3 my-auto flex w-full justify-between">
                        <div>
                          <div className="flex">
                            <MDBTypography
                              tag="h5"
                              className="text-black font-extrabold"
                            >
                              {user?.name}
                            </MDBTypography>
                            {
                              type === 'user-view' && "client-view" && "proposal-view" && (
                                <div>
                                  {user?.isBoosted ? (
                                    <span className=" cursor-pointer bg-transperant text-white px-2 rounded-full py-2 mx-2">
                                      <img
                                        className="h-5 w-5 "
                                        src="https://cdn-icons-png.flaticon.com/128/6009/6009429.png"
                                      />
                                    </span>
                                  ) : (
                                    <span className=" cursor-pointer bg-transparent">
                                      <BoostPopover />
                                    </span>
                                  )}
                                </div>
                              )
                            }
                          </div>
                          <div className="text-sm text-black font-extrabold grid left-0 comfortaa-regular">
                            <span>{user?.location}, india</span>
                            <span>{user?.email}</span>
                            <span>{user?.mobile}</span>
                            <span><a href={user.githugLink} target="_blank">view profile(Github)</a></span>
                            <span>Rating {user?.rating?.avgRating}</span>
                          </div>
                        </div>
                        <div className="grid">
                          <div className="flex gap-4 mr-5">
                            {type === "client-view" ? (
                              <div className="flex gap-3 h-10">
                                <button>
                                  <InviteModal userId={user?._id} />
                                </button>
                                <button
                                  className="bg-white text-black px-5 font-bold py-2 rounded-small"
                                  onClick={() =>
                                    fetchChatMessages(
                                      "client",
                                      clientId,
                                      userId
                                    )
                                  }
                                >
                                  Chat
                                </button>
                              </div>
                            ) : type === "proposal-view" ? (
                              <div>
                                <button
                                  className="bg-white text-black px-5 font-bold py-2 rounded-lg"
                                  onClick={() =>
                                    fetchChatMessages(
                                      "client",
                                      clientId,
                                      userId
                                    )
                                  }
                                >
                                  Chat
                                </button>
                              </div>
                            ) : type === "user-view" ? (
                              <button>
                                <div className="ml-36">
                                  {user?.isProfileFilled ? (
                                    <Link
                                      className="no-underline bg-[#0000ff] py-2 px-4 mr-3 rounded-small text-white font-bold text-md"
                                      to={`/user/profileAlter/edit`}
                                    >
                                      <span>Edit</span>
                                    </Link>
                                  ) : (
                                    <Link
                                      className="no-underline bg-[#0000ff] py-2 px-4 mr-3 rounded-small text-white font-bold text-md"
                                      to={`/user/profileAlter/verify`}
                                    >
                                      <span>Verify</span>
                                    </Link>
                                  )}
                                </div>
                              </button>
                            ) : (
                              <div></div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                  <section>
                    <div
                      className="p-4 text-black arsenal text-xs"
                      style={{ backgroundColor: "#6e7c91" }}
                    >
                      <div className="d-flex justify-content-end text-center py-1">
                        <div>
                          <MDBCardText className="mb-1 px-4 h5 text-white font-thin">
                            {user?.budget}₹
                          </MDBCardText>
                          <MDBCardText className="small text-muted mb-0 text-white font-extrabold">
                            <span className="text-white font-extrabold">
                              /hr
                            </span>
                          </MDBCardText>
                        </div>
                        <div>
                          <MDBCardText className="mb-1 h5 text-white font-extrabold">
                            {user.totalJobs || 0}
                          </MDBCardText>
                          <MDBCardText className="small text-muted mb-0">
                            <span className="text-white font-extrabold">
                              Total Jobs
                            </span>
                          </MDBCardText>
                        </div>
                        <div className="px-3">
                          <MDBCardText className="mb-1 h5 text-white font-extrabold">
                            {user.totalHours || 0}
                          </MDBCardText>
                          <MDBCardText className="small text-muted mb-0">
                            <span className="text-white font-extrabold">
                              Total Hours
                            </span>
                          </MDBCardText>
                        </div>
                      </div>
                    </div>
                  </section>
                  <MDBCardBody className="text-black p-4 comfortaa-regular">
                    {/* About section */}
                    <section>
                      <div className="mb-5 arsenal-sc-regular">
                        <p className="lead fw-normal mb-1">About</p>
                        <div
                          className="p-4 rounded-small"
                          style={{ backgroundColor: "#cbd0d6" }}
                        >
                          <MDBCardText className="font-extrabold mb-1 text-center text-xl py-4">
                            Domain: {user?.domain}
                          </MDBCardText>
                          <MDBCardText className="p-2 text-center">
                            {user?.description}
                          </MDBCardText>
                        </div>
                      </div>
                    </section>

                    <section>
                      <div className="mb-5 arsenal-sc-regular">
                        <p className="lead fw-normal mb-1">Why Hire Me</p>
                        <div
                          className="p-4 rounded-small"
                          style={{ backgroundColor: "#cbd0d6" }}
                        >
                          <MDBCardText className="font-italic mb-1">
                            <div className="grid p-3 py-4">
                              <span> {user?.whyHireMe} </span>
                            </div>
                          </MDBCardText>
                          <span className="text-xl">Skills:</span>
                          <MDBCardText className="font-italic mb-1 py-3 p-3">
                            <ul>
                              {user?.skills.map((skill: string) => (
                                <li className="list-disc "> {skill}</li>
                              ))}
                            </ul>
                          </MDBCardText>

                          <span className="text-xl">Experience:</span>
                          <MDBCardText className="font-italic mb-1 py-3 p-3">
                            <div className="py-3 p-3">{user?.experience}</div>
                          </MDBCardText>

                          <span className="text-xl">Education:</span>
                          <MDBCardText className="font-italic mb-1 p-3 px-4">
                            {user?.education.map((ed: string) => (
                              <li className="list-disc"> {ed}</li>
                            ))}
                          </MDBCardText>
                        </div>
                      </div>
                    </section>

                    {/* Review Section */}
                    <section>
                      <div className="flex justify-center">
                        <span className="text-2xl arsenal-sc-regular">
                          Reviews
                        </span>
                      </div>
                      <hr className="w-2/3 mx-auto" />
                      <div className="my-5">
                        <ReviewCard review={user?.review} />
                      </div>
                    </section>

                    {/* Work history */}
                    <section>
                      <div className="mb-5 mx-auto arsenal-sc-regular">
                        <div className="py-10">
                          <p className="lead fw-normal mb-1 text-center">
                            Work History
                          </p>
                          <hr className="w-2/3 mx-auto" />
                        </div>
                        <div className="px-4">
                          {user.workHistory.map((job: WorkHistory, index: number) => (
                            <div>
                              {
                                index < 3 && (
                                  <div
                                    key={index}
                                    className="w-full sm:w-4/5 lg:w-5/6 border-gray-100 shadow-xl rounded-xl h-auto sm:h-[300px] border mx-auto my-10 sm:my-16 p-6 sm:p-12 arsenal-sc-regular"
                                  >
                                    <div className="flex flex-col sm:flex-row justify-between gap-6">
                                      <div className="grid">
                                        <span className="text-lg sm:text-2xl text-start">
                                          {job?.title}
                                        </span>
                                        <span className="text-sm mt-2">
                                          {job?.description}
                                        </span>
                                        <div className="grid justify-start gap-3 mt-3">
                                          <span className="text-sm">
                                            {job?.expertLevel}
                                          </span>
                                          <span className="text-sm">
                                            {job?.location}
                                          </span>
                                        </div>
                                        <div className="flex flex-wrap gap-3">
                                          {job?.requiredSkills?.map(
                                            (skill: string, i: number) => (
                                              <span
                                                key={i}
                                                className="rounded-full border border-transparent my-2 py-1.5 px-4 sm:px-8 text-center text-xs sm:text-sm transition-all text-white bg-[#0000ff]"
                                              >
                                                {skill}
                                              </span>
                                            )
                                          )}
                                        </div>
                                      </div>

                                      <div className="grid text-start sm:text-end py-3">
                                        <span className="text-sm sm:text-base">
                                          {job?.amount}.00₹
                                        </span>
                                        <span className="text-sm sm:text-base">
                                          {job?.paymentType}
                                        </span>
                                        <span className="text-sm sm:text-base">
                                          {job?.estimateTimeinHours}/hr
                                        </span>
                                        <span className="text-sm text-green-400 underline">
                                          {job?.projectType}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                )
                              }
                            </div>
                          ))}
                        </div>
                      </div>
                    </section>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </div>
          </MDBContainer>
        </div>
      )}
    </>
  );
};

export default UserProfile;
