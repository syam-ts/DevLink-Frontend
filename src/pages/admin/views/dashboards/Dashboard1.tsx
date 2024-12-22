import { Grid, Box } from "@mui/material";
import {
  BlogCard,
  SalesOverview,
  ProductPerformance,
  DailyActivities,
} from "./dashboard1-components";
import { useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";



const Dashboard1 = () => {
  
 const navigate = useNavigate();
 const isAdmin = useSelector((state: any) => state?.admin?.isAdmin);

 const [ users, setUsers ] = useState({});

console.log('The admin ', isAdmin)


useEffect(() => {
  const getDashboard = async () => {

    try {
      
      const response = await axios.get('http://localhost:3000/admin/dashboard',{
        withCredentials: true
    }); 
  
  
      console.log('The res ', response.data.data.allUsers)
      setUsers(response.data.data.allUsers);
    } catch (err: any) {
      console.log('The err', err.response.data.message)
    if(err.response.data.message == 'No token provided') {
      navigate('/admin/login')
    }
    }
  }

  getDashboard();
}, []);

useEffect(() => {
  console.log('Enterd')
  if(isAdmin === undefined) {
      navigate('/admin/login')
  }

}, []);

  return (
    <Box>
      <Grid container spacing={0}>
        {/* ------------------------- row 1 ------------------------- */}
        <Grid item xs={12} lg={12}>
          <SalesOverview />
        </Grid>
        {/* ------------------------- row 2 ------------------------- */}
        <Grid item xs={12} lg={4}>
          <DailyActivities />
        </Grid>
        <Grid item xs={12} lg={8}>
          <ProductPerformance users={users} />
        </Grid>
        {/* ------------------------- row 3 ------------------------- */}
        <BlogCard />
      </Grid>
    </Box>
  );
};

export default Dashboard1;
