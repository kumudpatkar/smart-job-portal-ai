import model from "./gemini.js";

export const evaluateCodingAnswer = async (
  question,
  language,
  code
) => {

  try {

    const prompt = `
You are a Senior Software Engineer.

Question

${JSON.stringify(question)}

Programming Language

${language}

Candidate Code

${code}

Evaluate the code.

Return ONLY valid JSON.

{
  "score":90,
  "correctness":95,
  "codeQuality":90,
  "timeComplexity":"O(n)",
  "spaceComplexity":"O(1)",
  "strengths":[
    ""
  ],
  "improvements":[
    ""
  ],
  "feedback":""
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

    throw new Error("Unable to evaluate code.");

  }

};