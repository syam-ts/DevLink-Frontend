import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
} from "@mui/material";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../../components/ui/select";
import axios from "axios";
import { Sonner } from "../../../../../components/sonner/ToasterBottom";
import { toast } from "sonner";
import { useEffect, useState } from "react"; 
  // import { UserViewAdmin } from '../../../../../components/common/UserProfile'


const ExTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages]: any = useState([]);
  const [isSearchTriggered, setIsSearchTriggered] = useState(false);
  const [sortType, setSortType] = useState("latest");
  const [user, setUser] = useState({});
  const [isBlocked, setIsBlocked]: any = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3000/admin/getAllUsers?page=${currentPage}&sortType=${sortType}`,
          {
            withCredentials: true,
          }
        );

        if (totalPages[0] !== data?.data?.totalPages)
          setTotalPages((prevPages: any) => [
            ...prevPages,
            data?.data?.totalPages,
          ]);

        setUser(data?.data);
      } catch (err: any) {
        toast.error(err.message, {
          style: {
            backgroundColor: "red",
            color: "white",
          },
        });
      }
    })();
  }, [currentPage, sortType, isBlocked]);


  

  const changePage = async (page: number) => {
    setCurrentPage(page);
  };

   

  const blockUserFn = async (userId: string) => {
    try {
      const response = await axios.patch(
        `/admin/blockUser/${userId}`
      );

      if (response.data.type == "success") {
        setIsBlocked(true);

        toast.success(response.data.message, {
          position: "top-right",
        });
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };

  const unBlockUserFn = async (userId: any) => {
    try {
      const response = await axios.patch(
        `/admin/unblockUser/${userId}`
      );
      if (response.data.type == "success") {
        setIsBlocked(false);
        toast.success(response.data.message, {
          position: "top-right",
        });
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };

  console.log("THE USER : ", user);

  return (
    <>
      {/* Search section */}
      <section className="my-10 arsenal-sc-regular">
        <div className="flex justify-end">
 
          
            <div>
              <Select onValueChange={(value) => setSortType(value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort User" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="latest">Latest</SelectItem>
                    <SelectItem value="unBlock">Blocked</SelectItem>
                    <SelectItem value="block">Unblocked</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
        </div>
      </section>

      {/* Table section */}
      <section>
        <Table
          aria-label="simple table"
          sx={{
            mt: 3,
            whiteSpace: "nowrap",
          }}
        >
          {/* toster */}

          <Sonner />

          <TableHead>
            <TableRow>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  <span className="arsenal-sc-regular">Image</span>
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  <span className="arsenal-sc-regular">Name</span>
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  <span className="arsenal-sc-regular">Email</span>
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  <span className="arsenal-sc-regular">Pay/Hour</span>
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  <span className="arsenal-sc-regular">Block/Unblock</span>
                </Typography>
              </TableCell>

              <TableCell align="left">
                <Typography color="textSecondary" variant="h6">
                  <span className="arsenal-sc-regular">View</span>
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography color="textSecondary" variant="h6">
                  <span className="arsenal-sc-regular">Total Jobs</span>
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(user)?.map((user: any, index: any) => (
              <>
                {index <= Object.entries(user).length && (
                  <TableRow key={user[1]?.name}>
                    <TableCell>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Box>
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: "600",
                            }}
                          >
                            <img
                              className="h-9 w-9 rounded-full"
                              src={user[1]?.profilePicture || 'https://cdn-icons-png.flaticon.com/128/18753/18753518.png'}
                              alt="user-image"
                            />
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>

                    <TableCell>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Box>
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: "300",
                            }}
                          >
                            <span className="arsenal-sc-regular">
                              {user[1]?.name}
                            </span>
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography color="textSecondary" variant="h6">
                        <span className="arsenal-sc-regular">
                          {user[1]?.email}
                        </span>
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography color="textSecondary" variant="h6">
                        <span className="arsenal-sc-regular">
                          {user[1]?.budget}
                        </span>
                      </Typography>
                    </TableCell>

                    <TableCell>
                      {user[1].isBlocked ? (
                        <Chip
                          onClick={() => unBlockUserFn(user[1]?._id)}
                          sx={{
                            pl: "4px",
                            pr: "4px",
                            backgroundColor: "red",
                            color: "#fff",
                            fontFamily: "arsenal-sc-regular",
                          }}
                          size="small"
                          label="unBlock"
                        ></Chip>
                      ) : (
                        <Chip
                          onClick={() => blockUserFn(user[1]?._id)}
                          sx={{
                            pl: "4px",
                            pr: "4px",
                            backgroundColor: "green",
                            color: "#fff",
                          }}
                          size="small"
                          label="block"
                        ></Chip>
                      )}
                    </TableCell>

                    <TableCell align="right">
                      <Typography variant="h6">
                
                         {/* <UserViewAdmin /> */}
                         </Typography>
                    </TableCell>

                    <TableCell align="right">
                      <Typography variant="h6">
                        <span className="arsenal-sc-regular">100</span>
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </>
            ))}
          </TableBody>

          {/* Emergency delete */}
          {/* <button onClick={deleteData}>
          Delete Whole Data
        </button> */}
        </Table>
      </section>

      {/* Pagination */}
      <section>
        <div>
          <div className="container mx-auto px-4 py-10">
            <nav
              className="flex flex-row flex-nowrap justify-between md:justify-center items-center"
              aria-label="Pagination"
            >
              {currentPage - 1 < 1 ? (
                <div></div>
              ) : (
                <a
                  onClick={() => changePage(currentPage - 1)}
                  className="cursor-pointerflex w-10 h-10 justify-center items-center rounded-full border border-gray-200 bg-white  text-black  hover:border-gray-300"
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
                  className="md:flex w-10 h-10 mx-2 my-4 cursor-pointer justify-center items-center rounded-full border border-gray-200 bg-white  text-black  hover:border-gray-300 "
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
                  className="cursor-pointer flex w-10 h-10 ml-1 justify-center items-center rounded-full border border-gray-200 bg-whitetext-black  hover:border-gray-300"
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
        </div>
      </section>
    </>
  );
};

export default ExTable;
