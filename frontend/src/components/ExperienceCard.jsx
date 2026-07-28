import { Briefcase, Calendar } from "lucide-react";

const ExperienceCard = () => {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-8">

      <h2 className="text-2xl font-bold text-slate-800 mb-8">
        Work Experience
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        {/* Company */}

        <div>
          <label className="flex items-center gap-2 mb-2 font-medium text-slate-600">
            <Briefcase size={18} />
            Company
          </label>

          <input
            type="text"
            placeholder="Google"
            className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Position */}

        <div>
          <label className="flex items-center gap-2 mb-2 font-medium text-slate-600">
            <Briefcase size={18} />
            Job Title
          </label>

          <input
            type="text"
            placeholder="Software Engineer"
            className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Start */}

        <div>
          <label className="flex items-center gap-2 mb-2 font-medium text-slate-600">
            <Calendar size={18} />
            Start Date
          </label>

          <input
            type="date"
            className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* End */}

        <div>
          <label className="flex items-center gap-2 mb-2 font-medium text-slate-600">
            <Calendar size={18} />
            End Date
          </label>

          <input
            type="date"
            className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

      </div>

      {/* Description */}

      <div className="mt-6">

        <label className="block mb-2 font-medium text-slate-600">
          Description
        </label>

        <textarea
          rows="5"
          placeholder="Describe your work experience..."
          className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        />

      </div>

      

    </div>
  );
};

export default ExperienceCard;