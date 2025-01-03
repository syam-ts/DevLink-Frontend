import React from "react";
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

export default function App() {

  const [description, setDescription] = React.useState('');
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [size, setSize] = React.useState("md");
 

  const handleOpen = (size: string) => {
    setSize(size);
    onOpen();
  };

  const handleChange = (e: any) => {
    setDescription(e.target.value)
  }

  const sendProposal = async () => {
    try{
        const response = await axios.post(`http://localhost:3000/user/job/createPropsal/`)
    }catch(err: any) {
        console.log('ERROR: ',err.message);
    }
  }

  return (
    <>
      <div className="flex flex-wrap gap-3">
   
          <Button className='bg-black text-white' key={size} onPress={() => handleOpen(size)}>
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

