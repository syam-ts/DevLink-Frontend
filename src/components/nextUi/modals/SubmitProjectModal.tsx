import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import axios from "axios";
import { toast } from "sonner";

export const SubmitProject = ({contractId, jobTitle }: any) => {

  const [formData, setFormData] = useState({
    description: "",
    progress: "",
    attachedFile: ""
  })
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [size, setSize] = React.useState("md");
 
 
  const handleOnChange = (e: any) => {
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

  const submitProject = async () => {
    try{

        const { data } = await axios.post(`http://localhost:3000/user/project/submit/${contractId}`, {formData});

        console.log('DATA RESPONSE ', data)
        data.success ? (
            
            window.location.href = `http://localhost:5173/user/job/myContracts/${contractId}/user`

        ) : (
            toast.error(data.message)
        )
    }catch(err: any) {
        console.error("ERROR: ",err.message);
    }
  }
 


  return (
    <>
      <div>
        
          <Button className="py-2 px-4 mt-8 bg-[#0000ff] text-white rounded-md shadow-xl" key="5xl" onPress={() => handleOpen(size)}>
            Submit Project
          </Button>
      
      </div>
      <Modal isOpen={isOpen} size="5xl" backdrop="blur" onClose={onClose}>
        <ModalContent className='belleza-regular px-5 py-2'>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Project Submit: {jobTitle}</ModalHeader>
              <ModalBody>
                <label>Description About The Contract</label>
                 <textarea onChange={handleOnChange} className='border rounded-lg h-44 p-10' name='description' placeholder='description' />
                  <div className='flex gap-20'>
                    <label> Progress Of Project: </label>
                  <input onChange={handleOnChange} className='border rounded-lg py-2 p-3' name='progress' type='number'  placeholder='100' />
                  <label> Attach File: </label>
                  <input onChange={handleOnChange} className='border rounded-lg py-2 p-3' type='file' name='attachedFile' placeholder='Attach File' />

                    </div>                
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
               
                <button onClick={submitProject} className="py-2 px-4 bg-[#0000ff] text-white rounded-md shadow-xl" key="5xl" >

                           Submit
                    </button>
                  
              
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

