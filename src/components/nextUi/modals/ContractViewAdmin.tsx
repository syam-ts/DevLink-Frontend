import {
  Modal,
  ModalContent,
  ModalBody,
  Button,
  useDisclosure,
} from "@heroui/react";

interface Contract {
  createdAt: number;
  deadline: number;
}

interface ContractViewProps {
  contract: Contract;
}

export const ContractView: React.FC<ContractViewProps> = ({ contract }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button className="bg-transparent" onPress={onOpen}>
        <img className="h-5 w-5" src="/public/view-user.png" />
      </Button>
      <Modal size="3xl" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {() => (
            <>
              <ModalBody>
                <div className="w-full mx-auto py-3 arsenal-sc-regular">
                  <div className="lg:w-full mx-auto border-1  border-gray-300 rounded-small">
                    <div className=" p-5 h-[53rem]">
                      <section>
                        <div className="grid arsenal-sc-regular">
                          <div className="sm:text-end flex flex-wrap arsenal-sc-regular">
                            <dl className="px-3">
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
                              <dd className=" text-gray-500">
                                {contract[1]?.deadline}
                              </dd>
                            </dl>
                            <dl className="flex px-10">
                              <dt className="font-semibold text-gray-800">
                                Amount:
                              </dt>
                              <dd className=" text-gray-500">
                                {contract[1]?.amount}
                              </dd>
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
                                  Company Name :
                                  {contract[1]?.clientData?.companyName}
                                </li>
                                <li>
                                  Location : {contract[1]?.clientData?.location}
                                </li>
                                <li>
                                  Email : {contract[1]?.clientData?.email}
                                </li>
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
                                <li>
                                  Location : {contract[1]?.userData?.location}
                                </li>
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
                                <li>
                                  Title : {contract[1]?.jobPostData?.title}
                                </li>
                                <li>
                                  Description :{" "}
                                  <span className='text-sm'>{contract[1]?.jobPostData?.description}</span>
                                </li>
                                <li>
                                  Expert Level :{" "}
                                  {contract[1]?.jobPostData?.expertLevel}
                                </li>
                                <li>
                                  Project Type :{" "}
                                  {contract[1]?.jobPostData?.projectType}
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </section>
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
