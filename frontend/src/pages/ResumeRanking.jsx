import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import API from "../services/api";

const ResumeRanking = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState("");
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const { data } = await API.get("/jobs");

      setJobs(data.jobs || []);
    } catch (err) {
      console.log(err);
    }
  };

  const loadRanking = async () => {
    if (!selectedJob) return;

    try {
      const { data } = await API.get(
        `/resume-ranking/job/${selectedJob}`
      );

      setRanking(data.ranking || []);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <DashboardLayout>
      <div className="p-8">

        <h1 className="text-3xl font-bold mb-8">
          AI Resume Ranking
        </h1>

        <div className="flex gap-4 mb-8">

          <select
            className="border p-3 rounded-lg w-96"
            value={selectedJob}
            onChange={(e) => setSelectedJob(e.target.value)}
          >
            <option value="">
              Select Job
            </option>

            {jobs.map((job) => (
              <option
                key={job._id}
                value={job._id}
              >
                {job.title}
              </option>
            ))}

          </select>

          <button
            onClick={loadRanking}
            className="bg-blue-600 text-white px-6 rounded-lg"
          >
            Rank Resumes
          </button>

        </div>

        <div className="bg-white rounded-xl shadow">

          <table className="w-full">

            <thead className="bg-slate-100">

              <tr>

                <th className="p-4 text-left">
                  Candidate
                </th>

                <th className="p-4">
                  Email
                </th>

                <th className="p-4">
                  ATS Score
                </th>

                <th className="p-4">
                  Level
                </th>

              </tr>

            </thead>

            <tbody>

              {ranking.map((item) => (

                <tr
                  key={item.resumeId}
                  className="border-b"
                >

                  <td className="p-4">
                    {item.candidateName}
                  </td>

                  <td className="p-4">
                    {item.email}
                  </td>

                  <td className="p-4 font-bold text-blue-600">
                    {item.score}%
                  </td>

                  <td className="p-4">
                    {item.level}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>
    </DashboardLayout>
  );
};

export default ResumeRanking;