import { useState } from "react";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-700 flex items-center justify-center p-5">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">
        
        {/* Left Side */}
        <div className="bg-gradient-to-br from-blue-600 to-purple-700 text-white p-12 flex flex-col justify-center">
          <h1 className="text-5xl font-bold mb-6">
            JobSpark AI 🚀
          </h1>

          <p className="text-lg mb-10 text-gray-100">
            Smart Career Platform powered by Artificial Intelligence.
          </p>

          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <span className="text-2xl">✅</span>
              <span>AI Resume Analyzer</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-2xl">🎯</span>
              <span>Smart Job Matching</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-2xl">🎤</span>
              <span>AI Mock Interviews</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-2xl">📈</span>
              <span>Career Roadmaps</span>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="p-10 md:p-14 flex flex-col justify-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-2">
            Welcome Back
          </h2>

          <p className="text-gray-500 mb-8">
            Sign in to continue your journey
          </p>

          {/* Toggle */}
          <div className="flex bg-gray-100 rounded-xl p-1 mb-8">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 rounded-lg font-medium transition ${
                isLogin
                  ? "bg-blue-600 text-white"
                  : "text-gray-600"
              }`}
            >
              Login
            </button>

            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 rounded-lg font-medium transition ${
                !isLogin
                  ? "bg-blue-600 text-white"
                  : "text-gray-600"
              }`}
            >
              Register
            </button>
          </div>

          <form className="space-y-5">
            {!isLogin && (
              <input
                type="text"
                placeholder="Full Name"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}

            <input
              type="email"
              placeholder="Email Address"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />

            {!isLogin && (
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:scale-105 transition"
            >
              {isLogin ? "Login" : "Create Account"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-500">
              {isLogin
                ? "Don't have an account?"
                : "Already have an account?"}
            </p>

            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-600 font-semibold mt-2"
            >
              {isLogin ? "Register Here" : "Login Here"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}