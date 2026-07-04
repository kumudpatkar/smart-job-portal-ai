import { useEffect, useState } from "react";
import API from "../services/api";

const CareerProgress = () => {
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const { data } = await API.get("/resume/dashboard");
      setDashboard(data.dashboard);
    } catch (error) {
      console.log(error);
    }
  };

  const progress = [
    {
      name: "ATS Score",
      value: dashboard?.atsScore || 0,
      color: "bg-blue-500",
    },
    {
      name: "Skills",
      value: dashboard ? dashboard.totalSkills * 10 : 0,
      color: "bg-green-500",
    },
    {
      name: "Projects",
      value: dashboard ? dashboard.totalProjects * 20 : 0,
      color: "bg-purple-500",
    },
    {
      name: "Experience",
      value: dashboard ? dashboard.totalExperience * 20 : 0,
      color: "bg-pink-500",
    },
  ];

  return (
    <div className="bg-white rounded-3xl shadow-lg p-8">

      <h2 className="text-2xl font-bold mb-8">
        📈 Career Progress
      </h2>

      <div className="space-y-7">

        {progress.map((item) => (
          <div key={item.name}>

            <div className="flex justify-between mb-2">

              <span className="font-medium text-slate-700">
                {item.name}
              </span>

              <span className="font-bold text-blue-600">
                {item.value}%
              </span>

            </div>

            <div className="w-full bg-slate-200 rounded-full h-3">

              <div
                className={`${item.color} h-3 rounded-full`}
                style={{
                  width: `${Math.min(item.value, 100)}%`,
                }}
              ></div>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
};

export default CareerProgress;