import { useState } from "react";
import API from "../services/api";
import AnimatedPage from "../components/AnimatedPage";

const ResumeAnalyzer = () => {
  const [file, setFile] = useState(null);
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);

  const uploadResume = async () => {
    if (!file) {
      alert("Please select a PDF resume.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    try {
      setLoading(true);

      const { data } = await API.post(
        "/resume/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setResume(data.resume);

      alert("Resume uploaded successfully!");

    } catch (error) {
      console.log(error);
      alert("Resume upload failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatedPage>

      <div className="max-w-5xl mx-auto p-8">

        <h1 className="text-4xl font-bold mb-8">
          AI Resume Analyzer
        </h1>

        <div className="bg-white rounded-2xl shadow-lg p-8">

          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setFile(e.target.files[0])}
          />

          <button
            onClick={uploadResume}
            disabled={loading}
            className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-xl"
          >
            {loading ? "Uploading..." : "Upload Resume"}
          </button>

        </div>

</div>

{resume && (

  <div className="mt-8 bg-white rounded-2xl shadow-lg p-8">

    <h2 className="text-3xl font-bold mb-6">
      Resume Analysis
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

      <div className="mt-8 bg-white border rounded-2xl p-6">

  <h2 className="text-2xl font-bold mb-4">
    📝 AI Resume Summary
  </h2>

  <p className="text-gray-700 leading-7">
    {resume.summary}
  </p>

</div>

<div className="mt-8 bg-white border rounded-2xl p-6">

  <h2 className="text-2xl font-bold mb-5">
    💡 AI Suggestions
  </h2>

  <ul className="space-y-3">

    {resume.suggestions.map((item, index) => (

      <li
        key={index}
        className="bg-blue-50 p-3 rounded-lg"
      >
        ✅ {item}
      </li>

    ))}

  </ul>

</div>

<div className="mt-8 bg-white border rounded-2xl p-6">

  <h2 className="text-2xl font-bold mb-5">
    🚀 Missing Skills
  </h2>

  <div className="flex flex-wrap gap-3">

    {resume.missingSkills.map((skill, index) => (

      <span
        key={index}
        className="bg-red-100 text-red-700 px-4 py-2 rounded-full"
      >
        {skill}
      </span>

    ))}

  </div>

</div>

      <div className="bg-blue-100 rounded-xl p-6">

        <h3 className="text-xl font-bold">
          ATS Score
        </h3>

        <p className="text-5xl font-bold text-blue-700 mt-4">
          {resume.atsScore}%
        </p>

      </div>

      <div className="bg-green-100 rounded-xl p-6">

        <h3 className="text-xl font-bold">
          Skills Found
        </h3>

        <p className="text-5xl font-bold text-green-700 mt-4">
          {resume.skills.length}
        </p>

      </div>

    </div>

  </div>

)}

</AnimatedPage>
      
  );
};

export default ResumeAnalyzer;