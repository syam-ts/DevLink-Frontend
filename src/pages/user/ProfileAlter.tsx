import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiUserInstance } from '../../api/axiosInstance/axiosUserInstance';
import { toast } from "sonner";
import { Sonner } from "../../components/sonner/Toaster";
import { updateUser } from '../../redux/slices/userSlice';
import { userProfileEditSchema, userProfileVerifySchema } from "../../utils/validation/userProfileSchema";
import axios from "axios";
import { UserState } from '../../config/state/allState';
import config from '../../config/helper/config'

interface UserData {
  name: string
  budget: number
  location: string
  mobile?: unknown
  skills: string[]
  profilePicture: any
  domain: string
  githubLink: string
  description: string
  whyHireMe: string
  experience: string
  education: string[]
};
 
const UserProfileAlter = () => {

  const [userData, setUserData] = useState<UserData>({
    name: "",
    budget: 0,
    location: "",
    skills: [],
    profilePicture: null,
    domain: "",
    githubLink: "",
    description: "",
    whyHireMe: "",
    experience: "",
    education: [],
  });
  const [formData, setFormData] = useState<UserData>({
    name: "",
    budget: 0,
    location: "",
    mobile: 0,
    skills: [],
    profilePicture: "",
    domain: "",
    githubLink: "",
    description: "",
    whyHireMe: "",
    experience: "",
    education: [],
  });
  const [image, setImage] = useState<string>("");
  const [skills, setSkills] = useState<string[]>([]);
  const [education, setEducation] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [imageLoading, setImageLoading] = useState<boolean>(false);
  const [error, setError] = useState<string[]>([]);
  const { type } = useParams<{ type: string }>();
  const dispatch = useDispatch(); 
  const userId: string = useSelector(
    (state: UserState) => state?.user?.currentUser?._id
  );

  useEffect(() => {
    try {
      (async () => {
        const response = await apiUserInstance.get(
          `/profile/user-view`,
          {
            withCredentials: true,
          }
        );
        console.log(response.data);
        if (!response.data.success) {
          toast.error(response.data.message, {
            style: {
              backgroundColor: "red",
              color: "white",
            },
          });
        } else {
          setUserData(response?.data?.data);
        }
      })();
    } catch (err) {
      toast.error("Error Loading profile", {
        style: {
          backgroundColor: "red",
          color: "white",
        },
      });
    }
  }, []);

  useEffect(() => {
    formData.profilePicture = image;
  }, [image]);

  useEffect(() => {
    formData.skills = skills;
  }, [skills]);

  useEffect(() => {
    formData.education = education;
  }, [education]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const cloudinaryInstance = axios.create({
    baseURL: `${config.CLOUDINARY_URL}`,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  const handleFileUpload = async (e: any) => {
    setImageLoading(true);
    const file = e.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append("file", file), console.log("rist", data);
    //PUT TO ENV
    data.append("upload_preset", "devlink-userProfle"),
      data.append("cloud_name", "dusbc29s2");

    try {
      console.log("file", [...data.entries()]);
      const response = await cloudinaryInstance.post("", data);
      console.log("The respnose", response);
      console.log("The image url : ", response.data?.url);
      setImage(response.data?.url);
      setImageLoading(false);
    } catch (err: any) {
      console.log(err.message);
    }
  };
 

  var loadFile: any = function (event: any) {
    var input = event.target;
    var file = input.files[0];
    var type = file.type;
    var output: any = document.getElementById("preview_img");

    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function () {
      URL.revokeObjectURL(output.src);
    };
  };

  const submitForm = async () => {
    try { 

      let validForm;
      if (type === "verify") {
        validForm = await userProfileVerifySchema.validate(formData, {
          abortEarly: false,
        });
      } else if (type === "edit") {
        validForm = await userProfileEditSchema.validate(formData, {
          abortEarly: false,
        });
      }

      if (validForm) {
        const data = {
          editData: formData,
          unchangedData: userData,
        };
        setError([]);

        const response: any = await apiUserInstance.put(
          `/profileAlter/${type}`,
          data
        );

        if (!response.data.success) {
          toast.warning(response.data.message, {
            style: {
              backgroundColor: "yellow",
            },
          });
        } else {
          const user = response.data.data.user;
          console.log("Dispatching user data to Redux:", user);
          dispatch(updateUser(user));
         window.location.href = `${config.BASE_URL}/user/profile/user-view`;
        }
      } else {
        if (type === "verify") {
          validForm = await userProfileVerifySchema.validate(formData, {
            abortEarly: false,
          });
        } else {
          validForm = await userProfileEditSchema.validate(formData, {
            abortEarly: false,
          });
        }
      }
    } catch (err: any) { 
      setError(err.errors);
    }
  };

  console.log("ERRORS: ", error);

  //skills add section
  const handleChangeSkills = (e: any) => {
    setInputValue(e.target.value);
  };

  const handleAddSkill = (event: any, inputValue: any) => {
    event.preventDefault();
    if (inputValue.trim() && !skills.includes(inputValue)) {
      setSkills((prevSkills: any) => [...prevSkills, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleRemoveSkill = (skillToRemove: any) => {
    setSkills((prevSkills: any) =>
      prevSkills.filter((skill: any) => skill !== skillToRemove)
    );
  };

  //eduction add section
  const handleChangeEducation = (e: any) => {
    setInputValue(e.target.value);
  };

  const handleAddEducation = (event: any, inputValue: any) => {
    event.preventDefault();
    if (inputValue.trim() && !education.includes(inputValue)) {
      setEducation((prevEducation: any) => [
        ...prevEducation,
        inputValue.trim(),
      ]);
      setInputValue("");
    }
  };

  const handleRemoveEducation = (educationToRemove: any) => {
    setSkills((prevEducation: any) =>
      prevEducation.filter((skill: any) => skill !== educationToRemove)
    );
  };

  return (
    <>
      <div className="flex justify-center py-32">
        {/* <Sonner /> */}

        {/* <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
         
  
          </div>
        </div>  */}

        <Sonner />
        <section>
          <div className="bg-white shadow-2xl rounded-3xl border-gray-200 border-1 w-[1500px] lg:col-span-3 lg:p-12">
            <form className="space-y-8">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-sm text-gray-500">Full Name</label>
                  <input
                    onChange={handleChange}
                    className="outline-none w-full py-2 text-xs px-3"
                    placeholder=" Elon musk"
                    name="name"
                    type="text"
                  />
                  <hr />
                  {error?.some((err: any) =>
                    err.includes("FullName is required")
                  )
                    ? error?.map((err: any, index: number) => {
                        if (err.includes("FullName is required")) {
                          return (
                            <div key={index} className="text-start">
                              <span className="text-red-400 text-sm">
                                {err}
                              </span>
                            </div>
                          );
                        }
                        return null;
                      })
                    : error?.map((err: any, index: number) => {
                        if (
                          err.includes("FullName is required") ||
                          err.includes("Must be atleast 3 characters") ||
                          err.includes(
                            "Must be at least 3 characters and under 20 characters"
                          ) ||
                          err.includes("Must be under 20 characters")
                        ) {
                          return (
                            <div key={index} className="text-start">
                              <span className="text-red-400 text-sm">
                                {err}
                              </span>
                            </div>
                          );
                        }
                        return null;
                      })}
                </div>

                <div>
                  <label className="text-xs text-gray-500">
                    Budget Per Hour
                  </label>
                  <input
                    onChange={handleChange}
                    className="outline-none w-full py-2 text-xs px-3"
                    placeholder="150/hr"
                    name="budget"
                    type="number"
                  />
                  <hr />
                  {error?.some((err: any) => err.includes("Budget is required"))
                    ? error?.map((err: any, index: number) => {
                        if (err.includes("Budget is required")) {
                          return (
                            <div key={index} className="text-start">
                              <span className="text-red-400 text-sm">
                                {err}
                              </span>
                            </div>
                          );
                        }
                        return null;
                      })
                    : error?.map((err: any, index: number) => {
                        if (
                          err.includes("Budget is required") ||
                          err.includes("Hourly rate must be at least 100rs") ||
                          err.includes("Hourly rate must be at most 1500rs") ||
                          err.includes(
                            "Hourly rate must be at least 100rs - 1500rs characters"
                          )
                        ) {
                          return (
                            <div key={index} className="text-start">
                              <span className="text-red-400 text-sm">
                                {err}
                              </span>
                            </div>
                          );
                        }
                        return null;
                      })}
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs text-gray-500">Location</label>
                  <input
                    onChange={handleChange}
                    className="outline-none w-full py-2 text-xs px-3"
                    placeholder="Bangalore"
                    name="location"
                    type="text"
                  />
                  <hr />
                  {error?.some((err: any) =>
                    err.includes("Location is required")
                  )
                    ? error?.map((err: any, index: number) => {
                        if (err.includes("Location is required")) {
                          return (
                            <div key={index} className="text-start">
                              <span className="text-red-400 text-sm">
                                {err}
                              </span>
                            </div>
                          );
                        }
                        return null;
                      })
                    : error?.map((err: any, index: number) => {
                        if (
                          err.includes("Location is required") ||
                          err.includes("Must be atleast 4 characters") ||
                          err.includes(
                            "Must be at least 4 characters and under 20 character"
                          ) ||
                          err.includes("Must be under 20 characters")
                        ) {
                          return (
                            <div key={index} className="text-start">
                              <span className="text-red-400 text-sm">
                                {err}
                              </span>
                            </div>
                          );
                        }
                        return null;
                      })}
                </div>

                {type === "edit" && (
                  <div>
                    <label className="text-xs text-gray-500">Mobile</label>
                    <input
                      onChange={handleChange}
                      className="outline-none w-full py-2 text-xs px-3"
                      placeholder="952342*****"
                      name="mobile"
                      type="number"
                    />
                    <hr />
                    {error?.map((err: any, index: number) => {
                      if (err.includes("Need valid number (10 digits only)")) {
                        return (
                          <div key={index} className="text-start">
                            <span className="text-red-400 text-sm">{err}</span>
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                )}
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <div>
                    <input
                      value={inputValue}
                      onChange={handleChangeSkills}
                      className="w-auto p-3 text-sm border border-gray-300 rounded"
                      placeholder="Add a skill"
                      name="skills"
                      type="text"
                    />
                    <button
                      onClick={(e) => handleAddSkill(e, inputValue)}
                      className="px-4 py-2 text-sm text-white bg-[#0000ff] font-bold rounded hover:bg-blue-600"
                    >
                      Add
                    </button>
                    {error?.some((err: any) =>
                      err.includes("Minimum 3 skills required")
                    )
                      ? error?.map((err: any, index: number) => {
                          if (err.includes("Minimum 3 skills required")) {
                            return (
                              <div key={index} className="text-start">
                                <span className="text-red-400 text-sm">
                                  {err}
                                </span>
                              </div>
                            );
                          }
                          return null;
                        })
                      : error?.map((err: any, index: number) => {
                          if (
                            err.includes("Minimum 3 skills required") ||
                            err.includes("Maximum 10 skills are allowed") ||
                            err.includes(
                              "Skill Filed must be at least 2 - 6 data"
                            )
                          ) {
                            return (
                              <div key={index} className="text-start">
                                <span className="text-red-400 text-sm">
                                  {err}
                                </span>
                              </div>
                            );
                          }
                          return null;
                        })}
                  </div>
                  {/* <hr className="my-3" /> */}
                  <div>
                    {skills.map((skill: any, index: any) => (
                      <div
                        key={index}
                        className="flex items-center w-44 justify-between p-2 bg-gray-100 rounded mb-2"
                      >
                        <span className="text-sm">{skill}</span>
                        <button
                          onClick={() => handleRemoveSkill(skill)}
                          className="px-2 py-1 text-xs text-white bg-[#ff0000] font-bold rounded hover:bg-red-600"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className=" items-center space-x-6 ">
                  <div className="shrink-0 ">
                    <img
                      id="preview_img"
                      onChange={handleChange}
                      className="outline-none h-[150px] w-[150px] object-cover rounded-md border"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4Y1gfFOnYmK1eAHFrXdkJT6WLCzw6lQLj_37RtB_JsILz0dlOegv06kCtgvPonHutlOU&usqp=CAU"
                      alt="Current profile photo"
                    />
                  </div>
                  {!imageLoading ? (
                    <label
                      className="block"
                      onChange={(event: any) => loadFile(event)}
                    >
                      <input
                        type="file"
                        name="profilePicture"
                        onChange={handleFileUpload}
                        accept="image/*"
                        className="block w-full text-xs text-white pt-3 px-3
                              file:mr-4 file:py-2 file:px-
                              file:rounded-full file:border-0
                              file:text-sm file:font-semibold
                              file:bg-violet-200 file:text-violet-700
                              hover:file:bg-violet-100"
                      />
                    </label>
                  ) : (
                    <label className="px-3 mx-5 mt-3 text-center py-2 rounded-full text-sm font-bold bg-violet-200 text-violet-700 hover:bg-violet-100">
                      Loading....
                    </label>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs text-gray-500">Domain</label>
                  <input
                    onChange={handleChange}
                    className="outline-none w-full py-2 text-xs px-3"
                    placeholder="Clound Engineering"
                    name="domain"
                    type="text"
                  />
                  <hr />
                  {error?.some((err: any) => err.includes("Domain is required"))
                    ? error?.map((err: any, index: number) => {
                        if (err.includes("Domain is required")) {
                          return (
                            <div key={index} className="text-start">
                              <span className="text-red-400 text-sm">
                                {err}
                              </span>
                            </div>
                          );
                        }
                        return null;
                      })
                    : error?.map((err: any, index: number) => {
                        if (
                          err.includes("Domain is required") ||
                          err.includes(
                            "Domain must be atleast 10 characters"
                          ) ||
                          err.includes(
                            "Domain name must be at least 10 -  20 characters"
                          ) ||
                          err.includes("Domain must be under 20 characters")
                        ) {
                          return (
                            <div key={index} className="text-start">
                              <span className="text-red-400 text-sm">
                                {err}
                              </span>
                            </div>
                          );
                        }
                        return null;
                      })}
                </div>

                <div>
                  <label className="text-sm text-gray-500">Github link</label>
                  <input
                    type="text"
                    name="githubLink"
                    onChange={handleChange}
                    className="outline-none w-full py-2 text-xs px-3"
                    placeholder="https://devlink-github.com"
                  />
                  <hr />
                  {error?.some((err: any) =>
                    err.includes("github link is required")
                  )
                    ? error?.map((err: any, index: number) => {
                        if (err.includes("github link is required")) {
                          return (
                            <div key={index} className="text-start">
                              <span className="text-red-400 text-sm">
                                {err}
                              </span>
                            </div>
                          );
                        }
                        return null;
                      })
                    : error?.map((err: any, index: number) => {
                        if (
                          err.includes("github link is required") ||
                          err.includes(
                            "GithubLink must be atleast 10 characters"
                          ) ||
                          err.includes(
                            "GithubLink must be under 30 characters"
                          ) ||
                          err.includes(
                            "Github link must be at least 10 - 30 characters"
                          )
                        ) {
                          return (
                            <div key={index} className="text-start">
                              <span className="text-red-400 text-sm">
                                {err}
                              </span>
                            </div>
                          );
                        }
                        return null;
                      })}
                </div>
              </div>

              <div>
                <label className="text-xs text-gray-500">Description</label>
                <textarea
                  onChange={handleChange}
                  className="outline-none w-full py-2 text-xs px-3"
                  placeholder=" am a graduated Telecommunications Engineer who pivoted his career to work in Cloud in the early days. Now, a few years have passed, and I have worked for a few tech companies."
                  name="description"
                />
                <hr />

                {error?.some((err: any) =>
                  err.includes("Description is required")
                )
                  ? error?.map((err: any, index: number) => {
                      if (err.includes("Description is required")) {
                        return (
                          <div key={index} className="text-start">
                            <span className="text-red-400 text-sm">{err}</span>
                          </div>
                        );
                      }
                      return null;
                    })
                  : error?.map((err: any, index: number) => {
                      if (
                        err.includes("Description is required") ||
                        err.includes(
                          "Description must be atleast 20 characters"
                        ) ||
                        err.includes(
                          "Descripton must be at least 20 - 200 characters"
                        ) ||
                        err.includes("Description must be under 200 characters")
                      ) {
                        return (
                          <div key={index} className="text-start">
                            <span className="text-red-400 text-sm">{err}</span>
                          </div>
                        );
                      }
                      return null;
                    })}
              </div>

              <div>
                <label className="text-xs text-gray-500">Why Hire Me</label>
                <textarea
                  onChange={handleChange}
                  className="outline-none w-full py-2 text-xs px-3"
                  placeholder="Whether you need to do a small troubleshooting or an enterprise-level project, I am the right person to help you.
                     Below you will find some of the most common services and technologies I normally work with:"
                  name="whyHireMe"
                />
                <hr />
                {error?.some((err: any) =>
                  err.includes("Hire me field is required")
                )
                  ? error?.map((err: any, index: number) => {
                      if (err.includes("Hire me field is required")) {
                        return (
                          <div key={index} className="text-start">
                            <span className="text-red-400 text-sm">{err}</span>
                          </div>
                        );
                      }
                      return null;
                    })
                  : error?.map((err: any, index: number) => {
                      if (
                        err.includes("Hire me field is required") ||
                        err.includes(
                          "Hire me filed must be atleast 20 characters"
                        ) ||
                        err.includes(
                          "Hire me filed must be under 60 characters"
                        ) ||
                        err.includes(
                          "Hire me Filed must be at least 20 - 60 characters"
                        )
                      ) {
                        return (
                          <div key={index} className="text-start">
                            <span className="text-red-400 text-sm">{err}</span>
                          </div>
                        );
                      }
                      return null;
                    })}
              </div>

              <div>
                <label className="text-xs text-gray-500">Experience</label>
                <textarea
                  onChange={handleChange}
                  className="outline-none w-full py-2 text-xs px-3"
                  placeholder="2+ years years of experience in cloud engineering"
                  name="experience"
                />
                <hr />

                {error?.some((err: any) =>
                  err.includes("Experiences are required")
                )
                  ? error?.map((err: any, index: number) => {
                      if (err.includes("Experiences are required")) {
                        return (
                          <div key={index} className="text-start">
                            <span className="text-red-400 text-sm">{err}</span>
                          </div>
                        );
                      }
                      return null;
                    })
                  : error?.map((err: any, index: number) => {
                      if (
                        err.includes("Experiences are required") ||
                        err.includes(
                          "Experience must be atleast 20 characters"
                        ) ||
                        err.includes(
                          "Experience must be under 60 characters"
                        ) ||
                        err.includes(
                          "Experience Filed must be at least 20 - 60 characters"
                        )
                      ) {
                        return (
                          <div key={index} className="text-start">
                            <span className="text-red-400 text-sm">{err}</span>
                          </div>
                        );
                      }
                      return null;
                    })}
              </div>

              <div>
                <div>
                  <input
                    value={inputValue}
                    onChange={handleChangeEducation}
                    className="w-2/3 p-3 text-sm border border-gray-300 rounded"
                    placeholder="Add a Education"
                    name="education"
                    type="text"
                  />
                  <button
                    onClick={(e) => handleAddEducation(e, inputValue)}
                    className="px-4 py-2 text-sm text-white bg-[#0000ff] font-bold rounded hover:bg-blue-600"
                  >
                    Add
                  </button>
                  {error?.some((err: any) =>
                    err.includes("Eduction informations are required")
                  )
                    ? error?.map((err: any, index: number) => {
                        if (
                          err.includes("Eduction informations are required")
                        ) {
                          return (
                            <div key={index} className="text-start">
                              <span className="text-red-400 text-sm">
                                {err}
                              </span>
                            </div>
                          );
                        }
                        return null;
                      })
                    : error?.map((err: any, index: number) => {
                        if (
                          err.includes("Eduction informations are required") ||
                          err.includes(
                            "Minimum 2 eduction information needed"
                          ) ||
                          err.includes(
                            "Maximum 6 eduction information allowed"
                          ) ||
                          err.includes(
                            "Education Filed must be at least 2 - 6 data"
                          )
                        ) {
                          return (
                            <div key={index} className="text-start">
                              <span className="text-red-400 text-sm">
                                {err}
                              </span>
                            </div>
                          );
                        }
                        return null;
                      })}
                </div>
                {/* <hr className="my-3" /> */}
                <div>
                  {education.map((education: any, index: any) => (
                    <div
                      key={index}
                      className="flex items-center w-2/3 justify-between p-2 bg-gray-100 rounded mb-2"
                    >
                      <span className="text-sm">{education}</span>
                      <button
                        onClick={() => handleRemoveEducation(education)}
                        className="px-2 py-2 text-xs text-white bg-[#ff0000] font-bold rounded hover:bg-red-600"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-16">
                <button
                  onClick={submitForm}
                  type="button"
                  className="inline-block w-full rounded-xl bg-black px-4 py-3 font-medium text-white sm:w-auto"
                >
                  Submit Changes
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </>
  );
};

export default UserProfileAlter;
