import { useState } from "react";
import API from "../services/api";
import AnimatedPage from "../components/AnimatedPage";
import { Sparkles, MessageSquare } from "lucide-react";

function Interview() {
  const [role, setRole] = useState("");
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const generateQuestions = async () => {
    if (!role.trim()) {
      alert("Please enter a job role.");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/api/interview-questions", {
        role,
      });

      setQuestions(res.data.questions || []);
    } catch (err) {
      console.log(err);
      alert("Failed to generate interview questions.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatedPage>
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-5xl mx-auto">

          <div className="flex items-center gap-3 mb-8">
            <Sparkles className="text-blue-600" size={32} />
            <h1 className="text-3xl font-bold text-gray-800">
              AI Mock Interview
            </h1>
          </div>

          <div className="flex flex-col md:flex-row gap-4">

            <input
              type="text"
              placeholder="Enter Job Role (Example: Java Developer)"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="flex-1 border rounded-xl p-4 outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              onClick={generateQuestions}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 rounded-xl transition disabled:opacity-50"
            >
              {loading ? "Generating..." : "Generate"}
            </button>

          </div>

          {questions.length > 0 && (
            <div className="mt-10">

              <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                Interview Questions
              </h2>

              <div className="space-y-4">

                {questions.map((question, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 border rounded-xl p-5 flex gap-4"
                  >
                    <MessageSquare
                      className="text-blue-600 mt-1"
                      size={22}
                    />

                    <div>
                      <h3 className="font-semibold text-gray-800">
                        Question {index + 1}
                      </h3>

                      <p className="text-gray-700 mt-2">
                        {question}
                      </p>
                    </div>
                  </div>
                ))}

              </div>
            </div>
          )}

        </div>
      </div>
    </AnimatedPage>
  );
}

export default Interview;