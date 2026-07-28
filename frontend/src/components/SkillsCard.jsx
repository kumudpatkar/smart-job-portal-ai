import { useState } from "react";
import { Code2, Plus, X } from "lucide-react";

const SkillsCard = () => {
  const [skill, setSkill] = useState("");

  const [skills, setSkills] = useState([
    "Java",
    "Python",
    "React",
    "Machine Learning",
    "SQL",
  ]);

  const addSkill = () => {
    if (!skill.trim()) return;

    if (skills.includes(skill.trim())) return;

    setSkills([...skills, skill.trim()]);
    setSkill("");
  };

  const removeSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg p-8">

      <h2 className="text-2xl font-bold text-slate-800 mb-8 flex items-center gap-2">
        <Code2 className="text-blue-600" />
        Skills
      </h2>

      <div className="flex gap-3">

        <input
          type="text"
          placeholder="Add Skill"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
          className="flex-1 border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={addSkill}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 rounded-xl flex items-center gap-2"
        >
          <Plus size={18} />
          Add
        </button>

      </div>

      <div className="flex flex-wrap gap-3 mt-8">

        {skills.map((item, index) => (

          <div
            key={index}
            className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full flex items-center gap-2"
          >
            {item}

            <button
              onClick={() => removeSkill(index)}
            >
              <X size={16} />
            </button>

          </div>

        ))}

      </div>

      

    </div>
  );
};

export default SkillsCard;