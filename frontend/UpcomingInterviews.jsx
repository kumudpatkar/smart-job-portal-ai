import React from "react";
import { Calendar, Briefcase } from "lucide-react";

const UpcomingInterviews = () => {
  const interviews = [
    {
      company: "Google",
      role: "Frontend Developer",
      date: "28 June 2026",
    },
    {
      company: "Amazon",
      role: "Backend Engineer",
      date: "30 June 2026",
    },
    {
      company: "Microsoft",
      role: "AI Intern",
      date: "2 July 2026",
    },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow">

      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Calendar size={18} />
        Upcoming Interviews
      </h2>

      <div className="space-y-3">

        {interviews.map((item, index) => (
          <div
            key={index}
            className="border rounded-xl p-4 hover:shadow-md transition"
          >
            <h3 className="font-semibold flex items-center gap-2">
              <Briefcase size={16} />
              {item.company}
            </h3>

            <p className="text-slate-600 text-sm mt-1">
              {item.role}
            </p>

            <p className="text-blue-600 text-sm mt-2 font-medium">
              {item.date}
            </p>

          </div>
        ))}

      </div>
    </div>
  );
};

export default UpcomingInterviews;