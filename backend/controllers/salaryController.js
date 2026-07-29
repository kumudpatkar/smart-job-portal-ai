import { predictSalary } from "../ai/salaryPredictor.js";

// =========================================
// AI Salary Predictor
// =========================================
export const getSalaryPrediction = async (req, res) => {
  try {

    const {
      role,
      experience,
      skills,
    } = req.body;

    if (!role || !experience || !skills) {
      return res.status(400).json({
        success: false,
        message: "Please provide role, experience and skills",
      });
    }

    const prediction = await predictSalary(
      role,
      experience,
      skills
    );

    res.status(200).json({
      success: true,
      prediction,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};