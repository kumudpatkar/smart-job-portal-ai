
import { useState } from "react";
import API from "../services/api";
import AnimatedPage from "../components/AnimatedPage";
import { Upload, FileText, Sparkles, CheckCircle } from "lucide-react";

function ResumeAnalyzer() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzeResume = async () => {
    if (!file) {
      alert("Please select a resume.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);

      const res = await API.post(
        "/api/resume-analyzer",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setResult(res.data);
    } catch (err) {
      console.log(err);
      alert("Resume Analysis Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatedPage>
      <div className="min-h-screen bg-slate-100 p-8">

        <div className="max-w-4xl mx-auto">

          <div className="bg-white rounded-3xl shadow-xl p-8">

            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="text-blue-600" size={32} />

              <div>
                <h1 className="text-3xl font-bold text-slate-800">
                  AI Resume Analyzer
                </h1>

                <p className="text-slate-500 mt-1">
                  Upload your resume and get instant AI feedback.
                </p>
              </div>
            </div>

            <div className="border-2 border-dashed border-blue-300 rounded-2xl p-10 text-center">

              <Upload
                size={55}
                className="mx-auto text-blue-600"
              />

              <p className="mt-4 text-slate-600">
                Upload PDF Resume
              </p>

              <input
                type="file"
                accept=".pdf"
                onChange={(e) => setFile(e.target.files[0])}
                className="mt-6"
              />

              {file && (
                <div className="mt-4 flex justify-center items-center gap-2 text-green-600">
                  <FileText size={20} />
                  {file.name}
                </div>
              )}

              <button
                onClick={analyzeResume}
                disabled={loading}
                className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl transition"
              >
                {loading ? "Analyzing..." : "Analyze Resume"}
              </button>

            </div>

            {result && (
              <div className="mt-10">

                <div className="grid md:grid-cols-2 gap-6">

                  <div className="bg-blue-50 rounded-2xl p-6">

                    <h2 className="text-xl font-bold text-blue-700">
                      Resume Score
                    </h2>

                    <p className="text-5xl font-bold mt-4">
                      {result.resume_score}%
                    </p>

                  </div>

                  <div className="bg-green-50 rounded-2xl p-6">

                    <h2 className="text-xl font-bold text-green-700">
                      Skills Found
                    </h2>

                    <p className="text-5xl font-bold mt-4">
                      {result.found_skills} / {result.total_skills}
                    </p>

                  </div>

                </div>

                <div className="bg-white border rounded-2xl mt-8 p-6">

                  <h2 className="text-2xl font-bold mb-5 flex items-center gap-2">
                    <CheckCircle className="text-green-600" />
                    AI Suggestions
                  </h2>

                  <ul className="space-y-3">

                    {result.suggestions.map((item, index) => (
                      <li
                        key={index}
                        className="bg-slate-100 rounded-lg p-3"
                      >
                        ✅ {item}
                      </li>
                    ))}

                  </ul>

                </div>

              </div>
            )}

          </div>

        </div>

      </div>
    </AnimatedPage>
  );
}

export default ResumeAnalyzer;

