import { useState } from "react";
import {
  User,
  Lock,
  Bell,
  Moon,
  Save,
} from "lucide-react";

export default function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="p-8">

      <h1 className="text-4xl font-bold mb-2">
        Settings
      </h1>

      <p className="text-gray-500 mb-8">
        Manage your account preferences.
      </p>

      {/* Profile */}

      <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">

        <div className="flex items-center gap-3 mb-6">

          <User className="text-blue-600" />

          <h2 className="text-2xl font-bold">
            Profile Settings
          </h2>

        </div>

        <div className="grid md:grid-cols-2 gap-6">

          <input
            type="text"
            placeholder="Full Name"
            className="border rounded-xl p-3"
          />

          <input
            type="email"
            placeholder="Email Address"
            className="border rounded-xl p-3"
          />

        </div>

      </div>

      {/* Password */}

      <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">

        <div className="flex items-center gap-3 mb-6">

          <Lock className="text-red-600" />

          <h2 className="text-2xl font-bold">
            Change Password
          </h2>

        </div>

        <div className="space-y-4">

          <input
            type="password"
            placeholder="Current Password"
            className="w-full border rounded-xl p-3"
          />

          <input
            type="password"
            placeholder="New Password"
            className="w-full border rounded-xl p-3"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full border rounded-xl p-3"
          />

        </div>

      </div>

      {/* Preferences */}

      <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">

        <h2 className="text-2xl font-bold mb-6">
          Preferences
        </h2>

        <div className="space-y-6">

          <div className="flex justify-between items-center">

            <div className="flex items-center gap-3">

              <Bell className="text-yellow-500" />

              <span>Email Notifications</span>

            </div>

            <input
              type="checkbox"
              checked={notifications}
              onChange={() =>
                setNotifications(!notifications)
              }
            />

          </div>

          <div className="flex justify-between items-center">

            <div className="flex items-center gap-3">

              <Moon className="text-purple-600" />

              <span>Dark Mode</span>

            </div>

            <input
              type="checkbox"
              checked={darkMode}
              onChange={() =>
                setDarkMode(!darkMode)
              }
            />

          </div>

        </div>

      </div>

      <button className="bg-blue-600 text-white px-8 py-3 rounded-xl flex items-center gap-2 hover:bg-blue-700">

        <Save size={18} />

        Save Changes

      </button>

    </div>
  );
}