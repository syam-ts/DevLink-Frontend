import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import axios from "axios";
import { toast } from "sonner";
import { Sonner } from "../../../components/sonner/Toaster";

export const ContractRespond = ({ contractId }: any) => {

  const [formData, setFormData] = useState({
    description: "",
    progress: ""
  });
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [size, setSize] = React.useState("md");
  

   const handleChange = (e: any) => {
  
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  const handleOpen = (size: string) => {
    setSize(size);
    onOpen();
  };

 
 
 

  const submitResponse = async () => {
    try{
      
        const body = {
            contractId: contractId,
            description: formData.description,
            progress: formData.progress
        }
 

       const { data } = await axios.post(`http://localhost:3000/user/contact/response`, body);

       console.log('THE RESPONSE FROM CLOSE CONTREACT API : ', data);
       toast.success(data?.message || 'Contract closed successfully and amount will credit soon ')
       window.location.href= 'http://localhost:5173/user/home'
    }catch(err: any) {
        console.error('ERROR: ', err.message);
    }
  }


  return (
    <>
      <div className="flex flex-wrap gap-3 bg-white">
        <Sonner />
   
          <Button className='bg-slate-800 rounded-md text-white font-bold' key={size} onPress={() => handleOpen("5xl")}>
            Respond
          </Button>
    
      </div>
      <Modal isOpen={isOpen} size={"5xl"} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col ">Reponse</ModalHeader>
              <ModalBody>
                <p>
                    <label className='font-bold text-lg pb-2'> Enter the description about the job </label>
                 <textarea onChange={handleChange} name='description'  className='h-44 w-full border-black border' placeholder='Enter the description about the job'>

                 </textarea>
                </p>
                 
                <div className='grid font-bold text-lg'>
                 <label> Enter the progress </label>
                  <input name='progress' onChange={handleChange} type='number' className='w-28 h-10 border border-black' placeholder='100%' />
                </div>
              </ModalBody>
              <ModalFooter> 
                <Button color="primary" onClick={submitResponse}>
                  Submit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

