import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const rankResume = async (jobDescription, resumeText) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
You are an ATS Resume Ranking AI.

Compare the resume against the job description.

Job Description:
${jobDescription}

Resume:
${resumeText}

Return ONLY valid JSON.

{
  "atsScore": 90,
  "level": "Excellent",
  "matchedSkills": [
    "React",
    "Node.js"
  ],
  "missingSkills": [
    "Docker",
    "AWS"
  ],
  "strengths": [
    "Strong React knowledge",
    "Good Projects"
  ],
  "improvements": [
    "Add Docker experience",
    "Mention AWS"
  ]
}
`;

    const result = await model.generateContent(prompt);

    const response = await result.response;

    let text = response.text();

    text = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(text);

  } catch (error) {
    console.error("Resume Ranking AI Error:", error);

    return {
      atsScore: 0,
      level: "Unknown",
      matchedSkills: [],
      missingSkills: [],
      strengths: [],
      improvements: [],
    };
  }
};