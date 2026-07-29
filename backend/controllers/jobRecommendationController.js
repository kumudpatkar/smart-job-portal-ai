import Job from "../models/Job.js";
import User from "../models/User.js";
import { recommendJobs } from "../ai/jobRecommendationAI.js";

/*
==================================================
AI Job Recommendation
GET /api/job-recommendation
==================================================
*/

export const getRecommendedJobs = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get logged in user
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Fetch jobs
    const jobs = await Job.find().lean();

    if (!jobs.length) {
      return res.status(200).json({
        success: true,
        jobs: [],
      });
    }

    const recommendations = [];

    for (const job of jobs) {
      const aiResult = await recommendJobs(user, job);

      recommendations.push({
        ...job,
        matchScore: aiResult.matchScore,
        missingSkills: aiResult.missingSkills,
        strengths: aiResult.strengths,
        reason: aiResult.reason,
      });
    }

    recommendations.sort(
      (a, b) => b.matchScore - a.matchScore
    );

    return res.status(200).json({
      success: true,
      total: recommendations.length,
      jobs: recommendations,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};