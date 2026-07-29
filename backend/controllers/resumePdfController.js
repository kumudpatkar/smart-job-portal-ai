import ResumeBuilder from "../models/ResumeBuilder.js";
import { generateResumePDF } from "../utils/resumePdfGenerator.js";

// ==========================================
// Download Resume PDF
// ==========================================
export const downloadResumePDF = async (req, res) => {

  try {

    const resume = await ResumeBuilder.findOne({
      user: req.user._id,
    });

    if (!resume) {

      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });

    }

    generateResumePDF(resume, res);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};