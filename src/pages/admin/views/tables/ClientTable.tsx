import { Card, CardContent, Box, Typography } from "@mui/material";
import ExTableClient from "../dashboards/dashboard1-components/ExTableClient";
import { useEffect } from 'react';
import axios from 'axios';
import { Sonner } from '../../../../components/sonner/Toaster'
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setClient, deleteDatasClient } from '../../../../utils/redux/slices/adminSlice';

const Table = () => {

  const dispatch = useDispatch();  
  
  useEffect(() => {
    (async() => {
      try{ 
        const { data } = await axios.get('http://localhost:3000/admin/getAllClients' ,{
          withCredentials: true
        }); 
           for(let i =0; i< 100; i++) {
                     if (data?.data[i]) { 
                        dispatch(setClient(data?.data[i]))
                      } 
                      }}catch(err: any) {
        toast.error(err.message, {
          style: {
            backgroundColor: 'red',color: 'white'
          }})}
      })()
  }, []);
  
  
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
