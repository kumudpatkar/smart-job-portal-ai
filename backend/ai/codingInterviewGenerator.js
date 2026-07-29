import model from "./gemini.js";

export const generateCodingQuestion = async (
  language,
  difficulty,
  topic
) => {
  try {

    const prompt = `
You are a Senior Software Engineer.

Generate ONE coding interview question.

Language:
${language}

Difficulty:
${difficulty}

Topic:
${topic}

Return ONLY valid JSON.

{
  "title":"",
  "description":"",
  "constraints":"",
  "exampleInput":"",
  "exampleOutput":"",
  "starterCode":""
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

    throw new Error("Unable to generate coding question.");

  }
};