import { Brain, BadgeCheck } from "lucide-react";

function SkillsCard({ skills = [] }) {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-8">

      <div className="flex items-center gap-3 mb-6">
        <Brain className="text-blue-600" size={32} />
        <div>
          <h2 className="text-2xl font-bold">
            Skills Detected
          </h2>

          <p className="text-gray-500">
            AI extracted these skills from your resume.
          </p>
        </div>
      </div>

      <div className="text-5xl font-bold text-green-600 mb-6">
        {skills.length}
      </div>

      {skills.length === 0 ? (
        <div className="bg-gray-100 rounded-xl p-6 text-gray-500 text-center">
          No skills detected.
        </div>
      ) : (
        <div className="flex flex-wrap gap-3">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full font-medium"
            >
              <BadgeCheck size={18} />
              {skill}
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

export default SkillsCard;