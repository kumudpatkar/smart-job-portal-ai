import DashboardLayout from "../layouts/DashboardLayout";

import ProfileHeader from "../components/ProfileHeader";
import PersonalInfo from "../components/PersonalInfo";
import SkillsCard from "../components/SkillsCard";
import ExperienceCard from "../components/ExperienceCard";
import ResumeCard from "../components/ResumeCard";
import SocialLinks from "../components/SocialLinks";

const Profile = () => {
  return (
    <DashboardLayout>

      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-800">
          My Profile
        </h1>

        <p className="text-slate-500 mt-2">
          Manage your personal information, resume,
          skills and social profiles.
        </p>
      </div>

      <ProfileHeader />

      <div className="mt-8">
        <PersonalInfo />
      </div>

      {/* ❌ EducationCard REMOVED (because file doesn't exist) */}

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

      <div className="mt-12 text-center text-slate-500 pb-10">
        © 2026 JobSpark AI 🚀
      </div>

    </DashboardLayout>
  );
};

export default Profile;