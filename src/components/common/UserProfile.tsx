import {
  MDBCol,
  MDBContainer,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBTypography,
} from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import BoostPopover from "../../components/nextUi/popover/BoostAcc-Pop";
import { ProfileShimmer } from "../../components/shimmer/ProfileShimmer";
import { apiUserInstance } from "../../api/axiosInstance/axiosUserInstance";
import { useSelector } from "react-redux";
import ReviewCard from "../common/ReviewCard";
// import { InviteModal } from '../nextUi/modals/InviteUserModal';

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
  isBoosted: boolean;
  isProfileFilled: boolean;
}

export const UserProfile = () => {
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
    isBoosted: false,
    isProfileFilled: false,
  });
  const { type, userId } = useParams<{
    type: "user-view" | "client-view" | "proposal-view";
    userId: string;
  }>();

  let clientId: string;
  if (type === "client-view")
    clientId = useSelector((state: any) => state.client.currentClient._id);
  const navigate = useNavigate();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const { data } = await apiUserInstance.get(
          `http://localhost:3000/user/profile/view/${userId}`,
          {
            withCredentials: true,
          }
        );
        console.log("The repsn s", data.data);
        setUser(data.data);
      } catch (err: any) {
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
      `http://localhost:3000/${roleType}/chat/view/${roleType}/${roleId}/${targetId}`,
      {
        withCredentials: true,
      }
    );
    if (data.success) {
      navigate(`/client/allChats/client/${clientId}`);
    }
  };

  return (
    <>
      {Object.entries(user).length === 0 ? (
        <ProfileShimmer />
      ) : (
        <div className="gradient-custom-2 ">
          <MDBContainer className="py-5 h-100">
            <div>
              <MDBCol>
                <MDBCard>
                  <section>
                    <div
                      className="text-white d-flex flex-row arsenal-sc-regular"
                      style={{ backgroundColor: "#191a4d", height: "250px" }}
                    >
                      <div
                        className="ms-4 mt-40 d-flex flex-column"
                        style={{ width: "150px" }}
                      >
                        <img
                          src={user?.profilePicture}
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
                            <MDBTypography tag="h5" className="text-red-600">
                              {user?.name}
                            </MDBTypography>
                            {user?.isBoosted ? (
                              <span className=" cursor-pointer bg-[#334155] py-2 mx-2">
                                <img
                                  className="h-4 w-4"
                                  src="https://cdn-icons-png.freepik.com/256/13950/13950107.png?semt=ais_hybrid"
                                />
                              </span>
                            ) : (
                              <span className=" cursor-pointer bg-transparent">
                                <BoostPopover userId={userId} />
                              </span>
                            )}
                          </div>
                          <div className="text-sm grid left-0 comfortaa-regular">
                            <span>{user?.location}, india</span>
                            <span>{user?.email}</span>
                            <span>{user?.mobile}</span>
                            <span>view profile(git)</span>
                            <span>Rating {user.rating.avgRating}</span>
                          </div>
                        </div>
                        <div className="grid">
                          <div className="flex gap-4 mr-5">
                            {type === "client-view" ? (
                              <div className="flex gap-3 h-10">
                                {/* <button >
                                                                            <InviteModal />
                                                                        </button> */}

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
                                      className="no-underline bg-white py-2 px-4 mr-3 rounded-lg text-black text-md"
                                      to={`/user/profile/edit`}
                                    >
                                      <span>Edit</span>
                                    </Link>
                                  ) : (
                                    <Link
                                      className="no-underline bg-white py-2 px-4 mr-3 rounded-lg text-black text-md"
                                      to={`/user/profile/verify`}
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
                      className="p-4 text-black arsenal-sc-regular text-sm"
                      style={{ backgroundColor: "#f8f9fa" }}
                    >
                      <div className="d-flex justify-content-end text-center py-1">
                        <div>
                          <MDBCardText className="mb-1 px-4 h5">
                            {user?.budget}₹
                          </MDBCardText>
                          <MDBCardText className="small text-muted mb-0">
                            /hr
                          </MDBCardText>
                        </div>
                        <div>
                          <MDBCardText className="mb-1 h5">253</MDBCardText>
                          <MDBCardText className="small text-muted mb-0">
                            Total Jobs
                          </MDBCardText>
                        </div>
                        <div className="px-3">
                          <MDBCardText className="mb-1 h5">1026</MDBCardText>
                          <MDBCardText className="small text-muted mb-0">
                            Total Hours
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
                          className="p-4"
                          style={{ backgroundColor: "#f8f9fa" }}
                        >
                          <MDBCardText className="font-extrabold mb-1 text-center text-xl py-4">
                            {" "}
                            Full Stack web developer{" "}
                          </MDBCardText>
                          <MDBCardText className="font-italic mb-0 p-3">
                            More on descriptoin ::: {user?.description}
                          </MDBCardText>
                        </div>
                      </div>
                    </section>

                    <section>
                      <div className="mb-5 arsenal-sc-regular">
                        <p className="lead fw-normal mb-1">Why Hire Me</p>
                        <div
                          className="p-4"
                          style={{ backgroundColor: "#f8f9fa" }}
                        >
                          <MDBCardText className="font-italic mb-1">
                            <div className="grid p-3 py-4">
                              <span> {user?.whyHireMe} </span>
                            </div>
                          </MDBCardText>
                          <span className="text-xl">Skills:</span>
                          <MDBCardText className="font-italic mb-1 py-3 p-3">
                            <ul>
                              {user?.skills.map((skill: any) => (
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
                            {user?.education.map((ed: any) => (
                              <li className="list-disc"> {ed}</li>
                            ))}
                          </MDBCardText>
                        </div>
                      </div>
                    </section>

                    {/* Review Section */}
                    <section>
                      <div className="flex justify-center">
                        <span className="text-2xl">Reviews</span>
                      </div>
                      <hr className="w-2/3 mx-auto" />
                      <div className="my-5">
                        <ReviewCard review={user?.review} />
                      </div>
                    </section>

                    {/* Work history */}
                    <section>
                      <div className="mb-5 mx-auto arsenal-sc-regular">
                        <p className="lead fw-normal mb-1">Work History</p>
                        <div
                          className="p-4"
                          style={{ backgroundColor: "#f8f9fa" }}
                        >
                          <div className="flex text-center mx-96 ">
                            <span className="text-lg">Completed Jobs(30):</span>
                            <span className="text-lg pl-8">
                              in Progress(24):
                            </span>
                          </div>

                          <ul className="bg-[#efefef] shadow overflow-hidden w-[900px] sm:rounded-md mt-16 mx-auto ">
                            <li>
                              <div className="py-4 sm:px-12">
                                <div className="flex items-center justify-between">
                                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                                    'job[1]?.description'
                                  </h3>
                                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                    'job[1]?.status'
                                  </p>
                                  <a
                                    href="#"
                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                  >
                                    'job[1]?.paymentType'
                                  </a>
                                </div>
                                <div className="mt-2 grid items-center justify-between">
                                  <p className="text-sm font-medium text-gray-500">
                                    'job[1]?.title'
                                  </p>
                                  <p className="text-sm font-medium text-gray-500">
                                    'job[1]?.keyResponsiblities'
                                  </p>
                                </div>
                              </div>
                            </li>
                          </ul>
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
