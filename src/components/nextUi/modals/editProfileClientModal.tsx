import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Sonner } from "../../../components/sonner/Toaster";
import { addRequest } from "../../../redux/slices/adminSlice";
import { useDispatch } from "react-redux";
import { apiClientInstance } from '../../../api/axiosInstance/axiosClientRequest';

interface EditClientModalProps {
  clientId: string;
  type: string;
};

interface Client {
  companyName: string;
    location: string;
    description: string;
    numberOfEmployees: string;
    since: string;
}


export const EditClientModal: React.FC<EditClientModalProps> = ({
  clientId,
  type,
}) => {

  const [clientData, setClientData] = useState<Client>({
    companyName: "",
    location: "",
    description: "",
    numberOfEmployees: "",
    since: "",
  }); 
  const [formData, setFormData] = useState<Client>({
    companyName: "",
    location: "",
    description: "",
    numberOfEmployees: "",
    since: "",
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [size, setSize] = useState<string>("md"); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const response = await apiClientInstance.get(`/profile/view/${clientId}`,
        {
          withCredentials: true,
        }
      );
      setClientData(response?.data?.data);
    })();
  }, []);

  const handleChange = (e:  React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };
 
  const sumbmitForm = async () => {
    try {

      console.log('The form data: ', formData)
      const data = {
        editData: formData,
        unhangedData: clientData,
      };

      // const response = await apiClientInstance.post(`/profile/${type}/${clientId}`,
      //   data,
      //   {
      //     withCredentials: true,
      //   }
      // );

      // console.log("The rfspons e", response.data);

      // if (response.data.success) {
      //   dispatch(addRequest(response.data));
      //   toast.success(response.data.message);
      //   navigate("/client/profile/profile");
      // } else {
      //   toast.error(response.data.message);
      // }
    } catch (err: any) {
      toast.error(err.message);

      console.log(err);
    }
  };

  const handleOpen = (size: any) => {
    setSize(size);
    onOpen();
  };

  return (
    <>
      <div className="flex flex-wrap gap-3">
        <Sonner />

        <Button
          className=" bg-transparent text-white font-bold"
          key={size}
          onPress={() => handleOpen(size)}
        >
          {type === "edit" ? <span> Edit </span> : <span> Verify </span>}
        </Button>
      </div>
      <Modal isOpen={isOpen} backdrop={"blur"} size={"5xl"} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              {/* <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader> */}
              <ModalBody>
                <div>
                  <div className="h-full py-7 w-full comfortaa-regular">
                    <div className="container">
                      <div>
                        <p className="text-gray-500 text-xs">
                          * Edit the data and wait for admin approval.
                        </p>

                        <div className="p-4 px-4 md:p-8 ">
                          <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                            <div className="lg:col-span-3 px-4">
                              <div className="grid gap-4 gap-y-1 text-sm grid-cols-1 md:grid-cols-5">
                                <div className="md:col-span-full w-full">
                                  <label>Company Name</label>
                                  <input
                                    onChange={handleChange}
                                    id="companyName"
                                    className="h-8 border-1 border-gray-400 mt-1  px-4 w-full "
                                    placeholder="xyccompany"
                                  />
                                </div>

                                <div className="md:col-span-5">
                                  <label>Description</label>
                                  <input
                                    onChange={handleChange}
                                    id="description"
                                    className=" h-44 border-1 border-gray-400 mt-1  px-4 w-full "
                                    placeholder="Software developing company working over an decade listed on indias top 10 revenued comapny at 2015"
                                  />
                                </div>

                                <div className="md:col-span-5">
                                  <label>Location</label>
                                  <input
                                    onChange={handleChange}
                                    id="location"
                                    type="text"
                                    className=" h-8 border-1 border-gray-400 mt-1  px-4 w-full "
                                    placeholder="Bangalore"
                                  />
                                </div>

                                <div className="md:col-span-5">
                                  <label>Domain</label>
                                  <input
                                    onChange={handleChange}
                                    id="domain"
                                    type="text"
                                    className=" h-8 border-1 border-gray-400 mt-1  px-4 w-full "
                                    placeholder="Full Stack"
                                  />
                                </div>
                                <div className="md:col-span-5">
                                  <label>Since</label>
                                  <input
                                    onChange={handleChange}
                                    id="since"
                                    type="number"
                                    className=" h-8 border-1 border-gray-400 mt-1  px-4 w-full "
                                    placeholder="2001"
                                  />
                                </div>

                                <div className="md:col-span-5">
                                  <label>Total Employees</label>
                                  <input
                                    onChange={handleChange}
                                    id="numberOfEmployees"
                                    className=" h-8 border-1 border-gray-400 mt-1  px-4 w-full "
                                    placeholder="140"
                                  />
                                </div>

                                <div className="md:col-span-5 text-right">
                                  <div className="inline-flex items-end">
                                    <button
                                      onClick={sumbmitForm}
                                      className="bg-black rounded-lg hover:bg-blue-500 text-white font-bold py-2 px-4 "
                                    >
                                      {" "}
                                      Submit{" "}
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </ModalBody>
              {/* <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter> */}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

// profilePicture?: string;
// location?:string;
// skills?: [string];
