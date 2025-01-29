import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiInstance from "../../api/axiosInstance";
import axios from "axios";
import { toast } from "sonner";
import { Sonner } from "../../components/sonner/Toaster";
import { signInUser } from '../../utils/redux/slices/userSlice'

const ProfileUser = () => {


    
    const [userData, setUserData ] = useState({})
    const [image, setImage] = useState(null);
    const [skills, setSkills]: any = useState([]);  
    const [education, setEducation]: any = useState([]);  
    const [inputValue, setInputValue]: any = useState(""); 
    const [imageLoading, setImageLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        budget: "",
        location: "",
        mobile: "",
        skills: "",
        profilePicture: null, 
        domain: "",
        githubLink: "",
        description: "",
        whyHireMe: "",
        experience: "",
        education: "",
    });
    const {type} = useParams();
    const dispatch = useDispatch();
 
     
    const userId: string = useSelector((state: any) => state?.user?.currentUser?._id);
    const currentUser: string = useSelector((state: any) => state?.user?.currentUser);

      useEffect(() => {
        (async () => {
          const response = await apiInstance.axiosInstanceUser.get(`http://localhost:3000/user/profile/view/${userId}`,{
            withCredentials: true
        });
     
        setUserData(response?.data?.data);
        })(); 
     
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


  const handleFileUpload = async (e: any) => {
    setImageLoading(true)
    const file = e.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append("file", file),
      data.append("upload_preset", "devlink-userProfle"),
      data.append("cloud_name", "dusbc29s2");

    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/dusbc29s2/image/upload`,
      data
    );
    // console.log('The image url : ', response.data?.url);
    setImage(response.data?.url);
    setImageLoading(false);
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
 

  const sumbmitForm = async () => {
    try {
      const data = {
        editData: formData,
        unchangedData: userData
      }


      
      const response: any = await apiInstance.axiosInstanceUser.put(`http://localhost:3000/user/profile/${type}/${userId}`,data);

      
     
 
      if(!response.data.sucess) {
      
        toast.warning(response.data.message, {
          style: {
            backgroundColor: "yellow"
          }
        })
      } else {
        const user = response.data.data.user;
        console.log("Dispatching user data to Redux:", user);
        dispatch(signInUser(user))
         window.location.href = `http://localhost:5173/user/userProfile/view/${userId}/user-profile-view`
      }
    } catch (err: any) { 
      toast.error(err.message);
    }
  };

  console.log('THE CURRENT USER : ',currentUser)


//skills add section
  const handleChangeSkills = (e: any) => {
    setInputValue(e.target.value);  
  };

  const handleAddSkill = (event: any,inputValue: any) => {
    event.preventDefault(); 
    if (inputValue.trim() && !skills.includes(inputValue)) {
      setSkills((prevSkills: any) => [...prevSkills, inputValue.trim()]); 
      setInputValue(""); 
    }
  };
 
  const handleRemoveSkill = (skillToRemove: any) => {
    setSkills((prevSkills: any) => prevSkills.filter((skill: any) => skill !== skillToRemove));  
  };
 

//eduction add section
  const handleChangeEducation = (e: any) => {
    setInputValue(e.target.value);  
  };

  const handleAddEducation = (event: any,inputValue: any) => {
    event.preventDefault(); 
    if (inputValue.trim() && !education.includes(inputValue)) {
      setEducation((prevEducation: any) => [...prevEducation, inputValue.trim()]); 
      setInputValue(""); 
    }
  };
 
  const handleRemoveEducation = (educationToRemove: any) => {
    setSkills((prevEducation: any) => prevEducation.filter((skill: any) => skill !== educationToRemove));  
  };
 

  return (
    <>
      <div className="flex justify-center py-32 gap-44">
        {/* <Sonner /> */}

        {/* <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
         
  
          </div>
        </div>  */}

    <Sonner />
        <section>
          <div className="bg-white shadow-2xl rounded-3xl border-gray-200 border-1  w-[1300px] lg:col-span-3 lg:p-12">
            <form className="space-y-8">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
              <label className='text-sm text-gray-500'>Full Name</label>
                <input
                    onChange={handleChange}
                  className="w-full py-2 text-xs px-3"
                  placeholder=" Elon musk"
                  name="name"
                  type="text"
                />
                <hr />
              </div>
              <div>
              <label className='text-xs text-gray-500'>Budget Per Hour</label>
                <input
                    onChange={handleChange}
                  className="w-full py-2 text-xs px-3"
                  placeholder="150/hr"
                  name="budget"
                  type="number"
                />
                <hr />
              </div>

                </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                <label className='text-xs text-gray-500'>Location</label>
                  <input
                      onChange={handleChange}
                    className="w-full py-2 text-xs px-3"
                    placeholder="Bangalore"
                    name="location"
                    type="text"
                  />
                  <hr />
                </div>
                <div>
                <label className='text-xs text-gray-500'>Mobile</label>

                  <input
                      onChange={handleChange}
                    className="w-full py-2 text-xs px-3"
                    placeholder="952342*****"
                    name="mobile"
                    type="number"
                  />
                  <hr />
                </div>
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
                      className="px-4 py-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
                    >
                      Add
                    </button>
                  </div>
                  {/* <hr className="my-3" /> */}
                  <div>
                    {skills.map((skill: any, index: any) => (
                  <div key={index} className="flex items-center w-44 justify-between p-2 bg-gray-100 rounded mb-2">
                    <span className="text-sm">{skill}</span>
                    <button
                        onClick={() => handleRemoveSkill(skill)}
                      className="px-2 py-1 text-xs text-white bg-red-500 rounded hover:bg-red-600"
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
                      className="h-[150px] w-[150px] object-cover rounded-md border"
                      src={
                        "https://img.freepik.com/premium-vector/influencer-icon-vector-image-can-be-used-digital-nomad_120816-263441.jpg?semt=ais_hybrid"
                      }
                      alt="Current profile photo"
                    />
                  </div>
                 {
                    !imageLoading ? (

                  <label
                    className="block"
                     onChange={(event: any) => loadFile(event)}
                  >
                    <input
                      type="file"
                      name="profilePicture"
                      onChange={handleFileUpload}
                      accept="image/*"
                      className="block w-full text-xs text-white pt-3 px-8
                              file:mr-4 file:py-2 file:px-2
                              file:rounded-full file:border-0
                              file:text-sm file:font-semibold
                              file:bg-violet-200 file:text-violet-700
                              hover:file:bg-violet-100"
                    />
                  </label>
                    ) :(
                  <label className='px-3 mx-5 mt-3 text-center py-2 rounded-full  text-sm font-bold bg-violet-200  text-violet-700 hover:bg-violet-100'>
                     Loading....
                 </label>
                        
                    )
                 }
                </div>
              </div>

              
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                <label className='text-xs text-gray-500'>Domain</label>

                  <input
                      onChange={handleChange}
                    className="w-full py-2 text-xs px-3"
                    placeholder="Clound Engineering"
                    name="domain"
                    type="text"
                  />
                  <hr />
                </div>
                <div>
                <label className='text-sm text-gray-500'>Github link</label>
                  <input
                    type="text"
                    name="githubLink" 
                      onChange={handleChange}
                    className="w-full py-2 text-xs px-3"
                    placeholder="https://devlink-github.com"
              
                  />
                  <hr />
                </div>
              </div>

              <div>
              <label className='text-xs text-gray-500'>Description</label>

                <textarea
                   onChange={handleChange}
                  className="w-full py-2 text-xs px-3"
                  placeholder=" am a graduated Telecommunications Engineer who pivoted his career to work in Cloud in the early days. Now, a few years have passed, and I have worked for a few tech companies."
                  name="description"
                />
                <hr />
              </div>
              <div>
              <label className='text-xs text-gray-500'>Why Hire Me</label>

                <textarea
                    onChange={handleChange}
                  className="w-full py-2 text-xs px-3"
                  placeholder="Whether you need to do a small troubleshooting or an enterprise-level project, I am the right person to help you.
                     Below you will find some of the most common services and technologies I normally work with:"
                  name="whyHireMe"
                />
                <hr />
              </div>
              <div>
              <label className='text-xs text-gray-500'>Experience</label>

                <textarea
                    onChange={handleChange}
                  className="w-full py-2 text-xs px-3"
                  placeholder="2+ years years of experience in cloud engineering"
                  name="experience"
                />
                <hr />
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
                      className="px-4 py-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
                    >
                      Add
                    </button>
                  </div>
                  {/* <hr className="my-3" /> */}
                  <div>
                    {education.map((education: any, index: any) => (
                  <div key={index} className="flex items-center w-2/3 justify-between p-2 bg-gray-100 rounded mb-2">
                    <span className="text-sm">{education}</span>
                    <button
                       onClick={() => handleRemoveEducation(education)}
                      className="px-2 py-1 text-xs text-white bg-red-500 rounded hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                  </div>
                </div>

                

              <div className="pt-16">
                <button
                  onClick={sumbmitForm}
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

export default ProfileUser;
