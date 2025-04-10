import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { apiUserInstance } from "../../api/axiosInstance/axiosUserInstance";
import { apiClientInstance } from "../../api/axiosInstance/axiosClientRequest";
import { WithdrawMoneyModal } from "../../components/nextUi/modals/WithdrawMoneyModal";
import { ClientState, UserState } from "@/config/state/allState";
import { useSelector } from "react-redux";

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
  let isProfileFilled;

  if (roleType === 'client') {
    const client = useSelector((state: ClientState) => state?.client?.currentClient);
    isProfileFilled = client.isVerified;
  } else {
    const user = useSelector((state: UserState) => state?.user?.currentUser);
    isProfileFilled = user.isProfileFilled;
  }

  useEffect(() => {
    if (isProfileFilled) {
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
    }

  }, [currentPage]);

  const changePage = async (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="w-full flex flex-col xl:flex-row gap-5 px-4 pt-44">
      {/* Left Sidebar Section */}
      <div className="w-full xl:w-1/4">
        <section>
          <div className="text-start mx-auto my-16 max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xs shadow-xl rounded-2xl border border-gray-300 px-5">
            <div className="pt-10">
              <span className="arsenal-sc-regular text-black text-xl font-extrabold py-2 px-5 rounded-lg block text-center">
                Balance : {Math.floor(balance)}
              </span>
            </div>
            <div className="pt-5">
              <hr />
            </div>

            {/* WITHDRAW SECTION */}
            {
              isProfileFilled && (
                <div className="py-10 text-center">
                  <button className="arsenal-sc-regular text-xl bg-blue-600 font-bold py-2 px-4 rounded text-white">
                    <WithdrawMoneyModal balance={balance} roleType={roleType} />
                  </button>
                </div>
              )
            }
          </div>
        </section>
      </div>

      {/* Right Content Section */}
      <div className="w-full xl:w-3/4 pt-10">
        <section className="text-center">
          <span className="text-2xl arsenal-sc-regular">Transactions</span>
          <hr className="w-2/3 mx-auto py-4" />
        </section>

        {/* Table Section */}
        <section className="w-full overflow-x-auto">
          <div className="relative w-full border border-[#c0bebe] text-gray-700 rounded-2xl overflow-hidden">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-200 text-gray-500 text-center">
                <tr>
                  <th className="p-3 border-b">Type</th>
                  <th className="p-3 border-b">Amount</th>
                  <th className="p-3 border-b">From</th>
                  <th className="p-3 border-b">Created At</th>
                </tr>
              </thead>
              <tbody>
                {transactions?.map((transact: Transactions, idx: number) => (
                  <tr key={idx} className="text-center border-b">
                    <td className="p-3">{transact?.type || transact[0]?.type}</td>
                    <td className="p-3">{transact?.amount || transact[0]?.amount}</td>
                    <td className="p-3">{transact?.from || transact[0]?.from}</td>
                    <td className="p-3 line-clamp-1">{transact?.date || transact[0]?.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Pagination Section */}
        {
          isProfileFilled && (
            <section>
              <div className="container mx-auto px-4 my-4">
                <nav
                  className="flex flex-wrap justify-center items-center gap-2"
                  aria-label="Pagination"
                >
                  {currentPage - 1 >= 1 && (
                    <button
                      onClick={() => changePage(currentPage - 1)}
                      className="w-10 h-10 flex justify-center items-center rounded-full border border-gray-200 bg-white text-black hover:border-gray-300"
                      title="Previous Page"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                      </svg>
                    </button>
                  )}

                  {Array.from({ length: totalPages }).map((_, index) => (
                    <p
                      key={index}
                      onClick={() => changePage(index + 1)}
                      className={`w-10 h-10 flex justify-center items-center rounded-full border ${currentPage === index + 1
                          ? "bg-black text-white"
                          : "bg-white text-black hover:border-gray-300"
                        } cursor-pointer`}
                      title={`Page ${index + 1}`}
                    >
                      {index + 1}
                    </p>
                  ))}

                  {currentPage + 1 <= totalPages && (
                    <button
                      onClick={() => changePage(currentPage + 1)}
                      className="w-10 h-10 flex justify-center items-center rounded-full border border-gray-200 bg-white text-black hover:border-gray-300"
                      title="Next Page"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>
                    </button>
                  )}
                </nav>
              </div>
            </section>
          )
        }
      </div>
    </div>

  );
};

export default Wallet;


