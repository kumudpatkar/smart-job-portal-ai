import { Camera } from "lucide-react";

const ProfileHeader = () => {
  const user = JSON.parse(localStorage.getItem("user")) || {};

  return (
    <div className="bg-white rounded-3xl shadow-lg p-8 flex flex-col md:flex-row items-center gap-8">

      {/* Avatar */}

      <div className="relative">

        <img
          src="https://ui-avatars.com/api/?name=User&background=2563eb&color=fff&size=200"
          alt="profile"
          className="w-36 h-36 rounded-full object-cover border-4 border-blue-500"
        />

        <button
          className="absolute bottom-1 right-1 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition"
        >
          <Camera size={18} />
        </button>

      </div>

      {/* User Info */}

      <div className="flex-1">

        <h2 className="text-3xl font-bold text-slate-800">
          {user.name || "Your Name"}
        </h2>

        <p className="text-slate-500 mt-2">
          AI & ML Engineer • Software Developer • Problem Solver
        </p>

        <div className="flex flex-wrap gap-3 mt-5">

          <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm">
            AI/ML
          </span>

          <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm">
            Java
          </span>

          <span className="bg-purple-100 text-purple-700 px-4 py-1 rounded-full text-sm">
            React
          </span>

          <span className="bg-orange-100 text-orange-700 px-4 py-1 rounded-full text-sm">
            Python
          </span>

        </div>

      </div>

    </div>
  );
};

export default ProfileHeader;