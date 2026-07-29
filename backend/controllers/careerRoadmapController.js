import Resume from "../models/Resume.js";
import { generateCareerRoadmap } from "../ai/careerRoadmap.js";

// =========================================
// AI Career Roadmap Generator
// =========================================
export const getCareerRoadmap = async (req, res) => {
  try {

    const { goal } = req.body;

    if (!goal) {
      return res.status(400).json({
        success: false,
        message: "Career goal is required",
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

    const roadmap = await generateCareerRoadmap(
      resume.extractedText,
      goal
    );

    res.status(200).json({
      success: true,
      roadmap,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};