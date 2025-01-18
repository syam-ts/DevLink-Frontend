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
import { useDispatch, useSelector } from "react-redux";
import { blockClient, unBlockClient } from '../../../../../utils/redux/slices/adminSlice'
import ViewUserInAdmin from "../../../../../components/bootstrap/ViewUserInAdmin";


const ExTable = () => {

  const dispatch = useDispatch();
  const client = useSelector((state: any) => Array.from(state.admin?.client))


  const blockClientFn = async (clientId: string) => {
    try {

      const response = await axios.patch(`http://localhost:3000/admin/blockClient/${clientId}`);

      console.log('The response', response.data.message)
      if (response.data.type == 'success') {
        dispatch(blockClient(clientId))
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
        dispatch(unBlockClient(clientId))
        toast.success(response.data.message, {
          position: 'top-center'
        })
      }
    } catch (err: any) {
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
        {client.map((cl: any) => (
          <TableRow key={cl?.companyName}>

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
                    {cl?.companyName}
                  </Typography>
                </Box>
              </Box>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                {cl?.email}
              </Typography>
            </TableCell>
            <TableCell>
              {
                cl.isBlocked ? (
                  <Chip onClick={() => unBlockClientFn(cl._id)}
                    sx={{
                      pl: "4px", pr: "4px", backgroundColor: 'red', color: "#fff",
                    }} size="small" label='unBlock'
                  ></Chip>
                ) : (
                  <Chip onClick={() => blockClientFn(cl._id)}
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
                      <ViewUserInAdmin roleId={cl?._id} roleInfo='client' />
                    </div>
                 </Typography>
            </TableCell>

            <TableCell align="right">
              <Typography variant="h6">{cl?.totalSpend}</Typography>
            </TableCell>

            <TableCell align="right">
              <Typography variant="h6">{cl?.totalHours}</Typography>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ExTable;
