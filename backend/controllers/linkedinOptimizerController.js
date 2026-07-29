import { optimizeLinkedIn } from "../ai/linkedinOptimizerAI.js";

export const linkedinOptimizerController = async (req, res) => {
  try {
    const {
      headline,
      about,
      experience,
      skills,
      education,
    } = req.body;

    const profile = {
      headline,
      about,
      experience,
      skills,
      education,
    };

    const result = await optimizeLinkedIn(profile);

    return res.status(200).json({
      success: true,
      ...result,
    });

  } catch (error) {
    console.error("LinkedIn Optimizer Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};