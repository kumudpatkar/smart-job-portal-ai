import {
  TrendingUp,
  Award,
  CheckCircle2,
} from "lucide-react";

function ATSScoreCard({ score = 0 }) {
  let color = "text-red-600";
  let bg = "bg-red-100";
  let status = "Needs Improvement";

  if (score >= 80) {
    color = "text-green-600";
    bg = "bg-green-100";
    status = "Excellent";
  } else if (score >= 60) {
    color = "text-yellow-600";
    bg = "bg-yellow-100";
    status = "Good";
  }

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8">

      <div className="flex justify-between items-center">

        <div>

          <h2 className="text-2xl font-bold">
            ATS Resume Score
          </h2>

          <p className="text-gray-500 mt-2">
            AI-powered Applicant Tracking System analysis
          </p>

        </div>

        <Award
          size={40}
          className={color}
        />

      </div>

      <div className="flex justify-center mt-10">

        <div className="relative w-52 h-52">

          <svg
            className="transform -rotate-90"
            width="210"
            height="210"
          >
            <circle
              cx="105"
              cy="105"
              r="85"
              stroke="#E5E7EB"
              strokeWidth="14"
              fill="none"
            />

            <circle
              cx="105"
              cy="105"
              r="85"
              stroke="url(#gradient)"
              strokeWidth="14"
              fill="none"
              strokeDasharray={534}
              strokeDashoffset={
                534 - (534 * score) / 100
              }
              strokeLinecap="round"
            />

            <defs>
              <linearGradient
                id="gradient"
                x1="0%"
                x2="100%"
              >
                <stop
                  offset="0%"
                  stopColor="#3B82F6"
                />
                <stop
                  offset="100%"
                  stopColor="#22C55E"
                />
              </linearGradient>
            </defs>
          </svg>

          <div className="absolute inset-0 flex flex-col justify-center items-center">

            <h1
              className={`text-5xl font-bold ${color}`}
            >
              {score}%
            </h1>

            <p className="text-gray-500 mt-2">
              ATS Score
            </p>

          </div>

        </div>

      </div>

      <div
        className={`mt-8 rounded-xl ${bg} p-5 flex justify-between items-center`}
      >
        <div>

          <h3 className="font-bold text-lg">
            {status}
          </h3>

          <p className="text-gray-600 text-sm">
            Resume compatibility level
          </p>

        </div>

        <TrendingUp
          size={34}
          className={color}
        />

      </div>

      <div className="grid grid-cols-3 gap-4 mt-8">

        <div className="bg-blue-50 rounded-xl p-4 text-center">

          <CheckCircle2 className="mx-auto text-blue-600" />

          <h4 className="font-bold mt-2">
            ATS Ready
          </h4>

        </div>

        <div className="bg-green-50 rounded-xl p-4 text-center">

          <CheckCircle2 className="mx-auto text-green-600" />

          <h4 className="font-bold mt-2">
            Keyword Match
          </h4>

        </div>

        <div className="bg-purple-50 rounded-xl p-4 text-center">

          <CheckCircle2 className="mx-auto text-purple-600" />

          <h4 className="font-bold mt-2">
            Formatting
          </h4>

        </div>

      </div>

    </div>
  );
}

export default ATSScoreCard;