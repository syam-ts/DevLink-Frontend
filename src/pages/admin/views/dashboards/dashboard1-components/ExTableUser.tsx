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
import { useState } from "react";
import { Sonner } from '../../../../../components/sonner/ToasterBottom';
import { toast } from "sonner";
// import { ViewRole } from '../../../../../components/nextUi/modals/AdminViewRole'
import { Link } from "react-router-dom";
import { blockUser , unBlockUser, deleteDatas } from '../../../../../utils/redux/slices/adminSlice'
import { useDispatch, useSelector } from "react-redux";


 
const ExTable = () => {

 
  const dispatch = useDispatch();

  // const handleViewUser = (userId: any) => {
  //   setSelectedUserId(userId);
    
  // };

  // const closeModal = () => {
 
  //   setSelectedUserId(null);
  // };
 
  const user = useSelector((state: any) => Array.from(state.admin?.user))
  const filter = user.filter((x: any, i: number) => {
    console.log('THE X : ', x._id)
    return x[i]?._id !== x[1+1]?._id
  })
 
  let set: any = new Set(user)
 console.log('The users ', filter)

  const userInfo = 'user';


  const blockUserFn = async (userId: string) => {
    try{
      console.log('THE USER ID : ', userId)
      const response = await axios.patch(`http://localhost:3000/admin/blockUser/${userId}`);
      
      console.log('The response', response.data)
      if(response.data.type == 'success') { 
        dispatch(blockUser(userId))
        toast.success(response.data.message, {
          position: 'top-center'
        })
      }
    }catch(err: any) {
      console.log(err.message)
    }
  }


  const unBlockUserFn = async (userId: any) => {
    try{

      const response = await axios.patch(`http://localhost:3000/admin/unblockUser/${userId}`);

      console.log('The response', response.data.message)
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


  const deleteData = () => {
    dispatch(deleteDatas(set))
  }

  return (
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
        {user.map((user: any) => (
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
{/*             
 
                       <div>
                         <ViewRole roleId={user[1]?._id}roleInfo="user"   />
                              view
                       </div> */}

 
                                 {/* <span>{user?.isBlocked}</span>   
                                 {
                                  user?.isBlocked ? <span> true </span> : <span>false</span>
                                 } */}

                                 
                       <Link to={`/admin/viewRole/${user[1]?._id}/${userInfo}`} >
                              <img className='h-5 w-5 cursor-pointer' src='https://cdn-icons-png.flaticon.com/128/159/159604.png' />
                       </Link>
                     
              
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
  );
};

export default ExTable;
