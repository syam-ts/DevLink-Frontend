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
  } from "../../../../../components/ui/select"
import axios from "axios";
import { Sonner } from '../../../../../components/sonner/ToasterBottom';
import { toast } from "sonner"; 
import ViewUserInAdmin from "../../../../../components/bootstrap/ViewUserInAdmin";
import { useEffect, useState } from "react"; 


const ExTable = () => {


    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages]: any = useState([]);
    const [isSearchTriggered, setIsSearchTriggered] = useState(false);
    const [sortType, setSortType] = useState('latest');


    const [client, setClient] = useState({});
    const [isBlocked, setIsBlocked]: any = useState()




    useEffect(() => {

        (async () => {
            try {

                const { data } = await axios.get(`http://localhost:3000/admin/getAllClients?page=${currentPage}&sortType=${sortType}`, {
                    withCredentials: true
                });

                if (totalPages[0] !== data?.data?.totalPages) (
                    setTotalPages((prevPages: any) => [...prevPages, data?.data?.totalPages])
                )

                setClient(data?.data)



            } catch (err: any) {
                toast.error(err.message, {
                    style: {
                        backgroundColor: 'red', color: 'white'
                    }
                })
            }
        })();
    }, [isBlocked, currentPage, sortType]);


    console.log('THE PAGE : ' ,client)
 



    const changePage = async (page: number) => {
        setCurrentPage(page);
    };


    const searchFunction = async (inputData: string) => {
       
        try { 
          if(inputData.length === 0) {
            setIsSearchTriggered(true)
           setSortType('block')
            
             
          } else {
            setIsSearchTriggered(true)
            const { data } = await axios.post(`http://localhost:3000/admin/getAllClients/search?inputData=${inputData}`); 

            if (totalPages[0] !== data?.data?.totalPages) (
                setTotalPages((prevPages: any) => [...prevPages, data?.data?.totalPages])
            ) 
 
            setClient(data.data)
            
            
          } 
        } catch (err: any) {
            console.error('ERROR: ', err.messsage);
        }
    };

  


 
    const blockClientFn = async (clientId: string) => {
        try {

            const response = await axios.patch(`http://localhost:3000/admin/blockClient/${clientId}`);

            console.log('The response', response.data.message)
            if (response.data.type == 'success') {
                setIsBlocked(true);
                toast.success(response.data.message, {
                    position: 'top-center'
                })
            }
        } catch (err: any) {
            console.log(err.message)
        }
    }







    const unBlockClientFn = async (clientId: any) => {
        try {

            const response = await axios.patch(`http://localhost:3000/admin/unblockClient/${clientId}`);

            console.log('The response', response.data.message)
            if (response.data.type == 'success') {
                setIsBlocked(false)
                toast.success(response.data.message, {
                    position: 'top-center'
                })
            }
        } catch (err: any) {
            console.log(err.message)
        }
    }



    return (
        <>

            <section className='my-10 '>
                <div className='flex justify-between '>
                    <div className="w-[400px] my-4">
                        <div className="relative">
                            <input onChange={(e: any) => searchFunction(e.target.value)}
                                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-xl pl-3 pr-28 py-2.5 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                                placeholder="Search here"
                            />
                         
                        </div>
                    </div>


                    <div> 
                   <div>
                   <Select onValueChange={(value) => setSortType(value)}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select a Method" />
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
                </div>
            </section>

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
                                <Typography color="textSecondary" variant="h6">
                                    Name
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography color="textSecondary" variant="h6">
                                    Email
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography color="textSecondary" variant="h6">
                                    Block/Unblock
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography color="textSecondary" variant="h6">
                                    view
                                </Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Typography color="textSecondary" variant="h6">
                                    Total Jobs
                                </Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Typography color="textSecondary" variant="h6">
                                    Total Hours
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Object.entries(client).map((cl: any) => (
                            <TableRow key={cl[1]?.companyName}>

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
                                                {cl[1]?.companyName}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Typography color="textSecondary" variant="h6">
                                        {cl[1]?.email}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    {
                                        cl[1].isBlocked ? (
                                            <Chip onClick={() => unBlockClientFn(cl[1]._id)}
                                                sx={{
                                                    pl: "4px", pr: "4px", backgroundColor: 'red', color: "#fff",
                                                }} size="small" label='unBlock'
                                            ></Chip>
                                        ) : (
                                            <Chip onClick={() => blockClientFn(cl[1]._id)}
                                                sx={{
                                                    pl: "4px", pr: "4px", backgroundColor: 'green', color: "#fff",
                                                }} size="small" label='block'
                                            ></Chip>
                                        )
                                    }
                                </TableCell>


                                <TableCell align="left">
                                    <Typography variant="h6">
                                        <div className='text-left'>
                                            <ViewUserInAdmin roleId={cl[1]?._id} roleInfo='client' />
                                        </div>
                                    </Typography>
                                </TableCell>

                                <TableCell align="right">
                                    <Typography variant="h6">{cl[1]?.totalSpend}</Typography>
                                </TableCell>

                                <TableCell align="right">
                                    <Typography variant="h6">{cl[1]?.totalHours}</Typography>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </section>


            <section>
                <div>

                    <div className="container mx-auto px-4 py-10">
                        <nav className="flex flex-row flex-nowrap justify-between md:justify-center items-center" aria-label="Pagination">

                            {
                                currentPage - 1 < 1 ? (
                                    <div>

                                    </div>
                                ) : (
                                    <a onClick={() => changePage(currentPage - 1)} className="cursor-pointerflex w-10 h-10 justify-center items-center rounded-full border border-gray-200 bg-white -800 text-black  hover:border-gray-300 -gray-600"
                                        title="Previous Page">
                                        <span className="sr-only">Previous Page</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                            stroke="currentColor" className="block w-5 h-5 my-2 mx-auto">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                                        </svg>
                                    </a>
                                )
                            }



                            {Array.from({ length: totalPages }).map((_, index) => (
                                <p onClick={() => changePage(index + 1)}
                                    key={index}
                                    className="md:flex w-10 h-10 mx-2 my-4 cursor-pointer justify-center items-center rounded-full border border-gray-200 bg-white -700 text-black  hover:border-gray-300 -gray-600"
                                    title={`Page ${index + 1}`}
                                >
                                    {index + 1}

                                </p>
                            ))}


                            {
                                currentPage + 1 > totalPages ? (
                                    <div>

                                    </div>
                                ) : (
                                    <a onClick={() => changePage(currentPage + 1)} className="cursor-pointer flex w-10 h-10 ml-1 justify-center items-center rounded-full border border-gray-200 bg-white text-black hover:border-gray-300 "
                                        title="Next Page">
                                        <span className="sr-only">Next Page</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                            stroke="currentColor" className="block w-5 h-5">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                        </svg>
                                    </a>
                                )
                            }

                        </nav>
                    </div>

                </div>
            </section>


            {/* <section>
                
            <div className="flex justify-center">

            {Array.from({ length: totalPages }).map((_, index) => (
                            <p onClick={() => changePage(index + 1)}
                                key={index}
                                className="md:flex w-10 h-10 mx-2 my-4 cursor-pointer justify-center items-center rounded-full border border-gray-200 bg-white  text-black  hover:border-gray-300 "
                                title={`Page ${index + 1}`}
                            >
                                {index + 1}  

                                <button className="min-w-9 rounded-full bg-slate-800 py-2 px-3.5 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2">
                    1
                </button>

                  


                <button className="rounded-full border border-slate-300 py-2 px-3 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2">
                    Prev
                </button>
                <button className="min-w-9 rounded-full bg-slate-800 py-2 px-3.5 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2">
                    1
                </button>
                <button className="min-w-9 rounded-full border border-slate-300 py-2 px-3.5 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2">
                    2
                </button>
                <button className="min-w-9 rounded-full border border-slate-300 py-2 px-3.5 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2">
                    3
                </button>
                <button className="min-w-9 rounded-full border border-slate-300 py-2 px-3 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2">
                    Next
                </button>
                </p>
                        ))}
             </div>
     </section> */}

        </>
    );
};

export default ExTable;
