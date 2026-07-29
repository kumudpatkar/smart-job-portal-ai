import Resume from "../models/Resume.js";
import { askCareerAssistant } from "../ai/careerAssistant.js";

// =========================================
// AI Career Assistant
// =========================================
export const chatWithAssistant = async (req, res) => {
  try {

    const { question } = req.body;

    if (!question) {
      return res.status(400).json({
        success: false,
        message: "Question is required",
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

    const answer = await askCareerAssistant(
      resume.extractedText,
      question
    );

    res.status(200).json({
      success: true,
      answer,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};