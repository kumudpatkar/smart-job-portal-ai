import {
  FileText,
  Search,
  GraduationCap,
  Briefcase,
  CheckCircle,
} from "lucide-react";

function ProgressBar({ title, value, color }) {
  return (
    <div className="mb-6">

      <div className="flex justify-between mb-2">

        <span className="font-semibold">
          {title}
        </span>

        <span className="font-bold">
          {value}%
        </span>

      </div>

      <div className="w-full h-3 bg-gray-200 rounded-full">

        <div
          className={`h-3 rounded-full ${color}`}
          style={{
            width: `${value}%`,
          }}
        />

      </div>

    </div>
  );
}

function ATSBreakdown({
  formatting = 85,
  keywords = 70,
  skills = 90,
  experience = 75,
  education = 95,
}) {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-8">

      <h2 className="text-2xl font-bold mb-8">
        ATS Breakdown
      </h2>

      <ProgressBar
        title="Formatting"
        value={formatting}
        color="bg-blue-600"
      />

      <ProgressBar
        title="Keywords"
        value={keywords}
        color="bg-green-600"
      />

      <ProgressBar
        title="Skills"
        value={skills}
        color="bg-purple-600"
      />

      <ProgressBar
        title="Experience"
        value={experience}
        color="bg-orange-500"
      />

      <ProgressBar
        title="Education"
        value={education}
        color="bg-pink-600"
      />

      <div className="grid grid-cols-2 md:grid-cols-5 gap-5 mt-10">

        <div className="text-center">
          <FileText
            className="mx-auto text-blue-600"
            size={35}
          />
          <p className="mt-3 font-semibold">
            Formatting
          </p>
        </div>

        <div className="text-center">
          <Search
            className="mx-auto text-green-600"
            size={35}
          />
          <p className="mt-3 font-semibold">
            Keywords
          </p>
        </div>

        <div className="text-center">
          <CheckCircle
            className="mx-auto text-purple-600"
            size={35}
          />
          <p className="mt-3 font-semibold">
            Skills
          </p>
        </div>

        <div className="text-center">
          <Briefcase
            className="mx-auto text-orange-600"
            size={35}
          />
          <p className="mt-3 font-semibold">
            Experience
          </p>
        </div>

        <div className="text-center">
          <GraduationCap
            className="mx-auto text-pink-600"
            size={35}
          />
          <p className="mt-3 font-semibold">
            Education
          </p>
        </div>

      </div>

    </div>
  );
}

export default ATSBreakdown;