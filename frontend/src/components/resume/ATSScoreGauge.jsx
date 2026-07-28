function ATSScoreGauge({ score = 0 }) {
  const radius = 80;
  const stroke = 12;

  const normalizedRadius = radius - stroke * 2;

  const circumference =
    normalizedRadius * 2 * Math.PI;

  const offset =
    circumference -
    (score / 100) * circumference;

  const getColor = () => {
    if (score >= 85) return "#16a34a";
    if (score >= 70) return "#2563eb";
    if (score >= 50) return "#f59e0b";
    return "#dc2626";
  };

  const getStatus = () => {
    if (score >= 85) return "Excellent";
    if (score >= 70) return "Good";
    if (score >= 50) return "Average";
    return "Needs Improvement";
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg p-8">

      <h2 className="text-2xl font-bold mb-8">
        ATS Score
      </h2>

      <div className="flex justify-center">

        <svg
          height="200"
          width="200"
        >
          <circle
            stroke="#E5E7EB"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx="100"
            cy="100"
          />

          <circle
            stroke={getColor()}
            fill="transparent"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={offset}
            style={{
              transition: "stroke-dashoffset .8s ease",
            }}
            r={normalizedRadius}
            cx="100"
            cy="100"
            transform="rotate(-90 100 100)"
          />

          <text
            x="50%"
            y="48%"
            dominantBaseline="middle"
            textAnchor="middle"
            className="fill-gray-900 text-4xl font-bold"
          >
            {score}
          </text>

          <text
            x="50%"
            y="65%"
            dominantBaseline="middle"
            textAnchor="middle"
            className="fill-gray-500 text-lg"
          >
            %
          </text>
        </svg>

      </div>

      <div className="text-center mt-5">

        <h3
          className="text-2xl font-bold"
          style={{
            color: getColor(),
          }}
        >
          {getStatus()}
        </h3>

        <p className="text-gray-500 mt-2">
          AI evaluated your resume for ATS compatibility.
        </p>

      </div>

    </div>
  );
}

export default ATSScoreGauge;