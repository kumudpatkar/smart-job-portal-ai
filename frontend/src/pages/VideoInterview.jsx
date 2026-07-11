import { useRef, useState } from "react";
import Webcam from "react-webcam";
import API from "../services/api";

import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

function VideoInterview() {

  const webcamRef = useRef(null);

  const [question, setQuestion] = useState(
    "Tell me about yourself."
  );

  const [history, setHistory] = useState("");

  const [questionCount, setQuestionCount] = useState(1);

  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState(null);

  const {
    transcript,
    resetTranscript,
    listening,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return (
      <div className="text-center p-10 text-red-600 text-xl">
        Browser doesn't support Speech Recognition
      </div>
    );
  }

  const interviewFinished = questionCount > 5;

  const startRecording = () => {
    resetTranscript();

    SpeechRecognition.startListening({
      continuous: true,
      language: "en-IN",
    });
  };

  const stopRecording = () => {
    SpeechRecognition.stopListening();
  };

  const evaluate = async () => {

    if (!transcript.trim()) {
      alert("Please answer first.");
      return;
    }

    try {

      setLoading(true);

      // AI Evaluation

      const evaluation = await API.post(
        "/video-interview/evaluate",
        {
          question,
          answer: transcript,
        }
      );

      setResult(evaluation.data);

      // Next Question

      const next = await API.post(
        "/interview-session/next",
        {
          history,
          answer: transcript,
        }
      );

      setHistory(

        history +

        "\nQuestion: " +

        question +

        "\nAnswer: " +

        transcript +

        "\n"

      );

      setQuestion(next.data.nextQuestion);

      setQuestionCount((prev) => prev + 1);

      resetTranscript();

    } catch (error) {

      console.log(error);

      alert("Interview Failed");

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="max-w-6xl mx-auto p-8">

      <h1 className="text-4xl font-bold text-center mb-8">

        AI Video Interview

      </h1>

      <div className="bg-white rounded-3xl shadow-xl p-8">

        <div className="mb-6">

          <div className="flex justify-between">

            <span>

              Question {Math.min(questionCount,5)} / 5

            </span>

            <span>

              {Math.min(questionCount*20,100)}%

            </span>

          </div>

          <div className="bg-gray-200 h-3 rounded-full mt-2">

            <div

              className="bg-blue-600 h-3 rounded-full"

              style={{
                width:`${Math.min(questionCount*20,100)}%`
              }}

            />

          </div>

        </div>

        <Webcam

          ref={webcamRef}

          audio

          mirrored

          className="rounded-xl"

        />

        {!interviewFinished ? (

          <>

            <div className="mt-8">

              <h2 className="text-2xl font-bold">

                Interview Question

              </h2>

              <p className="text-lg mt-3">

                {question}

              </p>

            </div>

            <div className="border rounded-xl bg-gray-100 p-5 mt-6 min-h-[180px] whitespace-pre-wrap">

              {transcript ||

                "Click Start Recording..."}

            </div>

            <div className="flex gap-4 mt-6 flex-wrap">

              <button

                onClick={startRecording}

                className="bg-green-600 text-white px-5 py-3 rounded-xl"

              >

                🎤 Start

              </button>

              <button

                onClick={stopRecording}

                className="bg-red-600 text-white px-5 py-3 rounded-xl"

              >

                Stop

              </button>

              <button

                onClick={resetTranscript}

                className="bg-gray-700 text-white px-5 py-3 rounded-xl"

              >

                Reset

              </button>

              <button

                onClick={evaluate}

                disabled={loading}

                className="bg-blue-600 text-white px-5 py-3 rounded-xl"

              >

                {loading

                  ? "Evaluating..."

                  : "Next Question"}

              </button>

            </div>

            <p className="mt-5 font-bold">

              {listening

                ? "🎙 Recording..."

                : "Recording Stopped"}

            </p>

          </>

        ) : (

          <div className="text-center py-20">

            <h1 className="text-4xl font-bold text-green-600">

              🎉 Interview Completed

            </h1>

            <p className="mt-5 text-lg">

              Great Job!

            </p>

          </div>

        )}

      </div>

      {result && (

        <div className="mt-10 bg-white rounded-3xl shadow-xl p-8">

          <h2 className="text-3xl font-bold mb-6">

            AI Feedback

          </h2>

          <div className="grid md:grid-cols-4 gap-5">

            <div className="bg-blue-100 p-5 rounded-xl">

              <h3>Technical</h3>

              <h1 className="text-4xl font-bold">

                {result.technicalScore}

              </h1>

            </div>

            <div className="bg-green-100 p-5 rounded-xl">

              <h3>Communication</h3>

              <h1 className="text-4xl font-bold">

                {result.communicationScore}

              </h1>

            </div>

            <div className="bg-purple-100 p-5 rounded-xl">

              <h3>Confidence</h3>

              <h1 className="text-4xl font-bold">

                {result.confidenceScore}

              </h1>

            </div>

            <div className="bg-orange-100 p-5 rounded-xl">

              <h3>Overall</h3>

              <h1 className="text-4xl font-bold">

                {result.overallScore}

              </h1>

            </div>

          </div>

          <div className="mt-8">

            <h3 className="font-bold text-xl">

              Strengths

            </h3>

            <ul className="list-disc ml-6 mt-3">

              {result.strengths?.map((item,index)=>(

                <li key={index}>{item}</li>

              ))}

            </ul>

          </div>

          <div className="mt-8">

            <h3 className="font-bold text-xl">

              Improvements

            </h3>

            <ul className="list-disc ml-6 mt-3">

              {result.improvements?.map((item,index)=>(

                <li key={index}>{item}</li>

              ))}

            </ul>

          </div>

          <div className="mt-8 bg-gray-100 p-5 rounded-xl">

            <h3 className="font-bold">

              AI Feedback

            </h3>

            <p className="mt-3">

              {result.feedback}

            </p>

          </div>

        </div>

      )}

    </div>

  );

}

export default VideoInterview;