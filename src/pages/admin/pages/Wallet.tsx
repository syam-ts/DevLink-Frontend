import { apiAdminInstance } from "../../../api/axiosInstance/axiosAdminInstance";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

interface Transactions {
  type: string
  amount: number
  from: string
  createdAt: string
  date: string
};

interface Wallet {
  totalPages: number
  balance: number
  transactions: Transactions
};

const Wallet: React.FC = () => {
  const [balance, setBalance] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [transactions, setTransactions] = useState<Transactions[]>([]);

  useEffect(() => {
    (async () => {
      try {
        interface Response {
          data: {
            wallet?: Wallet;
          };
        }
        let response: Response;

        response = await apiAdminInstance.get(
          `/wallet?currentPage=${currentPage}`,
          {
            withCredentials: true,
          }
        );

        setTotalPages(response.data?.wallet?.totalPages); 
        setBalance(response.data?.wallet[0]?.balance);
        setTransactions(response.data.wallet[0]?.transactions);
      } catch (error: unknown) {
        const err = error as { message: string };
        toast.error(err.message, {
          style: {
            backgroundColor: "red",
            color: "white",
          },
        });
      }
    })();
  }, [currentPage]);

  const changePage = async (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <section className='flex justify-center mt-10'>
        <div className="flex mt-10 bg-gray-800 w-1/3 h-[10rem] rounded-large text-white font-extrabold justify-center py-12">
          <span className="text-xl">Balance: {Math.floor(balance)} </span>
        </div>
      </section>

      <div className="mt-5">
         <section className=" text-center">
          <div>
            <span className="text-2xl text-center arsenal-sc-regular">
              Transactions
            </span>
            <hr className="w-2/3 mx-auto py-4" />
          </div>
        </section> 

       <section>
          <div className="relative flex flex-col w-[70rem] mx-auto h-full overflow-hidden py-12 px-12 text-black shadow-lg rounded-2xl">
            <table className="w-full text-left table-auto min-w-max ">
              <thead>
                <tr className="border-b">
                  <th className="p-4 bg-blue-gray-50">
                    <p className="block arsenal-sc-regular text-xl antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                      Type
                    </p>
                  </th>
                  <th className="p-4 bg-blue-gray-50">
                    <p className="block arsenal-sc-regular text-xl antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                      Amount
                    </p>
                  </th>
                  <th className="p-4 bg-blue-gray-50">
                    <p className="block arsenal-sc-regular text-xl antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                      From
                    </p>
                  </th>
                  <th className="p-4 bg-blue-gray-50">
                    <p className="block arsenal-sc-regular text-xl antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                      CreatedAt
                    </p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {transactions?.map((tra: Transactions) => (
                  <tr className="border-b border-gray-300">
                    <td className="py-4 px-4">
                      <p className="block arsenal-sc-regular text-sm text-blue-gray-900">
                        {tra?.type || tra[0]?.type}
                      </p>
                    </td>
                    <td className="py-4 px-4">
                      <p className="block arsenal-sc-regular text-sm text-blue-gray-900">
                        {tra?.amount || tra[0]?.amount}
                      </p>
                    </td>
                    <td className="py-4 px-4">
                      <p className="block arsenal-sc-regular text-sm text-blue-gray-900">
                        {tra?.from || tra[0]?.from}
                      </p>
                    </td>
                    <td className="py-4 px-4">
                      <a
                        href="#"
                        className="block arsenal-sc-regular text-sm text-blue-gray-900 no-underline text-black"
                      >
                        {tra?.date || tra[0]?.date}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>   



        {/* <section className='w-2/3 mx-auto mt-20'>
 

          <div
            className="relative flex flex-col w-full h-full overflow-hidden border text-gray-700 bg-white shadow-md bg-clip-border rounded-xl">
            <table className="w-full text-left table-auto min-w-max">
              <thead>
                <tr>
                  <th className="p-3 border-b border-blue-gray-100 bg-slate-100">
                    <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                      Name
                    </p>
                  </th>
                  <th className="p-3 border-b border-blue-gray-100 bg-slate-100">
                    <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                      Job
                    </p>
                  </th>
                  <th className="p-3 border-b border-blue-gray-100 bg-slate-100">
                    <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                      Employed
                    </p>
                  </th>
                  <th className="p-3 border-b border-blue-gray-100 bg-slate-100">
                    <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70"></p>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border">
                  <td className="p-3">
                    <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                      John Michael
                    </p>
                  </td>
                  <td className="p-3">
                    <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                      Manager
                    </p>
                  </td>
                  <td className="p-3">
                    <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                      23/04/18
                    </p>
                  </td>
                  <td className="p-3">
                    <a href="#" className="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">Edit</a>
                  </td>
                </tr>
                <tr className="border">
                  <td className="p-3">
                    <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                      John Michael
                    </p>
                  </td>
                  <td className="p-3">
                    <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                      Manager
                    </p>
                  </td>
                  <td className="p-3">
                    <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                      23/04/18
                    </p>
                  </td>
                  <td className="p-3">
                    <a href="#" className="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">Edit</a>
                  </td>
                </tr>
                <tr className="border">
                  <td className="p-3">
                    <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                      John Michael
                    </p>
                  </td>
                  <td className="p-3">
                    <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                      Manager
                    </p>
                  </td>
                  <td className="p-4">
                    <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                      23/04/18
                    </p>
                  </td>
                  <td className="p-3">
                    <a href="#" className="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">Edit</a>
                  </td>
                </tr>
                
                <tr className="border">
                  <td className="p-3">
                    <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                      John Michael
                    </p>
                  </td>
                  <td className="p-3">
                    <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                      Manager
                    </p>
                  </td>
                  <td className="p-4">
                    <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                      23/04/18
                    </p>
                  </td>
                  <td className="p-3">
                    <a href="#" className="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">Edit</a>
                  </td>
                </tr>  
              </tbody>
            </table>
          </div>
 

        </section> */}





          <section className="mt-10 w-2/3 mx-auto">
          <hr />
        </section>

        <section>
          <div className="container mx-auto px-4 ">
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
        </section>  
      </div>
    </div>
  );
};

export default Wallet;
