import InterviewHistory from "../models/InterviewHistory.js";

// Get all interview history of logged-in user
export const getInterviewHistory = async (req, res) => {
  try {

    const interviews = await InterviewHistory.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      interviews,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};