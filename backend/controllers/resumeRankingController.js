import Resume from "../models/Resume.js";
import Job from "../models/Job.js";
import { rankResume } from "../ai/resumeRankingAI.js";

/*
====================================================
Rank Resume Against One Job
POST /api/resume-ranking
====================================================
*/

export const rankSingleResume = async (req, res) => {
  try {
    const { resumeId, jobId } = req.body;

    if (!resumeId || !jobId) {
      return res.status(400).json({
        success: false,
        message: "resumeId and jobId are required",
      });
    }

    const resume = await Resume.findById(resumeId);

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    const resumeText =
      resume.resumeText ||
      resume.content ||
      resume.summary ||
      "";

    const jobDescription =
      job.description ||
      job.jobDescription ||
      "";

      const ranking = await rankResume(jobDescription, resumeText);
    

    return res.status(200).json({
      success: true,
      ranking,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


/*
====================================================
Rank ALL Resumes for One Job
GET /api/resume-ranking/job/:jobId
====================================================
*/

export const rankAllResumes = async (req, res) => {

  try {

    const { jobId } = req.params;

    const job = await Job.findById(jobId);

    if (!job) {

      return res.status(404).json({

        success: false,

        message: "Job not found",

      });

    }

    const resumes = await Resume.find();

    const result = resumes.map((resume) => {

      const resumeText =
        resume.resumeText ||
        resume.content ||
        resume.summary ||
        "";

      const ranking = rankResume(
        job.description || "",
        resumeText
      );

      return {

        resumeId: resume._id,

        candidateName:
          resume.fullName ||
          resume.name ||
          "Unknown",

        email:
          resume.email ||
          "",

        score: ranking.atsScore,

        level: ranking.level,

        matchedSkills:
          ranking.matchedSkills,

        missingSkills:
          ranking.missingSkills,

      };

    });

    result.sort((a, b) => b.score - a.score);

    res.status(200).json({

      success: true,

      totalCandidates: result.length,

      ranking: result,

    });

  }

  catch (error) {

    console.error(error);

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};