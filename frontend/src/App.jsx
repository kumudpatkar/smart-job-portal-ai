import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Jobs from "./pages/Jobs";
import ResumeAnalyzer from "./pages/ResumeAnalyzer";
import AIAssistant from "./pages/AIAssistant";
import SavedJobs from "./pages/SavedJobs";
import Interview from "./pages/Interview";
import AppliedJobs from "./pages/AppliedJobs";
import ResumeBuilder from "./pages/ResumeBuilder";
import InterviewPreparation from "./pages/InterviewPreparation";
import Settings from "./pages/Settings";
import JobRecommendation from "./pages/JobRecommendation";
import MockInterview from "./pages/MockInterview";
import ATSChecker from "./pages/ATSChecker";
import SalaryPredictor from "./pages/SalaryPredictor";
import SkillGap from "./pages/SkillGap";
import CareerRoadmap from "./pages/CareerRoadmap";
import VideoInterview from "./pages/VideoInterview";
import InterviewHistory from "./pages/InterviewHistory";
import Analytics from "./pages/Analytics";
import ResumeRanking from "./pages/ResumeRanking";
import HiringDashboard from "./pages/HiringDashboard";
import CodingInterview from "./pages/CodingInterview";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Authentication */}
        <Route path="/" element={<Login />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Profile */}
        <Route path="/profile" element={<Profile />} />

        {/* Jobs */}
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/saved-jobs" element={<SavedJobs />} />
        <Route path="/applied-jobs" element={<AppliedJobs />} />
        <Route
          path="/job-recommendation"
          element={<JobRecommendation />}
        />

        {/* Resume */}
        <Route
          path="/resume-analyzer"
          element={<ResumeAnalyzer />}
        />
        <Route
          path="/resume-builder"
          element={<ResumeBuilder />}
        />
        <Route
          path="/resume-ranking"
          element={<ResumeRanking />}
        />

        {/* AI Features */}
        <Route
          path="/ai-assistant"
          element={<AIAssistant />}
        />
        <Route
          path="/mock-interview"
          element={<MockInterview />}
        />
        <Route
          path="/interview"
          element={<Interview />}
        />
        <Route
          path="/ats-checker"
          element={<ATSChecker />}
        />
        <Route
          path="/salary-predictor"
          element={<SalaryPredictor />}
        />
        <Route
          path="/skill-gap"
          element={<SkillGap />}
        />
        <Route
          path="/career-roadmap"
          element={<CareerRoadmap />}
        />
        <Route
          path="/video-interview"
          element={<VideoInterview />}
        />
        <Route
          path="/interview-history"
          element={<InterviewHistory />}
        />

        {/* Hiring */}
        <Route
          path="/hiring-dashboard"
          element={<HiringDashboard />}
        />

        {/* Analytics */}
        <Route
          path="/analytics"
          element={<Analytics />}
        />

        <Route
  path="/coding-interview"
  element={<CodingInterview />}
/>

        {/* Settings */}
        <Route
          path="/settings"
          element={<Settings />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;