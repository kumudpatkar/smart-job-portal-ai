import { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import API from "../services/api";

import ProfileHeader from "../components/ProfileHeader";
import PersonalInfo from "../components/PersonalInfo";
import SkillsCard from "../components/SkillsCard";
import ExperienceCard from "../components/ExperienceCard";
import ResumeCard from "../components/ResumeCard";
import SocialLinks from "../components/SocialLinks";

import { Save, Loader2 } from "lucide-react";

const Profile = () => {
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    try {
      setLoading(true);

      // This will work after we connect all components
      await API.put("/profile/update", {});

      alert("✅ Profile updated successfully.");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Unable to update profile."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-800">
          My Profile
        </h1>

        <p className="text-slate-500 mt-2">
          Manage your personal information,
          resume, skills and social profiles.
        </p>
      </div>

      <ProfileHeader />

      <div className="mt-8">
        <PersonalInfo />
      </div>

      <div className="mt-8">
        <SkillsCard />
      </div>

      <div className="mt-8">
        <ExperienceCard />
      </div>

      <div className="mt-8">
        <ResumeCard />
      </div>

      <div className="mt-8">
        <SocialLinks />
      </div>

      <div className="mt-12 flex justify-end">
        <button
          onClick={handleSave}
          disabled={loading}
          className={`
            flex
            items-center
            gap-2
            px-8
            py-3
            rounded-xl
            font-semibold
            text-white
            shadow-lg
            transition-all
            duration-300
            ${
              loading
                ? "bg-slate-500 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:scale-105"
            }
          `}
        >
          {loading ? (
            <>
              <Loader2
                size={20}
                className="animate-spin"
              />
              Saving...
            </>
          ) : (
            <>
              <Save size={20} />
              Save Changes
            </>
          )}
        </button>
      </div>

      <div className="mt-12 text-center text-slate-500 pb-10">
        © 2026 JobSpark AI 🚀
      </div>
    </DashboardLayout>
  );
};

export default Profile;