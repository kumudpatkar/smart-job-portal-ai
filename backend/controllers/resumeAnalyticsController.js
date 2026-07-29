import Resume from "../models/Resume.js";

// =========================================
// Resume Dashboard Analytics
// =========================================
export const getResumeAnalytics = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      user: req.user._id,
    });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    const dashboard = {
      atsScore: resume.atsScore,

      totalSkills: resume.skills.length,

      totalProjects: resume.projects.length,

      totalExperience: resume.experience.length,

      totalEducation: resume.education.length,

      totalCertifications: resume.certifications.length,

      totalMissingSkills: resume.missingSkills.length,

      summary: resume.summary,

      suggestions: resume.suggestions,
    };

    res.status(200).json({
      success: true,
      dashboard,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// =========================================
// Resume Chart Analytics
// =========================================
export const getResumeChartAnalytics = async (req, res) => {
  try {

    const resume = await Resume.findOne({
      user: req.user._id,
    });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    const chart = {
      atsScore: resume.atsScore,

      skills: resume.skills.length,

      projects: resume.projects.length,

      experience: resume.experience.length,

      education: resume.education.length,

      certifications: resume.certifications.length,

      missingSkills: resume.missingSkills.length,
    };

    res.status(200).json({
      success: true,
      chart,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};