import React from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
} from "@heroui/react";

export const InviteModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [size, setSize] = React.useState("md");

    const handleOpen = (size: string) => {
        setSize(size);
        onOpen();
    };

    const inviteUserFunction = () => {
        try{

        }catch(err: any) {
            console.log(err.message);
        }
    }

    return (
        <>
            <div className="">
                <Button
                    className="bg-white text-black px-4 font-bold py-2 rounded-lg"
                    key={size}
                    onPress={() => handleOpen(size)}
                >
                    Invite
                </Button>
            </div>
            <Modal isOpen={isOpen} size={"4xl"} backdrop="blur" onClose={onClose}>
                <ModalContent className='arsenal-sc-regular w-full'>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Invite User
                            </ModalHeader>
                            <ModalBody>
                                <div className='mx-auto'>
                                    <div className="w-[500px] ">
                                        <label className="block mb-1 text-sm text-slate-800">
                                            Select A Job
                                        </label>

                                        <div className="relative">
                                            <select className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer">
                                                <option value="brazil">Brazil</option>
                                                <option value="bucharest">Bucharest</option>
                                                <option value="london">London</option>
                                                <option value="washington">Washington</option>
                                            </select>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke-width="1.2"
                                                stroke="currentColor"
                                                className="h-5 w-5 ml-1 absolute top-2.5 right-2.5 text-slate-700"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                                                />
                                            </svg>
                                        </div>
                                        <p className="flex items-center mt-2 text-xs text-slate-500">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                className="w-5 h-5 mr-2"
                                            >
                                                <path
                                                    fill-rule="evenodd"
                                                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                                                    clip-rule="evenodd"
                                                ></path>
                                            </svg>
                                            Your location helps us to provide location-specific
                                            services.
                                        </p>
                                    </div>
                                </div>
                                <div className='mx-auto'>
                                    <div className="w-[500px]">
                                        <div className="relative w-full min-w-[200px]">
                                            <textarea
                                                className="peer h-full min-h-[100px] w-full resize-none rounded-[7px] border border-blue- px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200  focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                                                placeholder=" "
                                            ></textarea>
                                            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2   peer-focus:before:border-gray-900  peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                                Description
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button className='bg-[#ff0004] text-white font-bold' variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button className='bg-[#0000ff] text-white font-bold' onPress={onClose}>
                                    Invite
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};
