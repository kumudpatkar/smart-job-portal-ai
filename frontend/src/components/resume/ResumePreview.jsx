import {
  FileText,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

function highlightText(text, found = [], missing = []) {
  if (!text) return "";

  const words = text.split(" ");

  return words.map((word, index) => {
    const cleanWord = word.replace(/[.,]/g, "");

    if (found.includes(cleanWord)) {
      return (
        <span
          key={index}
          className="bg-green-200 text-green-800 px-1 rounded mr-1"
        >
          {word}
        </span>
      );
    }

    if (missing.includes(cleanWord)) {
      return (
        <span
          key={index}
          className="bg-red-200 text-red-800 px-1 rounded mr-1"
        >
          {word}
        </span>
      );
    }

    return (
      <span key={index} className="mr-1">
        {word}
      </span>
    );
  });
}

function ResumePreview({
  resumeText = "",
  foundKeywords = [],
  missingKeywords = [],
}) {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-8">

      <div className="flex items-center gap-3 mb-6">
        <FileText className="text-blue-600" />
        <h2 className="text-2xl font-bold">
          Resume Preview
        </h2>
      </div>

      <div className="border rounded-2xl p-6 h-[600px] overflow-y-auto whitespace-pre-wrap leading-8 text-gray-700 bg-gray-50">

        {highlightText(
          resumeText,
          foundKeywords,
          missingKeywords
        )}

      </div>

      <div className="flex gap-8 mt-8">

        <div className="flex items-center gap-2">
          <CheckCircle className="text-green-600" />
          <span>ATS Keyword Found</span>
        </div>

        <div className="flex items-center gap-2">
          <AlertTriangle className="text-red-600" />
          <span>Missing Keyword</span>
        </div>

      </div>

    </div>
  );
}

export default ResumePreview;