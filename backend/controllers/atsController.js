import Resume from "../models/Resume.js";
import { checkATS } from "../ai/atsChecker.js";

// ======================================
// AI ATS Resume Checker
// ======================================

export const atsChecker = async (req, res) => {

  try {

    const { jobRole } = req.body;

    if (!jobRole) {

      return res.status(400).json({
        success: false,
        message: "Job role is required",
      });

    }

    const resume = await Resume.findOne({
      user: req.user._id,
    });

    if (!resume) {

      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });

    }

    if (!resume.extractedText) {

      return res.status(400).json({
        success: false,
        message: "Resume text not found. Please upload your resume again.",
      });

    }

    const analysis = await checkATS(
      resume.extractedText,
      jobRole
    );

    res.status(200).json({

      success: true,

      score: analysis.score,

      matchingSkills: analysis.matchingSkills,

      missingSkills: analysis.missingSkills,

      suggestions: analysis.suggestions,

      feedback: analysis.feedback,

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};