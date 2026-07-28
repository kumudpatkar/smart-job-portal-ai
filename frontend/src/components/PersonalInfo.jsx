import { User, Mail, Phone, MapPin } from "lucide-react";

const PersonalInfo = () => {
  const user = JSON.parse(localStorage.getItem("user")) || {};

  return (
    <div className="bg-white rounded-3xl shadow-lg p-8">

      <h2 className="text-2xl font-bold text-slate-800 mb-8">
        Personal Information
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        {/* Full Name */}

        <div>
          <label className="flex items-center gap-2 mb-2 font-medium text-slate-600">
            <User size={18} />
            Full Name
          </label>

          <input
            type="text"
            defaultValue={user.name || ""}
            placeholder="Enter your full name"
            className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Email */}

        <div>
          <label className="flex items-center gap-2 mb-2 font-medium text-slate-600">
            <Mail size={18} />
            Email
          </label>

          <input
            type="email"
            defaultValue={user.email || ""}
            placeholder="Enter your email"
            className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Phone */}

        <div>
          <label className="flex items-center gap-2 mb-2 font-medium text-slate-600">
            <Phone size={18} />
            Phone
          </label>

          <input
            type="text"
            defaultValue={user.phone || ""}
            placeholder="+91 9876543210"
            className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Location */}

        <div>
          <label className="flex items-center gap-2 mb-2 font-medium text-slate-600">
            <MapPin size={18} />
            Location
          </label>

          <input
            type="text"
            defaultValue={user.location || ""}
            placeholder="Mumbai, Maharashtra"
            className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

      </div>

      

    </div>
  );
};

export default PersonalInfo;