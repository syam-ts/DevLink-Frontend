import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard: React.FC = () => {
  return (
    <div className=" p-64">
      <p className=" text-3xl mb-4">Revenue</p>
      <Bar
        data={{
          labels: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            " December",
          ],
          datasets: [
            {
              label: "Revenue",
              data: [120000, 310000, 200000, 120000, 110000, 200000, 120000, 310000, 200000,120000, 210000, 200000],
              backgroundColor: "rgb(228, 208, 10)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        }}
        options={{
          responsive: true,
          scales: {
            x: {
              type: "category",
              ticks: { color: "black" },
            },
            y: {
              beginAtZero: true,
              ticks: { color: "black" },
            },
          },
          plugins: {
            legend: {
              labels: { color: "white" },
            },
          },
        }}
      />
    </div>
  );
};

export default Dashboard;
