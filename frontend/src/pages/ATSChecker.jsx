import { useState } from "react";
import API from "../services/api";

function ATSChecker() {
  const [jobRole, setJobRole] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkATS = async () => {
    if (!jobRole) {
      alert("Please enter a Job Role.");
      return;
    }

    try {
      setLoading(true);

      const { data } = await API.post("/ats/check", {
        jobRole,
      });

      setResult(data.result);

    } catch (error) {
      console.log(error);
      alert("Failed to check ATS score.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-8">

      <h1 className="text-4xl font-bold mb-8">
        ATS Resume Checker
      </h1>

      <input
        type="text"
        placeholder="Enter Job Role (Example: AI/ML Engineer)"
        value={jobRole}
        onChange={(e) => setJobRole(e.target.value)}
        className="w-full border rounded-xl p-3"
      />

      <button
        onClick={checkATS}
        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-xl"
      >
        {loading ? "Checking..." : "Check ATS Score"}
      </button>

      {result && (

        <div className="mt-10 bg-white shadow-lg rounded-2xl p-8">

          <h2 className="text-3xl font-bold text-green-600">
            ATS Score: {result.atsScore}%
          </h2>

          <div className="mt-8">

            <h3 className="text-xl font-semibold mb-3">
              Matched Keywords
            </h3>

            <ul className="list-disc ml-6">

              {result.matchedKeywords.map((item, index) => (
                <li key={index}>{item}</li>
              ))}

            </ul>

          </div>

          <div className="mt-8">

            <h3 className="text-xl font-semibold mb-3">
              Missing Keywords
            </h3>

            <ul className="list-disc ml-6">

              {result.missingKeywords.map((item, index) => (
                <li key={index}>{item}</li>
              ))}

            </ul>

          </div>

          <div className="mt-8">

            <h3 className="text-xl font-semibold mb-3">
              AI Suggestion
            </h3>

            <div className="bg-gray-100 rounded-xl p-5">
              {result.suggestion}
            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default ATSChecker;