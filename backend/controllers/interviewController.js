import Resume from "../models/Resume.js";
import Job from "../models/Job.js";
import { generateInterviewQuestions } from "../ai/interviewGenerator.js";

// =========================================
// Generate AI Interview Questions
// =========================================
export const getInterviewQuestions = async (req, res) => {
  try {

    // Find logged-in user's resume
    const resume = await Resume.findOne({
      user: req.user._id,
    });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    // Find selected job
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    // Generate Interview Questions
    const questions = await generateInterviewQuestions(
      resume.extractedText,
      job
    );

    res.status(200).json({
      success: true,
      questions,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};