import { Lightbulb, CheckCircle2 } from "lucide-react";

function SuggestionsCard({ suggestions = [] }) {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-8">

      <div className="flex items-center gap-3 mb-6">
        <Lightbulb
          className="text-yellow-500"
          size={30}
        />

        <div>
          <h2 className="text-2xl font-bold">
            AI Suggestions
          </h2>

          <p className="text-gray-500">
            Improve your resume using these recommendations.
          </p>
        </div>
      </div>

      {suggestions.length === 0 ? (
        <div className="bg-gray-50 rounded-2xl p-6 text-gray-500">
          No suggestions available.
        </div>
      ) : (
        <div className="space-y-4">

          {suggestions.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-4 bg-blue-50 border border-blue-100 rounded-2xl p-4"
            >
              <CheckCircle2
                className="text-blue-600 mt-1"
                size={22}
              />

              <p className="text-gray-700 leading-7">
                {item}
              </p>
            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default SuggestionsCard;