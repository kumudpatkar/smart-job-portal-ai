import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import API from "../services/api";
import ResumePreview from "../components/ResumePreview";


function ResumeBuilder() {
  const [resume, setResume] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    summary: "",
    skills: "",
    education: "",
    experience: "",
    projects: "",
    certifications: "",
  });

  useEffect(() => {
    loadResume();
  }, []);

  const loadResume = async () => {
    try {
      const res = await API.get("/resume-builder/me");

      if (res.data.resume) {
        setResume({
          fullName: res.data.resume.fullName || "",
          email: res.data.resume.email || "",
          phone: res.data.resume.phone || "",
          location: res.data.resume.location || "",
          summary: res.data.resume.summary || "",
          skills: (res.data.resume.skills || []).join(", "),
          education: (res.data.resume.education || []).join("\n"),
          experience: (res.data.resume.experience || []).join("\n"),
          projects: (res.data.resume.projects || []).join("\n"),
          certifications: (res.data.resume.certifications || []).join("\n"),
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setResume({
      ...resume,
      [e.target.name]: e.target.value,
    });
  };

  const saveResume = async () => {
    try {
      await API.post("/resume-builder/save", {
        ...resume,
        skills: resume.skills
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),

        education: resume.education
          .split("\n")
          .filter(Boolean),

        experience: resume.experience
          .split("\n")
          .filter(Boolean),

        projects: resume.projects
          .split("\n")
          .filter(Boolean),

        certifications: resume.certifications
          .split("\n")
          .filter(Boolean),
      });

      alert("Resume Saved Successfully");
    } catch (err) {
      console.log(err);
      alert("Save Failed");
    }
  };

  // ------------------------
  // Download Resume PDF
  // ------------------------

  const downloadPDF = async () => {
  try {

    const response = await API.get(
      "/resume-pdf/download",
      {
        responseType: "blob",
      }
    );

    const file = new Blob([response.data], {
      type: "application/pdf",
    });

    const fileURL = window.URL.createObjectURL(file);

    const link = document.createElement("a");

    link.href = fileURL;

    link.download = "Resume.pdf";

    document.body.appendChild(link);

    link.click();

    link.remove();

    window.URL.revokeObjectURL(fileURL);

  } catch (error) {

    console.log(error);

    alert("Failed to download PDF");

  }
};

  return (
    <DashboardLayout>
      <h1 className="text-4xl font-bold mb-8">
        AI Resume Builder
      </h1>

      <div className="bg-white rounded-2xl shadow-xl p-8">

        <div className="grid md:grid-cols-2 gap-5">

          <input
            name="fullName"
            placeholder="Full Name"
            value={resume.fullName}
            onChange={handleChange}
            className="border rounded-lg p-3"
          />

          <input
            name="email"
            placeholder="Email"
            value={resume.email}
            onChange={handleChange}
            className="border rounded-lg p-3"
          />

          <input
            name="phone"
            placeholder="Phone"
            value={resume.phone}
            onChange={handleChange}
            className="border rounded-lg p-3"
          />

          <input
            name="location"
            placeholder="Location"
            value={resume.location}
            onChange={handleChange}
            className="border rounded-lg p-3"
          />

        </div>

        <textarea
          name="summary"
          placeholder="Professional Summary"
          rows={4}
          value={resume.summary}
          onChange={handleChange}
          className="border rounded-lg p-3 w-full mt-5"
        />

        <textarea
          name="skills"
          placeholder="Skills (comma separated)"
          rows={3}
          value={resume.skills}
          onChange={handleChange}
          className="border rounded-lg p-3 w-full mt-5"
        />

        <textarea
          name="education"
          placeholder="Education (one per line)"
          rows={4}
          value={resume.education}
          onChange={handleChange}
          className="border rounded-lg p-3 w-full mt-5"
        />

        <textarea
          name="experience"
          placeholder="Experience (one per line)"
          rows={4}
          value={resume.experience}
          onChange={handleChange}
          className="border rounded-lg p-3 w-full mt-5"
        />

        <textarea
          name="projects"
          placeholder="Projects (one per line)"
          rows={4}
          value={resume.projects}
          onChange={handleChange}
          className="border rounded-lg p-3 w-full mt-5"
        />

        <textarea
          name="certifications"
          placeholder="Certifications (one per line)"
          rows={4}
          value={resume.certifications}
          onChange={handleChange}
          className="border rounded-lg p-3 w-full mt-5"
        />

        <div className="flex gap-5 mt-8">

          <button
            onClick={saveResume}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl"
          >
            💾 Save Resume
          </button>

          <button
            onClick={downloadPDF}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl"
          >
            📄 Download PDF
          </button>

        </div>

      </div>
    </DashboardLayout>
  );
}

export default ResumeBuilder;