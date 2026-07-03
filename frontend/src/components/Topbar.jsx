import {
  Search,
  Bell,
  Settings,
  UserCircle,
} from "lucide-react";

const Topbar = () => {
  const user =
    JSON.parse(localStorage.getItem("user")) || {};

  return (
    <header className="h-20 bg-white shadow-sm border-b flex items-center justify-between px-8">

      {/* Left Section */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          Dashboard
        </h1>

        <p className="text-slate-500 text-sm mt-1">
          Welcome back,
          <span className="font-semibold text-blue-600">
            {" "}
            {user.name || "Kumud"}
          </span>
        </p>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-5">

        {/* Search Box */}
        <div className="relative">

          <Search
            size={18}
            className="absolute left-4 top-3 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search jobs..."
            className="pl-11 pr-4 py-3 w-72 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
          />

        </div>

        {/* Notification */}
        <button className="relative p-3 rounded-xl bg-slate-100 hover:bg-blue-100 transition">

          <Bell size={22} />

          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>

        </button>

        {/* Settings */}
        <button className="p-3 rounded-xl bg-slate-100 hover:bg-blue-100 transition">

          <Settings size={22} />

        </button>

        {/* User */}
        <div className="flex items-center gap-3 bg-slate-100 px-4 py-2 rounded-xl">

          <UserCircle
            size={40}
            className="text-blue-600"
          />

          <div>

            <p className="font-semibold text-slate-800">
              {user.name || "Kumud"}
            </p>

            <p className="text-xs text-slate-500">
              Student
            </p>

          </div>

        </div>

      </div>

    </header>
  );
};

export default Topbar;