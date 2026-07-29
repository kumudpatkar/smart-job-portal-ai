import model from "./gemini.js";

export const evaluateInterviewAnswer = async (
  question,
  answer
) => {

  try {

    const prompt = `
You are an HR Interviewer.

Question:

${question}

Candidate Answer:

${answer}

Evaluate this answer.

Return ONLY valid JSON.

{
  "score":85,
  "strengths":[
    ""
  ],
  "weaknesses":[
    ""
  ],
  "feedback":"",
  "improvedAnswer":""
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
      strengths:[],
      weaknesses:[],
      feedback:"Unable to evaluate.",
      improvedAnswer:""
    };

  }

};