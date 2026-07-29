import {
  generateCodingQuestion,
} from "../ai/codingInterviewGenerator.js";

import {
  evaluateCodingAnswer,
} from "../ai/codingEvaluator.js";

// =======================================
// Generate Coding Question
// =======================================

export const getCodingQuestion = async (
  req,
  res
) => {

  try {

    const {
      language,
      difficulty,
      topic,
    } = req.body;

    const question =
      await generateCodingQuestion(
        language,
        difficulty,
        topic
      );

    res.status(200).json({

      success: true,

      question,

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};

// =======================================
// Evaluate Code
// =======================================

export const evaluateCode = async (
  req,
  res
) => {

  try {

    const {
      question,
      language,
      code,
    } = req.body;

    const result =
      await evaluateCodingAnswer(

        question,

        language,

        code

      );

    res.status(200).json({

      success: true,

      result,

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};