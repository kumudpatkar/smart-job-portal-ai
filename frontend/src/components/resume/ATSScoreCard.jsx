import {
  CheckCircle,
  AlertTriangle,
  XCircle,
} from "lucide-react";

function ATSScoreCard({ score = 0 }) {
  const getStatus = () => {
    if (score >= 85) {
      return {
        color: "text-green-600",
        bg: "bg-green-100",
        icon: <CheckCircle size={34} />,
        title: "Excellent",
        message:
          "Your resume is highly ATS-friendly and ready for applications.",
      };
    }

    if (score >= 70) {
      return {
        color: "text-yellow-600",
        bg: "bg-yellow-100",
        icon: <AlertTriangle size={34} />,
        title: "Good",
        message:
          "Your resume is good but can still be improved for better ATS compatibility.",
      };
    }

    return {
      color: "text-red-600",
      bg: "bg-red-100",
      icon: <XCircle size={34} />,
      title: "Needs Improvement",
      message:
        "Your resume requires optimization before applying for jobs.",
    };
  };

  const status = getStatus();

  return (
    <div className="bg-white rounded-3xl shadow-lg p-8">

      <div className="flex justify-between items-center">

        <div>

          <h2 className="text-2xl font-bold">
            ATS Score
          </h2>

          <p className="text-gray-500 mt-2">
            Applicant Tracking System Compatibility
          </p>

        </div>

        <div
          className={`${status.bg} ${status.color} p-4 rounded-full`}
        >
          {status.icon}
        </div>

      </div>

      <div className="mt-8">

        <div className="text-6xl font-bold text-blue-600">
          {score}%
        </div>

        <div className="w-full bg-gray-200 rounded-full h-5 mt-6">

          <div
            className="bg-gradient-to-r from-blue-500 to-green-500 h-5 rounded-full transition-all duration-700"
            style={{
              width: `${score}%`,
            }}
          />

        </div>

        <div className="mt-6">

          <h3
            className={`text-xl font-bold ${status.color}`}
          >
            {status.title}
          </h3>

          <p className="text-gray-600 mt-2">
            {status.message}
          </p>

        </div>

      </div>

    </div>
  );
}

export default ATSScoreCard;