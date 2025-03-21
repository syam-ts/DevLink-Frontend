import React, { useEffect, useState } from "react";
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
import {
  monthsData,
  weeksData,
  yearsData,
} from "../../../config/helper/dateHelper";

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
  Title
);

interface ClientMetrics {
  totalClients: number;
  verifiedClients: number;
  totalJobs: number;
}

interface UserMetrics {
  totalUsers: number;
  boostedUsers: number;
  verifiedUsers: number;
  totalJobs: number;
}

const Dashboard: React.FC = () => {
  const [clientMetrics, setClientMetrics] = useState<ClientMetrics>({
    totalClients: 0,
    verifiedClients: 0,
    totalJobs: 0,
  });
  const [userMetrics, setUserMetrics] = useState<UserMetrics>({
    totalUsers: 0,
    boostedUsers: 0,
    verifiedUsers: 0,
    totalJobs: 0,
  });
  const [labels, setLabels] = useState<string[]>([]);
  const [amountsGrossAmount, setAmountsGrossAmount] = useState([]);
  const [amountsTotalWithdrawals, setAmountsTotalWithdrawals] = useState([]);
  const [sortType, setSortType] = useState<string>("yearly");

  useEffect(() => {
    try {
      const fetchData = async () => {
        const { data } = await apiAdminInstance.get(
          `/getDashboard/${sortType}`
        );
        setClientMetrics(data.response.clientMetrics);
        setUserMetrics(data.response.userMetrics);
        interface Params {
          amount: number;
        }
        const grossAmount: Params = data.response.getRevenue.grossAmount;
        const totalWithdrawals: Params =
          data.response.getRevenue.totalWithdrawals;

        setAmountsGrossAmount(
          Object.entries(grossAmount).map((entry) => entry[1].amount)
        );
        setAmountsTotalWithdrawals(
          Object.entries(totalWithdrawals).map((entry) => entry[1].amount)
        );
      };

      fetchData();
    } catch (error: unknown) {
      const err = error as { message: string };
      console.log("ERROR: ", err.message);
    }
  }, [sortType]);

  useEffect(() => {
    if (sortType === "monthly") {
      setLabels(monthsData);
    } else if (sortType === "weekly") {
      setLabels(weeksData);
    } else {
      setLabels(yearsData);
    }
  }, [sortType]);

   

  let lineData = {
    labels: labels,
    
    datasets: [
      {
        label: "Gross Amount",
        data: amountsGrossAmount,
        borderColor: "rgba(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "Total Withdrawals",
        data: amountsTotalWithdrawals,
        borderColor: "rgba(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const { totalUsers, verifiedUsers, boostedUsers, totalJobs } = userMetrics;
  const userData = {
    labels: ["Total Users", "Verified Users", "Boosted Users", "Total Jobs"],
    datasets: [
      {
        label: "# of Votes",
        data: [totalUsers, verifiedUsers, boostedUsers, totalJobs],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgba(255, 205, 86)",
          "rgba(54, 162, 235)",
          "rgba(25, 205, 86)",
        ],
      },
    ],
  };

  const { totalClients, verifiedClients } = clientMetrics;
  const clientData = {
    labels: ["Total Clients", "Verified Clients", "Total Jobs Created"],
    datasets: [
      {
        label: "# of Votes",
        data: [totalClients, verifiedClients, clientMetrics.totalJobs],
        backgroundColor: [
          "rgba(255, 99, 132)",
          "rgba(54, 162, 235)",
          "rgba(255, 205, 86)",
        ],
      },
    ],
  };

  return (
    <div className="grid justify-center mt-20">
      <div>
    
        <p className='text-3xl text-center'>Revenue</p>  
       </div>
      <section className="grid gap-3 mx-auto">
        <div>
       
          <form className="max-w-[10rem] mx-16 ">
            <select
              onChange={(e) => setSortType(e.target.value)}
              className="bg-gray-50 border font-extrabold text-center h-[2.5rem] border-gray-300 text-gray-900 text-sm rounded-small w-full p-2.5 outline-none"
            >
              <option value="weekly" className='font-extrabold'>weekly</option>
              <option value="monthly" className='font-extrabold'>monthly</option>
              <option selected value="yearly" className='font-extrabold'>
                yearly
              </option>
            </select>
          </form>
        </div>

        <div className=" text-center w-[65rem]">  
          <Line data={lineData} />
        </div>
      </section>

      <p className="text-3xl mt-20 text-center">Statistics</p>
     

      {/* Pie charts */}
      <section>
        <div className="flex gap-44 mt-20 justify-center">
          <div className=" h-96">
            <span>User Metrics</span>
            <Doughnut data={userData} />
          </div>

          <div className=" h-96">
            <span>Client Metrics</span>
            <Doughnut data={clientData} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
