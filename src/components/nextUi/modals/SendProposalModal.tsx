import { Sonner } from "../../../components/sonner/Toaster";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react"; 
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import apiInstance from '../../../api/axiosInstance'


export const SendProposalModal = ({ jobPostId }: any) => {

  const [formData, setFormData] = useState({
    bidAmount: "",
    bidDeadline: "",
    description: "",
    attachedFile: ""
  });
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const userId = useSelector((state: any) => state?.user?.currentUser?._id)



  const handleOnChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }


  const submitProposal = async () => {
    try {
      const body = {
        userId,
        jobPostId,
        description: formData.description,
        bidAmount: formData.bidAmount,
        bidDeadline: formData.bidDeadline
      }

      const { data } = await apiInstance.post('http://localhost:3000/user/job/createProposal', {
        body
      });
  

      if (!data.success) {
        toast.error(data.message, {
          style: {
            backgroundColor: 'yellow'
          }
        })
      } else {
       // window.location.href = `http://localhost:5173/user/job/${userId}`
      }
    } catch (err: any) {
      console.log('ERROR: ', err.response.data.message);
      toast.error(err.message.response.data.message)
    }
  }

  return (
    <>
      <Sonner />
      <Button className='rounded-xl bg-green-500 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2' onPress={onOpen}>Apply</Button>
      <Modal
        backdrop="opaque" size="full"
        classNames={{
          backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
        }}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 mx-auto mt-5">Draft Job Proposal</ModalHeader>
              <ModalBody className='px-52 py-28'>

                <div className='arsenal-sc-regular '>
                  <div className='flex gap-5'>
                    <div className='flex gap-5 m-2'>
                      <label> Propose Amount </label>
                      <div className="relative flex items-center max-w-[190px]">


                        <input onChange={handleOnChange}
                          type="number"
                          name='bidAmount'
                          placeholder="₹200.00"
                          className="w-full h-10 pl-10 pr-4 text-gray-900 bg-gray-200 rounded-lg border-2 border-transparent outline-none transition duration-300 ease-in-out placeholder-gray-400 focus:border-gray-400 focus:bg-white focus:ring-4 focus:ring-stone-200 hover:border-gray-400 hover:bg-white"
                        />
                      </div>
                    </div>
                    <div className='flex gap-5 mt-3'>
                      <label> Propose Deadline </label>
                      <div className="relative flex items-center max-w-[190px]">

                        <input onChange={handleOnChange}
                          type="number"
                          name='bidDeadline'
                          placeholder="12/hr"
                          className="w-full h-10 pl-10 pr-4 text-gray-900 bg-gray-200 rounded-lg border-2 border-transparent outline-none transition duration-300 ease-in-out placeholder-gray-400 focus:border-gray-400 focus:bg-white focus:ring-4 focus:ring-stone-200 hover:border-gray-400 hover:bg-white"
                        />
                      </div>
                    </div>
                  </div>

                  <div className='flex gap-5 mt-5'>
                    <label> Propose Description </label>
                    <div className="relative flex items-center w-full pr-10">
                      <textarea onChange={handleOnChange} name='description' className="w-full h-44 p-10 pl-10 pr-4 text-gray-900 bg-gray-200 rounded-lg border-2 border-transparent outline-none transition duration-300 ease-in-out placeholder-gray-400 focus:border-gray-400 focus:bg-white focus:ring-4 focus:ring-stone-200 hover:border-gray-400 hover:bg-white" placeholder='I want to do this job, i am good at ......' />

                    </div>
                  </div>
                  <div className='mt-5 flex gap-24'>
                    <label>Attch file*</label>
                    <input onChange={handleOnChange} name='attachedFile' type='file' accept="image" />
                  </div>
                  <span className='text-sm absolute my-12'><ul>
                    <li className='list-disc font-sans text-xs'>You are requesting for a jobpost proposal which cannot be cancelled later. if you aggreed
                      on the condition click submit
                    </li>
                  </ul></span>

                </div>

              </ModalBody>
              <ModalFooter>

                <button onClick={onClose} className="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2" type="button">
                  Close
                </button>
                <button onClick={submitProposal} className="rounded-md bg-blue-700 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2" type="button">
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
