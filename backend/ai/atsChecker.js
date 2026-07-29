import model from "./gemini.js";

export const checkATS = async (resumeText, jobRole) => {

  try {

    const prompt = `
You are an expert ATS (Applicant Tracking System).

Analyze the following resume for the job role:

${jobRole}

Resume:

${resumeText}

Return ONLY valid JSON.

{
  "score":85,
  "matchingSkills":[
    "Java",
    "Spring Boot",
    "MySQL"
  ],
  "missingSkills":[
    "Docker",
    "AWS",
    "REST API"
  ],
  "suggestions":[
    "Add measurable achievements.",
    "Improve professional summary.",
    "Add cloud technologies.",
    "Mention REST API experience."
  ],
  "feedback":"Overall your resume is suitable for this role but adding cloud skills and measurable achievements will significantly improve ATS ranking."
}

Do not return markdown.
Do not return explanation.
Return only JSON.
`;

    const result = await model.generateContent(prompt);

    const response = result.response.text();

    const cleaned = response
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const parsed = JSON.parse(cleaned);

    return {

      score: parsed.score || 0,

      matchingSkills:
        parsed.matchingSkills || [],

      missingSkills:
        parsed.missingSkills || [],

      suggestions:
        parsed.suggestions || [],

      feedback:
        parsed.feedback ||
        "No feedback available."

    };

  } catch (error) {

    console.log(error);

    return {

      score: 0,

      matchingSkills: [],

      missingSkills: [],

      suggestions: [
        "Unable to analyze resume."
      ],

      feedback:
        "Gemini API Error"

    };

  }

};