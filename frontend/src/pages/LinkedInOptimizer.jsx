import { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import API from "../services/api";

import {
  Sparkles,
  Loader2,
  Copy,
  CheckCircle,
} from "lucide-react";

import { FaLinkedin } from "react-icons/fa";

function LinkedInOptimizer() {
  const [resumeText, setResumeText] = useState("");

  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState(null);

  const optimizeProfile = async () => {
    if (!resumeText.trim()) {
      alert("Please paste your resume.");
      return;
    }

    try {
      setLoading(true);

      const { data } = await API.post(
        "/linkedin-optimizer",
        {
          resumeText,
        }
      );

      setResult(data.result || data);

    } catch (error) {
      console.log(error);
      alert("Unable to optimize profile.");
    }

    setLoading(false);
  };

  const copy = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied");
  };

  return (
    <DashboardLayout>

      <div className="max-w-7xl mx-auto">

        <div className="flex items-center gap-3 mb-8">

          <FaLinkedin
  className="text-blue-700"
  size={42}
/>
          <div>

            <h1 className="text-4xl font-bold">
              AI LinkedIn Optimizer
            </h1>

            <p className="text-gray-500 mt-1">
              Generate a recruiter-ready LinkedIn profile using AI.
            </p>

          </div>

        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">

          <label className="font-semibold">
            Paste Resume
          </label>

          <textarea
            rows={12}
            value={resumeText}
            onChange={(e) =>
              setResumeText(e.target.value)
            }
            placeholder="Paste your complete resume..."
            className="w-full border rounded-xl mt-3 p-4 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={optimizeProfile}
            disabled={loading}
            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl flex items-center gap-3"
          >
            {loading ? (
              <>
                <Loader2
                  className="animate-spin"
                  size={20}
                />
                Optimizing...
              </>
            ) : (
              <>
                <Sparkles size={20} />
                Optimize LinkedIn
              </>
            )}
          </button>

        </div>

        {result && (

          <div className="mt-10 space-y-8">

            {/* Headline */}

            <div className="bg-white rounded-2xl shadow-lg p-8">

              <div className="flex justify-between">

                <h2 className="text-2xl font-bold">
                  Professional Headline
                </h2>

                <button
                  onClick={() =>
                    copy(result.headline)
                  }
                >
                  <Copy />
                </button>

              </div>

              <p className="mt-5 whitespace-pre-wrap">
                {result.headline}
              </p>

            </div>

            {/* About */}

            <div className="bg-white rounded-2xl shadow-lg p-8">

              <div className="flex justify-between">

                <h2 className="text-2xl font-bold">
                  About Section
                </h2>

                <button
                  onClick={() =>
                    copy(result.about)
                  }
                >
                  <Copy />
                </button>

              </div>

              <p className="mt-5 whitespace-pre-wrap">
                {result.about}
              </p>

            </div>

            {/* Skills */}

            <div className="bg-white rounded-2xl shadow-lg p-8">

              <h2 className="text-2xl font-bold">
                Top Skills
              </h2>

              <div className="flex flex-wrap gap-3 mt-5">

                {result.skills?.map((skill, index) => (

                  <span
                    key={index}
                    className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full"
                  >
                    {skill}
                  </span>

                ))}

              </div>

            </div>

            {/* Experience */}

            <div className="bg-white rounded-2xl shadow-lg p-8">

              <h2 className="text-2xl font-bold">
                Experience Suggestions
              </h2>

              <ul className="mt-5 space-y-3">

                {result.experienceSuggestions?.map(
                  (item, index) => (

                    <li
                      key={index}
                      className="flex gap-3"
                    >
                      <CheckCircle className="text-green-600 mt-1" />

                      <span>{item}</span>

                    </li>

                  )
                )}

              </ul>

            </div>

            {/* SEO */}

            <div className="bg-white rounded-2xl shadow-lg p-8">

              <h2 className="text-2xl font-bold">
                SEO Keywords
              </h2>

              <div className="flex flex-wrap gap-3 mt-5">

                {result.seoKeywords?.map(
                  (item, index) => (

                    <span
                      key={index}
                      className="bg-green-100 text-green-700 px-4 py-2 rounded-full"
                    >
                      {item}
                    </span>

                  )
                )}

              </div>

            </div>

            {/* Networking */}

            <div className="bg-white rounded-2xl shadow-lg p-8">

              <h2 className="text-2xl font-bold">
                Networking Tips
              </h2>

              <ul className="mt-5 space-y-3">

                {result.networkingTips?.map(
                  (item, index) => (

                    <li
                      key={index}
                      className="flex gap-3"
                    >
                      <CheckCircle className="text-green-600 mt-1" />

                      <span>{item}</span>

                    </li>

                  )
                )}

              </ul>

            </div>

          </div>

        )}

      </div>

    </DashboardLayout>
  );
}

export default LinkedInOptimizer;