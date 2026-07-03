import {
  Brain,
  TrendingUp,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

const AIInsights = () => {
  return (
    <div className="bg-gradient-to-br from-indigo-700 via-blue-700 to-purple-700 rounded-3xl p-7 text-white shadow-2xl">

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">

        <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
          <Brain size={30} />
        </div>

        <div>
          <h2 className="text-2xl font-bold">
            AI Insights
          </h2>

          <p className="text-blue-100 text-sm">
            Personalized career recommendations
          </p>
        </div>

      </div>

      {/* Resume Score */}

      <div className="bg-white/10 rounded-2xl p-5 mb-6">

        <div className="flex justify-between items-center">

          <div>
            <p className="text-blue-100">
              Resume Score
            </p>

            <h2 className="text-4xl font-bold mt-2">
              92%
            </h2>
          </div>

          <TrendingUp size={40} />
        </div>

      </div>

      {/* Suggestions */}

      <div className="space-y-4">

        <div className="flex gap-3 items-start">
          <CheckCircle2 className="text-green-300 mt-1" />

          <p>
            Add more cloud computing skills to improve job matching.
          </p>
        </div>

        <div className="flex gap-3 items-start">
          <CheckCircle2 className="text-green-300 mt-1" />

          <p>
            Your ATS score increased by 12% this week.
          </p>
        </div>

        <div className="flex gap-3 items-start">
          <Sparkles className="text-yellow-300 mt-1" />

          <p>
            AI recommends applying to 24 new Software Engineer jobs.
          </p>
        </div>

      </div>

      {/* Button */}

      <button className="w-full mt-8 bg-white text-blue-700 py-3 rounded-xl font-semibold hover:scale-105 transition-all duration-300">
        View Full Analysis
      </button>

    </div>
  );
};

export default AIInsights;