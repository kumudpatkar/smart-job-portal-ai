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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/resume-analyzer" element={<ResumeAnalyzer />} />
        <Route path="/ai-assistant" element={<AIAssistant />} />
        <Route path="/saved-jobs" element={<SavedJobs />} />
        <Route path="/interview" element={<Interview />} />
        <Route path="/applied-jobs" element={<AppliedJobs />} />
        <Route path="/resume-builder" element={<ResumeBuilder />} />
        <Route path="/interview-preparation" element={<InterviewPreparation />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;