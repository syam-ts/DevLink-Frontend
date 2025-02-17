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

interface FormData {
  description: string,
  progress: number,
  attachedFile: string
}

export const SubmitProject = ({ contractId, jobTitle }: any) => {

  const [formData, setFormData] = useState<FormData>({
    description: "",
    progress: 0,
    attachedFile: ""
  });
  const [progress, setProgress] = useState<string>("completed");
  const { isOpen, onOpen, onClose } = useDisclosure();
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

  const handleComplete = () => {
    formData.progress = 100;
  }

  const submitProject = async () => {
    try {

      console.log('Fomr : ', formData);

      // const { data } = await axios.post(`http://localhost:3000/user/project/submit/${contractId}`, {formData});

      // console.log('DATA RESPONSE ', data)
      // data.success ? (

      //    // window.location.href = `http://localhost:5173/user/job/myContracts/${contractId}/user`

      // ) : (
      //     toast.error(data.message)
      // )
    } catch (err: any) {
      console.error("ERROR: ", err.message);
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
                <div className='flex gap-6'>
                  <label> Progress Of Project: </label>


                  <div className='flex gap-3'>
                    <div className="flex items-center  ">
                      <input type="radio" onChange={handleComplete} value='100' onClick={() => setProgress("completed")} name="default-radio" className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 " />
                      <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">completed</label>
                    </div>
                    <div className="flex items-center">
                      <input type="radio" onClick={() => setProgress("incomplete")} name="default-radio" className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300" />
                      <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">incomplete</label>
                    </div>

                  </div>
                  <div>
                    {
                      progress === "incomplete" ? ( 
                        <input onChange={handleOnChange} className='border rounded-lg p-2 w-12 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none' name='progress' type='number' placeholder='70' />
                      ) : (
                        <div className='w-12'>
                        </div>

                      )
                    }
                  </div>

                  <label> Attach Github: </label>
                  <input onChange={handleOnChange} className='border rounded-lg py-2 p-3' type='url' name='attachedFile' placeholder='Attach Github link' />

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

