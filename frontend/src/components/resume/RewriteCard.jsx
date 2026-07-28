import { Copy, Download, Sparkles, CheckCircle } from "lucide-react";
import { useState } from "react";

function RewriteCard({ rewrittenResume }) {
  const [copied, setCopied] = useState(false);

  const copyResume = async () => {
    try {
      await navigator.clipboard.writeText(rewrittenResume);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);

    } catch (error) {
      console.error(error);
      alert("Unable to copy.");
    }
  };

  const downloadResume = () => {
    const blob = new Blob([rewrittenResume], {
      type: "text/plain;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = "AI_Rewritten_Resume.txt";

    document.body.appendChild(a);

    a.click();

    document.body.removeChild(a);

    URL.revokeObjectURL(url);
  };

  if (!rewrittenResume) return null;

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-8 mt-10">

      {/* Header */}

      <div className="flex justify-between items-center mb-8">

        <div className="flex items-center gap-3">

          <div className="bg-blue-100 p-3 rounded-full">
            <Sparkles
              className="text-blue-600"
              size={28}
            />
          </div>

          <div>

            <h2 className="text-3xl font-bold">
              AI Rewritten Resume
            </h2>

            <p className="text-gray-500 mt-1">
              Optimized for ATS & Recruiters
            </p>

          </div>

        </div>

        <div className="flex gap-3">

          <button
            onClick={copyResume}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl transition"
          >
            {copied ? (
              <>
                <CheckCircle size={18} />
                Copied
              </>
            ) : (
              <>
                <Copy size={18} />
                Copy
              </>
            )}
          </button>

          <button
            onClick={downloadResume}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl transition"
          >
            <Download size={18} />
            Download
          </button>

        </div>

      </div>

      {/* Resume Content */}

      <div className="bg-gray-50 border rounded-2xl p-8 max-h-[700px] overflow-y-auto">

        <pre className="whitespace-pre-wrap text-gray-700 leading-8 font-sans">
          {rewrittenResume}
        </pre>

      </div>

      {/* Footer */}

      <div className="mt-8 grid md:grid-cols-3 gap-4">

        <div className="bg-green-50 rounded-xl p-5 text-center">

          <h3 className="font-bold text-green-700">
            ATS Optimized
          </h3>

          <p className="text-gray-600 text-sm mt-2">
            Improved keywords and formatting.
          </p>

        </div>

        <div className="bg-blue-50 rounded-xl p-5 text-center">

          <h3 className="font-bold text-blue-700">
            Professional Tone
          </h3>

          <p className="text-gray-600 text-sm mt-2">
            Strong action verbs and impactful wording.
          </p>

        </div>

        <div className="bg-purple-50 rounded-xl p-5 text-center">

          <h3 className="font-bold text-purple-700">
            Recruiter Ready
          </h3>

          <p className="text-gray-600 text-sm mt-2">
            Suitable for modern software engineering roles.
          </p>

        </div>

      </div>

    </div>
  );
}

export default RewriteCard;