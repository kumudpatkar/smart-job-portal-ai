import { useEffect, useState } from "react";
import API from "../services/api";

function MatchJobs() {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState("");
  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(false);

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

  const matchJob = async () => {
    if (!selectedJob) {
      alert("Please select a job.");
      return;
    }

    try {
      setLoading(true);

      const { data } = await API.get(`/jobs/match/${selectedJob}`);

      setMatch(data.match);

    } catch (error) {
      console.log(error);
      alert("Unable to match job.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-8">

      <h1 className="text-4xl font-bold mb-8">
        AI Job Matching
      </h1>

      <select
        className="border p-3 rounded-xl w-full"
        value={selectedJob}
        onChange={(e) => setSelectedJob(e.target.value)}
      >
        <option value="">Select Job</option>

        {jobs.map((job) => (
          <option key={job._id} value={job._id}>
            {job.title}
          </option>
        ))}

      </select>

      <button
        onClick={matchJob}
        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-xl"
      >
        {loading ? "Matching..." : "Match Resume"}
      </button>

      {match && (

        <div className="mt-8 bg-white shadow rounded-2xl p-8">

          <h2 className="text-3xl font-bold mb-6">
            Match Result
          </h2>

          <h3 className="text-xl font-semibold">
            Score: {match.score}%
          </h3>

          <p className="mt-4">
            <strong>Confidence:</strong> {match.confidence}
          </p>

          <p className="mt-4">
            <strong>Recommendation:</strong> {match.recommendation}
          </p>

          <div className="mt-6">

            <h3 className="font-bold">
              Matching Skills
            </h3>

            <ul className="list-disc ml-6">

              {match.matchingSkills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}

            </ul>

          </div>

          <div className="mt-6">

            <h3 className="font-bold">
              Missing Skills
            </h3>

            <ul className="list-disc ml-6">

              {match.missingSkills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}

            </ul>

          </div>

        </div>

      )}

    </div>
  );
}

export default MatchJobs;