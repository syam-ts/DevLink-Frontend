import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { apiUserInstance } from "../../api/axiosInstance/axiosUserInstance";
import { apiClientInstance } from "../../api/axiosInstance/axiosClientRequest";
import { WithdrawMoneyModal } from "../../components/nextUi/modals/WithdrawMoneyModal";

interface WalletProps {
  roleType: string;
}

interface Transactions {
  type: string;
  amount: number;
  from: string;
  createdAt: string;
  date: string
}

interface Wallet {
  totalPages: number,
  wallet: [
    {
      totalPages: number
      balance: number
      transactions: Transactions[]
    }
  ]
};

const Wallet: React.FC<WalletProps> = ({ roleType }) => {
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
        if (roleType === "user") {
          response = await apiUserInstance.get(
            `/wallet?currentPage=${currentPage}`,
            {
              withCredentials: true,
            }
          );
        } else {
          response = await apiClientInstance.get(
            `/wallet?currentPage=${currentPage}`,
            {
              withCredentials: true,
            }
          );
        }
        setTotalPages(response.data?.wallet.totalPages);
        setBalance(response.data?.wallet.wallet[0]?.balance);
        setTransactions(response.data.wallet.wallet[0]?.transactions);
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

  console.log('The transctions: ', transactions);
  console.log('The balance: ', balance);

  const changePage = async (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="overflow-hidden 2xl:w-[1900px] 2xl:flex max-sm:grid md:grid gap-5 max-sm:w-[1100px] md:w-[1000px]">
      <div className='w-1/5'>
        <section>
          <div className="text-start mx-20 my-64 md:w-[800px] 2xl:w-[350px] shadow-xl rounded-2xl border-1 border-gray-300 px-5">
            <div className="pt-20">
              <span className="arsenal-sc-regular flex max-sm:mx-80 text-black text-xl font-extrabold py-2 px-5 rounded-lg">
                Balance : {Math.floor(balance)}
              </span>
            </div>
            <div className="pt-5">
              <hr />
            </div>

            {/* WITHDRAW SECTION */}
            <div className="py-16 text-center">
              <span className="arsenal-sc-regular text-xl bg-[#0000ff] font-bold py-2 px-3 rounded-small text-white">
                <button>
                  <WithdrawMoneyModal balance={balance} type="user" />
                </button>
              </span>
            </div>
          </div>
        </section>
      </div>

      <div className="pt-44 w-4/5 mx-44">
        <section className=" text-center">
          <div>
            <span className="text-2xl text-center arsenal-sc-regular">
              Transactions
            </span>
            <hr className="w-2/3 mx-auto py-4" />
          </div>
        </section>

        <section className="w-full mx-auto arsenal-sc-regular ">
          <div className="relative flex flex-col w-full h-full overflow-hidden border-1 border-[#c0bebe] text-gray-700 rounded-2xl bg-clip-border">
            <table className="w-full">
              <thead>
                <tr className="text-center">
                  <th className="p-3 border-b border-blue-gray-100 bg-gray-200">
                    <p className="text-sm antialiased leading-none text-gray-500">
                      Type
                    </p>
                  </th>
                  <th className="p-3 border-b border-blue-gray-100 bg-gray-200">
                    <p className="text-sm antialiased leading-none text-gray-500">
                      Amount
                    </p>
                  </th>
                  <th className="p-3 border-b border-blue-gray-100 bg-gray-200">
                    <p className="text-sm antialiased leading-none text-gray-500">
                      From
                    </p>
                  </th>
                  <th className="p-3 border-b border-blue-gray-100 bg-gray-200">
                    <p className="text-sm antialiased leading-none text-gray-500">
                      Created At
                    </p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {transactions?.map((transact: Transactions) => (
                  <tr className="text-center">
                    <td className="p-3 border-b border-gray-300 ">
                      <p className="text-sm antialiased leading-normal text-gray-900">
                        {transact?.type || transact[0]?.type}
                      </p>
                    </td>
                    <td className="p-3 border-b border-gray-300">
                      <p className="text-sm antialiased leading-normal text-gray-900">
                        {transact?.amount || transact[0]?.amount}
                      </p>
                    </td>
                    <td className="p-3 border-b border-gray-300">
                      <p className="text-sm antialiased leading-normal text-gray-900">
                        {transact?.from || transact[0]?.from}
                      </p>
                    </td>
                    <td className="p-3 border-b border-gray-300">
                      <p className="text-sm antialiased leading-normal text-gray-900">
                        {transact?.date || transact[0]?.date}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <div className="container mx-auto px-4 my-4">
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


