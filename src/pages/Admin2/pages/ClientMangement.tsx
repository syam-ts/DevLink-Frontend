import { useEffect, useState } from "react";
import { Sonner } from "../../../components/sonner/Toaster";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import axios from "axios";
import { toast } from "sonner";

const clientManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState<number>();
  const [client, setClient]: any = useState({});


  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3000/admin/getAllClients?page=${currentPage}`,
          {
            withCredentials: true,
          }
        );

        setTotalPages(data?.data?.totalPages);

        setClient(data?.data);
      } catch (err: any) {
        toast.error(err.message, {
          style: {
            backgroundColor: "red",
            color: "white",
          },
        });
      }
    })();
  }, [currentPage]);



  return (
    <div>
      <div className="flex flex-wrap mx-3 mb-5 my-32">
        <Sonner />

        <div className="w-full max-w-full px-3 mb-6  mx-auto">
          <div className="relative flex-[1_auto] flex flex-col break-words min-w-0 bg-clip-border rounded-[.95rem] bg-white m-5">
            <div className="relative flex flex-col min-w-0 break-words border border-dashed bg-clip-border rounded-2xl border-stone-200 bg-light/30">
              <div className="px-9 pt-5 flex justify-between items-stretch flex-wrap min-h-[70px] pb-0 bg-transparent">
                <h3 className="flex flex-col items-start justify-center m-2 ml-0 font-medium text-xl/tight text-dark">
                  <span className="mr-3 font-semibold text-dark">
                    Client Management
                  </span>
                  <span className="mt-1 font-medium text-secondary-dark text-lg/normal">
                    All clients from the Devlink Application
                  </span>
                </h3>

                {/* select section */}

                <div className="flex justify-end ">
                  <div>
                    <Select>
                      {/* <Select onValueChange={(value) => setSortType(value)}> */}
                      <SelectTrigger className="w-[180px] rounded-xl">
                        <SelectValue placeholder="Sort User" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup className="bg-white">
                          <SelectItem value="latest">Latest</SelectItem>
                          <SelectItem value="unBlock">Blocked</SelectItem>
                          <SelectItem value="block">Unblocked</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              {/* <!-- end card header -->
        <!-- card body  --> */}
              <div className="flex-auto block py-8 pt-6 px-9 ">
                <div className="overflow-x-auto">
                  <table className="w-full my-0 align-middle text-dark border-neutral-200">
                    <thead className="align-bottom">
                      <tr className="font-semibold border-b border-gray-400 text-[0.95rem] text-secondary-dark">
                        <th className="pb-3 text-start min-w-[175px]">Name</th>
                        <th className="pb-3 text-end min-w-[100px]">Email</th>
                        <th className="pb-3 text-end min-w-[100px]">
                          Block/UnBlock
                        </th>
                        <th className="pb-3 pr-12 text-end min-w-[175px]">
                          View
                        </th>
                        <th className="pb-3 pr-12 text-end min-w-[100px]">
                          Total Jobs
                        </th>
                        <th className="pb-3 text-end min-w-[50px]">Total Hours</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-300 last:border-b-0">
                        <td className="p-3 pl-0">
                          <div className="flex items-center">
                            <div className="relative inline-block shrink-0 rounded-2xl me-3">
                            <span className="font-semibold text-light-inverse text-md/normal">
                            Google
                          </span>
                            </div>
                           
                          </div>
                        </td>
                        <td className="p-3 pr-0 text-end">
                          <span className="font-semibold text-light-inverse text-md/normal">
                            Olivia Cambell
                          </span>
                        </td>
                        <td className="p-3 pr-0 text-end">
                          <span className="text-center align-baseline inline-flex px-2 py-1 mr-auto items-center font-semibold text-base/none text-success bg-success-light rounded-lg">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              className="w-5 h-5 mr-1"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
                              />
                            </svg>{" "}
                            6.5%{" "}
                          </span>
                        </td>
                        <td className="p-3 pr-12 text-end">
                          <span className="text-center align-baseline inline-flex px-4 py-3 mr-auto items-center font-semibold text-[.95rem] leading-none text-primary bg-primary-light rounded-lg">
                            {" "}
                            In Progress{" "}
                          </span>
                        </td>
                        <td className="pr-0 text-start">
                          <span className="font-semibold text-light-inverse text-md/normal">
                            2023-08-23
                          </span>
                        </td>
                        <td className="p-3 pr-0 text-end">
                          <button className="ml-auto relative text-secondary-dark bg-light-dark hover:text-primary flex items-center h-[25px] w-[25px] text-base font-medium leading-normal text-center align-middle cursor-pointer rounded-2xl transition-colors duration-200 ease-in-out shadow-none border-0 justify-center">
                            <span className="flex items-center justify-center p-0 m-0 leading-none shrink-0 ">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                className="w-4 h-4"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                                />
                              </svg>
                            </span>
                          </button>
                        </td>
                      </tr>
                   
                      
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-5">
        <div className="w-full max-w-full sm:w-3/4 mx-auto text-center">
          <p className="text-sm text-slate-500 py-1">
            {" "}
            DevLink 2025@components{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default clientManagement;
