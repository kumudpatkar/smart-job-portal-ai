import { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import ATSScoreCard from "../components/ATSScoreCard";
import API from "../services/api";

function ATSChecker() {

  const [file, setFile] = useState(null);

  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState(null);

  const analyzeResume = async () => {

    if (!file) {

      alert("Please upload your resume.");

      return;

    }

    try {

      setLoading(true);

      const formData = new FormData();

      formData.append("resume", file);

      const { data } = await API.post(
        "/ats/analyze",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setResult(data);

    } catch (error) {

      console.log(error);

      alert("ATS Analysis Failed");

    } finally {

      setLoading(false);

    }

  };

  return (

    <DashboardLayout>

      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold mb-3">

          ATS Resume Checker

        </h1>

        <p className="text-gray-500 mb-10">

          Upload your resume and get an AI-powered ATS score with skill analysis and recommendations.

        </p>

        <div className="bg-white rounded-3xl shadow-xl p-8">

          <input

            type="file"

            accept=".pdf,.doc,.docx"

            onChange={(e) =>
              setFile(e.target.files[0])
            }

            className="w-full border rounded-xl p-4"

          />

          <button

            onClick={analyzeResume}

            disabled={loading}

            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl text-lg font-semibold"

          >

            {loading
              ? "Analyzing Resume..."
              : "Analyze Resume"}

          </button>

        </div>

        <ATSScoreCard result={result} />

      </div>

    </DashboardLayout>

  );

}

export default ATSChecker;