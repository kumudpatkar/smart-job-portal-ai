import InterviewHistory from "../models/InterviewHistory.js";

export const getAnalytics = async (req, res) => {
  try {

    const interviews = await InterviewHistory.find({
      user: req.user._id,
    });

    const totalInterviews = interviews.length;

    const averageScore =
      totalInterviews > 0
        ? (
            interviews.reduce(
              (sum, item) => sum + item.overallScore,
              0
            ) / totalInterviews
          ).toFixed(1)
        : 0;

    const bestInterview =
      interviews.length > 0
        ? Math.max(
            ...interviews.map((i) => i.overallScore)
          )
        : 0;

    const recent = interviews
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice(0, 5);

    res.json({
      success: true,
      totalInterviews,
      averageScore,
      bestInterview,
      recent,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};