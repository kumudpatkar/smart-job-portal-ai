import {
  CheckCircle,
  XCircle,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";

const ATSScoreCard = ({ result }) => {
  if (!result) return null;

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 mt-8">

      <h2 className="text-3xl font-bold text-gray-800 mb-8">
        ATS Resume Analysis
      </h2>

      {/* Score */}

      <div className="flex flex-col items-center">

        <div className="relative w-40 h-40">

          <svg
            className="w-40 h-40 transform -rotate-90"
            viewBox="0 0 160 160"
          >

            <circle
              cx="80"
              cy="80"
              r="70"
              stroke="#E5E7EB"
              strokeWidth="12"
              fill="none"
            />

            <circle
              cx="80"
              cy="80"
              r="70"
              stroke="#2563EB"
              strokeWidth="12"
              fill="none"
              strokeDasharray={440}
              strokeDashoffset={
                440 - (440 * result.score) / 100
              }
              strokeLinecap="round"
            />

          </svg>

          <div className="absolute inset-0 flex items-center justify-center">

            <div className="text-center">

              <h1 className="text-4xl font-bold text-blue-600">
                {result.score}
              </h1>

              <p className="text-gray-500">
                ATS Score
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Progress */}

      <div className="mt-8">

        <div className="w-full bg-gray-200 rounded-full h-4">

          <div
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-4 rounded-full"
            style={{
              width: `${result.score}%`,
            }}
          />

        </div>

      </div>

      {/* Matching Skills */}

      <div className="mt-10">

        <h3 className="text-2xl font-bold flex items-center gap-2">

          <CheckCircle className="text-green-600" />

          Matching Skills

        </h3>

        <div className="flex flex-wrap gap-3 mt-4">

          {result.matchingSkills.map((skill, index) => (

            <span
              key={index}
              className="bg-green-100 text-green-700 px-4 py-2 rounded-full"
            >
              {skill}
            </span>

          ))}

        </div>

      </div>

      {/* Missing Skills */}

      <div className="mt-10">

        <h3 className="text-2xl font-bold flex items-center gap-2">

          <XCircle className="text-red-600" />

          Missing Skills

        </h3>

        <div className="flex flex-wrap gap-3 mt-4">

          {result.missingSkills.map((skill, index) => (

            <span
              key={index}
              className="bg-red-100 text-red-700 px-4 py-2 rounded-full"
            >
              {skill}
            </span>

          ))}

        </div>

      </div>

      {/* Suggestions */}

      <div className="mt-10">

        <h3 className="text-2xl font-bold flex items-center gap-2">

          <TrendingUp className="text-blue-600" />

          AI Suggestions

        </h3>

        <ul className="space-y-3 mt-5">

          {result.suggestions.map((item, index) => (

            <li
              key={index}
              className="flex items-start gap-3"
            >

              <AlertTriangle
                className="text-yellow-500 mt-1"
                size={18}
              />

              <span>{item}</span>

            </li>

          ))}

        </ul>

      </div>

    </div>
  );
};

export default ATSScoreCard;