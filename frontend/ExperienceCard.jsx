import { useState } from "react";
import {
  Building2,
  Briefcase,
  Calendar,
  FileText,
  Plus,
  Trash2,
} from "lucide-react";

const ExperienceCard = () => {
  const [experiences, setExperiences] = useState([
    {
      company: "",
      role: "",
      start: "",
      end: "",
      description: "",
    },
  ]);

  const handleChange = (index, field, value) => {
    const updated = [...experiences];
    updated[index][field] = value;
    setExperiences(updated);
  };

  const addExperience = () => {
    setExperiences([
      ...experiences,
      {
        company: "",
        role: "",
        start: "",
        end: "",
        description: "",
      },
    ]);
  };

  const removeExperience = (index) => {
    const updated = experiences.filter((_, i) => i !== index);
    setExperiences(updated);
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg p-8">

      <div className="flex justify-between items-center mb-8">

        <h2 className="text-2xl font-bold text-slate-800">
          Work Experience
        </h2>

        <button
          onClick={addExperience}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-3 rounded-xl hover:scale-105 transition"
        >
          <Plus size={18} />
          Add Experience
        </button>

      </div>

      {experiences.map((exp, index) => (

        <div
          key={index}
          className="border rounded-2xl p-6 mb-8 relative"
        >

          {experiences.length > 1 && (

            <button
              onClick={() => removeExperience(index)}
              className="absolute top-5 right-5 text-red-500 hover:text-red-700"
            >
              <Trash2 size={20} />
            </button>

          )}

          <div className="grid md:grid-cols-2 gap-6">

            <div>

              <label className="flex items-center gap-2 mb-2 font-medium">
                <Building2 size={18} />
                Company Name
              </label>

              <input
                type="text"
                value={exp.company}
                onChange={(e) =>
                  handleChange(
                    index,
                    "company",
                    e.target.value
                  )
                }
                placeholder="Google"
                className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />

            </div>

            <div>

              <label className="flex items-center gap-2 mb-2 font-medium">
                <Briefcase size={18} />
                Job Role
              </label>

              <input
                type="text"
                value={exp.role}
                onChange={(e) =>
                  handleChange(
                    index,
                    "role",
                    e.target.value
                  )
                }
                placeholder="Software Engineer"
                className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />

            </div>

            <div>

              <label className="flex items-center gap-2 mb-2 font-medium">
                <Calendar size={18} />
                Start Date
              </label>

              <input
                type="date"
                value={exp.start}
                onChange={(e) =>
                  handleChange(
                    index,
                    "start",
                    e.target.value
                  )
                }
                className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />

            </div>

            <div>

              <label className="flex items-center gap-2 mb-2 font-medium">
                <Calendar size={18} />
                End Date
              </label>

              <input
                type="date"
                value={exp.end}
                onChange={(e) =>
                  handleChange(
                    index,
                    "end",
                    e.target.value
                  )
                }
                className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />

            </div>

          </div>

          <div className="mt-6">

            <label className="flex items-center gap-2 mb-2 font-medium">
              <FileText size={18} />
              Job Description
            </label>

            <textarea
              rows="4"
              value={exp.description}
              onChange={(e) =>
                handleChange(
                  index,
                  "description",
                  e.target.value
                )
              }
              placeholder="Describe your responsibilities..."
              className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            ></textarea>

          </div>

        </div>

      ))}

      <button
        className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-3 rounded-xl font-semibold hover:scale-105 transition shadow-lg"
      >
        Save Experience
      </button>

    </div>
  );
};

export default ExperienceCard;