import { useState, useRef } from "react";
import API from "../services/api";

function VoiceInterview() {

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState(null);

  const recognitionRef = useRef(null);

  const startRecording = () => {

    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {

      alert("Speech Recognition is not supported.");

      return;

    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.interimResults = false;

    recognition.onresult = (event) => {

      setAnswer(event.results[0][0].transcript);

    };

    recognition.start();

    recognitionRef.current = recognition;

  };

  const evaluateAnswer = async () => {

    if (!question || !answer) {

      alert("Question and answer required");

      return;

    }

    try {

      const { data } = await API.post(
        "/voice-interview/evaluate",
        {
          question,
          answer,
        }
      );

      setResult(data.result);

    } catch (error) {

      console.log(error);

      alert("Evaluation failed.");

    }

  };

  return (

    <div className="max-w-5xl mx-auto p-8">

      <h1 className="text-4xl font-bold mb-8">

        🎤 AI Voice Interview

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
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Your spoken answer..."
        className="w-full border rounded-xl p-4"
      />

      <div className="flex gap-4 mt-6">

        <button
          onClick={startRecording}
          className="bg-green-600 text-white px-6 py-3 rounded-xl"
        >
          🎤 Start Speaking
        </button>

        <button
          onClick={evaluateAnswer}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl"
        >
          Evaluate
        </button>

      </div>

      {

        result && (

          <div className="mt-10 space-y-6">

            <div className="bg-white rounded-xl shadow p-6">

              <h2 className="text-2xl font-bold">

                Score

              </h2>

              <h1 className="text-5xl text-green-600 font-bold">

                {result.score}/100

              </h1>

            </div>

            <div className="bg-white rounded-xl shadow p-6">

              <h2 className="text-2xl font-bold">

                Feedback

              </h2>

              <p className="mt-3">

                {result.feedback}

              </p>

            </div>

            <div className="bg-white rounded-xl shadow p-6">

              <h2 className="text-2xl font-bold">

                Strengths

              </h2>

              <ul className="list-disc ml-6 mt-3">

                {

                  result.strengths.map((item, index) => (

                    <li key={index}>{item}</li>

                  ))

                }

              </ul>

            </div>

            <div className="bg-white rounded-xl shadow p-6">

              <h2 className="text-2xl font-bold">

                Improvements

              </h2>

              <ul className="list-disc ml-6 mt-3">

                {

                  result.improvements.map((item, index) => (

                    <li key={index}>{item}</li>

                  ))

                }

              </ul>

            </div>

          </div>

        )

      }

    </div>

  );

}

export default VoiceInterview;