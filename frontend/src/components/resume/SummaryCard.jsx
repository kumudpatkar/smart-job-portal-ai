import { FileText } from "lucide-react";

function SummaryCard({ summary }) {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-8">

      <div className="flex items-center gap-3 mb-6">
        <FileText
          className="text-blue-600"
          size={30}
        />

        <div>
          <h2 className="text-2xl font-bold">
            AI Resume Summary
          </h2>

          <p className="text-gray-500">
            Generated automatically using AI.
          </p>
        </div>
      </div>

      <div className="bg-gray-50 border rounded-2xl p-6">

        <p className="text-gray-700 leading-8 whitespace-pre-line">
          {summary || "No summary available."}
        </p>

      </div>

    </div>
  );
}

export default SummaryCard;