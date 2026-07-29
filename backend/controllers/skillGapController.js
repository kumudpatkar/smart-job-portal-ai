import Resume from "../models/Resume.js";
import { analyzeSkillGap } from "../ai/skillGapAnalyzer.js";

// =========================================
// AI Skill Gap Analyzer
// =========================================
export const getSkillGap = async (req, res) => {
  try {

    const { targetRole } = req.body;

    if (!targetRole) {
      return res.status(400).json({
        success: false,
        message: "Target role is required",
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

    const analysis = await analyzeSkillGap(
      resume.extractedText,
      targetRole
    );

    res.status(200).json({
      success: true,
      analysis,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};