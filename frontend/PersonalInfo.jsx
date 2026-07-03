import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
} from "lucide-react";

const PersonalInfo = () => {
  const user =
    JSON.parse(localStorage.getItem("user")) || {};

  return (
    <div className="bg-white rounded-3xl shadow-lg p-8">

      <h2 className="text-2xl font-bold text-slate-800 mb-8">
        Personal Information
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        {/* Full Name */}

        <div>
          <label className="flex items-center gap-2 text-slate-600 mb-2 font-medium">
            <User size={18} />
            Full Name
          </label>

          <input
            type="text"
            defaultValue={user.name || ""}
            placeholder="Enter Full Name"
            className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Email */}

        <div>
          <label className="flex items-center gap-2 text-slate-600 mb-2 font-medium">
            <Mail size={18} />
            Email Address
          </label>

          <input
            type="email"
            defaultValue={user.email || ""}
            placeholder="Enter Email"
            className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Phone */}

        <div>
          <label className="flex items-center gap-2 text-slate-600 mb-2 font-medium">
            <Phone size={18} />
            Phone Number
          </label>

          <input
            type="text"
            placeholder="+91 9876543210"
            className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* City */}

        <div>
          <label className="flex items-center gap-2 text-slate-600 mb-2 font-medium">
            <MapPin size={18} />
            City
          </label>

          <input
            type="text"
            placeholder="Mumbai"
            className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Date of Birth */}

        <div>
          <label className="flex items-center gap-2 text-slate-600 mb-2 font-medium">
            <Calendar size={18} />
            Date of Birth
          </label>

          <input
            type="date"
            className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Country */}

        <div>
          <label className="flex items-center gap-2 text-slate-600 mb-2 font-medium">
            <MapPin size={18} />
            Country
          </label>

          <input
            type="text"
            placeholder="India"
            className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

      </div>

      <button
        className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:scale-105 transition-all duration-300 shadow-lg"
      >
        Save Information
      </button>

    </div>
  );
};

export default PersonalInfo;