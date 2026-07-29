import Resume from "../models/Resume.js";
import Job from "../models/Job.js";
import { matchResumeWithJob } from "../ai/jobMatcher.js";

// =========================================
// Match Resume With Job
// =========================================
export const matchJob = async (req, res) => {
  try {

    // Logged-in user's resume
    const resume = await Resume.findOne({
      user: req.user._id,
    });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    // Job from URL
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    // AI Matching
    const match = await matchResumeWithJob(
      resume.extractedText,
      job
    );

    res.status(200).json({
      success: true,
      match,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};