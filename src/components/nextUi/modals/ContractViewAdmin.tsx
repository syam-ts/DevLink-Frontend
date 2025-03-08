import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import { apiAdminInstance } from "../../../api/axiosInstance/axiosAdminInstance";
import { useEffect, useState } from "react";

interface ContractViewProps {
  contract: string;
}

export const ContractView: React.FC<ContractViewProps> = ({ contract }) => {
 
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  

//   useEffect(() => {
//     try{
//         const fetchContract = async() => {
//            const {data} = await apiAdminInstance.get(`/contract/${contractId}`);
//            console.log('The result: ', data);
//            setContract(data.contract);
//         };
//         fetchContract();

//     }catch(error: unknown) {
//         const err = error as {message: string};
//         console.error(err.message);
//     }
//   }, []);

  return (
    <>
      <Button className="bg-transparent" onPress={onOpen}>
        <img className="h-5 w-5" src="/public/view-user.png" />
      </Button>
      <Modal size="3xl" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <div className="w-full mx-auto py-3 arsenal-sc-regular">
                  <div className=" bg-black lg:w-full mx-auto border-1 border-gray-300 rounded-small">
                
                    <div
                      //   ref={contentRef}
                      className=" p-5 bg-white"
                    >
                      <section>
                        <div className="grid arsenal-sc-regular">  
                          <div className="sm:text-end  flex flex-wrap arsenal-sc-regular"> 
                              <dl className="flex px-10">
                                <dt className="font-semibold text-gray-800">
                                  Contract id:  
                                </dt> 
                                <dd className=" text-gray-500">
                                  849234023jkdjfw
                                </dd> 
                              </dl>

                              <dl className="flex px-10">
                                <dt className="font-semibold text-gray-800">
                                  Created date:
                                </dt>
                                <dd className=" text-gray-500">
                                  {contract[1]?.createdAt}
                                </dd>
                              </dl>
                              <dl className="flex px-10">
                                <dt className="font-semibold text-gray-800">
                                  Due date:
                                </dt>
                                <dd className=" text-gray-500">{contract[1]?.deadline}</dd>
                              </dl> 
                              <dl className="flex px-10">
                                <dt className="font-semibold text-gray-800">
                                 Amount:
                                </dt>
                                <dd className=" text-gray-500">{contract[1]?.amount}</dd>
                              </dl> 
                          </div>
                        </div>
                      </section>

                      <section>
                        <div className="mt-3  sm:justify-center arsenal-sc-regular">
                          <div className=" ">
                            <span className="text-2xl font-bold">
                              Parties Involved
                            </span>
                          </div>

                          <div className="font-semibold mt-2">
                            <span>CLIENT</span>
                            <hr className="bg-black " />
                            <div>
                              <ul className="text-md">
                                <li>
                                  Company Name : {contract[1]?.clientData?.companyName}
                                </li>
                                <li>Location : {contract[1]?.clientData?.location}</li>
                                <li>Email : {contract[1]?.clientData?.email}</li>
                              </ul>
                            </div>
                          </div>

                          <hr className="bg-black " />
                          <div className="font-semibold">
                            <span>FREELANCER</span>
                            <hr className="bg-black " />
                            <div>
                              <ul className="text-md">
                                <li>Name : {contract[1]?.userData?.name}</li>
                                <li>Location : {contract[1]?.userData?.location}</li>
                                <li>Email : {contract[1]?.userData?.email}</li>
                              </ul>
                            </div>
                          </div>
                          <hr className="bg-black " />
                          <div className="font-semibold">
                            <span>JOB DETAILS</span>
                            <hr className="bg-black " />
                            <div>
                              <ul className="text-md">
                                <li>Title : {contract[1]?.jobPostData?.title}</li>
                                <li>
                                  Description : {contract[1]?.jobPostData?.description}
                                </li>
                                <li>
                                  Expert Level : {contract[1]?.jobPostData?.expertLevel}
                                </li>
                                <li>
                                  Project Type : {contract[1]?.jobPostData?.projectType}
                                </li> 
                                 
                              </ul>
                            </div>
                          </div>
                        </div>
                      </section>

                      <p className="mt-5 text-sm text-gray-500">
                        © 2025 Devlink.
                      </p>
                    </div>
                  </div>
                </div>
              </ModalBody> 
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
