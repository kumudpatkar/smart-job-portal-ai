import { AlertTriangle } from "lucide-react";

function MissingSkillsCard({ skills = [] }) {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-8">

      <div className="flex items-center gap-3 mb-6">
        <AlertTriangle
          className="text-red-500"
          size={30}
        />

        <div>
          <h2 className="text-2xl font-bold">
            Missing Skills
          </h2>

          <p className="text-gray-500">
            Skills recommended to improve your ATS score.
          </p>
        </div>
      </div>

      {skills.length === 0 ? (
        <div className="bg-green-50 border border-green-200 rounded-2xl p-6 text-green-700 font-medium">
          🎉 Great! No important skills are missing.
        </div>
      ) : (
        <div className="flex flex-wrap gap-3">

          {skills.map((skill, index) => (
            <span
              key={index}
              className="bg-red-100 text-red-700 px-5 py-3 rounded-full font-medium hover:bg-red-200 transition"
            >
              {skill}
            </span>
          ))}

        </div>
      )}

    </div>
  );
}

export default MissingSkillsCard;