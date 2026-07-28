import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

import { Radar } from "react-chartjs-2";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

function ResumeRadarChart({
  communication = 80,
  technical = 90,
  projects = 85,
  education = 88,
  experience = 70,
  leadership = 75,
}) {
  const data = {
    labels: [
      "Communication",
      "Technical",
      "Projects",
      "Education",
      "Experience",
      "Leadership",
    ],

    datasets: [
      {
        label: "Resume Strength",

        data: [
          communication,
          technical,
          projects,
          education,
          experience,
          leadership,
        ],

        backgroundColor: "rgba(37,99,235,0.25)",

        borderColor: "#2563EB",

        pointBackgroundColor: "#2563EB",

        borderWidth: 3,
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

    scales: {
      r: {
        beginAtZero: true,
        min: 0,
        max: 100,

        ticks: {
          stepSize: 20,
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg p-8">

      <h2 className="text-2xl font-bold mb-8">
        Resume Strength Analysis
      </h2>

      <div className="max-w-xl mx-auto">

        <Radar
          data={data}
          options={options}
        />

      </div>

    </div>
  );
}

export default ResumeRadarChart;