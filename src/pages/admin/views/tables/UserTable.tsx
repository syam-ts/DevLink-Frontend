import { Card, CardContent, Box, Typography } from "@mui/material";
import ExTableUser from "../dashboards/dashboard1-components/ExTableUser";
import { useEffect, useState } from "react";
import { Sonner } from '../../../../components/sonner/Toaster'
import { toast } from "sonner";
import axios from "axios";
import { setUser } from '../../../../utils/redux/slices/adminSlice';
import { useDispatch } from "react-redux";


const Table = () => {
  
  const [users, setUsers] = useState({}); 
  const dispatch = useDispatch();

  useEffect(() => {
 
    const loadUsers = async () => {
        try{
       

          const { data } = await axios.get('http://localhost:3000/admin/getAllUsers' ,{
            withCredentials: true
          });

          setUsers(data?.data);

          for(let i =0; i< 100; i++) {
            if (data?.data[i]) { 
               dispatch(setUser(data?.data[i]))
               } 
          }

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
            <ExTableUser  />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Table;
