import { useState } from "react";
import { Plus, X, Code2 } from "lucide-react";

const SkillsCard = () => {
  const [newSkill, setNewSkill] = useState("");

  const [skills, setSkills] = useState([
    "Java",
    "Python",
    "React",
    "JavaScript",
    "HTML",
    "CSS",
    "Node.js",
    "MongoDB",
    "SQL",
    "Machine Learning",
    "Artificial Intelligence",
    "Deep Learning",
    "Git",
    "GitHub",
  ]);

  const addSkill = () => {
    if (
      newSkill.trim() !== "" &&
      !skills.includes(newSkill)
    ) {
      setSkills([...skills, newSkill]);
      setNewSkill("");
    }
  };

  const removeSkill = (skill) => {
    setSkills(skills.filter((item) => item !== skill));
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg p-8">

      <div className="flex justify-between items-center mb-8">

        <h2 className="text-2xl font-bold text-slate-800">
          Skills
        </h2>

        <div className="flex gap-3">

          <input
            type="text"
            placeholder="Add Skill"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            className="border border-slate-300 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={addSkill}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 rounded-xl hover:scale-105 transition-all"
          >
            <Plus size={20} />
          </button>

        </div>

      </div>

      <div className="flex flex-wrap gap-4">

        {skills.map((skill, index) => (

          <div
            key={index}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 px-5 py-3 rounded-full font-medium shadow"
          >

            <Code2 size={18} />

            {skill}

            <button
              onClick={() => removeSkill(skill)}
            >
              <X
                size={16}
                className="hover:text-red-500"
              />
            </button>

          </div>

        ))}

      </div>

      <button
        className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:scale-105 transition-all shadow-lg"
      >
        Save Skills
      </button>

    </div>
  );
};

export default SkillsCard;