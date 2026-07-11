const ResumePreview = ({ resume }) => {
  return (
    <div className="bg-white shadow-2xl rounded-2xl p-10 min-h-[900px] border border-gray-200 sticky top-5 overflow-y-auto">

      {/* Header */}
      <div className="border-b-2 border-blue-600 pb-5 mb-6">

        <h1 className="text-4xl font-bold text-blue-700">
          {resume.fullName || "Your Name"}
        </h1>

        <div className="mt-3 space-y-1 text-gray-600">

          <p>{resume.email || "Email"}</p>

          <p>{resume.phone || "Phone Number"}</p>

          <p>{resume.location || "Location"}</p>

        </div>

      </div>

      {/* Summary */}

      <section className="mb-8">

        <h2 className="text-xl font-bold text-blue-700 border-b pb-2">
          Professional Summary
        </h2>

        <p className="mt-3 text-gray-700 whitespace-pre-wrap">
          {resume.summary || "Write your professional summary here..."}
        </p>

      </section>

      {/* Skills */}

      <section className="mb-8">

        <h2 className="text-xl font-bold text-blue-700 border-b pb-2">
          Skills
        </h2>

        <div className="flex flex-wrap gap-2 mt-4">

          {resume.skills
            ?.split(",")
            .filter((skill) => skill.trim() !== "")
            .map((skill, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
              >
                {skill.trim()}
              </span>
            ))}

        </div>

      </section>

      {/* Education */}

      <section className="mb-8">

        <h2 className="text-xl font-bold text-blue-700 border-b pb-2">
          Education
        </h2>

        <div className="mt-3 space-y-2">

          {resume.education
            ?.split("\n")
            .filter((item) => item.trim() !== "")
            .map((item, index) => (
              <p key={index} className="text-gray-700">
                • {item}
              </p>
            ))}

        </div>

      </section>

      {/* Experience */}

      <section className="mb-8">

        <h2 className="text-xl font-bold text-blue-700 border-b pb-2">
          Experience
        </h2>

        <div className="mt-3 space-y-2">

          {resume.experience
            ?.split("\n")
            .filter((item) => item.trim() !== "")
            .map((item, index) => (
              <p key={index} className="text-gray-700">
                • {item}
              </p>
            ))}

        </div>

      </section>

      {/* Projects */}

      <section className="mb-8">

        <h2 className="text-xl font-bold text-blue-700 border-b pb-2">
          Projects
        </h2>

        <div className="mt-3 space-y-2">

          {resume.projects
            ?.split("\n")
            .filter((item) => item.trim() !== "")
            .map((item, index) => (
              <p key={index} className="text-gray-700">
                • {item}
              </p>
            ))}

        </div>

      </section>

      {/* Certifications */}

      <section>

        <h2 className="text-xl font-bold text-blue-700 border-b pb-2">
          Certifications
        </h2>

        <div className="mt-3 space-y-2">

          {resume.certifications
            ?.split("\n")
            .filter((item) => item.trim() !== "")
            .map((item, index) => (
              <p key={index} className="text-gray-700">
                • {item}
              </p>
            ))}

        </div>

      </section>

    </div>
  );
};

export default ResumePreview;