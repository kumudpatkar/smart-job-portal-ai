import DashboardLayout from "../layouts/DashboardLayout";
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

  return (
    <DashboardLayout>
      <AnimatedPage>

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-800">
            Welcome back,{" "}
            <span className="text-blue-600">
              {user.name || "User"}
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
            title="Applied Jobs"
            value="18"
            subtitle="This Month"
            color="bg-blue-100"
            icon={<Briefcase size={28} className="text-blue-600" />}
          />

          <StatCard
            title="Saved Jobs"
            value="42"
            subtitle="Bookmarked"
            color="bg-pink-100"
            icon={<Bookmark size={28} className="text-pink-600" />}
          />

          <StatCard
            title="ATS Score"
            value="92%"
            subtitle="Excellent Resume"
            color="bg-green-100"
            icon={<FileCheck size={28} className="text-green-600" />}
          />

          <StatCard
            title="AI Matches"
            value="126"
            subtitle="Recommended Jobs"
            color="bg-purple-100"
            icon={<Brain size={28} className="text-purple-600" />}
          />

        </div>

        {/* Bottom */}
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