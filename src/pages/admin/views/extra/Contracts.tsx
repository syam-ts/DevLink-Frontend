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
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";
import { Sonner } from "../../../../components/sonner/ToasterBottom";
import { toast } from "sonner";
import ViewUserInAdmin from "../../../../components/bootstrap/ViewUserInAdmin";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import axios from '../../../../../api/axiosInstance'

const ExTable = () => {
  const [currentPage, setCurrentPage]: any = useState<number>(1);
  const [totalPages, setTotalPages]: any = useState<number[]>([]);
  const [sortType, setSortType] = useState<string>("latest");

  const [contracts, setContracts]: any = useState({});

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3000/admin/getAllContracts`,
          {
            withCredentials: true,
          }
        );

        // if (totalPages[0] !== data?.data?.totalPages) (
        //     setTotalPages((prevPages: any) => [...prevPages, data?.data?.totalPages])
        // )

        setContracts(data?.contracts);
      } catch (err: any) {
        toast.error(err.message, {
          style: {
            backgroundColor: "red",
            color: "white",
          },
        });
      }
    })();
  }, [currentPage, sortType]);

  const changePage = async (page: number) => {
    setCurrentPage(page);
  };

 

  return (
    <div className="border-1 !border-gray-400 rounded-3xl px-5 py-2 my-20">

        {/* SORTING SECTION */}
      {/* <section className="my-10 ">
        <div className="flex justify-end ">
          <Select onValueChange={(value) => setSortType(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort Client" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
                <SelectItem value="submitted">Submitted</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </section> */}

      <section>
        <Table
          aria-label="simple table"
          sx={{
            mt: 3,
            whiteSpace: "nowrap",
          }}
        >
          <Sonner />

          <TableHead>
            <TableRow>
              <TableCell>
                <Typography
                  className="text-black text-center"
                  color="textSecondary"
                  variant="h6"
                >
                  <span className="arsenal-sc-regular">Title</span>
                </Typography>
              </TableCell>

              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  <span className="arsenal-sc-regular">Amount</span>
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  <span className="arsenal-sc-regular">Deadline</span>
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  <span className="arsenal-sc-regular">Status</span>
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  <span className="arsenal-sc-regular">View</span>
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {Object.entries(contracts)?.map((contract: any) => (
              <TableRow key={contract[1]._id}>
                <TableCell className='w-1/3 p-4'>
                  <Typography variant="h6">
                    <div>
                      <span className="arsenal-sc-bold">
                        {contract[1].jobPostData.title}
                      </span>
                    </div>
                  </Typography>
                </TableCell>

                <TableCell>
                  {contract[1].amount < 1500 ? (
                    <div>
                      <span className="arsenal-sc-regular">
                        {contract[1].amount}/hr
                      </span>
                    </div>
                  ) : (
                    <div>
                      <span className="arsenal-sc-regular">
                        {contract[1].amount}/day
                      </span>
                    </div>
                  )}
                </TableCell>

                <TableCell>
                  <Typography variant="h6">
                    <div className="text-left">
                      <span className="arsenal-sc-regular">
                        {contract[1].deadline}
                      </span>
                    </div>
                  </Typography>
                </TableCell>

                <TableCell>
                  <Typography variant="h6" className="arsenal-sc-regular">
                    <span className="arsenal-sc-regular">
                      {contract[1].status}
                    </span>
                  </Typography>
                </TableCell>

                <TableCell>
                  <Typography variant="h6" className="arsenal-sc-regular">
                    <span className="arsenal-sc-regular">
                      <Link to={`/admin/index/monoContract/${contract[1]._id}`}>
                        <img
                          className="w-4 h-4"
                          src="https://cdn-icons-png.flaticon.com/128/1078/1078327.png"
                        />
                      </Link>
                    </span>
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>

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
        </div>
      </section>
    </div>
  );
};

export default ExTable;
