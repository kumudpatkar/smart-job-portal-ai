import { useEffect, useState } from "react";
import API from "../services/api";

import {
  MapPin,
  IndianRupee,
  Clock3,
} from "lucide-react";

const RecentJobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const { data } = await API.get("/jobs");
      setJobs(data.jobs);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg p-6">

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">
          🔥 Latest Jobs
        </h2>

        <button className="text-blue-600 font-semibold hover:underline">
          View All
        </button>
      </div>

      <div className="space-y-5">

        {jobs.length > 0 ? (

          jobs.map((job) => (

            <div
              key={job._id}
              className="flex justify-between items-center border rounded-2xl p-5 hover:shadow-xl hover:border-blue-500 transition-all duration-300"
            >

              <div>

                <h3 className="text-xl font-bold">
                  {job.title}
                </h3>

                <p className="text-gray-500">
                  {job.company?.companyName || "Company"}
                </p>

                <div className="flex gap-5 mt-3 text-sm text-gray-500">

                  <div className="flex items-center gap-1">
                    <MapPin size={16} />
                    {job.location}
                  </div>

                  <div className="flex items-center gap-1">
                    <IndianRupee size={16} />
                    {job.salary}
                  </div>

                  <div className="flex items-center gap-1">
                    <Clock3 size={16} />
                    {job.jobType}
                  </div>

                </div>

              </div>

              <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:scale-105 transition">
                Apply
              </button>

            </div>

          ))

        ) : (

          <p className="text-gray-500">
            No jobs available.
          </p>

        )}

      </div>

    </div>
  );
};

export default RecentJobs;