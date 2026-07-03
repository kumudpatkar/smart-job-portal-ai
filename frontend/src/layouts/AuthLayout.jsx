const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>

      {/* Left Side */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#312e81] text-white p-16 flex-col justify-center">

        <h1 className="text-6xl font-bold mb-6">
          JobSpark AI 🚀
        </h1>

        <p className="text-xl text-slate-300 mb-10">
          AI-powered career platform helping students
          and professionals land better opportunities.
        </p>

        <div className="space-y-4 text-lg">
          <p>✅ AI Resume Analyzer</p>
          <p>🎯 Smart Job Matching</p>
          <p>🎤 Mock Interviews</p>
          <p>📈 Career Roadmaps</p>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-12">

          <div className="bg-white/10 p-4 rounded-xl text-center">
            <h2 className="text-2xl font-bold">10K+</h2>
            <p className="text-sm">Jobs</p>
          </div>

          <div className="bg-white/10 p-4 rounded-xl text-center">
            <h2 className="text-2xl font-bold">5K+</h2>
            <p className="text-sm">Students</p>
          </div>

          <div className="bg-white/10 p-4 rounded-xl text-center">
            <h2 className="text-2xl font-bold">95%</h2>
            <p className="text-sm">Success</p>
          </div>

        </div>

      </div>

      {/* Right Side */}
      <div className="w-full lg:w-1/2 bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#312e81] flex items-center justify-center p-6">
        {children}
      </div>

    </div>
  );
};

export default AuthLayout;