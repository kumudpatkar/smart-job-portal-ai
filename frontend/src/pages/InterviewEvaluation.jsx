import { useState } from "react";
import API from "../services/api";

function InterviewEvaluation() {

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const [result, setResult] = useState(null);

  const [loading, setLoading] = useState(false);

  const evaluate = async () => {

    if (!question || !answer) {
      alert("Please enter both question and answer.");
      return;
    }

    try {

      setLoading(true);

      const { data } = await API.post(
        "/interview-evaluation/evaluate",
        {
          question,
          answer,
        }
      );

      setResult(data.result);

    } catch (error) {

      console.log(error);

      alert("Evaluation Failed");

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="max-w-5xl mx-auto p-8">

      <h1 className="text-4xl font-bold mb-8">

        AI Interview Evaluation

      </h1>

      <textarea
        rows={3}
        placeholder="Interview Question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="w-full border rounded-xl p-4 mb-5"
      />

      <textarea
        rows={8}
        placeholder="Type your interview answer..."
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        className="w-full border rounded-xl p-4"
      />

      <button
        onClick={evaluate}
        className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-xl"
      >
        {loading ? "Evaluating..." : "Evaluate Answer"}
      </button>

      {result && (

        <div className="mt-10 space-y-6">

          <div className="bg-white shadow rounded-xl p-6">

            <h2 className="text-2xl font-bold">

              Score

            </h2>

            <h1 className="text-5xl font-bold text-green-600 mt-3">

              {result.score}/100

            </h1>

          </div>

          <div className="bg-white shadow rounded-xl p-6">

            <h2 className="text-2xl font-bold mb-4">

              Strengths

            </h2>

            <ul className="list-disc ml-6">

              {result.strengths.map((item, index) => (

                <li key={index}>

                  {item}

                </li>

              ))}

            </ul>

          </div>

          <div className="bg-white shadow rounded-xl p-6">

            <h2 className="text-2xl font-bold mb-4">

              Weaknesses

            </h2>

            <ul className="list-disc ml-6">

              {result.weaknesses.map((item, index) => (

                <li key={index}>

                  {item}

                </li>

              ))}

            </ul>

          </div>

          <div className="bg-white shadow rounded-xl p-6">

            <h2 className="text-2xl font-bold mb-4">

              AI Feedback

            </h2>

            <p>

              {result.feedback}

            </p>

          </div>

          <div className="bg-white shadow rounded-xl p-6">

            <h2 className="text-2xl font-bold mb-4">

              Improved Answer

            </h2>

            <p className="whitespace-pre-wrap">

              {result.improvedAnswer}

            </p>

          </div>

        </div>

      )}

    </div>

  );

}

export default InterviewEvaluation;