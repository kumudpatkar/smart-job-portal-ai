import { generatePortfolio } from "../ai/portfolioGeneratorAI.js";

export const portfolioGeneratorController = async (req, res) => {
  try {
    const { resumeText } = req.body;

    if (!resumeText) {
      return res.status(400).json({
        success: false,
        message: "Resume text is required.",
      });
    }

    const portfolio = await generatePortfolio(resumeText);

    return res.status(200).json({
      success: true,
      portfolio,
    });

  } catch (error) {
    console.error("Portfolio Generator Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};