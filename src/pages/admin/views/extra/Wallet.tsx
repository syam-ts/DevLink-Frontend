import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Wallet() {

    const [wallet , setWallet]: any = useState('')

   useEffect(() => {
    try{
          (async() => {
            const response = await axios.get('http://localhost:3000/admin/getWallet');
   
            setWallet(response?.data?.data?.wallet);
          })();
    }catch(err: any) {
        console.log('ERROR: ', err.message);
    }
   }, [])
 
  return (
    <div>
        <section>
            <div>
                Balance: {wallet?.balance}
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
                            <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                Type
                            </p>
                            </th>
                            <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                            <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                Amount
                            </p>
                            </th>
                            <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                            <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                From
                            </p>
                            </th>
                            <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                            <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                Date
                            </p>
                            </th>
                            
                        </tr>
                         
                        </thead>
                        {wallet?.transactions?.map((transaction: any, index: number) => (
                 
                     
                  <tbody>
                        <tr >
                            <td className="p-4">
                            <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                            {transaction.type}
                            </p>
                            </td>
                            <td className="p-4">
                            <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                            {transaction.amount}
                            </p>
                            </td>
                            <td className="p-4">
                            <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                            {transaction.from}
                            </p>
                            </td>
                            <td className="p-4">
                            <a href="#" className="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">
                            {new Date(transaction.date).toLocaleString()}
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