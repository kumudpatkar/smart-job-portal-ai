import { useEffect, useState } from "react";
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
} from "lucide-react";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user")) || {};

  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const { data } = await API.get("/resume/dashboard");
      setDashboard(data.dashboard);
    } catch (error) {
      console.error("Dashboard Error:", error);
    }
  };

  return (
    <DashboardLayout>
      <AnimatedPage>

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-800">
            Welcome back,{" "}
            <span className="text-blue-600">
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
            value={dashboard ? dashboard.totalProjects : "..."}
            subtitle="Resume Projects"
            color="bg-blue-100"
            icon={<Briefcase size={28} className="text-blue-600" />}
          />

          <StatCard
            title="Skills"
            value={dashboard ? dashboard.totalSkills : "..."}
            subtitle="Detected Skills"
            color="bg-pink-100"
            icon={<Bookmark size={28} className="text-pink-600" />}
          />

          <StatCard
            title="ATS Score"
            value={dashboard ? `${dashboard.atsScore}%` : "..."}
            subtitle="AI Resume Score"
            color="bg-green-100"
            icon={<FileCheck size={28} className="text-green-600" />}
          />

          <StatCard
            title="AI Suggestions"
            value={
              dashboard
                ? dashboard.suggestions.length
                : "..."
            }
            subtitle="Resume Improvements"
            color="bg-purple-100"
            icon={<Brain size={28} className="text-purple-600" />}
          />

        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mt-10">

          <div className="xl:col-span-2 space-y-8">
            <RecentJobs />
            <CareerProgress />
          </div>

          <div>
            <AIInsights />
          </div>

        </div>

      </AnimatedPage>
    </DashboardLayout>
  );
};

export default Dashboard;