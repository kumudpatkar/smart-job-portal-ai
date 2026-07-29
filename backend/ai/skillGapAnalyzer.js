import model from "./gemini.js";

export const analyzeSkillGap = async (resumeText, targetRole) => {
  try {

    const prompt = `
You are an AI Career Coach.

Candidate Resume:

${resumeText}

Target Role:

${targetRole}

Analyze the skill gap.

Return ONLY valid JSON.

{
  "currentSkills": [],
  "missingSkills": [],
  "learningPath": [],
  "recommendedCourses": [],
  "careerAdvice": ""
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
      currentSkills: [],
      missingSkills: [],
      learningPath: [],
      recommendedCourses: [],
      careerAdvice: "Unable to analyze skill gap."
    };

  }
};