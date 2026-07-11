import {
  LayoutDashboard,
  User,
  Briefcase,
  FileText,
  Brain,
  Bookmark,
  Mic,
  ClipboardList,
  FilePlus2,
  GraduationCap,
  Settings,
  LogOut,
  BarChart3,
  Code2,
  Trophy,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/dashboard",
    },
    {
      title: "Profile",
      icon: <User size={20} />,
      path: "/profile",
    },
    {
      title: "Jobs",
      icon: <Briefcase size={20} />,
      path: "/jobs",
    },
    {
      title: "Resume Analyzer",
      icon: <FileText size={20} />,
      path: "/resume-analyzer",
    },
    {
      title: "AI Assistant",
      icon: <Brain size={20} />,
      path: "/ai-assistant",
    },
    {
      title: "Saved Jobs",
      icon: <Bookmark size={20} />,
      path: "/saved-jobs",
    },
    {
      title: "AI Mock Interview",
      icon: <Mic size={20} />,
      path: "/mock-interview",
    },
    {
      title: "ATS Checker",
      icon: <ClipboardList size={20} />,
      path: "/ats-checker",
    },
    {
      title: "Salary Predictor",
      icon: <Briefcase size={20} />,
      path: "/salary-predictor",
    },
    {
      title: "Skill Gap",
      icon: <GraduationCap size={20} />,
      path: "/skill-gap",
    },
    {
      title: "Career Roadmap",
      icon: <Brain size={20} />,
      path: "/career-roadmap",
    },
    {
      title: "Job Recommendation",
      icon: <Briefcase size={20} />,
      path: "/job-recommendation",
    },
    {
      title: "Applied Jobs",
      icon: <ClipboardList size={20} />,
      path: "/applied-jobs",
    },
    {
      title: "Resume Builder",
      icon: <FilePlus2 size={20} />,
      path: "/resume-builder",
    },
    {
      title: "Interview Prep",
      icon: <GraduationCap size={20} />,
      path: "/interview-preparation",
    },
    {
      title: "Video Interview",
      icon: <Mic size={20} />,
      path: "/video-interview",
    },
    {
      title: "Interview History",
      icon: <ClipboardList size={20} />,
      path: "/interview-history",
    },
    {
      title: "Analytics",
      icon: <BarChart3 size={20} />,
      path: "/analytics",
    },
    {
      title: "AI Coding Interview",
      icon: <Code2 size={20} />,
      path: "/coding-interview",
    },
    {
      title: "Resume Ranking",
      icon: <Trophy size={20} />,
      path: "/resume-ranking",
    },
    {
      title: "Hiring Dashboard",
      icon: <BarChart3 size={20} />,
      path: "/hiring-dashboard",
    },
    {
      title: "Settings",
      icon: <Settings size={20} />,
      path: "/settings",
    },
  ];

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <aside className="w-72 bg-slate-900 text-white flex flex-col justify-between min-h-screen shadow-xl">
      <div>
        <div className="p-8 border-b border-slate-700">
          <h1 className="text-3xl font-bold text-blue-400">
            JobSpark AI
          </h1>

          <p className="text-slate-400 text-sm mt-2">
            Smart Career Platform
          </p>
        </div>

        <nav className="mt-6 px-4">
          {menuItems.map((item) => (
            <NavLink
              key={item.title}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 px-5 py-4 rounded-xl mb-2 transition-all duration-200 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg"
                    : "hover:bg-slate-800 text-slate-300"
                }`
              }
            >
              {item.icon}
              <span className="font-medium">{item.title}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="p-5 border-t border-slate-700">
        <button
          onClick={logout}
          className="w-full bg-red-500 hover:bg-red-600 py-3 rounded-xl flex items-center justify-center gap-3 transition"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;