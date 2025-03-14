import React from "react";
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

const Dashboard: React.FC = () => {
   

  const lineData = {
      labels : ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Total JobPosts',
        data: [120, 190, 350, 470, 300, 120, 432],
        borderColor: 'rgba(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Total Proposals',
        data: [132, 342, 532, 335, 490, 124, 500],
        borderColor: 'rgba(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }, 
      {
        label: 'Job Completion Rate',
        data: [110, 142, 132, 235, 390, 244, 300],
        borderColor: 'rgba(255, 205, 86)',
      backgroundColor:  'rgba(255, 205, 86)',
      }, 
    ],
  };

  const userData = {
    labels: ['Total Users', 'Verified Users', 'Total Jobs done', 'Boosted Users'],
    datasets: [
      {
        label: '# of Votes',
        data: [1220, 1190, 3500, 870],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgba(255, 205, 86)',
          'rgba(54, 162, 235)',
          'rgba(25, 205, 86)',

        ]
      },
    ],
  };
  const clientData = {
    labels: ['Total Clients', 'Verified Clients', 'Total Jobs Created'],
    datasets: [
      {
        label: '# of Votes',
        data: [1220, 1190, 3500],
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
          <p className='text-3xl'>Revenue</p>
          <hr />
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
