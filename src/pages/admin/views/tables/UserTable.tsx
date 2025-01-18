import { Card, CardContent, Box, Typography } from "@mui/material";
import ExTableUser from "../dashboards/dashboard1-components/ExTableUser";
import { Sonner } from '../../../../components/sonner/Toaster'
 


const Table = () => {
  
 
 
 

  return (
    <Box>
    <Sonner />
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h3">User Management</Typography>
          <Box
            sx={{
              overflow: {
                xs: "auto",
                sm: "unset",
              },
            }}
          >
            <ExTableUser  />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Table;
