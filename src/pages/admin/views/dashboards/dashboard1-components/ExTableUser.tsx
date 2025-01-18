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
import axios from "axios";
import { Sonner } from '../../../../../components/sonner/ToasterBottom';
import { toast } from "sonner";
import { blockUser, unBlockUser } from '../../../../../utils/redux/slices/adminSlice'
import { useDispatch, useSelector } from "react-redux";
import ViewUserInAdmin from "../../../../../components/bootstrap/ViewUserInAdmin";
import { useEffect, useState } from "react";
import { setUser, deleteDatasUser } from '../../../../../utils/redux/slices/adminSlice';



const ExTable = () => {

  const [currentPage, setCurrentPage] = useState(1); 
  const [totalPages, setTotalPages]: any = useState([]);
  const [isSearchTriggered, setIsSearchTriggered] = useState(false);
  const [isSortTriggered, setIsSortTriggered] = useState(false);
  const dispatch = useDispatch();
  const user: any = useSelector((state: any) => Array.from(state.admin?.user));



  useEffect(() => {

    (async () => {
      try {
        if(!isSearchTriggered || !isSortTriggered) {
          const { data } = await axios.get(`http://localhost:3000/admin/getAllUsers?page=${currentPage}`, {
            withCredentials: true
          }); 
   
          if (totalPages[0] !== data?.data?.totalPages) (
            setTotalPages((prevPages: any) => [...prevPages, data?.data?.totalPages])
          )
  
  
          for (let i = 0; i < 100; i++) {
            if (data?.data[i]) {
              dispatch(setUser(data?.data[i]))
            }
          }
        }
       
       
      } catch (err: any) {
        toast.error(err.message, {
          style: {
            backgroundColor: 'red', color: 'white'
          }
        })
      }
    })();
  }, [currentPage]);



  useEffect(() => {
    dispatch(deleteDatasUser(user));
 
    setIsSearchTriggered(false);
    setIsSortTriggered(false);
  }, [currentPage, isSearchTriggered, isSortTriggered]);
 

 
  const changePage = async (page: number) => {
    setCurrentPage(page);
  };
 
  
  
  const searchFunction = async (inputData: string) => {
    try{

      setIsSearchTriggered(true)
       const { data } = await axios.post(`http://localhost:3000/admin/getAllUsers/search?inputData=${inputData}`);

      
       
       if (totalPages[0] !== data?.data?.totalPages) (
        setTotalPages((prevPages: any) => [...prevPages, data?.data?.totalPages])
       )
       
       for (let i = 0; i < 100; i++) {
         if (data?.data[i]) {
           dispatch(setUser(data?.data[i]))
          }
        }
      }catch(err: any) {
      console.error('ERROR: ', err.messsage);
    }
  };
  
  
  const advancedSorting = async (sortingType: string) => {
    try{
      setIsSortTriggered(true);
        const { data } = await axios.post(`http://localhost:3000/admin/getAllUsers/sort?sortingType=${sortingType}`);

        console.log('THE OUTPUT FROM SORT : ', data?.data);
        if (totalPages[0] !== data?.data?.totalPages) (
          setTotalPages((prevPages: any) => [...prevPages, data?.data?.totalPages])
         )
         
         for (let i = 0; i < 100; i++) {
           if (data?.data[i]) {
             dispatch(setUser(data?.data[i]))
           }
         }
    }catch(err: any) {
      console.error('ERROR: ', err.message);
    }
  };



  const blockUserFn = async (userId: string) => {
    try {
      const response = await axios.patch(`http://localhost:3000/admin/blockUser/${userId}`);

      if (response.data.type == 'success') {
        dispatch(blockUser(userId))
        toast.success(response.data.message, {
          position: 'top-center'
        })
      }
    } catch (err: any) {
      console.log(err.message)
    }
  };



  const unBlockUserFn = async (userId: any) => {
    try {

      const response = await axios.patch(`http://localhost:3000/admin/unblockUser/${userId}`);
      if (response.data.type == 'success') {
        dispatch(unBlockUser(userId));
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

 {/* Search section */}
      <section className='my-10'>
      <div className='flex justify-between'>
            <div className="w-full max-w-sm min-w-[200px]">
              <div className="relative">
                <input onChange={(e: any) => searchFunction(e.target.value)}  
                  className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-xl pl-3 pr-28 py-2.5 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                  placeholder="Search here"
                />
                <button
                  className="absolute top-1 right-1 flex items-center rounded-xl bg-slate-800 py-1.5 px-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  type="button">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-2">
                    <path fill-rule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clip-rule="evenodd" />
                  </svg>
                  Search
                </button>
              </div>
            </div>
          <div>
          
 
             
            <div className="max-w-sm mx-auto">
              <label className="sr-only">Underline select</label>
              <select onChange={(e: any) => advancedSorting(e.target.value)} id="underline_select" className="block cursor-pointer px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
                  <option selected>Advaned Sorting</option>
                  <option value="blocked">Blocked</option>
                  <option value="unBlocked">Un Blocked</option> 
                  <option value="latest">Latest</option>
              </select>
              <hr className='bg-black w-44' />
            </div>



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
                Image
              </Typography>
            </TableCell>
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
                Pay/Hour
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Block/Unblock
              </Typography>
            </TableCell>

            <TableCell align="left">
              <Typography color="textSecondary" variant="h6">
                Total Jobs
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography color="textSecondary" variant="h6">
                Total Jobs
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {user?.map((user: any) => (
            <TableRow key={user?.name}>

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
                      <img className='h-9 w-9 rounded-full' src={user?.profilePicture} />
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
                      {user?.name}
                    </Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  {user?.email}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  {user?.budget}
                </Typography>
              </TableCell>

              <TableCell>
                {
                  user.isBlocked ? (
                    <Chip onClick={() => unBlockUserFn(user?._id)}
                      sx={{
                        pl: "4px", pr: "4px", backgroundColor: 'red', color: "#fff",
                      }} size="small" label='unBlock'
                    ></Chip>
                  ) : (
                    <Chip onClick={() => blockUserFn(user?._id)}
                      sx={{
                        pl: "4px", pr: "4px", backgroundColor: 'green', color: "#fff",
                      }} size="small" label='block'
                    ></Chip>
                  )
                }
              </TableCell>



              <TableCell align="right">
                <Typography variant="h6">

                  {/* <div className='text-left'>
                    <ViewUserInAdmin roleId={user?._id} roleInfo='user' />
                  </div> */}

                  {/* <div>
                         <ViewRole roleId={user[1]?._id}roleInfo="user"   />
                              view
                       </div> 

 
                                  <span>{user?.isBlocked}</span>   
                                 {
                                  user?.isBlocked ? <span> true </span> : <span>false</span>
                                 }  

                                 
                             
                       <Link to={`/admin/viewRole/${user[1]?._id}/${userInfo}`} >
                       </Link>
                      */}

                </Typography>
              </TableCell>

              <TableCell align="right">
                <Typography variant="h6">{100}</Typography>
              </TableCell>
            </TableRow>
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
          <nav className="flex flex-row flex-nowrap justify-between md:justify-center items-center" aria-label="Pagination">

           {
            currentPage-1 < 1 ? (
              <div>

              </div>
            ) : (
              <a onClick={() => changePage(currentPage - 1)} className="cursor-pointerflex w-10 h-10 justify-center items-center rounded-full border border-gray-200 bg-white dark:bg-gray-800 text-black dark:text-white hover:border-gray-300 dark:hover:border-gray-600"
              title="Previous Page">
              <span className="sr-only">Previous Page</span>
              <svg xmlns="http://www.w3.org/2000/svg"  fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" className="block w-5 h-5 my-2 mx-auto">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </a>
            )
           }


            {Array.from({ length: totalPages }).map((_, index) => (
              <p onClick={() => changePage(index + 1)}
                key={index}
                className="md:flex w-10 h-10 mx-2 my-4 cursor-pointer justify-center items-center rounded-full border border-gray-200 bg-white dark:bg-gray-700 text-black dark:text-white hover:border-gray-300 dark:hover:border-gray-600"
                title={`Page ${index + 1}`}
              >
                {index + 1}

              </p>
            ))}

              
              {
                 currentPage+1 > totalPages ? (
                  <div>
    
                  </div>
                 ): (
            <a onClick={() => changePage(currentPage + 1)} className="cursor-pointer flex w-10 h-10 ml-1 justify-center items-center rounded-full border border-gray-200 bg-white dark:bg-gray-800 text-black dark:text-white hover:border-gray-300 dark:hover:border-gray-600"
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
     
    </>
  );
};

export default ExTable;
