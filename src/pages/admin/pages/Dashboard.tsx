import React, { use, useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement,
} from "chart.js";
import { Doughnut, Line } from "react-chartjs-2";
import { apiAdminInstance } from "../../../api/axiosInstance/axiosAdminInstance";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
);

interface ClientMetrics {
  totalClients: number
  verifiedClients: number
  totalJobs: number
}

interface UserMetrics {
  totalUsers: number
  boostedUsers: number
  verifiedUsers: number
  totalJobs: number
}

const Dashboard: React.FC = () => {

  const [clientMetrics, setClientMetrics] = useState<ClientMetrics>({
    totalClients: 0,
    verifiedClients: 0,
    totalJobs: 0
  });
  const [userMetrics, setUserMetrics] = useState<UserMetrics>({
    totalUsers: 0,
    boostedUsers: 0,
    verifiedUsers: 0,
    totalJobs: 0,
  });
  const [grossAmount, setGrossAmount] = useState<number>(0);
  const [totalWithdrawals, setTotalWithdrawals] = useState<number>(0);
  const [sortType, setSortType] = useState<string>('monthly');


  useEffect(() => {
    try {

      const fetchData = async () => {
        const { data } = await apiAdminInstance.get(`/getDashboard/${sortType}`);
        console.log('The result: ', data);
        setClientMetrics(data.response.clientMetrics);
        setUserMetrics(data.response.userMetrics);
        setGrossAmount(data.response.getRevenue.grossAmount);
        setTotalWithdrawals(data.response.getRevenue.totalWithdrawals);
      };
      fetchData();

    } catch (error: unknown) {
      const err = error as { message: string };
      console.log('ERROR: ', err.message);
    }

  }, []);
 


  const lineData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Gross Amount',
        data: [grossAmount],
        borderColor: 'rgba(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Total Withdrawals',
        data: [totalWithdrawals],
        borderColor: 'rgba(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      // {
      //   label: 'Job Completion Rate',
      //   data: [110, 142, 132, 235, 390, 244, 300],
      //   borderColor: 'rgba(255, 205, 86)',
      // backgroundColor:  'rgba(255, 205, 86)',
      // }, 
    ],
  };
  const { totalUsers,
    verifiedUsers,
    boostedUsers,
    totalJobs } = userMetrics
  const userData = {
    labels: ['Total Users', 'Verified Users', 'Boosted Users', 'Total Jobs'],
    datasets: [
      {
        label: '# of Votes',
        data: [totalUsers, verifiedUsers, boostedUsers,
          totalJobs],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgba(255, 205, 86)',
          'rgba(54, 162, 235)',
          'rgba(25, 205, 86)',

        ]
      },
    ],
  };

  const { totalClients, verifiedClients } = clientMetrics;
  const clientData = {
    labels: ['Total Clients', 'Verified Clients', 'Total Jobs Created'],
    datasets: [
      {
        label: '# of Votes',
        data: [totalClients, verifiedClients, clientMetrics.totalJobs],
        backgroundColor: [
          'rgba(255, 99, 132)',
          'rgba(54, 162, 235)',
          'rgba(255, 205, 86)',
        ]
      },
    ],
  };

  return (
    <div className='grid justify-center '>

      <section>
        <div className='mt-28 text-center'>
          {/* <p className='text-3xl'>Revenue</p> */}
          {/* <hr /> */}
          <Line
            data={lineData}
          />
        </div>
      </section>

      <p className='text-3xl mt-20 text-center'>Statistics</p>
      <hr />

      {/* Pie charts */}
      <section>
        <div className='flex gap-44 mt-20'>
          <div className=' h-96'>
            <span>User Metrics</span>
            <Doughnut
              data={userData}
            />
          </div>

          <div className=' h-96'>
            <span>Client Metrics</span>
            <Doughnut
              data={clientData}
            />
          </div>
        </div>
      </section>


    </div>
  );
};

export default Dashboard;
