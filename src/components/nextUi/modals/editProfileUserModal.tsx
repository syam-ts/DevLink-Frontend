import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Sonner } from "../../../components/sonner/Toaster";

export default function App() {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    age: "",
    profilePicture: null,
    description: "",
    domain: "",
    eduction: "",
    location: "",
    skills: "",
    budget: "",
  });

  const [image, setImage] = useState(null);
  const [skills, setSkills]: any = useState([]);  
  const [inputValue, setInputValue]: any = useState(""); 
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [size, setSize] = React.useState("md");

  const userId = useSelector((state: any) => state?.user?.currentUser?.user?._id)

  useEffect(() => {
    formData.profilePicture = image;
  }, [image]);

  useEffect(() => {
    formData.skills = skills;
  }, [skills]);


  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleFileUpload = async (e: any) => {
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
    console.log('The image url : ', response.data?.url);
    setImage(response.data?.url);
  };


  const handleOpen = (size: any) => {
    setSize(size);
    onOpen();
  };


  var loadFile: any = function (event: any) {
    // var input = event.target;
    // var file = input.files[0];
    // var type = file.type;
    var output: any = document.getElementById("preview_img");

    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function () {
      URL.revokeObjectURL(output.src);
    };
  };


  const sumbmitForm = async () => {
    try {
      console.log('The id ', userId)
      const response = await axios.put(
        `http://localhost:3000/user/profile/edit/${userId}`,
        formData
      );

      if (response.data.type === "success") {
        window.location.href = 'http://localhost:5173/user/profile/profile'
      }
    } catch (err: any) { 
      toast.error(err.message);
    }
  };



  const handleChangeSkills = (e: any) => {
    setInputValue(e.target.value); // Update the input field's value
  };

  const handleAddSkill = (event: any,inputValue: any) => {
    event.preventDefault(); 
    if (inputValue.trim() && !skills.includes(inputValue)) {
      setSkills((prevSkills: any) => [...prevSkills, inputValue.trim()]); 
      setInputValue(""); 
    }
  };
 
  console.log('The skills', skills)

  const handleRemoveSkill = (skillToRemove: any) => {
    setSkills((prevSkills: any) => prevSkills.filter((skill: any) => skill !== skillToRemove)); // Remove a skill
  };

  return (
    <>
      <div className="flex flex-wrap gap-3">
        <Sonner />

        <Button
          className=" bg-transparent text-white -none"
          key={size}
          onPress={() => handleOpen(size)}
        >
          Edit
        </Button>
      </div>
      <Modal isOpen={isOpen} backdrop={"blur"} size={"5xl"} onClose={onClose}>
        <ModalContent>
          {() => (
            <> 
              <ModalBody>
                <div className="flex bg-white">
                  <section>
                    <div className=" items-center py-44 space-x-6 ">
                      <div className="shrink-0 ">
                        <img
                          id="preview_img"
                          onChange={handleChange}
                          className="h-44 w-44 object-cover rounded-full"
                          src={
                            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSxwtNwBZrujgVzK44NhBAi0ybAxnnCB8VgueUBMjv1XkEAephINAcGhzFNWukvZ0VbVA&usqp=CAU"
                          }
                          alt="Current profile photo"
                        />
                      </div>
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
                              file:bg-violet-50 file:text-violet-700
                              hover:file:bg-violet-100"
                        />
                      </label>
                    </div>
                  </section>

                  <section>
                    <div className="bg-white w-[800px] lg:col-span-3 lg:p-12">
                      <form className="space-y-8">
                        <div>
                          <input
                            onChange={handleChange}
                            className="w-full p-3 text-sm t"
                            placeholder="Change Name"
                            name="name"
                            type="text"
                          />
                          <hr />
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <div>
                            <input
                              onChange={handleChange}
                              className="w-full p-3 text-sm"
                              placeholder="Change Age"
                              name="age"
                              type="number"
                            />
                            <hr />
                          </div>
                          <div>
                            <input
                              onChange={handleChange}
                              className="w-full p-3 text-sm"
                              placeholder="Change Mobile Number"
                              name="mobile"
                              type="number"
                            />
                            <hr />
                          </div>
                        </div>

                        <div>
                          <textarea
                            onChange={handleChange}
                            className="w-full py-5 text-sm"
                            placeholder="Description"
                            name="description"
                          />
                          <hr />
                        </div>

                        <div className="flex items-center gap-2">
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
                                <hr className="my-3" />
                                <div>
                                  {skills.map((skill: any, index: any) => (
                                    <div key={index} className="flex items-center justify-between p-2 bg-gray-100 rounded mb-2">
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

                        <div>
                          <input
                            onChange={handleChange}
                            className="w-full p-3 text-sm"
                            placeholder="Change Location"
                            name="location"
                            type="text"
                          />
                          <hr />
                        </div>

                        <div>
                          <input
                            onChange={handleChange}
                            className="w-full p-3 text-sm"
                            placeholder="Change Education"
                            name="education"
                            type="text"
                          />
                          <hr />
                        </div>

                        <div>
                          <input
                            onChange={handleChange}
                            className="w-full p-3 text-sm"
                            placeholder="Change Domain"
                            name="domain"
                            type="text"
                          />
                          <hr />
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <div>
                            <input
                              onChange={handleChange}
                              className="w-full p-3 text-sm"
                              placeholder="Change Budget"
                              name="budget"
                              type="number"
                            />
                            <hr />
                          </div>

                          {/* <div>
                            <input
                              onChange={handleChange}
                              className="w-full p-3 text-sm"
                              placeholder="Estimate Time (in Hours)"
                              name="estimateTime"
                              type="number"
                            />
                            <hr />
                          </div> */}
                        </div>

                        <div className="mt-4 text-right">
                          <button
                            onClick={sumbmitForm}
                            type="button"
                            className="inline-block w-full rounded-xl bg-black px-5 py-3 font-medium text-white sm:w-auto"
                          >
                            Submit Edit
                          </button>
                        </div>
                      </form>
                    </div>
                  </section>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
