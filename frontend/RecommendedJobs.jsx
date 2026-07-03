import React from "react";
import { Briefcase } from "lucide-react";
import { Link } from "react-router-dom";

const RecommendedJobs = () => {
  const jobs = [
    {
      title: "Frontend Developer",
      company: "Google",
      location: "Remote",
      id: 1,
    },
    {
      title: "Backend Engineer",
      company: "Amazon",
      location: "Bangalore",
      id: 2,
    },
    {
      title: "AI Intern",
      company: "Microsoft",
      location: "Hyderabad",
      id: 3,
    },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow">

      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Briefcase size={18} />
        Recommended Jobs
      </h2>

      <div className="space-y-3">

        {jobs.map((job) => (
          <div
            key={job.id}
            className="border rounded-xl p-4 hover:shadow-md transition"
          >
            <h3 className="font-semibold text-slate-800">
              {job.title}
            </h3>

            <p className="text-sm text-slate-500">
              {job.company} • {job.location}
            </p>

            <Link
              to={`/jobs/${job.id}`}
              className="text-blue-600 text-sm mt-2 inline-block hover:underline"
            >
              View Details
            </Link>

          </div>
        ))}

      </div>
    </div>
  );
};

export default RecommendedJobs;