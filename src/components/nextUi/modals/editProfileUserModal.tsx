import React, { useState } from "react";
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
    description: "",
    location: "",
    skills: "",
    budget: ""
  });


  const {isOpen, onOpen, onClose} = useDisclosure();
  const [size, setSize] = React.useState("md");

  const userId = useSelector((state: any) => state?.user?.currentUser?.user?.user);

  const { _id } = userId; 
  const navigate = useNavigate();

  const handleChange = (e: any) => {
  
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  console.log('The form data', formData)
 
  const sumbmitForm = async () => {
    try{

      const response = await axios.put(`http://localhost:3000/user/profile/edit/${_id}`, formData, {
        withCredentials: true
      });

      console.log('The response of edit : ', response.data.type);
      if(response.data.type === 'success') {
        toast.success(response.data.message)
           navigate('/user/profile/profile')
      }

    }catch(err: any) {
      console.log(err.message);
    }
  }


  const handleOpen = (size: any) => {
    setSize(size);
    onOpen();
  };

  return (
 


    <>
      <div className="flex flex-wrap gap-3">
         
         <Sonner />


          <Button className=' bg-transparent text-white -none' key={size} onPress={() => handleOpen(size)}>
            Edit 
          </Button> 
      </div>
      <Modal isOpen={isOpen} backdrop={'blur'} size={"5xl"}  onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              {/* <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader> */}
              <ModalBody>
              <div> 
                 <div className="min-h-full w-full flex items-center justify-center">
                    <div className="container max-w-screen-lg mx-auto">
                        <div>
                        <h2 className="font-semibold text-xl text-gray-600">Your Profile</h2>
                        <p className="text-gray-500 text-xs mb-6">Edit all here.</p>

                        <div className="bg-white  p-4 px-4 md:p-8 mb-6">
                            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                            <div className="text-gray-600">
                                <p className="font-medium text-lg">Personal Details</p> 
                                <img className='h-44 w-44 mt-20' src='data:image/jpeg;base64,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' />
                             
                            </div>

                            <div className="lg:col-span-2">
                                <div className="grid gap-4 gap-y-1 text-sm grid-cols-1 md:grid-cols-5">
                                <div className="md:col-span-5">
                                    <label>Name</label>
                                    <input onChange={handleChange} name="name" className="h-8 border mt-1 px-4 w-full " placeholder='change name' />
                                </div> 

                                <div className="md:col-span-5">
                                    <label>Age</label>
                                    <input name="age" type='number' className="h-8 border mt-1  px-4 w-full " placeholder="change age" />
                                </div>

                                <div className="md:col-span-5">
                                    <label>Mobile</label>
                                    <input onChange={handleChange} name="mobile" type='number' className="h-8 border mt-1  px-4 w-full " placeholder="change mobile number" />
                                </div>

                                <div className="md:col-span-5">
                                    <label>Description</label>
                                    <input  onChange={handleChange} name="description" className="h-44 border mt-1  px-4 w-full " />
                                </div>

                                <div className="md:col-span-5">
                                    <label>Location</label>
                                    <input  onChange={handleChange} name="location" className="h-8 border mt-1  px-4 w-full " placeholder="change location" />
                                </div>
 

                                <div className="md:col-span-5">
                                    <label>Skills</label>
                                    <input  onChange={handleChange} name="skills" className="h-8 border mt-1  px-4 w-full " placeholder="change skills" />
                                </div> 

                                <div className="md:col-span-5">
                                    <label>Budget</label>
                                    <input  onChange={handleChange} name="budget" className="h-8 border mt-1  px-4 w-full " placeholder="change budget" />
                                </div>
                    
                                <div className="md:col-span-5 text-right">
                                    <div className="inline-flex items-end">
                                    <button onClick={sumbmitForm} className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 "> Submit </button>
                                    </div>
                                </div>

                                </div>
                              </div>
                            </div>
                          </div>
                        </div> 
                       </div>
                    </div>
                </div>
              </ModalBody>
              {/* <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter> */}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
 
// profilePicture?: string;
// location?:string;
// skills?: [string];