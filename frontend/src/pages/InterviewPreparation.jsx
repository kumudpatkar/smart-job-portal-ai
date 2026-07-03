import { Brain, Code, User, PlayCircle } from "lucide-react";

export default function InterviewPreparation() {
  return (
    <div className="p-8">

      <h1 className="text-4xl font-bold mb-2">
        Interview Preparation
      </h1>

      <p className="text-gray-500 mb-8">
        Practice aptitude, technical and HR interviews with AI.
      </p>

      <div className="grid md:grid-cols-3 gap-8">

        {/* Aptitude */}

        <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition">

          <Brain
            size={60}
            className="text-blue-600 mb-6"
          />

          <h2 className="text-2xl font-bold mb-3">
            Aptitude
          </h2>

          <p className="text-gray-500 mb-6">
            Practice Quantitative,
            Logical,
            Verbal Questions.
          </p>

          <button className="w-full bg-blue-600 text-white py-3 rounded-xl">
            Start Practice
          </button>

        </div>

        {/* Technical */}

        <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition">

          <Code
            size={60}
            className="text-green-600 mb-6"
          />

          <h2 className="text-2xl font-bold mb-3">
            Technical
          </h2>

          <p className="text-gray-500 mb-6">
            Java, Python,
            DBMS,
            OS,
            CN,
            DSA Questions.
          </p>

          <button className="w-full bg-green-600 text-white py-3 rounded-xl">
            Start Practice
          </button>

        </div>

        {/* HR */}

        <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition">

          <User
            size={60}
            className="text-purple-600 mb-6"
          />

          <h2 className="text-2xl font-bold mb-3">
            HR Interview
          </h2>

          <p className="text-gray-500 mb-6">
            Tell me about yourself,
            strengths,
            weaknesses,
            projects.
          </p>

          <button className="w-full bg-purple-600 text-white py-3 rounded-xl">
            Start Practice
          </button>

        </div>

      </div>

      {/* Mock Interview */}

      <div className="mt-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl text-white p-10">

        <div className="flex justify-between items-center">

          <div>

            <h2 className="text-3xl font-bold">
              AI Mock Interview
            </h2>

            <p className="mt-3">
              Practice with AI voice and receive instant feedback.
            </p>

          </div>

          <button className="bg-white text-blue-700 px-8 py-4 rounded-xl flex items-center gap-2 font-bold">

            <PlayCircle size={24} />

            Start AI Interview

          </button>

        </div>

      </div>

    </div>
  );
}