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
import { ViewRole } from '../../../../../components/nextUi/modals/AdminViewRole'
 
const ExTable = ({ users }: any) => {

 
  const [selectedUserId, setSelectedUserId] = useState(null);

  const handleViewUser = (userId: any) => {
    setSelectedUserId(userId);
    
  };

  const closeModal = () => {
 
    setSelectedUserId(null);
  };
 
  
  const blockUser = async (userId: string) => {
    try{

      const response = await axios.patch(`http://localhost:3000/admin/blockUser/${userId}`);

      console.log('The response', response.data.message)
      if(response.data.type == 'success') { 
        toast.success(response.data.message, {
          position: 'bottom-right'
        })
      }
    }catch(err: any) {
      console.log(err.message)
    }
  }


  const unBlockUser = async (userId: string) => {
    try{

      const response = await axios.patch(`http://localhost:3000/admin/unblockUser/${userId}`);

      console.log('The response', response.data.message)
      if(response.data.type == 'success') { 
        toast.success(response.data.message, {
          position: 'bottom-right'
        })
      }
    }catch(err: any) {
      console.log(err.message)
    }
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
        {Object.entries(users).map((user: any) => (
          <TableRow key={user[1]?.name}>
            
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
                   <img className='h-9 w-9 rounded-full' src= {user[1]?.profilePicture} />
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
                    {user[1]?.name}
                  </Typography>
                </Box>
              </Box>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                {user[1]?.email}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                {user[1]?.budget}
              </Typography>
            </TableCell>
          
            <TableCell>
             {
              user[1].isBlocked ? (
                <Chip onClick={() => unBlockUser(user[1]._id) }
                  sx={{
                    pl: "4px", pr: "4px", backgroundColor: 'red', color: "#fff",
                  }} size="small" label= 'unBlock' 
              ></Chip>
              ) : (
                <Chip onClick={() => blockUser(user[1]._id)}
                    sx={{
                      pl: "4px", pr: "4px", backgroundColor: 'green', color: "#fff",
                    }} size="small" label='block'
              ></Chip>
              )
             }
            </TableCell>
           
      
           
            <TableCell align="right">
              <Typography variant="h6">
            
 
                       <div>
                         <ViewRole roleId={user[1]?._id}roleInfo="user"   />
                              view
                       </div>
                              <img className='h-5 w-5 cursor-pointer' src='https://cdn-icons-png.flaticon.com/128/159/159604.png' />
                     
              
              </Typography>
            </TableCell>
           
            <TableCell align="right">
              <Typography variant="h6">{100}</Typography>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ExTable;
