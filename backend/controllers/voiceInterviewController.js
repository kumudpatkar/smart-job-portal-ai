import { evaluateVoiceInterview } from "../ai/voiceInterview.js";

export const evaluateVoiceAnswer = async (req, res) => {

  try {

    const { question, answer } = req.body;

    if (!question || !answer) {

      return res.status(400).json({
        success:false,
        message:"Question and answer required"
      });

    }

    const result = await evaluateVoiceInterview(
      question,
      answer
    );

    res.status(200).json({
      success:true,
      result
    });

  } catch (error) {

    res.status(500).json({
      success:false,
      message:error.message
    });

  }

};