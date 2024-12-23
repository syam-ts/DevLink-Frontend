import { Card, CardContent, Box, Typography } from "@mui/material";
import ExTableClient from "../dashboards/dashboard1-components/ExTableClient";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Sonner } from '../../../../components/sonner/Toaster'
import { toast } from "sonner";

const Table = () => {

  const [clients, setClients] = useState({});

  useEffect(() => {
    const loadUsers = async () => {
        try{

          const clients = await axios.get('http://localhost:3000/admin/getAllClients' ,{
            withCredentials: true
          });

          console.log("the total clients : ", clients?.data?.data)
           setClients(clients?.data?.data)

        }catch(err: any) {
          toast.error(err.message, {
            style: {
              backgroundColor: 'red',
              color: 'white'
            }
          })
        }
    };

    loadUsers();

  }, []);

  return (
    <Box>
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
            <ExTableClient  clients={clients} />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Table;
