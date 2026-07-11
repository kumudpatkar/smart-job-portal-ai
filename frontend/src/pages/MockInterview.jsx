import { useState } from "react";
import API from "../services/api";

function MockInterview() {

  const [history, setHistory] = useState("");
  const [question, setQuestion] = useState(
    "Tell me about yourself."
  );

  const [answer, setAnswer] = useState("");

  const [feedback, setFeedback] = useState("");

  const [score, setScore] = useState(null);

  const [loading, setLoading] = useState(false);

  const submitAnswer = async () => {

    if (!answer.trim()) {
      alert("Please enter your answer.");
      return;
    }

    try {

      setLoading(true);

      const { data } = await API.post(
        "/mock-interview",
        {
          history,
          answer,
        }
      );

      setFeedback(data.feedback);

      setScore(data.score);

      setHistory(
        history +
          "\nQuestion: " +
          question +
          "\nAnswer: " +
          answer +
          "\nFeedback: " +
          data.feedback +
          "\n"
      );

      setQuestion(data.nextQuestion);

      setAnswer("");

    } catch (error) {

      console.log(error);

      alert("Interview failed.");

    } finally {

      setLoading(false);

    }

  };

  return (

    <div
      className="max-w-4xl mx-auto p-8"
    >

      <h1
        className="text-4xl font-bold mb-8"
      >
        AI Mock Interview
      </h1>

      {/* Question */}

      <div
        className="bg-blue-50 p-6 rounded-xl shadow"
      >

        <h2
          className="text-xl font-bold mb-3"
        >
          Interview Question
        </h2>

        <p
          className="text-lg"
        >
          {question}
        </p>

      </div>

      {/* Answer */}

      <textarea
        rows="8"
        className="w-full border rounded-xl p-4 mt-6"
        placeholder="Type your answer here..."
        value={answer}
        onChange={(e) =>
          setAnswer(e.target.value)
        }
      />

      <button
        onClick={submitAnswer}
        disabled={loading}
        className="mt-5 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
      >
        {loading
          ? "Checking..."
          : "Submit Answer"}
      </button>

      {/* Feedback */}

      {feedback && (

        <div
          className="mt-8 bg-green-50 border border-green-300 rounded-xl p-5"
        >

          <h2
            className="text-xl font-bold text-green-700"
          >
            AI Feedback
          </h2>

          <p
            className="mt-3"
          >
            {feedback}
          </p>

          <h3
            className="mt-4 text-lg font-bold"
          >
            Score :
            {" "}
            {score}
            /10
          </h3>

        </div>

      )}

    </div>

  );

}

export default MockInterview;