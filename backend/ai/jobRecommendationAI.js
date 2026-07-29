import model from "./gemini.js";

export const recommendJobs = async (user, job) => {
  try {
    const prompt = `
You are an AI Job Recommendation Engine.

Candidate Profile:

${JSON.stringify(user)}

Job:

${JSON.stringify(job)}

Return ONLY valid JSON.

{
  "matchScore":92,
  "missingSkills":[
    "Docker",
    "AWS"
  ],
  "strengths":[
    "Java",
    "Spring Boot",
    "SQL"
  ],
  "reason":"The candidate matches most required skills and has strong backend development experience."
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
    console.error("Job Recommendation AI Error:", error);

    return {
      matchScore: 0,
      missingSkills: [],
      strengths: [],
      reason: "Unable to analyze this job."
    };
  }
};