

import { rewriteResume } from "../ai/resumeRewriteAI.js";

import { checkATS } from "../ai/atsAI.js";

/*
====================================================
Rewrite Resume using AI
POST /api/resume-rewrite
====================================================
*/

export const rewriteResumeController = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a resume.",
      });
    }

    const filePath = req.file.path;
    const extension = req.file.originalname
      .split(".")
      .pop()
      .toLowerCase();

    let resumeText = "";

    // Read PDF
    if (extension === "pdf") {
      const buffer = fs.readFileSync(filePath);

      const pdf = await pdfParse(buffer);

      resumeText = pdf.text;
    }

    // Read DOCX
    else if (extension === "docx") {
      const result = await mammoth.extractRawText({
        path: filePath,
      });

      resumeText = result.value;
    }

    // Unsupported file
    else {
      fs.unlinkSync(filePath);

      return res.status(400).json({
        success: false,
        message: "Only PDF and DOCX files are supported.",
      });
    }

    // Delete uploaded file after extraction
    fs.unlinkSync(filePath);

    const targetRole =
      req.body.targetRole || "Software Engineer";

    // Call your existing AI function
    const atsBefore = await checkATS(
  resumeText,
  targetRole
);


const rewrittenResume = await rewriteResume(
  resumeText,
  targetRole
);


const atsAfter = await checkATS(
  rewrittenResume,
  targetRole
);

    return res.status(200).json({

  success: true,

  original_resume: resumeText,

  rewritten_resume: rewrittenResume,

  before_score: atsBefore.score,

  after_score: atsAfter.score,

  before_analysis: atsBefore,

  after_analysis: atsAfter,

});

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};