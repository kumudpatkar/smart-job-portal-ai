import Resume from "../models/Resume.js";
import Job from "../models/Job.js";
import { generateCoverLetter } from "../ai/coverLetterGenerator.js";

// =========================================
// Generate AI Cover Letter
// =========================================
export const generateJobCoverLetter = async (req, res) => {
  try {

    // Get logged-in user's resume
    const resume = await Resume.findOne({
      user: req.user._id,
    });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    // Get selected job
    const job = await Job.findById(req.params.id).populate("company");

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    // Generate Cover Letter
    const coverLetter = await generateCoverLetter(
      resume.extractedText,
      job
    );

    res.status(200).json({
      success: true,
      coverLetter,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};