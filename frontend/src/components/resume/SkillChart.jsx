import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Doughnut } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function SkillChart({ skills = [] }) {
  const labels =
    skills.length > 0
      ? skills
      : [
          "Java",
          "Python",
          "React",
          "Node",
          "SQL",
        ];

  const values =
    labels.map(() => Math.floor(Math.random() * 30) + 70);

  const data = {
    labels,

    datasets: [
      {
        data: values,

        backgroundColor: [
          "#3B82F6",
          "#10B981",
          "#F59E0B",
          "#EF4444",
          "#8B5CF6",
          "#06B6D4",
          "#EC4899",
        ],

        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg p-8">

      <h2 className="text-2xl font-bold mb-6">
        Skill Distribution
      </h2>

      <div className="max-w-md mx-auto">

        <Doughnut data={data} />

      </div>

    </div>
  );
}

export default SkillChart;