
import { useState, useRef, useEffect } from "react";
import API from "../services/api";
import AnimatedPage from "../components/AnimatedPage";
import { Bot, User, SendHorizonal } from "lucide-react";

export default function AIAssistant() {
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "👋 Hello! I'm your AI Career Assistant. Ask me about jobs, resumes, interviews, or career guidance.",
    },
  ]);

  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const sendMessage = async () => {
    if (!question.trim()) return;

    const userMessage = {
      sender: "user",
      text: question,
    };

    setMessages((prev) => [...prev, userMessage]);

    const currentQuestion = question;

    setQuestion("");
    setLoading(true);

    try {
      const res = await API.post("/api/ai-chat", {
        question: currentQuestion,
      });

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: res.data.answer,
        },
      ]);
    } catch (err) {
      console.log(err);

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "❌ Failed to get AI response.",
        },
      ]);
    }

    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <AnimatedPage>
      <div className="h-screen bg-slate-100 flex flex-col">

        {/* Header */}

        <div className="bg-white shadow-md px-6 py-4 flex items-center gap-3">

          <Bot className="text-blue-600" size={32} />

          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              AI Career Assistant
            </h1>

            <p className="text-sm text-slate-500">
              Ask anything about jobs, resumes and interviews
            </p>
          </div>

        </div>

        {/* Chat */}

        <div className="flex-1 overflow-y-auto p-6 space-y-5">

          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.sender === "user"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`max-w-3xl rounded-2xl px-5 py-4 shadow flex gap-3 ${
                  msg.sender === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-slate-700"
                }`}
              >
                <div>
                  {msg.sender === "user" ? (
                    <User size={22} />
                  ) : (
                    <Bot size={22} className="text-blue-600" />
                  )}
                </div>

                <div className="whitespace-pre-wrap">
                  {msg.text}
                </div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">

              <div className="bg-white rounded-2xl px-5 py-4 shadow">

                🤖 AI is thinking...

              </div>

            </div>
          )}

          <div ref={bottomRef}></div>

        </div>

        {/* Input */}

        <div className="bg-white border-t p-5">

          <div className="flex gap-3">

            <input
              type="text"
              placeholder="Ask your question..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              onClick={sendMessage}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-xl flex items-center gap-2 transition"
            >
              <SendHorizonal size={18} />
              Send
            </button>

          </div>

        </div>

      </div>
    </AnimatedPage>
  );
}
