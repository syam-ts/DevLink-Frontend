import { Card, CardContent, Box, Typography } from "@mui/material";
import ExTableUser from "../dashboards/dashboard1-components/ExTableUser";
import { useEffect, useState } from "react";
import { Sonner } from '../../../../components/sonner/Toaster'
import { toast } from "sonner";
import axios from "axios";

const Table = () => {
 
  console.log('This is from the main one')
  const [users, setUsers] = useState({}); 

  useEffect(() => {

    console.log('Entered effect')
    const loadUsers = async () => {
        try{
       

          const users = await axios.get('http://localhost:3000/admin/getAllUsers' ,{
            withCredentials: true
          });

          console.log("the total users : ", users?.data?.data)
           setUsers(users?.data?.data)

        }catch(err: any) {
          console.log('First error', err.message)
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

  useEffect(() => {
      console.log('useEffectg effect')
  }, [])
 

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
            <ExTableUser users={users} />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Table;
