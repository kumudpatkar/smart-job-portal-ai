import React from "react";
import { Link } from "react-router-dom";
import {
  FileText,
  Briefcase,
  Bot,
  Upload,
  Search,
} from "lucide-react";

const QuickActions = () => {
  const actions = [
    {
      name: "Analyze Resume",
      path: "/resume-analyzer",
      icon: <FileText size={18} />,
      color: "bg-blue-600",
    },
    {
      name: "Find Jobs",
      path: "/jobs",
      icon: <Search size={18} />,
      color: "bg-green-600",
    },
    {
      name: "AI Assistant",
      path: "/ai-assistant",
      icon: <Bot size={18} />,
      color: "bg-purple-600",
    },
    {
      name: "Upload Resume",
      path: "/resume-analyzer",
      icon: <Upload size={18} />,
      color: "bg-orange-600",
    },
    {
      name: "Saved Jobs",
      path: "/saved-jobs",
      icon: <Briefcase size={18} />,
      color: "bg-indigo-600",
    },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      
      <h2 className="text-xl font-bold mb-4">
        Quick Actions
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

        {actions.map((action) => (
          <Link
            key={action.name}
            to={action.path}
            className={`flex flex-col items-center justify-center p-4 rounded-xl text-white hover:scale-105 transition ${action.color}`}
          >
            {action.icon}
            <span className="mt-2 text-sm font-medium text-center">
              {action.name}
            </span>
          </Link>
        ))}

      </div>
    </div>
  );
};

export default QuickActions;