const fs = require("fs");
const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");

/**
 * POST /api/rewrite-resume
 */

const rewriteResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Resume file is required",
      });
    }

    const filePath = req.file.path;
    const extension = req.file.originalname
      .split(".")
      .pop()
      .toLowerCase();

    let extractedText = "";

    // PDF
    if (extension === "pdf") {
      const buffer = fs.readFileSync(filePath);

      const pdf = await pdfParse(buffer);

      extractedText = pdf.text;
    }

    // DOCX
    else if (extension === "docx") {
      const result = await mammoth.extractRawText({
        path: filePath,
      });

      extractedText = result.value;
    }

    else {
      fs.unlinkSync(filePath);

      return res.status(400).json({
        success: false,
        message: "Only PDF and DOCX are supported",
      });
    }

    // Delete uploaded file
    fs.unlinkSync(filePath);

    // Temporary response
    // AI integration will be added in the next step.

    return res.json({
      success: true,

      original_resume: extractedText,

      rewritten_resume:
        "AI rewritten resume will appear here in the next step.",

      before_score: 58,

      after_score: 92,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  rewriteResume,
};