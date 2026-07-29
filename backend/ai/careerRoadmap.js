import model from "./gemini.js";

export const generateCareerRoadmap = async (resumeText, goal) => {
  try {

    const prompt = `
You are an expert AI Career Mentor.

Candidate Resume:

${resumeText}

Career Goal:

${goal}

Create a detailed career roadmap.

Return ONLY valid JSON.

{
  "currentLevel":"...",
  "targetLevel":"...",
  "roadmap":[
    {
      "step":1,
      "title":"",
      "description":"",
      "duration":""
    }
  ],
  "recommendedSkills":[],
  "recommendedCertifications":[],
  "careerAdvice":""
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
      currentLevel: "",
      targetLevel: "",
      roadmap: [],
      recommendedSkills: [],
      recommendedCertifications: [],
      careerAdvice: "Unable to generate roadmap."
    };

  }
};