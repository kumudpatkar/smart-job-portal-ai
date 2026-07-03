import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
);

const data = {
  labels: [
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun",
  ],
  datasets: [
    {
      label: "Applications",
      data: [2, 5, 3, 8, 10, 7, 12],
      fill: true,
      tension: 0.4,
      borderColor: "#2563eb",
      backgroundColor: "rgba(37,99,235,0.15)",
      pointBackgroundColor: "#2563eb",
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
};

const ApplicationChart = () => {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-6">

      <h2 className="text-2xl font-bold mb-6">
        📊 Weekly Applications
      </h2>

      <Line data={data} options={options} />

    </div>
  );
};

export default ApplicationChart;