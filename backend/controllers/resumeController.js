import Resume from "../models/Resume.js";
import { parseResume } from "../ai/resumeParser.js";
import { rankResume } from "../ai/resumeRankingAI.js";

// =========================================
// Upload Resume
// =========================================
export const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a resume",
      });
    }

    const existingResume = await Resume.findOne({
      user: req.user._id,
    });

    // Parse Resume using AI
    const aiData = await parseResume(req.file.path);

    if (existingResume) {
      existingResume.resumeUrl = req.file.path;
      existingResume.fileName = req.file.originalname;

      existingResume.extractedText = aiData.extractedText;
      existingResume.summary = aiData.summary;
      existingResume.atsScore = aiData.atsScore;

      existingResume.skills = aiData.skills;
      existingResume.education = aiData.education;
      existingResume.experience = aiData.experience;
      existingResume.projects = aiData.projects;
      existingResume.certifications = aiData.certifications;

      existingResume.missingSkills = aiData.missingSkills;
      existingResume.suggestions = aiData.suggestions;

      existingResume.analyzedAt = new Date();

      await existingResume.save();

      return res.status(200).json({
        success: true,
        message: "Resume updated successfully",
        resume: existingResume,
      });
    }

    const resume = await Resume.create({
      user: req.user._id,

      resumeUrl: req.file.path,
      fileName: req.file.originalname,

      extractedText: aiData.extractedText,
      summary: aiData.summary,
      atsScore: aiData.atsScore,

      skills: aiData.skills,
      education: aiData.education,
      experience: aiData.experience,
      projects: aiData.projects,
      certifications: aiData.certifications,

      missingSkills: aiData.missingSkills,
      suggestions: aiData.suggestions,

      analyzedAt: new Date(),
    });

    res.status(201).json({
      success: true,
      message: "Resume uploaded successfully",
      resume,
    });
  } catch (error) {
    console.error("========== FULL ERROR ==========");
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================================
// Get Logged-in User Resume
// =========================================
export const getResume = async (req, res) => {
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

    res.status(200).json({
      success: true,
      resume,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================================
// Delete Resume
// =========================================
export const deleteResume = async (req, res) => {
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

    await resume.deleteOne();

    res.status(200).json({
      success: true,
      message: "Resume deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};