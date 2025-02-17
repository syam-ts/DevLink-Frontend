import { Card, CardContent, Box, Typography } from "@mui/material";
import ExTableClient from "../dashboards/dashboard1-components/ExTableClientTest";
import { useEffect } from 'react';
import axios from 'axios';
import { Sonner } from '../../../../components/sonner/Toaster'
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setClient, deleteDatasClient } from '../../../../redux/slices/adminSlice';

const Table = () => {

  const dispatch = useDispatch();  
  
 
  
  
  //cleaning client slice
    // useEffect(() => {
    //   dispatch(deleteDatasClient())
    // }, []);


  return (
    <Box>
       <Sonner />
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h3">Client Management</Typography>
          <Box
            sx={{
              overflow: {
                xs: "auto",
                sm: "unset",
              },
            }}
          >
            <ExTableClient />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Table;
