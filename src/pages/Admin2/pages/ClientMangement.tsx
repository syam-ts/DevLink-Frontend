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

interface Client {
  comapnyName: string
  email: string
  isBlocked: boolean
  view: string
  totalJobs: number
  totalHours: number
};

const clientManagement: React.FC = () => {

  const [client, setClient] = useState<Client>({
    comapnyName: "",
    email: "",
    isBlocked: false,
    view: "",
    totalJobs: 0,
    totalHours: 0,
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [sortType, setSortType] = useState<string>("latest");
  const [isBlockedTrigger, setIsBlockedTrigger] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3000/admin/getAllClients?page=${currentPage}&sortType=${sortType}`,
          {
            withCredentials: true,
          }
        );
        setClient(data?.data.clients);
        setTotalPages(data?.data?.totalPages);
      } catch (error: unknown) {
        const err = error as { message: string };
        toast.error(err.message, {
          style: {
            backgroundColor: "red",
            color: "white",
          },
        });
      }
      setIsBlockedTrigger(false);
    })();
  }, [currentPage, isBlockedTrigger, sortType]);

  const changePage = async (page: number) => {
    setCurrentPage(page);
  };

  const handleSortType = (value: string) => {
    setSortType(value);
    setCurrentPage(1);
  };

  const blockClient = async (clientId: string) => {
    try {
      const response = await axios.patch(
        `http://localhost:3000/admin/blockClient/${clientId}`
      );

      setIsBlockedTrigger(true);
      if (response.data.success) {
        toast.success("client blocked", {
          position: "top-center",
          style: {
            width: "11rem",
            height: "3rem",
            justifyContent: "center",
            backgroundColor: "yellow",
            color: "black",
          },
        });
      }
    } catch (error: unknown) {
      const err = error as { message: string };
      toast.error(err.message);
    }
  };

  const unBlockClient = async (clientId: string) => {
    try {
      const response = await axios.patch(
        `http://localhost:3000/admin/unblockClient/${clientId}`
      );
      setIsBlockedTrigger(true);
      if (response.data.success) {
        toast.success("client unblocked", {
          position: "top-center",
          style: {
            width: "11rem",
            height: "3rem",
            justifyContent: "center",
            backgroundColor: "#32a852",
            color: "white",
          },
        });
      }
    } catch (error: unknown) {
      const err = error as { message: string };
      toast.error(err.message);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap nunito-regular">
        <Sonner />
        <div className="w-full max-w-full px-3 mb-6  mx-auto">
          <div className="relative flex-[1_auto] flex flex-col break-words min-w-0 bg-clip-border rounded-[.95rem] bg-white m-5">
            <div className="relative flex flex-col min-w-0 break-words border border-dashed bg-clip-border rounded-2xl border-stone-200 bg-light/30">
              <div className="px-9 pt-5 flex justify-between items-stretch flex-wrap min-h-[70px] pb-0 bg-transparent">
                <h3 className="flex flex-col items-start justify-center m-2 ml-0 font-medium text-xl/tight text-dark">
                  <span className="mr-3 text-dark">Client Management</span>
                  <span className="mt-1 font-medium text-secondary-dark text-lg/normal">
                    All clients from the Devlink Application
                  </span>
                </h3>

                <div className="flex justify-end ">
                  <div>
                    <Select onValueChange={(value) => handleSortType(value)}>
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

              <div className="flex-auto block py-8 pt-6 px-9 ">
                <div className="overflow-x-auto">
                  <table className="w-full my-0 align-middle">
                    <thead className="align-bottom">
                      <tr className="border-b border-black text-[1.1rem] flex gap-40 text-secondary-dark">
                        <th className="pb-3 text-start">Name</th>
                        <th className="pb-3 text-start">Email</th>
                        <th className="pb-3 text-start">Block/UnBlock</th>
                        <th className="pb-3 text-start">View</th>
                        <th className="pb-3 text-start">Total Jobs</th>
                        <th className="pb-3 text-start">Total Hours</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="">
                        {Object.entries(client).map((cli: any) => (
                          <div className="flex border-b border-gray-400 py-4">
                            <td className="w-[180px]">
                              <span className="text-md/normal">
                                {cli[1].companyName}
                              </span>
                            </td>
                            <td className="w-[260px]">
                              <span className="text-md/normal w-20">
                                {cli[1].email}
                              </span>
                            </td>
                            <td className="w-[200px]">
                              <span className="text-md/normal">
                                {cli[1]?.isBlocked}{" "}
                                {cli[1].isBlocked ? (
                                  <span className="bg-red-500 py-1 px-2 rounded-full text-sm text-white font-thin">
                                    <button
                                      onClick={() => unBlockClient(cli[1]._id)}
                                    >
                                      unBlock
                                    </button>
                                  </span>
                                ) : (
                                  <span className="bg-green-500 py-1 px-2 rounded-full text-sm text-white font-thin">
                                    <button
                                      onClick={() => blockClient(cli[1]._id)}
                                    >
                                      block
                                    </button>
                                  </span>
                                )}
                              </span>
                            </td>
                            <td className="w-[230px]">
                              <span className="text-md/normal">View</span>
                            </td>
                            <td className="w-[230px]">
                              <span className="text-md/normal">
                                {cli[1]?.totalJobs} 0
                              </span>
                            </td>
                            <td className="w-[230px] text-center">
                              <span className="text-md/normal ">
                                {cli[1]?.totalHours}
                              </span>
                            </td>
                          </div>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section>
        <div className="container mx-auto px-4">
          <nav
            className="flex flex-row flex-nowrap justify-between md:justify-center items-center"
            aria-label="Pagination"
          >
            {currentPage - 1 < 1 ? (
              <div></div>
            ) : (
              <a
                onClick={() => changePage(currentPage - 1)}
                className="cursor-pointerflex w-10 h-10 justify-center items-center rounded-full border border-gray-200 bg-white -800 text-black  hover:border-gray-300 -gray-600"
                title="Previous Page"
              >
                <span className="sr-only">Previous Page</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="block w-5 h-5 my-2 mx-auto"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
              </a>
            )}

            {Array.from({ length: totalPages }).map((_, index) => (
              <p
                onClick={() => changePage(index + 1)}
                key={index}
                className="md:flex w-10 h-10 mx-2 my-4 cursor-pointer justify-center items-center rounded-full border border-gray-200 bg-white -700 text-black  hover:border-gray-300 -gray-600"
                title={`Page ${index + 1}`}
              >
                {index + 1}
              </p>
            ))}

            {currentPage + 1 > totalPages ? (
              <div></div>
            ) : (
              <a
                onClick={() => changePage(currentPage + 1)}
                className="cursor-pointer flex w-10 h-10 ml-1 justify-center items-center rounded-full border border-gray-200 bg-white text-black hover:border-gray-300 "
                title="Next Page"
              >
                <span className="sr-only">Next Page</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="block w-5 h-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </a>
            )}
          </nav>
        </div>
      </section>
    </div>
  );
};

export default clientManagement;
