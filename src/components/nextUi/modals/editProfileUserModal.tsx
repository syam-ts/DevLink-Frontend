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


          <Button className=' bg-transparent text-white rounded-none' key={size} onPress={() => handleOpen(size)}>
            Edit 
          </Button> 
      </div>
      <Modal isOpen={isOpen} backdrop={'blur'} size={"5xl"} onClose={onClose}>
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

                        <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                            <div className="text-gray-600">
                                <p className="font-medium text-lg">Personal Details</p> 
                                <img className='h-44 w-44 mt-20' src='https://kalsisolar.com/images/543955831.jpg' />
                             
                            </div>

                            <div className="lg:col-span-2">
                                <div className="grid gap-4 gap-y-1 text-sm grid-cols-1 md:grid-cols-5">
                                <div className="md:col-span-5">
                                    <label>Name</label>
                                    <input onChange={handleChange} name="name" className="h-10 border mt-1 rounded px-4 w-full bg-slate-300" />
                                </div> 

                                <div className="md:col-span-5">
                                    <label>Age</label>
                                    <input name="age" type='number' className="h-10 border mt-1 rounded px-4 w-full bg-slate-300" placeholder="email@domain.com" />
                                </div>

                                <div className="md:col-span-5">
                                    <label>Mobile</label>
                                    <input onChange={handleChange} name="mobile" type='number' className="h-10 border mt-1 rounded px-4 w-full bg-slate-300" placeholder="email@domain.com" />
                                </div>

                                <div className="md:col-span-5 pt-12">
                                    <label>Description</label>
                                    <input  onChange={handleChange} name="description" className="h-44 border mt-1 rounded px-4 w-full bg-slate-300" />
                                </div>

                                <div className="md:col-span-5">
                                    <label>Location</label>
                                    <input  onChange={handleChange} name="location" className="h-10 border mt-1 rounded px-4 w-full bg-slate-300" placeholder="email@domain.com" />
                                </div>
 

                                <div className="md:col-span-5">
                                    <label>Skills</label>
                                    <input  onChange={handleChange} name="skills" className="h-10 border mt-1 rounded px-4 w-full bg-slate-300" placeholder="email@domain.com" />
                                </div> 

                                <div className="md:col-span-5">
                                    <label>Budget</label>
                                    <input  onChange={handleChange} name="budget" className="h-10 border mt-1 rounded px-4 w-full bg-slate-300" placeholder="email@domain.com" />
                                </div>
                    
                                <div className="md:col-span-5 text-right">
                                    <div className="inline-flex items-end">
                                    <button onClick={sumbmitForm} className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"> Submit </button>
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