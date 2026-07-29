import { generateInterviewReport } from "../ai/interviewReportAI.js";

/*
========================================================
Generate AI Interview Report
POST /api/interview-report
========================================================
*/

export const generateInterviewReportController = async (req, res) => {
  try {
    const {
      interviewType,
      candidateName,
      jobRole,
      questions,
      answers,
      code,
      duration,
      transcript,
    } = req.body;

    if (!jobRole) {
      return res.status(400).json({
        success: false,
        message: "Job role is required.",
      });
    }

    const interviewData = {
      interviewType: interviewType || "Mock Interview",
      candidateName: candidateName || "Candidate",
      jobRole,
      questions: questions || [],
      answers: answers || [],
      code: code || "",
      duration: duration || "",
      transcript: transcript || "",
    };

    const report = await generateInterviewReport(interviewData);

    return res.status(200).json({
      success: true,
      report,
    });

  } catch (error) {
    console.error("Interview Report Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to generate interview report.",
    });
  }
};