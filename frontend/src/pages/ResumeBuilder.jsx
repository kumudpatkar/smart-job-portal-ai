import { User, GraduationCap, Briefcase, Code, FileDown } from "lucide-react";

export default function ResumeBuilder() {
  return (
    <div className="p-8">

      <h1 className="text-4xl font-bold mb-2">
        Resume Builder
      </h1>

      <p className="text-gray-500 mb-8">
        Build your professional resume in minutes.
      </p>

      <div className="grid lg:grid-cols-2 gap-8">

        {/* Personal Information */}

        <div className="bg-white rounded-2xl shadow p-6">

          <h2 className="flex items-center gap-2 text-2xl font-bold mb-6">
            <User />
            Personal Information
          </h2>

          <input
            className="w-full border rounded-lg p-3 mb-4"
            placeholder="Full Name"
          />

          <input
            className="w-full border rounded-lg p-3 mb-4"
            placeholder="Email"
          />

          <input
            className="w-full border rounded-lg p-3 mb-4"
            placeholder="Phone Number"
          />

          <input
            className="w-full border rounded-lg p-3"
            placeholder="Address"
          />

        </div>

        {/* Education */}

        <div className="bg-white rounded-2xl shadow p-6">

          <h2 className="flex items-center gap-2 text-2xl font-bold mb-6">
            <GraduationCap />
            Education
          </h2>

          <input
            className="w-full border rounded-lg p-3 mb-4"
            placeholder="College"
          />

          <input
            className="w-full border rounded-lg p-3 mb-4"
            placeholder="Degree"
          />

          <input
            className="w-full border rounded-lg p-3"
            placeholder="CGPA"
          />

        </div>

        {/* Experience */}

        <div className="bg-white rounded-2xl shadow p-6">

          <h2 className="flex items-center gap-2 text-2xl font-bold mb-6">
            <Briefcase />
            Experience
          </h2>

          <textarea
            rows="6"
            className="w-full border rounded-lg p-3"
            placeholder="Write your internship or work experience..."
          />

        </div>

        {/* Skills */}

        <div className="bg-white rounded-2xl shadow p-6">

          <h2 className="flex items-center gap-2 text-2xl font-bold mb-6">
            <Code />
            Skills
          </h2>

          <textarea
            rows="6"
            className="w-full border rounded-lg p-3"
            placeholder="Java, Python, React, SQL..."
          />

        </div>

      </div>

      <div className="mt-8 flex gap-4">

        <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold">
          Save Resume
        </button>

        <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl flex items-center gap-2 font-semibold">
          <FileDown size={20} />
          Download PDF
        </button>

      </div>

    </div>
  );
}