import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { jsPDF } from "jspdf";
import { Sonner } from "../../components/sonner/Toaster";
import html2canvas from "html2canvas";
import { apiUserInstance } from "../../api/axiosInstance/axiosUserInstance";
import { apiClientInstance } from "../../api/axiosInstance/axiosClientRequest";

interface Contract {
  clientData: {
    companyName: string;
    location: string;
    email: string;
  };
  userData: {
    name: string;
    location: string;
    email: string;
  };

  jobPostData: {
    title: string;
    description: string;
    expertLevel: string;
    projectType: string;
    paymentType: string;
  };
  status: string;
  amount: number;
  deadline: number;
  createdAt: string;
}

const Contract: React.FC = () => {
  const [contract, setContract] = useState<Contract>({
    clientData: {
      companyName: "",
      location: "",
      email: "",
    },
    userData: {
      name: "",
      location: "",
      email: "",
    },

    jobPostData: {
      title: "",
      description: "",
      expertLevel: "",
      projectType: "",
      paymentType: "",
    },
    status: "",
    amount: 0,
    deadline: 0,
    createdAt: "",
  });
  const { contractId, roleType } = useParams<{
    contractId: string;
    roleType: "user" | "client";
  }>();
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    (async () => {
      try {
        let response;
        if (roleType === "user") {
          response = await apiUserInstance.get(`/contract/${contractId}`);
          if (response.data.success) {
            setContract(response.data?.contract);
          } else {
            toast.error(response.data.message);
          }
        } else {
          response = await apiClientInstance.get(`/contract/${contractId}`);
          if (response.data.success) {
            setContract(response.data?.contract);
          } else {
            toast.error(response.data.message);
          }
        }
      } catch (error: unknown) {
        const err = error as { message: string };
        toast.error(err.message);
      }
    })();
  }, []);

  const downloadPDF = async () => {
    const content = contentRef.current;
    const canvas = await html2canvas(content);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const imgWidth: number = 150;
    const imgHeight: number = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    pdf.save("download.pdf");
  };

  return (
    <div>
      <Sonner />
      {
        <div className="max-w-[99rem] px-4 sm:px-6 lg:px-8 mx-auto arsenal-sc-regular pt-44">
          <div className="sm:w-11/12 lg:w-3/5 mx-auto border-1 border-gray-300">
            <div
              ref={contentRef}
              className="flex flex-col p-4 sm:p-10 bg-white"
            >
              <div className="flex justify-between">
                <div>
                  <h1 className=" text-2xl mx-auto text-blue-600">
                    DevLink Contract
                  </h1>
                </div>

                <div className="text-end">
                  <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
                    Contract
                  </h2>
                  <span className="mt-1 block text-gray-500">3682303</span>
                </div>
              </div>
              <hr />
              <section>
                <div className="mt-3 grid gap-3 arsenal-sc-regular">
                  <div className="grid gap-3">
                    <div className="flex gap-3">
                      <h3 className="text-lg font-semibold text-gray-800">
                        Contract by:{" "}
                      </h3>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {contract?.clientData?.companyName}(client)
                      </h3>
                    </div>
                  </div>

                  <div className="sm:text-end mt-2 arsenal-sc-regular">
                    <div className="">
                      <dl className="flex px-10">
                        <dt className="font-semibold text-gray-800">
                          Contract id:
                        </dt>
                        <dd className=" text-gray-500">849234023jkdjfw</dd>
                      </dl>

                      <dl className="flex px-10">
                        <dt className="font-semibold text-gray-800">
                          Created date:
                        </dt>
                        <dd className=" text-gray-500">
                          {contract?.createdAt}
                        </dd>
                      </dl>
                      <dl className="flex px-10">
                        <dt className="font-semibold text-gray-800">
                          Due date:
                        </dt>
                        <dd className=" text-gray-500">{contract?.deadline}</dd>
                      </dl>
                      <dl className="flex px-10">
                        <dt className="font-semibold text-gray-800">Amount:</dt>
                        <dd className=" text-gray-500">
                          {contract?.amount}/hr
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <div className="mt-8 sm:justify-center arsenal-sc-regular">
                  <div className="py-4">
                    <span className="text-3xl font-bold">Parties Involved</span>
                  </div>

                  <div className="font-semibold">
                    <span>CLIENT</span>
                    <hr className="bg-black " />
                    <div>
                      <ul className="text-md">
                        <li>
                          Company Name : {contract?.clientData?.companyName}
                        </li>
                        <li>Location : {contract?.clientData?.location}</li>
                        <li>Email : {contract?.clientData?.email}</li>
                      </ul>
                    </div>
                  </div>

                  <hr className="bg-black " />
                  <div className="font-semibold">
                    <span>FREELANCER</span>
                    <hr className="bg-black " />
                    <div>
                      <ul className="text-md">
                        <li>Name : {contract?.userData?.name}</li>
                        <li>Location : {contract?.userData?.location}</li>
                        <li>Email : {contract?.userData?.email}</li>
                      </ul>
                    </div>
                  </div>
                  <hr className="bg-black " />
                  <div className="font-semibold">
                    <span>JOB DETAILS</span>
                    <hr className="bg-black " />
                    <div>
                      <ul className="text-md">
                        <li>Title : {contract?.jobPostData?.title}</li>
                        <li>
                          Description : {contract?.jobPostData?.description}
                        </li>
                        <li>
                          Expert Level : {contract?.jobPostData?.expertLevel}
                        </li>
                        <li>
                          Project Type : {contract?.jobPostData?.projectType}
                        </li>
                        <li>Status: {contract?.status}</li>
                        <li>Payment: {contract?.amount}rs</li>
                        <li>
                          Payment Type: {contract?.jobPostData?.paymentType}
                        </li>
                        <li>Deadline: {contract?.deadline}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <div className="mt-8 sm:mt-12">
                  <p className="text-sm">
                    This contract will commence on (Date) according to the terms
                    and condition. It wont valid after met with the deadline.{" "}
                  </p>
                  <p className="text-sm">
                    If you have further questions concerning this contract, use the
                    following contact information:
                  </p>
                  <div className="mt-2">
                    <p className="block text-sm font-medium text-gray-800">
                      devlinkhelp@gmail.com
                    </p>
                    <p className="block text-sm font-medium text-gray-800">
                      +1 (062) 109-9222
                    </p>
                  </div>
                </div>
              </section>

              <p className="mt-5 text-sm text-gray-500">© 2025 Devlink.</p>
            </div>

            <div
              className="mt-6 flex justify-end gap-x-3"
              onClick={downloadPDF}
            >
              <a
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium   bg-white text-gray-800  hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50"
                href="#"
              >
                <svg
                  className="shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" x2="12" y1="15" y2="3" />
                </svg>
                Download Contract
              </a>
            </div>
          </div>
        </div>
      }{" "}
    </div>
  );
};

export default Contract;
