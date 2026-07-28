import { useNavigate } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import { MessageSquare, Video } from "lucide-react";

const InterviewMode = () => {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto py-8">

        <h1 className="text-4xl font-bold text-slate-800">
          AI Mock Interview
        </h1>

        <p className="text-slate-500 mt-2">
          Practice interviews with AI just like real companies.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mt-10">

          {/* Text Interview */}

          <div className="bg-white rounded-2xl shadow-lg p-8 border hover:shadow-xl transition">

            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">

              <MessageSquare className="text-blue-600" size={32} />

            </div>

            <h2 className="text-2xl font-bold mt-6">
              Text Interview
            </h2>

            <p className="text-slate-500 mt-3">
              Answer AI interview questions by typing.
              Get instant feedback, score and suggestions.
            </p>

            <ul className="mt-6 space-y-2 text-slate-600">
              <li>✔ AI Questions</li>
              <li>✔ Type Answers</li>
              <li>✔ Instant Evaluation</li>
              <li>✔ Interview Report</li>
            </ul>

            <button
              onClick={() => navigate("/mock-interview")}
              className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold"
            >
              Start Text Interview
            </button>

          </div>

          {/* Video Interview */}

          <div className="bg-white rounded-2xl shadow-lg p-8 border hover:shadow-xl transition">

            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">

              <Video className="text-red-600" size={32} />

            </div>

            <h2 className="text-2xl font-bold mt-6">
              Video Interview
            </h2>

            <p className="text-slate-500 mt-3">
              AI asks questions by voice.
              Answer using camera and microphone like a real interview.
            </p>

            <ul className="mt-6 space-y-2 text-slate-600">
              <li>✔ AI Voice Interviewer</li>
              <li>✔ Camera Recording</li>
              <li>✔ Microphone Recording</li>
              <li>✔ AI Communication Analysis</li>
            </ul>

            <button
              onClick={() => navigate("/video-interview")}
              className="mt-8 w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold"
            >
              Start Video Interview
            </button>

          </div>

        </div>

      </div>
    </DashboardLayout>
  );
};

export default InterviewMode;