import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
  } from "@heroui/react";
  
  export const SendProposalModal = () => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
  
    return (
      <>
        <Button className='rounded-xl bg-green-600 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2' onPress={onOpen}>Apply</Button>
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
                <ModalBody className='p-44'>
           
                <div className='arsenal-sc-regular '>
                   <div className='flex gap-5'>
                   <div className='flex gap-5 m-2'>
                    <label> Propose Amount </label>
                    <div className="relative flex items-center max-w-[190px]">
                        
                            
                        <input
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
                            
                        <input
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
                        <textarea className="w-full h-44 p-10 pl-10 pr-4 text-gray-900 bg-gray-200 rounded-lg border-2 border-transparent outline-none transition duration-300 ease-in-out placeholder-gray-400 focus:border-gray-400 focus:bg-white focus:ring-4 focus:ring-stone-200 hover:border-gray-400 hover:bg-white" placeholder='I want to do this job, i am good at ......' />
                       
                        </div>
                    </div>
                        <div className='mt-5 flex gap-24'>
                            <label>Attch file*</label>
                            <input type='file' accept="image" />
                            </div>
                    <span className='text-sm absolute my-12'><ul>
                          <li className='list-disc'>You are requesting for a jobpost which cannot be cancelled.</li>
                        </ul></span>

                </div>
                 
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary" onPress={onClose}>
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
  