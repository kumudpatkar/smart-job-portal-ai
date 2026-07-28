import { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import API from "../services/api";
import { FaRobot } from "react-icons/fa";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

function VideoInterview() {
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);
  const streamRef = useRef(null);

  const [recordedVideo, setRecordedVideo] = useState(null);
  const [isRecordingVideo, setIsRecordingVideo] = useState(false);
  const [question, setQuestion] = useState("Tell me about yourself.");
  const [history, setHistory] = useState("");
  const [questionCount, setQuestionCount] = useState(1);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [aiSpeaking, setAiSpeaking] = useState(false);

  const {
    transcript,
    resetTranscript,
    listening,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  // ---------------- Full Session Video Recording ----------------
  const startInterviewRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      streamRef.current = stream;
      mediaRecorderRef.current = new MediaRecorder(stream);
      recordedChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.start();
      setIsRecordingVideo(true);
    } catch (err) {
      console.error("Error accessing media devices for recording:", err);
    }
  };

  const stopInterviewRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, {
          type: "video/webm",
        });
        const url = URL.createObjectURL(blob);
        setRecordedVideo(url);
        setIsRecordingVideo(false);

        // Turn off camera tracks
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((track) => track.stop());
        }
      };
    }
  };

  // ---------------- AI Voice (TTS) ----------------
  const speakQuestion = (text) => {
    if (!window.speechSynthesis) return;

    window.speechSynthesis.cancel();
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US";
    speech.rate = 0.95;
    speech.pitch = 1;

    const voices = window.speechSynthesis.getVoices();
    const femaleVoice =
      voices.find((v) => v.name.toLowerCase().includes("female")) ||
      voices.find((v) => v.name.toLowerCase().includes("zira")) ||
      voices.find((v) => v.name.toLowerCase().includes("samantha"));

    if (femaleVoice) {
      speech.voice = femaleVoice;
    }

    setAiSpeaking(true);
    speech.onend = () => {
      setAiSpeaking(false);
    };

    window.speechSynthesis.speak(speech);
  };

  useEffect(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = () => {
        speakQuestion(question);
      };
    }
    speakQuestion(question);
  }, [question]);

  if (!browserSupportsSpeechRecognition) {
    return (
      <div className="text-center p-10 text-red-600 text-xl">
        Browser doesn't support Speech Recognition.
      </div>
    );
  }

  const interviewFinished = questionCount > 5;

  // ---------------- Speech to Text Control ----------------
  const startRecording = () => {

  resetTranscript();

  SpeechRecognition.startListening({
    continuous: true,
    language: "en-IN",
    interimResults: true,
  });

};

  const stopRecordingText = () => {
    SpeechRecognition.stopListening();
  };

  // ---------------- Answer Processing ----------------
  const evaluate = async () => {
    if (!transcript.trim()) {
      alert("Please answer first.");
      return;
    }

    try {
      setLoading(true);

      const evaluation = await API.post("/video-interview/evaluate", {
        question,
        answer: transcript,
      });
      setResult(evaluation.data);

      const next = await API.post("/interview-session/next", {
        history,
        answer: transcript,
      });

      const updatedHistory =
        history +
        "\nQuestion: " +
        question +
        "\nAnswer: " +
        transcript +
        "\n";

      setHistory(updatedHistory);
      
      const nextCount = questionCount + 1;
      setQuestionCount(nextCount);

      if (nextCount > 5) {
        stopInterviewRecording();
      } else {
        setQuestion(next.data.nextQuestion);
      }

      resetTranscript();
    } catch (error) {
      console.error(error);
      alert("Interview Submission Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-4xl font-bold text-center mb-8">AI Video Interview</h1>

      <div className="bg-white rounded-3xl shadow-xl p-8">
        {/* Progress Bar */}
        <div className="flex justify-between mb-3">
          <span>Question {Math.min(questionCount, 5)} / 5</span>
          <span>{Math.min(questionCount * 20, 100)}%</span>
        </div>
        <div className="bg-gray-200 h-3 rounded-full mb-8">
          <div
            className="bg-blue-600 h-3 rounded-full transition-all duration-500"
            style={{ width: `${Math.min(questionCount * 20, 100)}%` }}
          />
        </div>

        {!interviewFinished ? (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* AI Interviewer Side panel */}
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl text-white p-8 shadow-2xl flex flex-col justify-between">
                <div className="flex items-center gap-5">
                  <div
                    className={`w-20 h-20 rounded-full flex items-center justify-center text-5xl bg-white text-blue-700 ${
                      aiSpeaking ? "animate-pulse" : ""
                    }`}
                  >
                    🤖
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold">AI Interviewer</h2>
                    <p className="text-blue-100 mt-1">Senior Software Engineer</p>
                    <p className="mt-3 text-sm">
                      {aiSpeaking ? "🟢 Speaking..." : "Waiting..."}
                    </p>
                  </div>
                </div>

                <div className="mt-10 bg-white/20 rounded-xl p-5">
                  <h3 className="font-bold mb-3">Current Question</h3>
                  <p className="text-lg">{question}</p>
                </div>
              </div>

              {/* Candidate Webcam Side panel */}
              <div className="bg-white rounded-3xl shadow-2xl p-6 border border-gray-100">
                <h2 className="text-2xl font-bold mb-5">You</h2>
                
                <div className="overflow-hidden rounded-2xl bg-black aspect-video flex items-center justify-center">
                  <Webcam
                    ref={webcamRef}
                    audio={false}
                    mirrored
                    className="w-full h-full object-cover shadow-lg"
                  />
                </div>

                <div className="flex gap-3 mt-5">
                  <button
                    onClick={startInterviewRecording}
                    disabled={isRecordingVideo}
                    className={`px-5 py-2 rounded-xl text-white ${
                      isRecordingVideo ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
                    }`}
                  >
                    🎥 Start Video Recording
                  </button>
                  <button
                    onClick={stopInterviewRecording}
                    disabled={!isRecordingVideo}
                    className={`px-5 py-2 rounded-xl text-white ${
                      !isRecordingVideo ? "bg-gray-400" : "bg-red-600 hover:bg-red-700"
                    }`}
                  >
                    Stop Video Recording
                  </button>
                </div>

                <div className="mt-5 flex justify-between text-sm text-gray-600">
                  <span className="font-semibold">
                    Video Record Status: {isRecordingVideo ? "🔴 Recording Session" : "⚪ Standby"}
                  </span>
                  <span>Question {Math.min(questionCount, 5)}/5</span>
                </div>
              </div>
            </div>

            {/* AI Banner Context */}
            <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-white text-xl
                  ${aiSpeaking ? "bg-green-500 animate-pulse" : "bg-blue-600"}`}
                >
                  <FaRobot />
                </div>
                <div>
                  <h2 className="font-bold text-xl">AI Interviewer</h2>
                  <p className="text-sm text-gray-500">Professional Technical Interview</p>
                </div>
              </div>
              <p className="mt-4 text-xl font-medium text-gray-800">{question}</p>
              {aiSpeaking && (
                <div className="mt-2 text-blue-600 text-sm font-semibold animate-pulse">
                  🤖 AI is reading out loud...
                </div>
              )}
            </div>

            {/* Answer Box and Control Center */}
            <div className="bg-white shadow-xl rounded-2xl p-6 mt-8 border border-gray-100">
              <h2 className="text-2xl font-bold mb-4">Your Speech Answer</h2>
              <div className="border rounded-xl bg-gray-50 p-5 min-h-[150px] text-gray-700 text-lg whitespace-pre-wrap">
                {transcript || <span className="text-gray-400">Click "Start Microphone" and start speaking your response...</span>}
              </div>

              <div className="flex gap-4 mt-6 flex-wrap">
                <button
                  onClick={startRecording}
                  className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl font-medium"
                >
                  🎤 Start Microphone
                </button>
                <button
                  onClick={stopRecordingText}
                  className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-xl font-medium"
                >
                  Stop Microphone
                </button>
                <button
                  onClick={resetTranscript}
                  className="bg-gray-700 hover:bg-gray-800 text-white px-5 py-3 rounded-xl font-medium"
                >
                  Reset Text
                </button>
                <button
                  onClick={evaluate}
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium shadow ml-auto disabled:bg-blue-300"
                >
                  {loading ? "Evaluating..." : "I'm Done"}
                </button>
              </div>

              <div className="mt-4 font-semibold text-sm">
                {listening ? (
                  <span className="text-red-600 animate-pulse">🎙 Microphone is actively listening...</span>
                ) : (
                  <span className="text-gray-500">🎙 Microphone is off</span>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <h1 className="text-4xl font-bold text-green-600 mb-4">
              🎉 Interview Completed
            </h1>
            <p className="text-gray-600 max-w-md mx-auto">
              Thank you! Your interview has ended. Review your answers and check your compiled recorded session below.
            </p>
          </div>
        )}
      </div>

      {/* Render Final Session Video Playback */}
      {recordedVideo && (
        <div className="mt-10 bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <h2 className="text-3xl font-bold text-gray-800">Interview Recording</h2>
          <video controls src={recordedVideo} className="rounded-xl mt-6 w-full max-w-3xl mx-auto shadow-md" />
          <div className="mt-6 text-center">
            <a
              href={recordedVideo}
              download="InterviewRecording.webm"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium shadow transition"
            >
              Download Recording
            </a>
          </div>
        </div>
      )}

      {/* Evaluation Results Feedback Section */}
      {result && (
        <div className="mt-10 bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">AI Feedback (Last Question)</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            <div className="bg-blue-50 p-5 rounded-xl text-center border border-blue-100">
              <h3 className="text-blue-700 font-semibold mb-1">Technical</h3>
              <h1 className="text-4xl font-bold text-blue-900">{result.technicalScore}</h1>
            </div>
            <div className="bg-green-50 p-5 rounded-xl text-center border border-green-100">
              <h3 className="text-green-700 font-semibold mb-1">Communication</h3>
              <h1 className="text-4xl font-bold text-green-900">{result.communicationScore}</h1>
            </div>
            <div className="bg-purple-50 p-5 rounded-xl text-center border border-purple-100">
              <h3 className="text-purple-700 font-semibold mb-1">Confidence</h3>
              <h1 className="text-4xl font-bold text-purple-900">{result.confidenceScore}</h1>
            </div>
            <div className="bg-orange-50 p-5 rounded-xl text-center border border-orange-100">
              <h3 className="text-orange-700 font-semibold mb-1">Overall</h3>
              <h1 className="text-4xl font-bold text-orange-900">{result.overallScore}</h1>
            </div>
          </div>

          <div className="mt-8 bg-gray-50 rounded-2xl p-6 border border-gray-100">
            <h3 className="font-bold text-xl text-gray-800">Detailed Feedback Breakdown</h3>
            <p className="mt-3 text-gray-700 leading-relaxed">{result.feedback}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default VideoInterview;