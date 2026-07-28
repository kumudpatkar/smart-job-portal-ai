import { useState } from "react";
import API from "../services/api";
import AnimatedPage from "../components/AnimatedPage";

import UploadResume from "../components/resume/UploadResume";
import ATSScoreGauge from "../components/resume/ATSScoreGauge";
import SkillsCard from "../components/resume/SkillsCard";
import SummaryCard from "../components/resume/SummaryCard";
import SuggestionsCard from "../components/resume/SuggestionsCard";
import MissingSkillsCard from "../components/resume/MissingSkillsCard";
import ATSBreakdown from "../components/resume/ATSBreakdown";
import SkillChart from "../components/resume/SkillChart";
import ResumeRadarChart from "../components/resume/ResumeRadarChart";
import ResumePreview from "../components/resume/ResumePreview";

const ResumeAnalyzer = () => {
  const [file, setFile] = useState(null);
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);

  const uploadResume = async () => {
    if (!file) {
      alert("Please upload a PDF or DOCX resume.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    try {
      setLoading(true);

      const { data } = await API.post(
        "/resume/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Backend may return either { resume } or the object directly
      setResume(data.resume || data);
    } catch (error) {
      console.error(error);
      alert("Resume upload failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatedPage>
      <div className="max-w-7xl mx-auto p-8">

        {/* Heading */}
        <div className="mb-10">
          <h1 className="text-5xl font-bold">
            AI Resume Analyzer
          </h1>

          <p className="text-gray-500 mt-3">
            Upload your resume and receive a complete AI-powered ATS analysis.
          </p>
        </div>

        {/* Upload Component */}
        <UploadResume
          onFileSelect={(selectedFile) => {
            setFile(selectedFile);
            setResume(null);
          }}
        />

        {/* Analyze Button */}
        {file && (
          <div className="mt-8">
            <button
              onClick={uploadResume}
              disabled={loading}
              className={`px-10 py-4 rounded-2xl text-lg font-semibold text-white transition-all ${
                loading
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading
                ? "Analyzing Resume..."
                : "Analyze Resume"}
            </button>
          </div>
        )}

        

        {/* Results */}
        {resume && (
          <div className="mt-12 space-y-8">

            {/* Top Cards */}
            <div className="grid md:grid-cols-2 gap-6">
              <ATSScoreGauge score={resume.atsScore} />
              <ATSBreakdown

              
  formatting={resume.formattingScore || 85}
  keywords={resume.keywordScore || 72}
  skills={resume.skillScore || 90}
  experience={resume.experienceScore || 75}
  education={resume.educationScore || 95}
/>
<SkillChart
    skills={resume.skills}
/>

<ResumeRadarChart
  communication={resume.communicationScore || 80}
  technical={resume.technicalScore || 92}
  projects={resume.projectScore || 86}
  education={resume.educationScore || 90}
  experience={resume.experienceScore || 72}
  leadership={resume.leadershipScore || 78}
/>
              <SkillsCard
                skills={resume.skills || []}
              />
            </div>

            {/* Summary */}
            <SummaryCard
              summary={
                resume.summary ||
                "No summary available."
              }
            />

            {/* Suggestions */}
            <SuggestionsCard
              suggestions={
                resume.suggestions || []
              }
            />

            {/* Missing Skills */}
            <MissingSkillsCard
              skills={
                resume.missingSkills || []
              }
            />

            <ResumePreview
  resumeText={resume.resumeText || ""}
  foundKeywords={resume.skills || []}
  missingKeywords={resume.missingSkills || []}
/>

          </div>
        )}

      </div>
    </AnimatedPage>
  );
};

export default ResumeAnalyzer;