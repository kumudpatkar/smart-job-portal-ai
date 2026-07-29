import { evaluateInterviewAnswer } from "../ai/interviewEvaluator.js";

// =========================================
// AI Interview Evaluation
// =========================================
export const evaluateAnswer = async (req, res) => {

  try {

    const { question, answer } = req.body;

    if (!question || !answer) {
      return res.status(400).json({
        success: false,
        message: "Question and Answer are required",
      });
    }

    const result = await evaluateInterviewAnswer(
      question,
      answer
    );

    res.status(200).json({
      success: true,
      result,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};