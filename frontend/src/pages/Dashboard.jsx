import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";
import API from "../services/api";

import AnimatedPage from "../components/AnimatedPage";
import StatCard from "../components/StatCard";
import RecentJobs from "../components/RecentJobs";
import AIInsights from "../components/AIInsights";
import CareerProgress from "../components/CareerProgress";

import {
  Briefcase,
  Bookmark,
  FileCheck,
  Brain,
  Code2,
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user")) || {};

  const [dashboard, setDashboard] = useState({
    totalProjects: 0,
    totalSkills: 0,
    atsScore: 0,
    suggestions: [],
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const { data } = await API.get("/resume/dashboard");

      if (data?.dashboard) {
        setDashboard(data.dashboard);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DashboardLayout>
      <AnimatedPage>
        {/* Header */}

        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-800">
            Welcome back,
            <span className="text-blue-600">
              {" "}
              {user.fullName || "User"}
            </span>{" "}
            👋
          </h1>

          <p className="text-gray-500 mt-2">
            Here's your AI-powered career dashboard.
          </p>
        </div>

        {/* Stats */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

          <StatCard
            title="Projects"
            value={dashboard.totalProjects}
            subtitle="Resume Projects"
            color="bg-blue-100"
            icon={<Briefcase size={28} className="text-blue-600" />}
          />

          <StatCard
            title="Skills"
            value={dashboard.totalSkills}
            subtitle="Detected Skills"
            color="bg-pink-100"
            icon={<Bookmark size={28} className="text-pink-600" />}
          />

          <StatCard
            title="ATS Score"
            value={`${dashboard.atsScore}%`}
            subtitle="AI Resume Score"
            color="bg-green-100"
            icon={<FileCheck size={28} className="text-green-600" />}
          />

          <StatCard
            title="AI Suggestions"
            value={dashboard.suggestions?.length || 0}
            subtitle="Resume Improvements"
            color="bg-purple-100"
            icon={<Brain size={28} className="text-purple-600" />}
          />

        </div>

        {/* Main Section */}

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mt-10">

          <div className="xl:col-span-2 space-y-8">
            <RecentJobs />
            <CareerProgress />
          </div>

          <div className="space-y-8">
            <AIInsights />

            {/* AI Coding Interview Card */}

            <div
              onClick={() => navigate("/coding-interview")}
              className="cursor-pointer bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition"
            >
              <Code2
                size={48}
                className="text-blue-600"
              />

              <h2 className="text-xl font-bold mt-4">
                AI Coding Interview
              </h2>

              <p className="text-gray-500 mt-2">
                Practice coding questions with AI feedback.
              </p>
            </div>

          </div>

        </div>
      </AnimatedPage>
    </DashboardLayout>
  );
};

export default Dashboard;