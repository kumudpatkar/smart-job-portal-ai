import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  User,
  Briefcase,
  FileText,
  Bot,
  Bookmark,
} from "lucide-react";

const Navbar = () => {
  const location = useLocation();

  const links = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={18} />,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: <User size={18} />,
    },
    {
      name: "Jobs",
      path: "/jobs",
      icon: <Briefcase size={18} />,
    },
    {
      name: "Resume",
      path: "/resume-analyzer",
      icon: <FileText size={18} />,
    },
    {
      name: "AI Assistant",
      path: "/ai-assistant",
      icon: <Bot size={18} />,
    },
    {
      name: "Saved Jobs",
      path: "/saved-jobs",
      icon: <Bookmark size={18} />,
    },
  ];

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex gap-4 overflow-x-auto">
      {links.map((l) => {
        const isActive = location.pathname === l.path;

        return (
          <Link
            key={l.path}
            to={l.path}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 ${
              isActive
                ? "bg-blue-600 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {l.icon}
            {l.name}
          </Link>
        );
      })}
    </nav>
  );
};

export default Navbar;