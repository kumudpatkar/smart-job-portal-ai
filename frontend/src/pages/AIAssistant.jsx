import { useState } from "react";
import API from "../services/api";

function AIAssistant() {

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const askAI = async () => {

    if (!question) {
      alert("Please enter your question.");
      return;
    }

    try {

      setLoading(true);

      const { data } = await API.post(
        "/career-assistant/chat",
        {
          question,
        }
      );

      setAnswer(data.answer);

    } catch (error) {

      console.log(error);

      alert("Failed to get AI response.");

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="max-w-5xl mx-auto p-8">

      <h1 className="text-4xl font-bold mb-8">

        🤖 AI Career Assistant

      </h1>

      <textarea
        rows={5}
        placeholder="Ask anything about resume, interview, career roadmap, salary, skills..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="w-full border rounded-xl p-4"
      />

      <button
        onClick={askAI}
        className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-xl"
      >
        {loading ? "Thinking..." : "Ask AI"}
      </button>

      {answer && (

        <div className="mt-10 bg-white rounded-xl shadow-lg p-8">

          <h2 className="text-2xl font-bold mb-5">

            AI Response

          </h2>

          <div className="whitespace-pre-wrap leading-8">

            {answer}

          </div>

        </div>

      )}

    </div>

  );

}

export default AIAssistant;