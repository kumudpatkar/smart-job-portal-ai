import Sidebar from "../components/Sidebar";
import { LogOut, Bell, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DashboardLayout = ({ children }) => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user")) || {};

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="flex min-h-screen bg-slate-100">

      {/* Sidebar */}
      <Sidebar />

      {/* Main */}
      <div className="flex-1 flex flex-col">

        {/* Topbar */}
        <header className="h-20 bg-white border-b border-slate-200 shadow-sm px-8 flex items-center justify-between">

          {/* Left */}
          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              Smart Job Portal AI
            </h2>

            <p className="text-sm text-slate-500">
              Welcome back, {user.name || "User"}
            </p>
          </div>

          {/* Right */}
          <div className="flex items-center gap-4">

            {/* Search */}
            <div className="hidden lg:flex items-center bg-slate-100 rounded-xl px-4 py-2 w-72">

              <Search
                size={18}
                className="text-slate-500"
              />

              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent ml-3 outline-none w-full"
              />

            </div>

            {/* Notification */}
            <button className="p-3 rounded-xl bg-slate-100 hover:bg-slate-200 transition">

              <Bell size={20} />

            </button>

            {/* Avatar */}
            <div className="w-11 h-11 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">

              {user.name
                ? user.name.charAt(0).toUpperCase()
                : "U"}

            </div>

            {/* Logout */}
            <button
              onClick={logout}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition"
            >

              <LogOut size={18} />

              Logout

            </button>

          </div>

        </header>

        {/* Page Content */}
        <main className="flex-1 p-8 overflow-auto">
          {children}
        </main>

      </div>

    </div>
  );
};

export default DashboardLayout;