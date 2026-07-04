import { useEffect, useState } from "react";
import API from "../services/api";

function Interview() {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState("");
  const [questions, setQuestions] = useState([]);
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

  const generateQuestions = async () => {
    if (!selectedJob) {
      alert("Please select a job.");
      return;
    }

    try {
      setLoading(true);

      const { data } = await API.post(
        `/jobs/${selectedJob}/interview-questions`
      );

      setQuestions(data.questions);

    } catch (error) {
      console.log(error);
      alert("Failed to generate interview questions.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-8">

      <h1 className="text-4xl font-bold mb-8">
        AI Interview Questions
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
        onClick={generateQuestions}
        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-xl"
      >
        {loading ? "Generating..." : "Generate Questions"}
      </button>

      {questions.length > 0 && (

        <div className="mt-8 bg-white rounded-2xl shadow-lg p-8">

          <h2 className="text-2xl font-bold mb-6">
            Interview Questions
          </h2>

          <ol className="list-decimal ml-6 space-y-4">

            {questions.map((question, index) => (
              <li key={index}>
                {question}
              </li>
            ))}

          </ol>

        </div>

      )}

    </div>
  );
}

export default Interview;