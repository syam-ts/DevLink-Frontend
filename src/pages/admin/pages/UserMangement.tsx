import { toast } from "sonner";
import { useEffect, useState } from "react";
import { Sonner } from "../../../components/sonner/Toaster";
import { UserProfileModal } from "../../../components/nextUi/modals/UserProfileModal";
import { apiAdminInstance } from "../../../api/axiosInstance/axiosAdminInstance";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";

interface User {
  _id: string
  profilePicture: string
  name: string
  email: string
  budget: number
  isBlocked: boolean
  view: string
  totalJobs: number
};

const clientManagement: React.FC = () => {
  const [users, setUsers] = useState<User>({
    _id: "",
    profilePicture: "",
    name: "",
    email: "",
    budget: 0,
    isBlocked: false,
    view: "",
    totalJobs: 0,
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [sortType, setSortType] = useState<string>("latest");
  const [isBlockedTrigger, setIsBlockedTrigger] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await apiAdminInstance.get(
          `/getAllUsers?page=${currentPage}&sortType=${sortType}`,
          {
            withCredentials: true,
          }
        );
        setUsers(data?.data.users);
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

  const blockUser = async (userId: string) => {
    try {
      const response = await apiAdminInstance.patch(`/blockUser/${userId}`);

      setIsBlockedTrigger(true);
      if (response.data.success) {
        toast.success("user blocked", {
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

  const unBlockUser = async (userId: string) => {
    try {
      const response = await apiAdminInstance.patch(`/unblockUser/${userId}`);
      setIsBlockedTrigger(true);
      if (response.data.success) {
        toast.success("user unblocked", {
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
    <div className="mt-28 ">
      <div className="flex flex-wrap nunito-regular ">
        <Sonner />
        <div className="w-full max-w-full px-3 mb-6 mx-auto ">
          <div className="relative flex-[1_auto] flex flex-col break-words min-w-0">
            <div
              className="relative flex flex-col min-w-0 break-words rounded-large border bg-light/30
            border-stone-400"
            >
              <div className="px-9 pt-5 flex justify-between items-stretch flex-wrap min-h-[70px] pb-0 bg-transparent">
                <h3 className="flex flex-col items-start justify-center m-2 ml-0 font-medium text-xl/tight text-dark">
                  <span className="mr-3 text-dark">Users Management</span>
                  <span className="mt-1 font-medium text-secondary-dark text-xs">
                    All Users from the Devlink Application
                  </span>
                </h3>

                <div className="flex justify-end ">
                  <div>
                    <Select onValueChange={(value) => handleSortType(value)}>
                      <SelectTrigger className="w-[180px] rounded-small">
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

               
            </div>
          </div>
        </div>
      </div>

      <section className="w-3/4 mx-auto arsenal-sc-regular mt-10">
          <div className="relative flex flex-col w-full h-full overflow-hidden border-1 border-[#c0bebe] text-gray-700 rounded-2xl bg-clip-border">
            <table className="w-full">
              <thead>
                <tr className="text-center">
                  <th className="p-3 border-b border-blue-gray-100 bg-gray-200">
                    <p className="text-sm antialiased leading-none text-gray-500">
                      Profile
                    </p>
                  </th>
                  <th className="p-3 border-b border-blue-gray-100 bg-gray-200">
                    <p className="text-sm antialiased leading-none text-gray-500">
                      Name
                    </p>
                  </th>
                  <th className="p-3 border-b border-blue-gray-100 bg-gray-200">
                    <p className="text-sm antialiased leading-none text-gray-500">
                      Email
                    </p>
                  </th>
                  <th className="p-3 border-b border-blue-gray-100 bg-gray-200">
                    <p className="text-sm antialiased leading-none text-gray-500">
                      Pay/Hr
                    </p>
                  </th>
                  <th className="p-3 border-b border-blue-gray-100 bg-gray-200">
                    <p className="text-sm antialiased leading-none text-gray-500">
                      Block/Unblock
                    </p>
                  </th>
                  <th className="p-3 border-b border-blue-gray-100 bg-gray-200">
                    <p className="text-sm antialiased leading-none text-gray-500">
                      View
                    </p>
                  </th>
                  <th className="p-3 border-b border-blue-gray-100 bg-gray-200">
                    <p className="text-sm antialiased leading-none text-gray-500">
                      Total Jobs
                    </p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {
                  Object.entries(users).map((user: User[]) => (
                    <tr className="text-center">
                      <td className="p-3 border-b border-gray-300 ">
                      <img
                                  className="w-10 h-10 rounded-full"
                                  src={user[1].profilePicture}
                                  alt="user-image"
                                />
                      </td>
                      <td className="p-3 border-b border-gray-300">
                        <p className="text-sm antialiased leading-normal text-gray-900">
                        {user[1].name}
                        </p>
                      </td>
                      <td className="p-3 border-b border-gray-300">
                        <p className="text-sm antialiased leading-normal text-gray-900">
                        {user[1].email}
                        </p>
                      </td>
                      <td className="p-3 border-b border-gray-300">
                        <p className="text-sm antialiased leading-normal text-gray-900">
                        {user[1].budget}
                        </p>
                      </td>
                      <td className="p-3 border-b border-gray-300">
                        <p className="text-sm antialiased leading-normal text-gray-900">
                        {user[1].isBlocked ? (
                                  <span className="bg-red-500 py-0.5 px-2 rounded-full text-sm text-white font-bold">
                                    <button
                                      onClick={() => unBlockUser(user[1]._id)}
                                    >
                                      unBlock
                                    </button>
                                  </span>
                                ) : (
                                  <span className="bg-green-500 py-0.5 px-2 rounded-full text-sm text-white font-bold">
                                    <button
                                      onClick={() => blockUser(user[1]._id)}
                                    >
                                      block
                                    </button>
                                  </span>
                                )}
                        </p>
                      </td>
                      <td className="p-3 border-b border-gray-300">
                        <p className="text-sm antialiased leading-normal text-gray-900">
                          <UserProfileModal userData={user} />
                        </p>
                      </td>
                      <td className="p-3 border-b border-gray-300">
                        <p className="text-sm antialiased leading-normal text-gray-900">
                        {user[1].totalJobs}
                        </p>
                      </td>
                    </tr> 
                  ))
                }
            
              </tbody>
            </table>
          </div>
        </section>

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
                className="md:flex w-8 h-8 mx-2 my-4 cursor-pointer justify-center items-center rounded-full border-1 border-gray-300 bg-white -700 text-black  hover:border-gray-300 -gray-600"
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
