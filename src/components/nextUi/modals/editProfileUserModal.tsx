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
    profilePicture: "",
    description: "",
    location: "",
    skills: "",
    budget: ""
  });
 
  const [user, setUser]: any = useState({})
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

 useEffect(() => {

  (async() => {
      try{

        const response = await axios.get(`http://localhost:3000/user/profile/view/${_id}`,{
          withCredentials: true
      }); 
      console.log('The reponse : ', response.data?.data)
      setUser(response.data?.data)

      }catch(err: any) {
        console.log("ERROR: ",err.message);
      }
  })();
 }, []);

 
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
  var loadFile: any = function(event: any) {
            
    var input = event.target;
    var file = input.files[0];
    var type = file.type;

   var output: any = document.getElementById('preview_img');


    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function() {
        URL.revokeObjectURL(output.src) // free memory
    }
};

console.log("the for ", formData)

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
          {() => (
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
                                <div className="flex items-center py-44 space-x-6">
                                      <div className="shrink-0">
                                        <img id='preview_img' onChange={handleChange} className="h-44 w-44 object-cover rounded-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSxwtNwBZrujgVzK44NhBAi0ybAxnnCB8VgueUBMjv1XkEAephINAcGhzFNWukvZ0VbVA&usqp=CAU" alt="Current profile photo" />
                                      </div>
                                      <label className="block"  onChange={(event: any) =>loadFile(event)}> 
                                        <input type="file" name='profilePicture'
                                        onChange={handleChange} 
                                        accept="image/*"
                                        //  onChange={(event: any) =>loadFile(event)}
                                         className="block w-full text-sm text-slate-500
                                          file:mr-4 file:py-2 file:px-2
                                          file:rounded-full file:border-0
                                          file:text-sm file:font-semibold
                                          file:bg-violet-50 file:text-violet-700
                                          hover:file:bg-violet-100
                                        "/>
                                      </label>
                                    </div>

                            </div>

                            <div className="lg:col-span-2">
                                <div className="grid gap-4 gap-y-1 text-sm grid-cols-1 md:grid-cols-5">
                                <div className="md:col-span-5">
                                    <label>Name</label>
                                    <input defaultValue={user?.name} onChange={handleChange} name="name" className="h-8 border mt-1 px-4 w-full " placeholder='change name' />
                                </div> 

                                <div className="md:col-span-5">
                                    <label>Age</label>
                                    <input name="age" defaultValue={user?.age} type='number' className="h-8 border mt-1  px-4 w-full " placeholder="change age" />
                                </div> 

                                <div className="md:col-span-5">
                                    <label>Mobile</label>
                                    <input defaultValue={user?.mobile} onChange={handleChange} name="mobile" type='number' className="h-8 border mt-1  px-4 w-full " placeholder="change mobile number" />
                                </div>

                                <div className="md:col-span-5">
                                    <label>Description</label>
                                    <input defaultValue={user?.description} onChange={handleChange} name="description" className="h-44 border mt-1  px-4 w-full " />
                                </div>

                                <div className="md:col-span-5">
                                    <label>Location</label>
                                    <input defaultValue={user?.location} onChange={handleChange} name="location" className="h-8 border mt-1  px-4 w-full " placeholder="change location" />
                                </div>
 

                                <div className="md:col-span-5">
                              
                                    {/* <input  onChange={handleChange} name="skills" className="h-8 border mt-1  px-4 w-full " placeholder="change skills" /> */}
                                </div> 

                                <div className="md:col-span-5">
                                    <label>Budget</label>
                                   
                                    <input  defaultValue={user?.budget} onChange={handleChange} name="budget" className="h-8 border mt-1  px-4 w-full " placeholder="change budget" />
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
 

 