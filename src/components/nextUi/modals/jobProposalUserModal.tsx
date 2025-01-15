import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure
} from "@nextui-org/react";
import axios from "axios";
import { toast } from "sonner";
import { Sonner } from "../../../components/sonner/Toaster";
import { useNavigate } from "react-router-dom";


export default function App({clientId, userId, jobPostId}: any) {

  const [description, setDescription] =  useState('');
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [size, setSize] = React.useState("md");
  const navigate = useNavigate()
 

  const handleOpen = (size: string) => {
    setSize(size);
    onOpen();
  };

  const handleChange = (e: any) => {
    setDescription(e.target.value)
  }

  const sendProposal = async () => {
    try{ 

        const response = await axios.post(`http://localhost:3000/user/job/createProposal/${clientId}/${userId}/${jobPostId}`, {description});
        
        if(response.data.success) { 
          toast.success(response.data?.message);
     // Closing modal & redirecting to same page
          onClose();
          navigate('/user/jobs', { replace: true }) 
        } else {
          toast.warning(response.data?.message, {
            style: {
              backgroundColor: "yellow",
              color: "black"
            }
          })
        }
    }catch(err: any) {
      toast.warning(err.message)
        console.log('ERROR: ',err.message);
    }
  }
  

  return (
    <>

      <div className="flex flex-wrap gap-3">
        <Sonner />
 
          <Button className='bg-black text-white rounded-md' key={size} onPress={() => handleOpen(size)}>
            Apply
          </Button>
      
      </div>
      <Modal isOpen={isOpen} size={"5xl"} backdrop="blur" onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex text-2xl flex-col gap-1">Job Proposal</ModalHeader>
              <ModalBody>
                <p className='font-sans text-xl'>
                  Write a clear and precise descritpion for this particular job post, were you can 
                  give a brief about why you are qualified to take this job as a developer and 
                  how better you are from other developers.
                </p>

                <label className='font-bold text-lg mt-5'>Description</label>
                <textarea onChange={handleChange} className='border font-mono h-44 p-5' placeholder='Enter the description' />
             
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onClick={sendProposal}>
                  Send Proposal
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

