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
import { blockUser , unBlockUser } from '../../../../../utils/redux/slices/adminSlice'
import { useDispatch, useSelector } from "react-redux";
import ViewUserInAdmin from "../../../../../components/bootstrap/ViewUserInAdmin"; 
import { useEffect, useState } from "react";   
import {  setUser ,deleteDatasUser } from '../../../../../utils/redux/slices/adminSlice'; 


 
const ExTable = () => {

 const [currentPage, setCurrentPage] = useState(1)
  const [ limit , setLimit] = useState(3);
  const [ skip , setSkip] = useState(3);
  const [ totalPages, setTotalPages]: any = useState([])
  const dispatch = useDispatch();
  const user = useSelector((state: any) => Array.from(state.admin?.user));



  useEffect(() => {

    (async () => {
      try{ 
        const { data } = await axios.get(`http://localhost:3000/admin/getAllUsers?page=${currentPage}` ,{
          withCredentials: true
        }); 
        console.log('THE FINAL USER : ',data?.data);

        console.log('T1 : ', totalPages[0], 'T2 : ', data.data.totalPages)
        if(totalPages[0] !== data?.data?.totalPages) (
          setTotalPages((prevPages: any) => [...prevPages, data?.data?.totalPages])
        ) 
     

        for(let i =0; i< 100; i++) {
          if (data?.data[i]) { 
             dispatch(setUser(data?.data[i]))
             } 
            }
      }catch(err: any) { 
        toast.error(err.message, {
          style: {
            backgroundColor: 'red',color: 'white'
          }
        })}
      })();
  }, [currentPage]);



  // Clearing the user slice
  useEffect(() => {
    dispatch(deleteDatasUser())

  }, [currentPage]);

 

 

  // const handleViewUser = (userId: any) => {
  //   setSelectedUserId(userId);
    
  // };

  // const closeModal = () => {
 
  //   setSelectedUserId(null);
  // };

  const nextPage = () => {
    setSkip(skip + limit)
  };

  const previousPage = () => {
    setSkip(skip - limit)
  };
 
const changePage = async (page: number) => { 
  
    setCurrentPage(page) 
 
}


  const blockUserFn = async (userId: string) => {
    try{ 
      const response = await axios.patch(`http://localhost:3000/admin/blockUser/${userId}`);
   
      if(response.data.type == 'success') { 
        dispatch(blockUser(userId))
        toast.success(response.data.message, {
          position: 'top-center'
        })
      }
    }catch(err: any) {
      console.log(err.message)
    }
  };



  const unBlockUserFn = async (userId: any) => {
    try{

      const response = await axios.patch(`http://localhost:3000/admin/unblockUser/${userId}`);
      if(response.data.type == 'success') { 
        dispatch(unBlockUser(userId));
        toast.success(response.data.message, {
          position: 'top-center'
        })
      }
    }catch(err: any) {
      console.log(err.message)
    }
  }
 
 

  return (

    <>
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
        { user.map((user: any) => (
          <TableRow key={ user?.name }>
            
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
                   <img className='h-9 w-9 rounded-full' src= {user?.profilePicture} />
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
                <Chip onClick={() => unBlockUserFn(user?._id) }
                  sx={{
                    pl: "4px", pr: "4px", backgroundColor: 'red', color: "#fff",
                  }} size="small" label= 'unBlock' 
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
                
               <div className='text-left'>
                 <ViewUserInAdmin roleId={user?._id} roleInfo='user' />
               </div>

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


{/* Pagination */}
    <div>
    <div className="container mx-auto px-4 py-10">
    <nav className="flex flex-row flex-nowrap justify-between md:justify-center items-center" aria-label="Pagination">
      
        <a onClick={() => changePage(currentPage-1)}  className="cursor-pointerflex w-10 h-10 mr-1 justify-center items-center rounded-full border border-gray-200 bg-white dark:bg-gray-800 text-black dark:text-white hover:border-gray-300 dark:hover:border-gray-600"
            title="Previous Page">
            <span onClick={previousPage} className="sr-only">Previous Page</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" className="block w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
        </a>


      {Array.from({ length: totalPages }).map((_, index) => (
          <p onClick={() => changePage(index+1)}
            key={index}
            className="md:flex w-10 h-10 mx-1 cursor-pointer justify-center items-center rounded-full border border-gray-200 bg-white dark:bg-gray-700 text-black dark:text-white hover:border-gray-300 dark:hover:border-gray-600"
            title={`Page ${index + 1}`}
          >
            {index + 1}
            
          </p>
    ))}
   
         
        
        <a onClick={() => changePage(currentPage+1)}  className="cursor-pointer flex w-10 h-10 ml-1 justify-center items-center rounded-full border border-gray-200 bg-white dark:bg-gray-800 text-black dark:text-white hover:border-gray-300 dark:hover:border-gray-600"
            title="Next Page">
            <span className="sr-only">Next Page</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" className="block w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
        </a>
    </nav>
</div>
    </div>
    </>
  );
};

export default ExTable;
