import model from "./gemini.js";

export const evaluateVoiceInterview = async (
  question,
  answer
) => {
  try {

    const prompt = `
You are an expert HR interviewer.

Interview Question:

${question}

Candidate Spoken Answer:

${answer}

Evaluate this answer.

Return ONLY valid JSON.

{
  "score":85,
  "feedback":"...",
  "strengths":[
    ""
  ],
  "improvements":[
    ""
  ]
}
`;

    const result = await model.generateContent(prompt);

    const response = result.response.text();

    const cleaned = response
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleaned);

  } catch (error) {

    console.log(error);

    return {
      score:0,
      feedback:"Unable to evaluate.",
      strengths:[],
      improvements:[]
    };

  }

};