import { useLocation, useNavigate } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";

function InterviewReport() {
  const location = useLocation();
  const navigate = useNavigate();

  const report = location.state?.report || {
    overallScore: 90,
    technicalScore: 88,
    communicationScore: 92,
    confidenceScore: 89,
    problemSolvingScore: 87,
    strengths: [
      "Strong problem solving",
      "Good communication",
      "Clean coding style",
    ],
    weaknesses: [
      "Improve time complexity",
      "More confidence in advanced concepts",
    ],
    learningResources: [
      "LeetCode",
      "GeeksforGeeks",
      "System Design Primer",
    ],
    feedback:
      "Excellent interview performance. Continue practicing DSA and System Design to become interview ready."
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto py-8">

        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold">
              📄 AI Interview Report
            </h1>

            <p className="text-gray-500 mt-2">
              Detailed AI evaluation of your interview performance.
            </p>
          </div>

          <button
            onClick={() => navigate(-1)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl"
          >
            Back
          </button>
        </div>

        {/* Score Cards */}

        <div className="grid md:grid-cols-5 gap-5">

          <div className="bg-white rounded-2xl shadow p-6 text-center">
            <h3 className="text-gray-500">Overall</h3>
            <h1 className="text-5xl font-bold text-blue-600 mt-2">
              {report.overallScore}
            </h1>
          </div>

          <div className="bg-white rounded-2xl shadow p-6 text-center">
            <h3 className="text-gray-500">Technical</h3>
            <h1 className="text-5xl font-bold text-green-600 mt-2">
              {report.technicalScore}
            </h1>
          </div>

          <div className="bg-white rounded-2xl shadow p-6 text-center">
            <h3 className="text-gray-500">Communication</h3>
            <h1 className="text-5xl font-bold text-purple-600 mt-2">
              {report.communicationScore}
            </h1>
          </div>

          <div className="bg-white rounded-2xl shadow p-6 text-center">
            <h3 className="text-gray-500">Confidence</h3>
            <h1 className="text-5xl font-bold text-orange-600 mt-2">
              {report.confidenceScore}
            </h1>
          </div>

          <div className="bg-white rounded-2xl shadow p-6 text-center">
            <h3 className="text-gray-500">Problem Solving</h3>
            <h1 className="text-5xl font-bold text-red-600 mt-2">
              {report.problemSolvingScore}
            </h1>
          </div>

        </div>

        {/* Strengths */}

        <div className="bg-white rounded-2xl shadow p-8 mt-8">

          <h2 className="text-2xl font-bold text-green-700 mb-5">
            ✅ Strengths
          </h2>

          <ul className="list-disc ml-6 space-y-2">
            {report.strengths.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

        </div>

        {/* Weaknesses */}

        <div className="bg-white rounded-2xl shadow p-8 mt-8">

          <h2 className="text-2xl font-bold text-red-700 mb-5">
            ⚠ Areas to Improve
          </h2>

          <ul className="list-disc ml-6 space-y-2">
            {report.weaknesses.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

        </div>

        {/* Learning Resources */}

        <div className="bg-white rounded-2xl shadow p-8 mt-8">

          <h2 className="text-2xl font-bold text-blue-700 mb-5">
            📚 Recommended Learning Resources
          </h2>

          <div className="flex flex-wrap gap-3">
            {report.learningResources.map((item, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full"
              >
                {item}
              </span>
            ))}
          </div>

        </div>

        {/* AI Feedback */}

        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow p-8 mt-8 text-white">

          <h2 className="text-2xl font-bold mb-4">
            🤖 AI Feedback
          </h2>

          <p className="leading-8 text-lg">
            {report.feedback}
          </p>

        </div>

        {/* Buttons */}

        <div className="flex flex-wrap gap-5 mt-10">

          <button
            onClick={() => window.print()}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl"
          >
            📄 Download Report
          </button>

          <button
            onClick={() => navigate("/dashboard")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
          >
            🏠 Back to Dashboard
          </button>

        </div>

      </div>
    </DashboardLayout>
  );
}

export default InterviewReport;