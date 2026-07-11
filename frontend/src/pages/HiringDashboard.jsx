import { useEffect, useState } from "react";
import axios from "axios";
import {
  Users,
  FileText,
  CheckCircle,
  XCircle,
  TrendingUp,
} from "lucide-react";

const API = "http://127.0.0.1:8000";

export default function HiringDashboard() {
  const [stats, setStats] = useState({
    totalCandidates: 0,
    resumesAnalyzed: 0,
    shortlisted: 0,
    rejected: 0,
  });

  const [topCandidates, setTopCandidates] = useState([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const res = await axios.get(`${API}/api/resume-ranking/dashboard`);

      setStats(res.data.stats);
      setTopCandidates(res.data.top_candidates);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">
        AI Hiring Dashboard
      </h1>

      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">

        <div className="bg-white rounded-xl shadow p-6">
          <Users className="text-blue-600 mb-3" size={35} />
          <h2 className="text-gray-500">Candidates</h2>
          <p className="text-3xl font-bold">
            {stats.totalCandidates}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <FileText className="text-green-600 mb-3" size={35} />
          <h2 className="text-gray-500">Resumes</h2>
          <p className="text-3xl font-bold">
            {stats.resumesAnalyzed}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <CheckCircle className="text-emerald-600 mb-3" size={35} />
          <h2 className="text-gray-500">Shortlisted</h2>
          <p className="text-3xl font-bold">
            {stats.shortlisted}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <XCircle className="text-red-600 mb-3" size={35} />
          <h2 className="text-gray-500">Rejected</h2>
          <p className="text-3xl font-bold">
            {stats.rejected}
          </p>
        </div>

      </div>

      <div className="mt-10 bg-white rounded-xl shadow">

        <div className="p-6 border-b">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <TrendingUp size={24} />
            Top Ranked Candidates
          </h2>
        </div>

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>
              <th className="text-left p-4">Candidate</th>
              <th className="text-left p-4">Email</th>
              <th className="text-left p-4">ATS Score</th>
              <th className="text-left p-4">Status</th>
            </tr>

          </thead>

          <tbody>

            {topCandidates.map((candidate, index) => (

              <tr
                key={index}
                className="border-b hover:bg-gray-50"
              >

                <td className="p-4">
                  {candidate.name}
                </td>

                <td className="p-4">
                  {candidate.email}
                </td>

                <td className="p-4 font-bold text-blue-600">
                  {candidate.score}%
                </td>

                <td className="p-4">

                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      candidate.status === "Shortlisted"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {candidate.status}
                  </span>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}