import { useEffect, useState } from "react";
import API from "../services/api";

function CoverLetter() {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
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

  const generateCoverLetter = async () => {
    if (!selectedJob) {
      alert("Please select a job.");
      return;
    }

    try {
      setLoading(true);

      const { data } = await API.post(
        `/jobs/${selectedJob}/cover-letter`
      );

      setCoverLetter(data.coverLetter);

    } catch (error) {
      console.log(error);
      alert("Failed to generate cover letter.");
    } finally {
      setLoading(false);
    }
  };

  const copyLetter = () => {
    navigator.clipboard.writeText(coverLetter);
    alert("Cover letter copied!");
  };

  return (
    <div className="max-w-5xl mx-auto p-8">

      <h1 className="text-4xl font-bold mb-8">
        AI Cover Letter Generator
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
        onClick={generateCoverLetter}
        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-xl"
      >
        {loading ? "Generating..." : "Generate Cover Letter"}
      </button>

      {coverLetter && (
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-8">

          <h2 className="text-2xl font-bold mb-4">
            AI Generated Cover Letter
          </h2>

          <div className="whitespace-pre-wrap border rounded-xl p-6 bg-gray-50">
            {coverLetter}
          </div>

          <button
            onClick={copyLetter}
            className="mt-6 px-5 py-2 bg-green-600 text-white rounded-xl"
          >
            Copy Cover Letter
          </button>

        </div>
      )}

    </div>
  );
}

export default CoverLetter;