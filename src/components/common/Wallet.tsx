import axios from "axios";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";

 

interface Transactions {
    type: string,
    amount: number,
    from: string,
    createdAt: string
}

  const Wallet = ({roleType}: any) => {

    const [balance, setBalance] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number[]>([]); 
    const [transactions, setTransactions] = useState<Transactions[]>([]);
    
    const { roleId } = useParams();

    useEffect(() => {

        try {


            (async () => {
                const { data } = await axios.get(`http://localhost:3000/${roleType}/wallet/view/${roleId}`);

                console.log('The resonse from wallet : ', data);
                setBalance(data?.wallet?.balance);
                setTransactions(data.wallet.transactions);
            })();
        } catch (err: any) {
            console.log(err.message);
        }
    }, []);

 

    return (
        <div>
            <section>
                <div className='text-start mx-5 my-10 '> 
                   <span className='arsenal-sc-regular text-xl bg-violet-600 font-bold py-2 px-5 rounded-lg text-white'> Balance : {Math.floor(balance)} </span>
                </div>
            </section>

            <section className='w-screen text-center'>
                <div>
                <span className='text-2xl text-center arsenal-sc-regular'> Transactions </span>
                <hr className='w-2/3 mx-auto py-4' />
                </div>
            </section>

            <section>
                <div
                    className="relative flex flex-col px-44 w-[70rem] mx-auto h-full overflow-hidden p-5 text-gray-700 bg-white shadow-2xl border-3 rounded-2xl bg-clip-border">
                    <table className="w-full text-left table-auto min-w-max">
                        <thead>
                            <tr>
                                <th className="p-4 border-b border-gray-400 bg-blue-gray-50">
                                    <p className="block arsenal-sc-regular text-xl antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                        Type
                                    </p>
                                </th>
                                <th className="p-4 border-b border-gray-400 bg-blue-gray-50">
                                    <p className="block arsenal-sc-regular text-xl antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                        Amount
                                    </p>
                                </th>
                                <th className="p-4 border-b border-gray-400 bg-blue-gray-50">
                                    <p className="block arsenal-sc-regular text-xl antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                        From
                                    </p>
                                </th>
                                <th className="p-4 border-b border-gray-400 bg-blue-gray-50">
                                    <p className="block arsenal-sc-regular text-xl antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                        CreatedAt
                                    </p>
                                </th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {
                                transactions.map((tra: any) => (

                                    <tr>
                                        <td className="py-4 px-4 border-b border-blue-gray-50">
                                            <p className="block arsenal-sc-regular text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                                {tra[0].type}  
                                            </p>
                                        </td>
                                        <td className="py-4 px-4 border-b border-blue-gray-50">
                                            <p className="block arsenal-sc-regular text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                            {tra[0].amount}  
                                            </p>
                                        </td>
                                        <td className="py-4 px-4 border-b border-blue-gray-50">
                                            <p className="block arsenal-sc-regular text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                            {tra[0].from}  
                                            </p>
                                        </td>
                                        <td className="py-4 px-4 border-b border-blue-gray-50">
                                            <a href="#" className="block arsenal-sc-regular text-sm antialiased font-medium leading-normal text-blue-gray-900">
                                            {tra[0].date}  
                                            </a>
                                        </td>
                                    </tr>
                                ))
                            }
                          
                           
                           
                        </tbody>
                    </table>
                </div>
            </section>

        </div>
    )
}

export default Wallet