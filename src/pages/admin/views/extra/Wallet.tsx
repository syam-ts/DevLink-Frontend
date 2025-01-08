import { WalletCard } from '../../../../components/nextUi/cards/walletCard';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Wallet() {

    const [wallet , setWallet]: any = useState('')

   useEffect(() => {
    try{
          (async() => {
            const {data} = await axios.get('http://localhost:3000/admin/getWallet');
            console.log('THE WALLET ', data?.data?.wallet?.transactions)
            setWallet(data?.data?.wallet);
          })();
    }catch(err: any) {
        console.log('ERROR: ', err.message);
    }
   }, [])
 
  return (
    <div>
        <section>
            <div >
                <WalletCard amount={wallet?.balance} />
            </div>
        </section>

        <section className='py-12'>
        <div>
      <h2 className='font-bold text-xl py-5'>Transaction History</h2>

       <div className="relative mx-5 mt-12 px-12 flex flex-col w-full h-full  text-gray-700 bg-white shadow-xl border border-gray-230 rounded-xl bg-clip-border">
                    <table className="w-full text-left table-auto min-w-max">
                        <thead>
                        <tr>
                            <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                            <p className="block antialiased font-bold text-md leading-none text-black">
                                Type
                            </p>
                            </th>
                            <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                            <p className="block antialiased font-bold text-md leading-none text-black">
                                Amount
                            </p>
                            </th>
                            <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                            <p className="block antialiased font-bold text-md leading-none text-black">
                                From
                            </p>
                            </th>
                            <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                            <p className="block antialiased font-bold text-md leading-none text-black">
                                View
                            </p>
                            </th>
                            <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                            <p className="block antialiased font-bold text-md leading-none text-black">
                                Date
                            </p>
                            </th>
                            
                        </tr>
                         
                        </thead>
                        {wallet?.transactions?.map((transaction: any, index: number) => (
                 
                     
                  <tbody>
                                 
                        <tr className='border-b'>
                            <td className="p-4"> 
                            <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                            {transaction[0]?.type}
                            </p>
                            </td>
                            <td className="p-4">
                            <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                            {transaction[0].amount}
                            </p>
                            </td>
                            <td className="p-4">
                            <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                            {transaction[0].from}
                            </p>
                            </td>
                            <td className="p-4">
                            <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                              <img className='h-4 w-5 cursor-pointer' src='data:image/jpeg;base64,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' />
                            </p>
                            </td>
                            <td className="p-4">
                            <a href="#" className="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">
                            {new Date(transaction[0].date).toLocaleString()}
                            </a>
                            </td>
                        </tr>
                        </tbody>
                    
                     ))}
                    </table>
                    </div>
      {/* <ul>
      
          <li key={index}>
            <p>Type: {transaction.type}</p>
            <p>Amount: {transaction.amount}</p>
            <p>From: {transaction.from}</p>
            <p>From ID: {transaction.fromId}</p>
            <p>Date: {new Date(transaction.date).toLocaleString()}</p>
          </li>
        ))}
      </ul> */}
    </div>
        </section>
    </div>
  )
}

export default Wallet