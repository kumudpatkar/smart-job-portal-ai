import model from "./gemini.js";

export const optimizeLinkedIn = async (profile) => {
  try {
    const prompt = `
You are a LinkedIn Profile Expert.

Optimize this LinkedIn profile.

${JSON.stringify(profile)}

Return ONLY valid JSON.

{
  "score":95,
  "headline":"",
  "about":"",
  "skills":[],
  "keywords":[],
  "tips":[]
}
`;

    const result = await model.generateContent(prompt);

    const response = await result.response;

    const text = response
      .text()
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(text);

  } catch (error) {
    console.log(error);

    return {
      score: 0,
      headline: "",
      about: "",
      skills: [],
      keywords: [],
      tips: []
    };
  }
};