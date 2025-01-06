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
  
  const blockClient = async (clientId: string) => {
    try{

      const response = await axios.patch(`http://localhost:3000/admin/blockClient/${clientId}`);

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


  const unBlockClient = async (clientId: string) => {
    try{

      const response = await axios.patch(`http://localhost:3000/admin/unblockClient/${clientId}`);

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
   
  const ExTable = ({ clients }: any) => {
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
                Block/Unblock
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
          {Object.entries(clients).map((client: any) => (
            <TableRow key={client[1]?.name}>
              <TableCell>
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: "500",
                  }}
                >    { console.log( 'The whole clients', client[1]?.name)}
                  {client?.profilePicture } {0}
                </Typography>
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
                        fontWeight: "600",
                      }}
                    >
                      {client[1]?.name}
                    </Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  {client[1]?.email}
                </Typography>
              </TableCell>
              <TableCell>
             {
              client[1].isBlocked ? (
                <Chip onClick={() => unBlockClient(client[1]._id) }
                  sx={{
                    pl: "4px", pr: "4px", backgroundColor: 'red', color: "#fff",
                  }} size="small" label= 'unBlock' 
              ></Chip>
              ) : (
                <Chip onClick={() => blockClient(client[1]._id)}
                    sx={{
                      pl: "4px", pr: "4px", backgroundColor: 'green', color: "#fff",
                    }} size="small" label='block'
              ></Chip>
              )
             }
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
  