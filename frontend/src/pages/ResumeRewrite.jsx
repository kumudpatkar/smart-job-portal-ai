import { useState } from "react";
import axios from "axios";
import {
  Upload,
  FileText,
  Sparkles,
  Loader2,
  Copy,
  Download,
  CheckCircle,
} from "lucide-react";

const API = "https://smart-job-portal-ai-5nwt.onrender.com";

export default function ResumeRewrite() {
  const [resume, setResume] = useState(null);
  const [resumeName, setResumeName] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [experience, setExperience] = useState("");
  const [loading, setLoading] = useState(false);

  const [originalResume, setOriginalResume] = useState("");
  const [rewrittenResume, setRewrittenResume] = useState("");

  const [beforeScore, setBeforeScore] = useState(58);
  const [afterScore, setAfterScore] = useState(92);

  const handleResume = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setResume(file);
    setResumeName(file.name);
  };

  const rewriteResume = async () => {
    if (!resume) {
      alert("Please upload your resume.");
      return;
    }

    const formData = new FormData();

    formData.append("resume", resume);
    formData.append("targetRole", jobRole);

    try {
      setLoading(true);

      const response = await axios.post(
        `${API}/api/rewrite-resume`,
        formData,
        {
          headers: {
  "Content-Type": "multipart/form-data",

  Authorization:
    `Bearer ${localStorage.getItem("token")}`,
},
        }
      );

      setOriginalResume(response.data.original_resume);
      setRewrittenResume(response.data.rewritten_resume);

      setBeforeScore(response.data.before_score);
      setAfterScore(response.data.after_score);
    } catch (error) {
      console.log(error);

      alert("Rewrite Failed");
    } finally {
      setLoading(false);
    }
  };

  const copyResume = () => {
    navigator.clipboard.writeText(rewrittenResume);

    alert("Copied Successfully");
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <div className="max-w-7xl mx-auto">

        <div className="mb-10">

          <h1 className="text-4xl font-bold">

            AI Resume Rewrite

          </h1>

          <p className="text-gray-500 mt-2">

            Upload your resume and let AI rewrite it for maximum ATS score.

          </p>

        </div>

                <div className="grid lg:grid-cols-3 gap-8">

          <div className="bg-white rounded-xl shadow-lg p-6">

            <h2 className="text-xl font-bold mb-5">

              Upload Resume

            </h2>

            <label className="border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500">

              <Upload size={50} />

              <p className="mt-4 font-semibold">

                Click to Upload Resume

              </p>

              <span className="text-sm text-gray-500">

                PDF / DOCX

              </span>

              <input
                hidden
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleResume}
              />

            </label>

            {resumeName && (

              <div className="mt-6 flex items-center gap-3">

                <FileText className="text-blue-600" />

                <span>

                  {resumeName}

                </span>

              </div>

            )}

            <input
              className="w-full mt-8 border rounded-lg p-3"
              placeholder="Target Job Role"
              value={jobRole}
              onChange={(e) => setJobRole(e.target.value)}
            />

            <input
              className="w-full mt-4 border rounded-lg p-3"
              placeholder="Years of Experience"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
            />

            <button
              onClick={rewriteResume}
              disabled={loading}
              className="mt-8 w-full bg-blue-600 text-white py-3 rounded-xl flex justify-center gap-3 hover:bg-blue-700"
            >

              {loading ? (
                <>
                  <Loader2 className="animate-spin" />
                  Rewriting...
                </>
              ) : (
                <>
                  <Sparkles />
                  Rewrite Resume
                </>
              )}

            </button>

          </div>

                  {/* Resume Comparison */}

        <div className="lg:col-span-2">

          {/* ATS Score Cards */}

          <div className="grid md:grid-cols-2 gap-6 mb-6">

            <div className="bg-red-50 border border-red-200 rounded-xl p-6">

              <p className="text-gray-600 mb-2">
                ATS Score Before
              </p>

              <h2 className="text-5xl font-bold text-red-600">
                {beforeScore}%
              </h2>

              <div className="mt-4 h-3 bg-red-200 rounded-full">

                <div
                  className="bg-red-600 h-3 rounded-full"
                  style={{ width: `${beforeScore}%` }}
                />

              </div>

            </div>

            <div className="bg-green-50 border border-green-200 rounded-xl p-6">

              <p className="text-gray-600 mb-2">
                ATS Score After
              </p>

              <h2 className="text-5xl font-bold text-green-600">
                {afterScore}%
              </h2>

              <div className="mt-4 h-3 bg-green-200 rounded-full">

                <div
                  className="bg-green-600 h-3 rounded-full"
                  style={{ width: `${afterScore}%` }}
                />

              </div>

            </div>

          </div>

          {/* Resume Comparison */}

          <div className="grid lg:grid-cols-2 gap-6">

            {/* Original Resume */}

            <div className="bg-white rounded-xl shadow-lg">

              <div className="border-b p-5">

                <h2 className="text-xl font-bold">
                  Original Resume
                </h2>

              </div>

              <div className="p-6 h-[600px] overflow-y-auto whitespace-pre-wrap">

                {originalResume ? (
                  originalResume
                ) : (
                  <div className="text-gray-400 text-center mt-32">

                    Upload a resume to view its contents.

                  </div>
                )}

              </div>

            </div>

            {/* AI Resume */}

            <div className="bg-white rounded-xl shadow-lg">

              <div className="border-b p-5 flex justify-between items-center">

                <h2 className="text-xl font-bold">
                  AI Rewritten Resume
                </h2>

                {rewrittenResume && (
                  <button
                    onClick={copyResume}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    <Copy size={18} />
                    Copy
                  </button>
                )}

              </div>

              <div className="p-6 h-[600px] overflow-y-auto whitespace-pre-wrap">

                {rewrittenResume ? (
                  rewrittenResume
                ) : (
                  <div className="text-gray-400 text-center mt-32">

                    AI rewritten resume will appear here.

                  </div>
                )}

              </div>

            </div>

          </div>

          {/* Improvements */}

          <div className="bg-white rounded-xl shadow-lg mt-6 p-6">

            <h2 className="text-2xl font-bold mb-5">

              AI Improvements

            </h2>

            <div className="grid md:grid-cols-2 gap-4">

              <div className="flex gap-3">

                <CheckCircle className="text-green-600 mt-1" />

                <span>
                  ATS-friendly formatting applied.
                </span>

              </div>

              <div className="flex gap-3">

                <CheckCircle className="text-green-600 mt-1" />

                <span>
                  Strong action verbs added.
                </span>

              </div>

              <div className="flex gap-3">

                <CheckCircle className="text-green-600 mt-1" />

                <span>
                  Missing technical keywords inserted.
                </span>

              </div>

              <div className="flex gap-3">

                <CheckCircle className="text-green-600 mt-1" />

                <span>
                  Grammar and readability improved.
                </span>

              </div>

              <div className="flex gap-3">

                <CheckCircle className="text-green-600 mt-1" />

                <span>
                  Professional summary enhanced.
                </span>

              </div>

              <div className="flex gap-3">

                <CheckCircle className="text-green-600 mt-1" />

                <span>
                  Skills reordered based on job role.
                </span>

              </div>

            </div>

          </div>

        </div>

                {/* End of Right Section */}

      </div>

      {/* Bottom Action Bar */}

      {rewrittenResume && (
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6 flex flex-col md:flex-row items-center justify-between gap-4">

          <div>
            <h3 className="text-xl font-bold">
              Your resume is ready!
            </h3>

            <p className="text-gray-500">
              Review the rewritten version, copy it, or download it.
            </p>
          </div>

          <div className="flex gap-4">

            <button
              onClick={copyResume}
              className="flex items-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              <Copy size={18} />
              Copy Resume
            </button>

            <button
              onClick={() => {
                const blob = new Blob([rewrittenResume], {
                  type: "text/plain",
                });

                const url = window.URL.createObjectURL(blob);

                const link = document.createElement("a");

                link.href = url;
                link.download = "AI_Rewritten_Resume.txt";

                link.click();

                window.URL.revokeObjectURL(url);
              }}
              className="flex items-center gap-2 px-5 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              <Download size={18} />
              Download
            </button>

          </div>

        </div>
      )}

      {/* Loading Overlay */}

      {loading && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white rounded-xl p-8 shadow-xl flex flex-col items-center">

            <Loader2
              className="animate-spin text-blue-600"
              size={50}
            />

            <h2 className="text-xl font-bold mt-5">
              AI is rewriting your resume...
            </h2>

            <p className="text-gray-500 mt-2 text-center">
              Optimizing ATS score, improving grammar,
              adding keywords and enhancing formatting.
            </p>

          </div>

        </div>
      )}

    </div>
  </div>
);
}