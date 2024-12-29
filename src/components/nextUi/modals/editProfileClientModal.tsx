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

export default function App({ clientId, type }: any) {


  const [formData, setFormData] = useState({
    companyName: "",
    location: "",
    description: "",
    requiredSkills: "",
    totalEmployees: "",
    since: ""
  });


  const {isOpen, onOpen, onClose} = useDisclosure();
  const [size, setSize] = React.useState("md");
  
  const navigate = useNavigate();

  const handleChange = (e: any) => {
  
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

 
 
  const sumbmitForm = async () => {
    try{ 

      const response = await axios.post(`http://localhost:3000/client/profile/${type}/${clientId}`, formData, {
        withCredentials: true
      });
 
      if(response.data.type === 'success') {
        toast.success(response.data.message)
           navigate('/client/profile/profile')
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

          <Button className=' bg-transparent text-white font-bold' key={size} onPress={() => handleOpen(size)}>
              { type === 'edit' ? ( <span> Edit </span> ) : ( <span> Verify </span> )} 
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
                  

                            <div className="lg:col-span-2">
                                <div className="grid gap-4 gap-y-1 text-sm grid-cols-1 md:grid-cols-5">
                       
                            <div className="md:col-span-full w-full">
                                    <label>Company Name</label>
                                    <input  onChange={handleChange} name="companyName" className="h-8 border mt-1  px-4 w-full " placeholder="change location" />
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
                                    <label>Since</label>
                                    <input  onChange={handleChange} name="since" className="h-8 border mt-1  px-4 w-full " placeholder="change location" />
                                </div>
  
                                <div className="md:col-span-5">
                                    <label>Total Employees</label>
                                    <input  onChange={handleChange} name="totalEmployees" className="h-8 border mt-1  px-4 w-full " placeholder="change location" />
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